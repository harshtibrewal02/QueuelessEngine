from pydantic import BaseModel

class BusinessBase(BaseModel):
    name: str
    avg_service_time: int = 15
    is_queue_open: bool = True

class BusinessCreate(BusinessBase):
    pass

class BusinessResponse(BusinessBase):
    id: int
    owner_id: int

    class Config:
        from_attributes = True
