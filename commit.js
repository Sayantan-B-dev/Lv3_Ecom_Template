#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

if ! git diff --cached --quiet; then
  printf 'error: index already has staged changes. Unstage them before running this script.\n' >&2
  exit 1
fi

commit_group() {
  local message="$1"
  shift
  local staged=0
  for path in "$@"; do
    if [ -e "$path" ]; then
      git add -A -- "$path"
      staged=1
    fi
  done
  if [ "$staged" -eq 0 ]; then
    printf 'skip (no paths): %s\n' "$message"
    return 0
  fi
  if git diff --cached --quiet; then
    printf 'skip (nothing staged): %s\n' "$message"
    return 0
  fi
  git commit -m "$message"
  printf 'committed: %s\n' "$message"
}

commit_group "feat: add nocturne storefront theme" \
  src/ui/v3 \
  src/config/content.ts

commit_group "feat: centralize storefront imagery" \
  src/lib/images \
  src/lib/catalog.ts \
  src/ui/shared/components/ImageFrame.tsx \
  src/ui/shared/components/ProductCard.tsx \
  src/ui/shared/components/CategoryTile.tsx \
  src/ui/shared/pages/product-detail.tsx \
  src/ui/shared/pages/cart.tsx \
  src/ui/shared/styles/components.css \
  src/ui/v1/home.tsx \
  src/ui/v1/styles/shell.css \
  next.config.ts \
  eslint.config.mjs

commit_group "docs: document nocturne theme and image pipeline" \
  docs/changelog.md \
  docs/decisions.md \
  docs/ui-themes.md

commit_group "chore: add local MCP configuration" \
  opencode.json

commit_group "chore: add multi-commit helper script" \
  commit.js

printf '\nDone. Recent commits:\n'
git log --oneline -n 6
