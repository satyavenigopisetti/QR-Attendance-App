from pydantic import BaseModel

class UserLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    role: str

class SessionCreate(BaseModel):
    title: str

class AttendanceIn(BaseModel):
    session_qr: str
    lat: float
    lon: float
