// Checks whether the CV PDF is present in the repo, then plays a short
// "deploy log" sequence in the terminal panel reflecting the real result.
// This is also the update mechanism: replace Daniel_Chigbu_CV.pdf in the
// repo root and this panel (and the download button) update automatically.

(async function () {
  try {
    const CV_PATH = "Daniel_Chigbu_CV.pdf";
    const body = document.getElementById("terminal-body");
    const viewBtn = document.getElementById("cv-view");
    const downloadBtn = document.getElementById("cv-download");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!body) return; // no terminal on this page, nothing to do

    let cvExists = false;
    try {
      const res = await fetch(CV_PATH, { method: "HEAD", cache: "no-store" });
      cvExists = res.ok;
    } catch (e) {
      cvExists = false;
    }

    if (!cvExists) {
      [viewBtn, downloadBtn].forEach((btn) => {
        if (!btn) return;
        btn.setAttribute("aria-disabled", "true");
        btn.removeAttribute("download");
        btn.removeAttribute("target");
        btn.href = "#";
      });
      if (viewBtn) {
        const label = viewBtn.querySelector("span");
        if (label) label.textContent = "CV coming soon";
      }
      if (downloadBtn) downloadBtn.style.display = "none";
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
  } catch (err) {
    // Fail-safe: if anything above breaks, at least show a plain fallback
    // instead of leaving the panel blank.
    const body = document.getElementById("terminal-body");
    if (body) body.textContent = "$ ./deploy.sh cv";
    console.error("Terminal panel error:", err);
  }
})();
