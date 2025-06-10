from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, qr, attendance
from app.database import create_tables

app = FastAPI()

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create DB tables
create_tables()

# Routers
app.include_router(auth.router, prefix="/api")
app.include_router(qr.router, prefix="/api")
app.include_router(attendance.router, prefix="/api")

