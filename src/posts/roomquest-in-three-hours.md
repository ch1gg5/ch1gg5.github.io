---
title: "Building RoomQuest in Three Hours"
date: 2026-07-18
description: "Field notes from leading a 5-person team at the Google Student AI Hackathon: scoping under a 4-hour build constraint, and shipping a Gemini multimodal-vision demo."
draft: false
tags: ["posts", "hackathon", "ai"]
---
My first hackathon started with something I had never done before: taking on the role of Project Manager.

I was one of 52 students selected from nearly 1,000 applicants for the Google Student AI Hackathon in London. Our five-person team had the morning for ideation and mentorship, followed by a tightly constrained development window before a 4:00 PM submission deadline.

With lunch taking up an hour of that window, we had roughly four hours of active development time.

That made one thing immediately important: **we couldn't build everything.**

## From idea to MVP

Our idea was **RoomQuest**, an AI-powered web app that turns a physical room into a mystery quest.

The idea came from a simple problem: many social games either keep people looking at screens or require significant preparation. We wanted to create something that got people physically interacting with their surroundings without requiring someone to spend hours setting up a game.

The core experience became:

**Setup → Play → Verify**

A host takes multiple wide-angle photos of their room. Gemini analyses the surroundings and identifies objects that can be used as targets, then generates around five clues.

Players then receive a poetic, rhyming riddle and have to search the physical room for the object it describes.

Once they think they've found it, they take a close-up photograph. Gemini's multimodal vision capabilities verify whether the object is correct before the next clue is unlocked.

The room itself becomes the game board.

## My role as Project Manager

I had no previous experience as a Project Manager, so this was one of the biggest learning experiences of the day.

With help from one of my teammates and our mentor, I helped divide up the work, keep everyone on schedule and make sure we were moving towards something we could actually demonstrate.

The hardest part wasn't deciding what would be cool to add. It was deciding what we could realistically finish.

Features such as multiplayer, leaderboards, longer storylines and augmented reality were interesting ideas, but they weren't necessary to prove the core concept. We needed the basic RoomQuest loop to work first.

That meant prioritising constantly and making sure everyone's work was contributing towards the same goal.

## Building with Gemini

Gemini was central to the prototype rather than simply being an added chatbot feature.

We used its **multimodal vision capabilities** to understand the room and later verify photos submitted by players. We also used structured JSON output to make the AI return predictable game information, such as target objects and clue order.

For the clues themselves, we prompted Gemini to act as a **gamemaster**, generating poetic and rhyming riddles based on the objects it identified.

Our development workflow moved through **Stitch → AI Studio → Antigravity → Vercel**, with React on the frontend and Node.js on the backend.

The challenge was getting these pieces working together quickly enough to have something we could actually show.

## The final stretch

As the deadline approached, we were still integrating the final pieces, testing the demo and putting our presentation together.

This was probably the clearest lesson from the entire day.

A feature doesn't matter if it isn't integrated. A working prototype isn't enough if you can't demonstrate it. And a good idea still needs to be communicated clearly.

We had to decide what was worth fixing, what could be simplified and what simply wasn't going to make the final version.

Despite the pressure, we managed to get RoomQuest into a state where we could present the concept and demonstrate what we'd built.

## What I took away

The biggest lesson wasn't a particular technology.

It was that **building software is much more than writing code**.

Taking on the Project Manager role taught me how important communication, delegation, prioritisation and teamwork are when you're working against a fixed deadline.

It also showed me that planning doesn't mean everything will go according to plan. When the deadline is approaching and several things still need to be done, you have to adapt quickly and focus on what actually matters.

RoomQuest was my first hackathon, but more importantly, it was my first experience seeing what happens when an idea, a team and a very short deadline all come together.

It's an experience I'll definitely take into my next project.


