from fastapi import APIRouter
from app.models import AttendanceData
from app.database import get_connection

router = APIRouter()

@router.post("/mark-attendance")
def mark_attendance(data: AttendanceData):
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            INSERT INTO attendance (user_email, qr_data, latitude, longitude, selfie)
            VALUES (%s, %s, %s, %s, %s)
        """, (
            "student@example.com",  # In real app, extract from token or QR
            data.qr_code_data,
            data.location['latitude'],
            data.location['longitude'],
            data.selfie
        ))
        conn.commit()
        return {"message": "Attendance marked successfully"}
    finally:
        conn.close()

