# Kryptós CronOS — Claude Code Project Guide

## Project Overview
Kryptós CronOS is a gamified cybersecurity and AI training platform built with Next.js (TypeScript + Tailwind CSS). Users progress through staged training activities that teach cybersecurity and AI concepts through interactive challenges.

## Project Structure
```
cyberquest/
├── app/                  # Next.js application (frontend + API routes)
│   ├── src/app/          # App router pages and layouts
│   ├── src/components/   # Reusable UI components
│   └── public/           # Static assets
├── content/
│   ├── stages/           # Stage definitions (JSON)
│   └── activities/       # Individual challenge configs (JSON)
├── assets/
│   ├── images/
│   └── audio/
├── data/
│   ├── users/            # Local user profiles (dev only)
│   └── progress/         # User progress tracking (dev only)
└── devops/
    ├── scripts/          # Shell scripts for common dev tasks
    ├── agents/           # Claude Code agent definitions
    └── logs/             # Dev server and build logs
```

## Dev Commands
```bash
# Start local dev server (run from project root)
cd app && npm run dev

# Build for production
cd app && npm run build

# Type check
cd app && npx tsc --noEmit

# Lint
cd app && npm run lint
```

## Agent Scripts
Located in `devops/scripts/`. Run from the project root (`C:\Users\Ajax\Projects\cyberquest`).

- `start-dev.sh` — starts the Next.js dev server
- `build-check.sh` — runs build + type check + lint
- `reset-data.sh` — clears local user/progress data for a clean demo state

## Architecture
- **Stages**: Defined in `content/stages/` as JSON. Each stage has an ID, title, description, prerequisites, and activity IDs.
- **Activities**: Defined in `content/activities/` as JSON. Each activity has a type, content, and scoring rules.
- **Progress**: Stored as JSON in `data/progress/` during dev. Will move to a database for production.
- **API routes**: All backend logic in `app/src/app/api/`.

## Coding Conventions
- TypeScript strict mode — no `any` types
- Tailwind CSS for all styling
- Components organized by feature under `app/src/components/`
- REST conventions for API routes under `/api/`

## Demo Flow (VC Pitch)
1. Landing page — product pitch + "Start Training" CTA
2. Stage map — game-style map of all training stages
3. Stage 1 activity — one playable cybersecurity challenge
4. Results screen — score, XP earned, next stage unlock
