from sqlalchemy.orm import Session
from . import models, schemas
import uuid

def create_session(db: Session, title: str):
    token = str(uuid.uuid4())
    session = models.Session(title=title, qr_token=token)
    db.add(session)
    db.commit()
    return session

def get_session_by_token(db: Session, token: str):
    return db.query(models.Session).filter_by(qr_token=token).first()

def create_attendance(db: Session, user_id: int, session_id: int, lat: float, lon: float, photo_path: str):
    attendance = models.Attendance(
        user_id=user_id, session_id=session_id, lat=lat, lon=lon, photo_path=photo_path
    )
    db.add(attendance)
    db.commit()
    return attendance
