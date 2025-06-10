from fastapi import APIRouter, HTTPException
from app.models import UserRegister, UserLogin
from app.database import get_connection
import hashlib

router = APIRouter()

def hash_password(password: str):
    return hashlib.sha256(password.encode()).hexdigest()

@router.post("/register")
def register(user: UserRegister):
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("INSERT INTO users (email, password, role) VALUES (%s, %s, %s)",
                       (user.email, hash_password(user.password), user.role))
        conn.commit()
        return {"message": "User registered successfully"}
    except:
        raise HTTPException(status_code=400, detail="Email already exists")
    finally:
        conn.close()

@router.post("/login")
def login(user: UserLogin):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT role FROM users WHERE email=%s AND password=%s",
                   (user.email, hash_password(user.password)))
    result = cursor.fetchone()
    conn.close()

    if result:
        return {"token": "dummy-token", "role": result[0]}  # Use JWT in production
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")

