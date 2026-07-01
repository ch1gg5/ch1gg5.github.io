// Checks whether the CV PDF is present in the repo, then plays a short
// "deploy log" sequence in the terminal panel reflecting the real result.
// This is also the update mechanism: replace Daniel_Chigbu_CV.pdf in the
// repo root and this panel (and the download button) update automatically.

(async function () {
  const CV_PATH = "Daniel_Chigbu_CV.pdf";
  const body = document.getElementById("terminal-body");
  const downloadBtn = document.getElementById("cv-download");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let cvExists = false;
  try {
    const res = await fetch(CV_PATH, { method: "HEAD", cache: "no-store" });
    cvExists = res.ok;
  } catch (e) {
    cvExists = false;
  }

  if (!cvExists) {
    downloadBtn.setAttribute("aria-disabled", "true");
    downloadBtn.removeAttribute("download");
    downloadBtn.href = "#";
    downloadBtn.querySelector("span").textContent = "CV coming soon";
  }

  const lines = [
    { text: "$ ./deploy.sh cv", cls: "plain" },
    { text: "> compiling profile...", cls: "" },
    { text: "> resolving dependencies (4 projects, 3 languages)", cls: "" },
    { text: "> running tests... 12/12 passed", cls: "ok" },
    cvExists
      ? { text: "> build succeeded — cv.pdf ready", cls: "ok" }
      : { text: "> build failed — cv.pdf not found in repo root", cls: "warn" },
  ];

  if (!cvExists) {
    lines.push({
      text: "> fix: add Daniel_Chigbu_CV.pdf to the repository root and redeploy",
      cls: "warn",
    });
  }

  if (reduceMotion) {
    body.innerHTML = lines
      .map((l) => `<span class="${l.cls}">${l.text}</span>`)
      .join("\n");
    return;
  }

  // Typed-out animation, line by line.
  for (const line of lines) {
    await typeLine(body, line.text, line.cls);
    body.innerHTML += "\n";
  }
  const cursor = document.createElement("span");
  cursor.className = "cursor";
  body.appendChild(cursor);

  async function typeLine(el, text, cls) {
    return new Promise((resolve) => {
      const span = document.createElement("span");
      span.className = cls;
      el.appendChild(span);
      let i = 0;
      const speed = 14;
      const tick = () => {
        span.textContent += text[i];
        i++;
        if (i < text.length) {
          setTimeout(tick, speed);
        } else {
          resolve();
        }
      };
      tick();
    });
  }
})();
