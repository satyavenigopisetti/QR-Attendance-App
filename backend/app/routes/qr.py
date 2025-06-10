from fastapi import APIRouter
from app.models import QRRequest
import qrcode
import base64
from io import BytesIO

router = APIRouter()

@router.post("/generate-qr")
def generate_qr(req: QRRequest):
    data = f"session:{req.session_id}"

    img = qrcode.make(data)
    buf = BytesIO()
    img.save(buf, format="PNG")
    qr_base64 = base64.b64encode(buf.getvalue()).decode()

    return {"qr_code_data": data, "qr_image": qr_base64}

