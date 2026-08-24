---
title: "Building RoomQuest in Three Hours"
date: 2026-07-18
description: "Field notes from leading a 5-person team at the Google Student AI Hackathon: scoping under a 3-hour build constraint, and shipping a Gemini multimodal-vision demo through an AI Studio → Antigravity → Google Cloud workflow."
draft: true
tags: ["posts", "hackathon", "ai"]
---
Three hours is not enough time to build anything, which turns out to be exactly the constraint you want. I was one of 52 participants selected from roughly 1,000 applicants for the Google Student AI Hackathon in London, and once there our team of five had a room, a whiteboard, and a hard stop. RoomQuest, an app that looks at a photo of a physical room and generates a scavenger-hunt-style puzzle clue grounded in what it actually sees, came out the other side of that window as a working demo.

## Cutting scope on purpose

The instinct in a hackathon is to build the interesting 20% and hand-wave the rest. We did the opposite: we picked the smallest version of the idea that still proved the point, and refused to add anything beyond it until that version worked end to end. As project lead, my job for the first thirty minutes wasn't writing code: it was saying no to features. Multiplayer, scoring, a "hunt history" screen, all of it went on a whiteboard column labeled "if there's time" and stayed there.

What survived: take a photo, send it to Gemini, get back one puzzle clue that references something actually in the frame. That's it. That's the whole v1.

## The pipeline: AI Studio → Antigravity → Google Cloud

We prototyped the prompt in AI Studio first, iterating on the multimodal vision call against real room photos until the clues it generated were specific rather than generic: "the object with the green stripe on the shelf above the desk" instead of "something in the room." Getting Gemini to describe *one* concrete, verifiable detail rather than a vague scene summary was most of the actual engineering effort; the rest was plumbing.

Once the prompt behaved, we moved it into Antigravity to wire up the surrounding application logic, then deployed through Google Cloud so the demo would hold up live rather than on a laptop with fingers crossed. End to end, a submitted photo came back with a puzzle clue in under 5 seconds, fast enough that judges could hand us their own phone and watch it work on a room we'd never seen.

## The business case, not just the demo

We didn't stop at a working demo. Part of the pitch was sizing whether RoomQuest-shaped products were worth building at all: we put the addressable market at roughly $14.8B TAM, narrowing to a $3.53B SAM for the specific escape-room/team-building segment we were targeting. Presenting market sizing alongside a live technical demo forced the technical choices to answer to something outside the room: not "can we build this," but "should this exist."


