---
title: "Pathfinding Across Campus: A* with a Euclidean Heuristic"
date: 2026-05-20
description: "Why A* beats plain Dijkstra on a bounded campus graph, why the Euclidean-distance heuristic is admissible here, and how obstacle avoidance and multi-waypoint routing got modeled in NetworkX."
tags: ["posts", "algorithms"]
---
The Loughborough Route Finder started as a simple question: what's the fastest walking route between two buildings on campus, given that some paths are blocked or slower than others? The honest answer is "just use Google Maps," but the point was never the destination: it was building and understanding the pathfinding underneath it.

## Why A*, not Dijkstra

Dijkstra's algorithm finds the shortest path by exploring outward from the start node in every direction, uniformly, until it happens to reach the goal. On a bounded graph like a campus map, that means wasted exploration: nodes get visited that have nothing to do with the actual direction of travel. A* fixes this by adding a heuristic: an estimate of remaining distance to the goal, which biases the search toward nodes that are actually promising.

The tradeoff is that A* is only as good as its heuristic. A bad one either explores no better than Dijkstra (if it underestimates too aggressively toward zero) or returns wrong answers entirely (if it overestimates).

## Why Euclidean distance is a safe heuristic here

For A* to guarantee the shortest path, the heuristic has to be **admissible**: it must never overestimate the true remaining cost. Straight-line (Euclidean) distance between two campus coordinates is a textbook admissible heuristic for this kind of graph: the actual walking distance along paths can only be greater than or equal to the straight-line distance between two points, never less. It's also **consistent** (the heuristic value never increases by more than the actual edge cost as you move along the path), which is what actually guarantees A* never has to re-expand a node it already finalized.

Concretely: each campus location is a node with real coordinates, `h(n)` is the straight-line distance from node `n` to the destination, and the algorithm expands nodes in order of `f(n) = g(n) + h(n)` (cost-so-far plus estimated cost-to-go) rather than cost-so-far alone.

## Modeling obstacles and waypoints in NetworkX

The graph itself is built in NetworkX, with campus locations as nodes and walkable connections as weighted edges. Obstacles (closed paths, construction, restricted areas) are handled by removing or reweighting the relevant edges rather than adding special-case logic into the search itself, keeping the pathfinding code identical whether or not obstacles are present, with the graph structure doing the work.

Multi-waypoint routing (visit B and C on the way from A to D, in some reasonable order) runs A* pairwise between consecutive required stops rather than solving full TSP-style optimal ordering: a deliberate scope decision, since campus routing rarely has more than two or three required stops and exact ordering optimality wasn't the point of the exercise.

## What the visualization showed

Plotting the explored-node set with Matplotlib made the heuristic's effect visible in a way the numbers alone didn't: Dijkstra's explored region looks like a expanding circle centered on the start node, while A*'s explored region is a narrow corridor stretched toward the goal. Same correctness guarantee, a fraction of the wasted exploration. Seeing that shape difference on screen was more convincing than any big-O argument.
