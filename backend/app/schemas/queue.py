from pydantic import BaseModel
from typing import Optional

# ------------------------
# JOIN QUEUE
# ------------------------
class QueueJoinRequest(BaseModel):
    business_id: int
    customer_name: str

class QueueJoinResponse(BaseModel):
    queue_number: int
    position: int
    estimated_wait_time: int

# ------------------------
# QUEUE STATUS
# ------------------------
class QueueStatusResponse(BaseModel):
    currently_serving: Optional[int]
    last_done_patient: Optional[int] = None
    total_waiting: int
    estimated_wait_time: int

# ------------------------
# SERVE NEXT
# ------------------------
class ServeNextResponse(BaseModel):
    serving_queue_number: int
    customer_name: str
