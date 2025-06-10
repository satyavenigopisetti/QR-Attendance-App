from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import auth, qr, attendance

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api")
app.include_router(qr.router, prefix="/api")
app.include_router(attendance.router, prefix="/api")

@app.get("/api/health")
def health():
    return {"status": "ok"}
