#!/usr/bin/env bash
set -euo pipefail

BASE_PATH="${VITE_BASE_PATH:-/dava/}"
RUN_LINT="${RUN_LINT:-0}"
PUBLISH="${PUBLISH:-1}"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --base)
      BASE_PATH="$2"
      shift 2
      ;;
    --lint)
      RUN_LINT=1
      shift
      ;;
    --no-publish)
      PUBLISH=0
      shift
      ;;
    *)
      echo "Unknown option: $1"
      echo "Usage: npm run deploy:prod -- [--base /] [--lint] [--no-publish]"
      exit 1
      ;;
  esac
done

export VITE_BASE_PATH="$BASE_PATH"

echo "Production deploy started"
echo "Base path: $VITE_BASE_PATH"

if [[ ! -f package-lock.json ]]; then
  echo "package-lock.json bulunamadı. Önce npm install çalıştırın."
  exit 1
fi

npm ci

if [[ "$RUN_LINT" == "1" ]]; then
  npm run lint
fi

npm run build

if [[ "$PUBLISH" == "1" ]]; then
  npx gh-pages -d dist -m "Deploy production build"
else
  echo "Publish atlandı. Üretim çıktısı dist/ klasöründe hazır."
fi
