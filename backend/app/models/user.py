from sqlalchemy import Column, Integer, String
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    phone_number = Column(String, nullable=True)  # nullable=True for backwards-compatibility with SQLite
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String(200), nullable=False)  # <-- was String, now 200
    role = Column(String, default="admin")  # admin / customer
