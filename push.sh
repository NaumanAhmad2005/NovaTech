#!/usr/bin/env bash
# ===========================================
# NovaTech — Git Push Helper
# Usage: ./push.sh "your commit message"
#        ./push.sh            (auto-generates message from changed files)
# ===========================================

set -e

cd "$(dirname "$0")"

# Get changed files
CHANGED=$(git diff --name-only HEAD 2>/dev/null; git diff --cached --name-only 2>/dev/null; git ls-files --others --exclude-standard 2>/dev/null)

if [ -z "$CHANGED" ]; then
  echo "✅ Nothing to commit. Working tree is clean."
  exit 0
fi

# Determine commit message
if [ -n "$1" ]; then
  MSG="$1"
else
  # Auto-generate from changed files
  COUNT=$(echo "$CHANGED" | wc -l | tr -d ' ')
  FIRST=$(echo "$CHANGED" | head -1)
  if [ "$COUNT" -eq 1 ]; then
    MSG="✏️ update: $FIRST"
  else
    MSG="✏️ update: $COUNT files changed — $(echo "$CHANGED" | head -3 | tr '\n' ', ' | sed 's/, $//')"
  fi
fi

echo "📦 Staging all changes..."
git add -A

echo "💬 Committing: $MSG"
git commit -m "$MSG"

echo "🚀 Pushing to GitHub..."
git push origin master

echo ""
echo "✅ Done! Pushed to https://github.com/NaumanAhmad2005/NovaTech"
