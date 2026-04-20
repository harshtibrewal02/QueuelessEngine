from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.business import Business
from app.schemas.business import BusinessCreate, BusinessResponse
from app.utils.deps import require_admin

router = APIRouter(prefix="/business", tags=["Business"])

@router.post("/", response_model=BusinessResponse)
def create_business(payload: BusinessCreate, current_user = Depends(require_admin), db: Session = Depends(get_db)):
    new_biz = Business(
        name=payload.name,
        avg_service_time=payload.avg_service_time,
        is_queue_open=payload.is_queue_open,
        owner_id=current_user.id
    )
    db.add(new_biz)
    db.commit()
    db.refresh(new_biz)
    return new_biz

@router.get("/my", response_model=BusinessResponse)
def get_my_business(current_user = Depends(require_admin), db: Session = Depends(get_db)):
    biz = db.query(Business).filter(Business.owner_id == current_user.id).first()
    if not biz:
        raise HTTPException(status_code=404, detail="No business registered")
    return biz

@router.get("/", response_model=List[BusinessResponse])
def get_businesses(db: Session = Depends(get_db)):
    # Publicly accessible list of open businesses
    businesses = db.query(Business).filter(Business.is_queue_open == True).all()
    return businesses

@router.get("/{id}", response_model=BusinessResponse)
def get_business(id: int, db: Session = Depends(get_db)):
    biz = db.query(Business).filter(Business.id == id).first()
    if not biz:
        raise HTTPException(status_code=404, detail="Business not found")
    return biz
