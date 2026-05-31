"""Shared pytest fixtures for the PDF Signer backend.

DATA_DIR side effects are redirected to a per-test tmp directory so tests never
touch the real ./data volume. `signature_service` binds SIGNATURES_DIR at import
time, while `pdf_writer.save_output` re-reads os.environ per call — both are
covered below.
"""

import fitz
import pytest
from fastapi.testclient import TestClient

import services.signature_service as sigsvc
from main import app


@pytest.fixture(autouse=True)
def _tmp_data_dir(tmp_path, monkeypatch):
    monkeypatch.setattr(sigsvc, "SIGNATURES_DIR", tmp_path / "signatures")
    monkeypatch.setenv("DATA_DIR", str(tmp_path))
    yield


@pytest.fixture
def client():
    return TestClient(app)


@pytest.fixture
def make_pdf():
    """Factory: build an in-memory PDF with given page size (in points)."""

    def _make(width=595, height=842, pages=1):
        doc = fitz.open()
        for _ in range(pages):
            doc.new_page(width=width, height=height)
        data = doc.tobytes()
        doc.close()
        return data

    return _make
