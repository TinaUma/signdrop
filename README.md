<div align="center">

# PDF Signer

**Инструмент наложения рукописной подписи на документы**  
**A tool for placing handwritten signatures on documents**

[![Status](https://img.shields.io/badge/status-in%20development-yellow)](https://github.com/TinaUma/PDF_Signer)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![Stack](https://img.shields.io/badge/stack-FastAPI%20%7C%20React%20%7C%20Tauri-informational)](https://github.com/TinaUma/PDF_Signer)

[Русский](#русский) · [English](#english)

</div>

---

<a name="русский"></a>

## 🇷🇺 Русский

### Что это

PDF Signer — кроссплатформенный инструмент для наложения рукописной подписи (скан или фото) на документы форматов PDF, JPEG, PNG. Работает **полностью офлайн** — никакие данные не покидают ваше устройство.

> Принцип: запустил → открыл файл → подписал → сохранил.

### Возможности

- 📄 Загрузка PDF (многостраничный) и изображений (JPG, PNG, TIFF, WEBP)
- ✍️ Библиотека подписей — загрузи один раз, используй всегда
- 🪄 Автоматическое удаление фона подписи (нейросеть rembg, офлайн)
- 🎨 Опциональная векторизация подписи в SVG (vtracer)
- 🖱️ Интерактивный холст — drag & drop, resize, rotate, прозрачность
- ↩️ Undo / Redo — до 20 шагов отмены
- 💾 Экспорт в PDF, JPEG, PNG — оригинал не изменяется
- 🔒 Всё локально — никаких облаков, никакой регистрации

### Варианты запуска

| Вариант | Описание |
|---|---|
| **Docker** | `docker compose up` → открыть браузер на `localhost:8080` |
| **Нативный .exe / .app** | Скачать релиз, запустить — Python не нужен |

### Быстрый старт (Docker)

```bash
git clone https://github.com/TinaUma/PDF_Signer.git
cd PDF_Signer
docker compose up
# Открыть http://localhost:8080
```

Подписи сохраняются в смонтированной папке `./data/signatures/` и не пропадают между перезапусками.

### Стек

| Слой | Технология |
|---|---|
| Frontend | React 18 + Vite + Tailwind CSS + **Konva.js** |
| Backend | FastAPI + Python 3.11 |
| PDF | PyMuPDF (render + write) · pdfjs-dist (браузер) |
| Удаление фона | rembg (U2Net, офлайн) |
| Векторизация | vtracer (Rust, офлайн) |
| Нативная оболочка | **Tauri v2** (Rust + WebView) |
| Упаковка | Docker · PyInstaller sidecar · GitHub Actions |

### Статус проекта

> 🚧 **В разработке** — v1.0 MVP

| Задача | Статус |
|---|---|
| Scaffold: структура, Docker, FastAPI, React | 🔲 В плане |
| Загрузка и просмотр документов | 🔲 В плане |
| Библиотека подписей (rembg, хранение) | 🔲 В плане |
| Холст редактора (Konva.js, drag/resize/rotate) | 🔲 В плане |
| Экспорт (вплавление подписи в PDF) | 🔲 В плане |
| Tauri нативный билд + финальный Docker-образ | 🔲 В плане |

### Что НЕ входит в v1.0

- Авторизация и аккаунты
- Облачное хранение
- Юридически значимая ЭЦП (PKI)
- История операций *(запланирована в v2.0)*

### Автор

Разработано [Умашевой Т.](https://github.com/TinaUma) · портфолио-проект

---

<a name="english"></a>

## 🇬🇧 English

### What is it

PDF Signer is a cross-platform tool for placing a handwritten signature (scan or photo) on PDF and image documents. Works **completely offline** — no data ever leaves your device.

> Workflow: launch → open file → sign → save.

### Features

- 📄 Load PDFs (multi-page) and images (JPG, PNG, TIFF, WEBP)
- ✍️ Signature library — upload once, reuse anytime
- 🪄 Automatic background removal via rembg (neural network, offline)
- 🎨 Optional SVG vectorization (vtracer)
- 🖱️ Interactive canvas — drag & drop, resize, rotate, opacity control
- ↩️ Undo / Redo — up to 20 steps
- 💾 Export to PDF, JPEG, PNG — original file stays untouched
- 🔒 Fully local — no cloud, no registration

### Deployment options

| Option | Description |
|---|---|
| **Docker** | `docker compose up` → open browser at `localhost:8080` |
| **Native .exe / .app** | Download release, run it — no Python required |

### Quick start (Docker)

```bash
git clone https://github.com/TinaUma/PDF_Signer.git
cd PDF_Signer
docker compose up
# Open http://localhost:8080
```

Signatures are stored in the mounted folder `./data/signatures/` and persist across restarts.

### Tech stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite + Tailwind CSS + **Konva.js** |
| Backend | FastAPI + Python 3.11 |
| PDF | PyMuPDF (render + write) · pdfjs-dist (browser) |
| Background removal | rembg (U2Net, offline) |
| Vectorization | vtracer (Rust, offline) |
| Native shell | **Tauri v2** (Rust + WebView) |
| Packaging | Docker · PyInstaller sidecar · GitHub Actions |

### Project status

> 🚧 **In development** — v1.0 MVP

| Task | Status |
|---|---|
| Scaffold: structure, Docker, FastAPI, React | 🔲 Planned |
| Document loading & viewer | 🔲 Planned |
| Signature library (rembg, storage) | 🔲 Planned |
| Canvas editor (Konva.js, drag/resize/rotate) | 🔲 Planned |
| Export (burn signature into PDF) | 🔲 Planned |
| Tauri native build + final Docker image | 🔲 Planned |

### Out of scope for v1.0

- Auth and user accounts
- Cloud storage
- Legally binding digital signatures (PKI)
- Operation history *(planned for v2.0)*

### Author

Built by [TinaUma](https://github.com/TinaUma) · portfolio project

---

<div align="center">

*Built with ❤️ and [Claude Code](https://claude.ai/code)*

</div>
