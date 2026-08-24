<div align="center">

# Daniel Chigbu

**Computer Science @ Loughborough University**

[ch1gg5.github.io](https://ch1gg5.github.io) · [LinkedIn](https://www.linkedin.com/in/danchigbu/) · [d.j.chigbu@gmail.com](mailto:d.j.chigbu@gmail.com)

</div>

---

## About

This repo hosts my personal site — a portfolio and blog ("field notes") on things I've built. Founder &
Software Engineer building [Kaidoro](https://ch1gg5.github.io/about/), and a CS student at Loughborough
building full-stack systems in Java, Python, Spring Boot and FastAPI, with a growing interest in AI/ML and
quantitative finance.

## Stack

Built with [Eleventy](https://www.11ty.dev/) (11ty) — Markdown for blog posts, Nunjucks for templates —
and deployed to GitHub Pages via GitHub Actions. No CMS: a new post is a new Markdown file, and pushing to
`main` builds and deploys automatically.

```
.eleventy.js                 Eleventy config: input/output dirs, filters, the posts collection
package.json
.github/workflows/deploy.yml GitHub Actions: build with Eleventy, deploy to Pages
src/                          Everything Eleventy reads
├── index.njk                 Home
├── projects.njk               /projects/
├── about.njk                  /about/
├── blog.njk                   /blog/ index
├── posts/*.md                 Blog posts (one Markdown file per post)
├── _data/                     Site content: nav/footer links, projects, skills
├── _includes/layouts/         Shared page shell + post layout
├── _includes/partials/        Nav, footer, cards, dividers, the hero diagram
├── assets/                    CSS, JS, images
└── Daniel_Chigbu_CV.pdf       My CV — kept here for reference, not published to the site
```

## Local development

```
npm install
npm start      # serves the site at localhost:8080 with live reload
npm run build  # builds to _site/ (gitignored, never committed)
```

## Writing a new blog post

Add a Markdown file to `src/posts/`, e.g. `src/posts/my-new-post.md`:

```yaml
---
title: "My New Post"
date: 2026-08-23
description: "One or two sentences — used as the excerpt and meta description."
tags: ["posts", "some-tag"]
---
Post body in Markdown.
```

Push to `main` — GitHub Actions builds and deploys it, no other steps needed.

## Drafts

Add `draft: true` to a post's front matter to keep it off the live site:

```yaml
---
title: "Something I'm Still Writing"
date: 2026-08-24
description: "..."
draft: true
tags: ["posts"]
---
```

A draft gets no page and stays out of `collections.posts`, so it's absent from `/blog/` and the homepage
feed even once pushed. `npm start` still renders drafts locally — marked with a red **Draft** tag — so
they can be previewed while being written. Delete the `draft: true` line to publish.

The flag lives in `src/posts/posts.11tydata.js`.

## Deployment

This is a `<username>.github.io` repo, so the built site is served at the domain root. Deployment runs
through GitHub Actions (`.github/workflows/deploy.yml`) rather than a `gh-pages` branch — in the repo's
**Settings → Pages → Build and deployment**, the source must be set to **GitHub Actions**.

---

<div align="center">

Thanks for stopping by — feel free to reach out.

</div>
