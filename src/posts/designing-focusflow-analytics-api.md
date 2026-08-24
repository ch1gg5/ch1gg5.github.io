---
title: "Designing FocusFlow's Analytics Endpoints"
date: 2026-07-05
description: "REST resource design, JWT auth in FastAPI, SQLAlchemy models, and the SQL aggregation behind FocusFlow's productivity streaks and category breakdowns."
draft: true
tags: ["posts", "backend", "api-design"]
---
FocusFlow is a productivity-tracking API: log study sessions, tag them by category, and get back trends over time. The interesting engineering wasn't the CRUD (create a session, list your sessions); it was the analytics layer sitting on top of it, and the decision to build the whole thing in FastAPI rather than reaching for Spring Boot, which is where most of my other backend work lives.

## Resource design

The core resources are sessions (a logged block of study time, tagged with a category and duration) and the analytics endpoints derived from them: trends over a date range, a breakdown by category, and current streak length. Keeping analytics as read-only endpoints layered *on top of* the sessions resource, rather than pre-computing and storing aggregate values, means there's a single source of truth: every number the API returns is derived fresh from the sessions table, not from a cache that can drift out of sync with it.

## Auth: JWT in FastAPI

Every analytics endpoint is scoped to the authenticated user: nobody sees anyone else's study streak. FastAPI's dependency-injection system makes this genuinely pleasant: a `get_current_user` dependency decodes and validates the JWT once, and every route that needs an authenticated user just declares the dependency rather than repeating token-parsing logic per endpoint. It's the same idea as a Spring Security filter chain, but expressed as an explicit function argument instead of a configuration layer sitting outside the route. I found it easier to reason about exactly which endpoints were protected, because the protection is visible in the function signature.

## SQLAlchemy models and the aggregation queries

Sessions map to a straightforward SQLAlchemy model: user foreign key, category, duration, timestamp. The part worth writing up is the aggregation:

- **Category breakdown**: a `GROUP BY category` query summing duration per category over the requested date range, done in SQL rather than pulled into Python and summed manually. Letting Postgres do the aggregation means the API stays fast as session history grows, instead of scaling linearly with how much data gets loaded into the app process.
- **Streaks**: computed by pulling distinct session dates in descending order and walking backward from today while consecutive calendar days hold, breaking on the first gap. This one *does* happen in Python rather than pure SQL, because expressing "longest run of consecutive dates" cleanly in SQL (window functions with date-gap grouping) was more complex than the performance gain justified at FocusFlow's scale: a case where the "right" database-only answer wasn't worth the readability cost.

## Why FastAPI over Spring Boot, here

Most of my backend projects default to Spring Boot, partly out of familiarity and partly because Spring's ecosystem is hard to beat for anything with a lot of moving parts (security, message queues, complex domain models). FocusFlow's surface area is small and read-heavy (a handful of resources, a handful of aggregation endpoints), which is exactly where FastAPI's lower ceremony pays off: Pydantic models double as request/response validation and API documentation for free, and there's less boilerplate between "define the endpoint" and "it's live." Picking the framework to match the shape of the problem, rather than defaulting to whichever one I know best, was the actual lesson here.
