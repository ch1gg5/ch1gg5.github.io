---
title: "Building a Local-First Notion Exporter"
date: 2026-07-15
description: "Notion's built-in export handles one page fine. Converting an entire workspace with nested pages to PDF, without a subscription or a server, needed its own tool."
draft: true
tags: ["posts", "tools", "electron"]
---
Notion's own PDF export works well for a single page. Point it at a workspace with nested subpages, though, and it turns into a manual, page-by-page slog: export one, find the next, repeat. I wanted every page in a workspace as a properly organised folder of PDFs, and I didn't want to pay a third-party service a subscription to get it, or hand my notes to someone else's server to do it.

## The actual shape of the problem

Notion already offers a bulk export: Settings → Export content → export the whole workspace as HTML. That gets you a folder tree that mirrors your workspace structure exactly: subpages as subfolders, formatting mostly intact. The missing piece was turning that folder of HTML files into the equivalent folder of PDFs, keeping the structure, without uploading any of it anywhere.

That constraint (everything stays on the machine) ruled out the obvious shortcut of piping files through a hosted HTML-to-PDF API. It meant rendering and printing each file locally instead.

## Electron as a rendering engine, not just a UI shell

The app is built on Electron, but the interesting part isn't the menu bar or the folder picker: it's that Electron ships a full Chromium instance, which means it can render Notion's exported HTML exactly as a browser would (tables, callouts, banners, code blocks) and then use Chromium's built-in print-to-PDF to capture that rendering as a file. No headless browser dependency to install separately, no PDF library trying to reimplement CSS layout: the same renderer that displays the page also produces the PDF from it.

The batch logic walks the exported folder tree, mirrors it in the output directory, and converts each HTML file in turn, reporting progress as it goes rather than running silently for however many minutes a large workspace export takes.

## What "100% local" actually bought

Beyond the privacy angle, keeping everything local removed an entire category of failure mode: no API rate limits, no upload size caps, no account to create, no service that could go down or get sunset. A workspace export with hundreds of nested pages just runs at the speed of the machine doing the converting, start to finish, with nothing waiting on a network round-trip.

The tradeoff is real, too: it's a macOS app someone has to download and run, not a link they paste a URL into. For a tool whose whole point was "don't send your notes to a third party," that tradeoff felt like the right one to take.
