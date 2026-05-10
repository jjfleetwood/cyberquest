#!/bin/bash
# Starts the Kryptós CronOS Next.js dev server and logs output
set -e

PROJECT_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
LOG_FILE="$PROJECT_ROOT/devops/logs/dev-server.log"

mkdir -p "$PROJECT_ROOT/devops/logs"
echo "[$(date)] Starting Kryptós CronOS dev server..." | tee -a "$LOG_FILE"

cd "$PROJECT_ROOT/app"
npm run dev 2>&1 | tee -a "$LOG_FILE"
