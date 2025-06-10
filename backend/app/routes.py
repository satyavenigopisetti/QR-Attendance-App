import uuid, shutil
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from .database import SessionLocal
from .models import Session as QRSession, Attendance
from .schemas import SessionCreate, AttendanceIn
from .auth import get_current_user

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/sessions/")
def create_session(data: SessionCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    if user.role != "admin":
        raise HTTPException(status_code=403, detail="Unauthorized")
    token = str(uuid.uuid4())
    session = QRSession(title=data.title, qr_token=token)
    db.add(session)
    db.commit()
    return {"qr_token": token}

@router.post("/attendance/")
def mark_attendance(session_qr: str = Depends(), lat: float = Depends(), lon: float = Depends(), 
                    file: UploadFile = File(...), db: Session = Depends(get_db), 
                    user=Depends(get_current_user)):

    session = db.query(QRSession).filter(QRSession.qr_token == session_qr).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    filename = f"photos/{uuid.uuid4().hex}.jpg"
    with open(filename, "wb") as f:
        shutil.copyfileobj(file.file, f)

    record = Attendance(user_id=user.id, session_id=session.id, lat=lat, lon=lon, photo_path=filename)
    db.add(record)
    db.commit()
    return {"status": "Attendance marked"}
