#!/usr/bin/env bash
# Build the site and copy only the public files into dist/, then deploy dist/ to Cloudflare Pages.
#   ./deploy.sh          build + stage dist/ only
#   ./deploy.sh --push   also upload to Cloudflare Pages (needs `npx wrangler login` once)
set -euo pipefail
cd "$(dirname "$0")"
python3 build.py
rm -rf dist && mkdir -p dist/assets
cp ./*.html robots.txt sitemap.xml dist/
cp -r css js dist/
rsync -a --exclude originals assets/ dist/assets/
echo "dist/ ready: $(du -sh dist | cut -f1), $(find dist -type f | wc -l) files"
if [[ "${1:-}" == "--push" ]]; then
  npx --yes wrangler pages deploy dist --project-name flint-river-church --branch main
fi
