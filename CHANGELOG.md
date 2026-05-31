# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

> Maintenance: add entries under **[Unreleased]** as work lands, grouped into
> Added / Changed / Fixed / Security. On release, rename the section to the new
> version with a date and start a fresh **[Unreleased]**.

## [Unreleased]

### Added
- Multi-page signing: signatures are tracked per page and every signed page is
  burned in on export (not just the current page), with an "all pages" action
  that copies the current page's signatures everywhere.
- Signature uniquification ("jitter"): optional, deterministic per-placement
  variation (rotation, scale, opacity, offset) so the same signature placed
  repeatedly — across pages or several on one page — is not pixel-identical.
  Controlled by a 0–100% slider.
- Internationalization: lightweight RU/EN i18n layer with a language switcher,
  persisted language choice, and localized error messages.

### Changed
- The API now returns stable, machine-readable error codes (`{code, message}`)
  instead of mixed Russian/English free-text, so the client localizes messages.
- The editor canvas uses each document's real pixel dimensions instead of a
  fixed A4 stage.
- Image export preserves the source format (PNG/JPEG/TIFF/WEBP) instead of
  always emitting JPEG.
- Docker deployment hardened: backend no longer exposes a host port (reached
  only via the nginx proxy), containers run as non-root, `/data` uses a named
  volume, nginx sends security headers, and the Tauri CSP drops `unsafe-inline`.

### Fixed
- PDF export validated signature coordinates against the wrong unit
  (`page.rect * 2`), causing false rejections on small pages and false passes on
  large pages; it now validates against the stage coordinate space.
- Non-A4 documents (Letter, landscape, images) were distorted because the stage
  was hardcoded to A4; signatures are no longer non-uniformly stretched.
- Background removal silently saved a fully transparent PNG when no ink was
  detected; it now reports an error and crops by the alpha channel.
- Corrupt PDFs/images returned HTTP 500; they now return 422.

### Security
- Closed a path-traversal vector: client-supplied signature ids are validated
  as canonical UUIDs before being used to build a filesystem path.
- Added anti-DoS resource limits: maximum upload size, page count, rasterized
  pixmap area, and a Pillow decompression-bomb guard.

## [1.0.0]

### Added
- Initial release: offline PDF/image signing tool — signature library with
  automatic (luminance-based) background removal, interactive Konva canvas with
  drag/resize/rotate/opacity, undo/redo, multi-page navigation, and export to
  PDF/JPEG. FastAPI backend, React + Vite frontend, Docker Compose deployment,
  and a scaffolded Tauri desktop wrapper.
