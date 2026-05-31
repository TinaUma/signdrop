#!/usr/bin/env bash
# Build the standalone Windows desktop app (Tauri + embedded FastAPI sidecar)
# and collect the installers into ./release/ at the repo root (not buried in
# src-tauri/target/...). Run from anywhere; requires Rust/cargo, Python +
# PyInstaller, and Node/npm. The same steps run in CI (.github/workflows).
set -euo pipefail
cd "$(dirname "$0")/.."

echo "==> [1/6] Build FastAPI sidecar (PyInstaller)"
(cd backend && python -m PyInstaller api_server.spec --distpath dist --workpath build_pyi --noconfirm)

echo "==> [2/6] Place sidecar under the Rust target triple"
TRIPLE="$(rustc -Vv | sed -n 's/^host: //p')"
mkdir -p src-tauri/binaries
cp "backend/dist/api-server.exe" "src-tauri/binaries/api-server-$TRIPLE.exe"

echo "==> [3/6] Install frontend deps (+ Tauri CLI)"
(cd frontend && npm install)
[ -x frontend/node_modules/.bin/tauri ] || (cd frontend && npm install -D '@tauri-apps/cli@^2')

echo "==> [4/6] Generate icons"
[ -f app-icon.png ] || python -c "from PIL import Image; Image.new('RGBA',(1024,1024),(37,99,235,255)).save('app-icon.png')"
./frontend/node_modules/.bin/tauri icon app-icon.png

echo "==> [5/6] tauri build (VITE_API_BASE for the webview -> sidecar)"
VITE_API_BASE="${VITE_API_BASE:-http://localhost:8000}" ./frontend/node_modules/.bin/tauri build

echo "==> [6/6] Collect artifacts into ./release/"
mkdir -p release
find src-tauri/target/release/bundle -type f \( -name '*.exe' -o -name '*.msi' \) -exec cp -f {} release/ \;
cp -f src-tauri/target/release/pdf-signer.exe release/ 2>/dev/null || true
echo "Done. Artifacts in ./release/:"
ls -la release/
