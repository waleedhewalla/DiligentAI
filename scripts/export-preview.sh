#!/usr/bin/env bash
# Builds a static preview of the marketing site into ./docs for GitHub Pages.
# Server-only parts (API routes, auth, portal, middleware) are stripped from a
# temporary copy; forms and login therefore don't work in the preview.
#
#   npm run preview:export   →  commit docs/  →  Settings → Pages → branch /docs
set -euo pipefail

REPO_NAME="${PREVIEW_REPO_NAME:-DiligentAI}"
OWNER="${PREVIEW_OWNER:-waleedhewalla}"
BASE="/${REPO_NAME}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

# Copy the project without heavy/generated folders (tar is available everywhere; rsync isn't).
tar -C "$ROOT" --exclude=./node_modules --exclude=./.next --exclude=./docs --exclude=./.git -cf - . | tar -C "$TMP" -xf -
ln -s "$ROOT/node_modules" "$TMP/node_modules"
cd "$TMP"
rm -rf src/middleware.ts src/app/api src/app/auth "src/app/[locale]/portal" "src/app/[locale]/(auth)" "src/app/[locale]/[...rest]"

PREVIEW_EXPORT=1 PREVIEW_BASE_PATH="$BASE" NEXT_PUBLIC_PREVIEW=1 \
  NEXT_PUBLIC_SITE_URL="https://${OWNER}.github.io${BASE}" \
  npx next build

# Root → Arabic home (no middleware on a static host).
cat > out/index.html <<HTML
<!doctype html><html lang="ar"><head><meta charset="utf-8"><meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url=${BASE}/ar/"><link rel="canonical" href="${BASE}/ar/">
<title>Diligent AI</title></head><body><a href="${BASE}/ar/">Diligent AI</a></body></html>
HTML
touch out/.nojekyll   # serve the _next/ folder as-is

rm -rf "$ROOT/docs"
cp -R out "$ROOT/docs"
echo "Preview exported to docs/ → https://${OWNER}.github.io${BASE}/"
