// A4 @ ~96dpi — fallback stage size when a page's real pixel size is unknown.
// Mirrors backend/constants.py (STAGE_FALLBACK_W/H); keep both in sync.
export const FALLBACK_DIMS = { width: 794, height: 1123 }

// API origin. Empty = relative (Docker/browser: nginx proxies /api same-origin).
// Set VITE_API_BASE=http://localhost:8000 for the Tauri build, whose webview
// origin (tauri://localhost) can't reach the sidecar with a relative path.
export const API_BASE = import.meta.env.VITE_API_BASE ?? ''
