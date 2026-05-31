#!/usr/bin/env bash
# Build the standalone desktop app (Tauri + embedded FastAPI sidecar) and collect
# the installers into ./release/ at the repo root (not buried in
# src-tauri/target/...). Cross-platform: builds for the HOST OS — Windows
# (.exe/.msi), macOS (.dmg/.app), or Linux (.deb/.rpm/.AppImage). Run from
# anywhere; requires Rust/cargo, Python + PyInstaller, and Node/npm (plus the
# OS-specific Tauri prerequisites — see docs/DEVELOPMENT). The same steps run in
# CI (.github/workflows/release.yml, currently Windows only).
set -euo pipefail
cd "$(dirname "$0")/.."

# Windows sidecar/main binaries carry a .exe suffix; macOS/Linux do not.
TRIPLE="$(rustc -Vv | sed -n 's/^host: //p')"
case "$TRIPLE" in
  *windows*) EXT=".exe" ;;
  *)         EXT="" ;;
esac

echo "==> [1/6] Build FastAPI sidecar (PyInstaller)"
(cd backend && python -m PyInstaller api_server.spec --distpath dist --workpath build_pyi --noconfirm)

echo "==> [2/6] Place sidecar under the Rust target triple ($TRIPLE)"
mkdir -p src-tauri/binaries
cp "backend/dist/api-server$EXT" "src-tauri/binaries/api-server-$TRIPLE$EXT"

echo "==> [3/6] Install frontend deps (+ Tauri CLI)"
(cd frontend && npm install)
[ -x frontend/node_modules/.bin/tauri ] || (cd frontend && npm install -D '@tauri-apps/cli@^2')

echo "==> [4/6] Icons — committed under src-tauri/icons/ (master: app-icon.png)"
# Icons are version-controlled, not generated at build time. To refresh them
# after editing app-icon.png, run: ./frontend/node_modules/.bin/tauri icon app-icon.png

echo "==> [5/6] tauri build (webview discovers the sidecar's dynamic port at runtime)"
# No VITE_API_BASE: the webview asks Rust for the sidecar port via the api_port
# command (see src-tauri/src/lib.rs) and builds the API base at runtime.
./frontend/node_modules/.bin/tauri build

echo "==> [6/6] Collect artifacts into ./release/"
mkdir -p release
# Installer bundles for whichever OS this is (Tauri targets="all" → host formats).
find src-tauri/target/release/bundle -type f \
  \( -name '*.exe' -o -name '*.msi' -o -name '*.dmg' \
     -o -name '*.deb' -o -name '*.rpm' -o -name '*.AppImage' \) \
  -exec cp -f {} release/ \;
# Tauri resolves the sidecar (api-server) next to the main binary at runtime, so
# the bare executable can't start the API without it. Copy both alongside so
# release/ holds a runnable standalone pair. (The installers embed the sidecar
# themselves via externalBin — this is only for the loose binary.)
cp -f "src-tauri/target/release/pdf-signer$EXT" release/ 2>/dev/null || true
cp -f "src-tauri/target/release/api-server$EXT" release/ 2>/dev/null || true
echo "Done. Artifacts in ./release/:"
ls -la release/
