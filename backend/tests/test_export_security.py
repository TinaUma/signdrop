"""Security tests for signature-id validation (sec-uuid-validation).

sig['id'] comes from the client and is used to build a filesystem path. Only
canonical UUIDs are accepted, closing the path-traversal vector.
"""

import json


def _pdf_payload(sig_id):
    return json.dumps(
        [
            {
                "page_idx": 0,
                "stage_w": 794,
                "stage_h": 1123,
                "signatures": [{"id": sig_id, "x": 10, "y": 10, "w": 50, "h": 40}],
            }
        ]
    )


def test_pdf_export_rejects_traversal_sig_id(client, make_pdf):
    r = client.post(
        "/api/export",
        files={"file": ("doc.pdf", make_pdf(), "application/pdf")},
        data={"pages": _pdf_payload("../../etc/passwd")},
    )
    assert r.status_code == 422


def test_pdf_export_rejects_non_uuid_sig_id(client, make_pdf):
    r = client.post(
        "/api/export",
        files={"file": ("doc.pdf", make_pdf(), "application/pdf")},
        data={"pages": _pdf_payload("not-a-uuid")},
    )
    assert r.status_code == 422


def test_get_signature_image_invalid_id_404(client):
    r = client.get("/api/signatures/not-a-uuid/image")
    assert r.status_code == 404


def test_delete_signature_invalid_id_404(client):
    # A non-uuid id is rejected by delete_signature before any filesystem touch.
    r = client.delete("/api/signatures/not-a-uuid")
    assert r.status_code == 404
