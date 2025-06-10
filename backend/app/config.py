import os
from dotenv import load_dotenv
from pydantic import BaseSettings

# Load environment variables from .env file
load_dotenv()

class Settings(BaseSettings):
    # Database configuration
    DB_HOST: str = os.getenv("DB_HOST", "localhost")
    DB_NAME: str = os.getenv("DB_NAME", "qr_attendance")
    DB_USER: str = os.getenv("DB_USER", "postgres")
    DB_PASS: str = os.getenv("DB_PASS", "your_password")

    # Optional settings for app behavior
    PROJECT_NAME: str = "QR Attendance System"
    DEBUG: bool = True

    class Config:
        env_file = ".env"

# Create a settings instance
settings = Settings()

