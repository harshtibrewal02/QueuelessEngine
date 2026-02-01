from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func, asc

from app.database import get_db
from app.models.queue import QueueEntry
from app.models.business import Business
from app.schemas.queue import (
    QueueJoinRequest,
    QueueJoinResponse,
    QueueStatusResponse,
    ServeNextResponse
)
from app.utils.deps import require_admin

router = APIRouter(prefix="/queue", tags=["Queue"])


# ------------------------
# JOIN QUEUE (Customer)
# ------------------------
@router.post("/join", response_model=QueueJoinResponse)
def join_queue(payload: QueueJoinRequest, db: Session = Depends(get_db)):

    business = db.query(Business).filter(Business.id == payload.business_id).first()
    if not business or not business.is_queue_open:
        raise HTTPException(status_code=400, detail="Queue is closed")

    last_number = db.query(func.max(QueueEntry.queue_number))\
        .filter(QueueEntry.business_id == payload.business_id)\
        .scalar()

    next_number = (last_number or 0) + 1

    entry = QueueEntry(
        business_id=payload.business_id,
        customer_name=payload.customer_name,
        queue_number=next_number,
        status="waiting"
    )

    db.add(entry)
    db.commit()
    db.refresh(entry)

    waiting_count = db.query(QueueEntry).filter(
        QueueEntry.business_id == payload.business_id,
        QueueEntry.status == "waiting"
    ).count()

    estimated_wait = waiting_count * business.avg_service_time

    return {
        "queue_number": entry.queue_number,
        "position": waiting_count,
        "estimated_wait_time": estimated_wait
    }


# ------------------------
# QUEUE STATUS (Customer)
# ------------------------
@router.get("/status/{business_id}", response_model=QueueStatusResponse)
def get_queue_status(business_id: int, db: Session = Depends(get_db)):

    business = db.query(Business).filter(Business.id == business_id).first()
    if not business:
        raise HTTPException(status_code=404, detail="Business not found")

    serving = db.query(QueueEntry).filter(
        QueueEntry.business_id == business_id,
        QueueEntry.status == "serving"
    ).first()

    waiting_count = db.query(QueueEntry).filter(
        QueueEntry.business_id == business_id,
        QueueEntry.status == "waiting"
    ).count()

    estimated_wait = waiting_count * business.avg_service_time

    return {
        "currently_serving": serving.queue_number if serving else None,
        "total_waiting": waiting_count,
        "estimated_wait_time": estimated_wait
    }


# ------------------------
# SERVE NEXT (Admin Only)
# ------------------------
@router.post("/next", response_model=ServeNextResponse)
def serve_next(
    business_id: int,
    current_user = Depends(require_admin),  # Admin-only
    db: Session = Depends(get_db)
):
    try:
        # Mark current serving as done
        current = db.query(QueueEntry).filter(
            QueueEntry.business_id == business_id,
            QueueEntry.status == "serving"
        ).first()

        if current:
            current.status = "done"

        # Pick next waiting customer
        next_customer = db.query(QueueEntry).filter(
            QueueEntry.business_id == business_id,
            QueueEntry.status == "waiting"
        ).order_by(asc(QueueEntry.queue_number)).first()

        if not next_customer:
            return {"message": "No customers in queue"}

        # Mark as serving
        next_customer.status = "serving"
        db.commit()
        db.refresh(next_customer)

        # Return info
        return {
            "serving_queue_number": next_customer.queue_number,
            "customer_name": next_customer.customer_name
        }

    except Exception as e:
        print("ERROR:", e)  # logs to terminal
        raise HTTPException(status_code=500, detail=str(e))
