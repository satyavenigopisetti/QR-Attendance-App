from fastapi import FastAPI
from .database import Base, engine
from .auth import router as auth_router
from .routes import router as routes_router

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(auth_router)
app.include_router(routes_router)
