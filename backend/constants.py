"""Shared constants and storage paths.

The frontend Konva stage falls back to A4 @ ~96dpi (794x1123) when a page's real
pixel size is unknown; the backend mirrors that fallback when a payload omits
stage dimensions. Keep both sides in sync via this single source (and its
frontend twin in src/constants.js).
"""

import os
import sys
from pathlib import Path

STAGE_FALLBACK_W = 794
STAGE_FALLBACK_H = 1123


def get_data_dir() -> Path:
    """Root directory for persisted data (uploaded signatures, exported docs).

    Resolution order:
      1. DATA_DIR env var — the normal path for both deployments: the Tauri host
         passes a per-user writable dir (app_data_dir, e.g. %APPDATA%\<id>) so
         user files stay writable regardless of install location and out of the
         signed macOS bundle; Docker mounts a volume here; tests point it at a
         tmp dir.
      2. Next to the executable — fallback for the bundled native app
         (PyInstaller ``sys.frozen``) when launched WITHOUT a DATA_DIR (e.g. the
         sidecar run standalone). Not the primary path: the host sets DATA_DIR.
      3. ``./data`` relative to the CWD — dev-server default.

    Read at call time (not bound at import) so the env override always wins.
    """
    env = os.environ.get("DATA_DIR")
    if env:
        return Path(env)
    if getattr(sys, "frozen", False):  # PyInstaller bundle (native exe)
        return Path(sys.executable).resolve().parent / "data"
    return Path("./data")
