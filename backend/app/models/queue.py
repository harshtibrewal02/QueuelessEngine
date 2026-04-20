from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.sql import func
from app.database import Base

class QueueEntry(Base):
    __tablename__ = "queue_entries"

    id = Column(Integer, primary_key=True, index=True)
    business_id = Column(Integer, ForeignKey("businesses.id"))
    customer_name = Column(String, nullable=False)
    queue_number = Column(Integer, nullable=False)
    status = Column(String, default="waiting")  
    created_at = Column(DateTime(timezone=True), server_default=func.now())
