# Kryptós CronOS DevOps Agent

## Purpose
This agent handles routine DevOps tasks for the Kryptós CronOS project: starting the dev server, running build checks, managing local data, and monitoring for errors.

## Trigger Phrases
- "start the dev server" → run `devops/scripts/start-dev.sh`
- "run a build check" → run `devops/scripts/build-check.sh`
- "reset demo data" → run `devops/scripts/reset-data.sh`
- "check the logs" → read `devops/logs/dev-server.log`
- "what broke" → read `devops/logs/build-check.log`, summarize failures

## Rules
- Always log output to `devops/logs/`
- Never delete source code or `app/` directory contents
- Never modify files in `content/` or `data/` unless explicitly asked
- Before running a build, confirm the dev server is stopped to avoid port conflicts

## Environment
- Project root: `C:\Users\Ajax\Projects\cyberquest`
- App directory: `C:\Users\Ajax\Projects\cyberquest\app`
- Dev server URL: http://localhost:3000
- Node version: v24.x
