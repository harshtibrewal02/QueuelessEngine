from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from app.database import Base

class Business(Base):
    __tablename__ = "businesses"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    owner_id = Column(Integer, ForeignKey("users.id"))
    avg_service_time = Column(Integer, default=15)  # minutes
    is_queue_open = Column(Boolean, default=True)
