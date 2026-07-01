# ch1gg5.github.io

Personal landing page — hero intro, live "deploy log" status panel, project
cards, and a CV download. Built with plain HTML/CSS/JS, no build step, ready
for GitHub Pages as-is.

## Deploying

1. Push these files (`index.html`, `style.css`, `script.js`,
   `Daniel_Chigbu_CV.pdf`) to the root of the `ch1gg5.github.io` repo.
2. In repo **Settings → Pages**, confirm the source is the `main` branch,
   root folder.
3. Site goes live at `https://ch1gg5.github.io` within a minute or two.

## Updating your CV

The download button and the terminal status panel both point at one file:
**`Daniel_Chigbu_CV.pdf`** in the repo root.

To update it:

1. On GitHub, open the repo → click the existing `Daniel_Chigbu_CV.pdf`.
2. Click the pencil/upload icon, or use **Add file → Upload files** and
   upload a new PDF with the **exact same filename**.
3. Commit. The live page updates automatically — no HTML/link changes
   needed.

If the file is ever missing (e.g. renamed by mistake), the page detects
this automatically: the terminal panel reports a failed build and the
download button changes to "CV coming soon" until the file is restored.

## Editing content

- **Bio / intro**: edit the text inside `<section class="about">` in
  `index.html`.
- **Project cards**: each is an `<article class="project-card">` block in
  `index.html`. Update the description, tags, or the `href` on
  `View repo →` to point at the actual GitHub repo for that project (they
  currently link to your GitHub profile as a placeholder).
- **Contact links**: in the `<footer>` section.
- **Colors / fonts**: CSS custom properties at the top of `style.css`
  (`:root { ... }`).

## Files

```
index.html              Page structure and content
style.css                Design system (colors, type, layout)
script.js                Terminal typing effect + CV-file existence check
Daniel_Chigbu_CV.pdf     Your CV — replace this to update the site
```
