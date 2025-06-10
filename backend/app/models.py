from pydantic import BaseModel

class UserRegister(BaseModel):
    email: str
    password: str
    role: str

class UserLogin(BaseModel):
    email: str
    password: str

class QRRequest(BaseModel):
    session_id: str

class AttendanceData(BaseModel):
    qr_code_data: str
    location: dict
    selfie: str

