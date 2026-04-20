from fastapi import APIRouter, Depends, HTTPException, Form
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.schemas.auth import UserRegister, TokenResponse
from app.utils.security import hash_password, verify_password
from app.utils.jwt import create_access_token

# ✅ Single router for all auth routes
router = APIRouter(prefix="/auth", tags=["Auth"])

# ------------------------
# REGISTER
# ------------------------
@router.post("/register")
def register(payload: UserRegister, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()
    if user:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = User(
        name=payload.name,
        phone_number=payload.phone_number,
        email=payload.email,
        password_hash=hash_password(payload.password),
        role=payload.role
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User registered successfully"}

from fastapi.security import OAuth2PasswordRequestForm

# ------------------------
# LOGIN
# ------------------------
@router.post("/login", response_model=TokenResponse)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    # OAuth2 specifies 'username', but we map it to our 'email' field
    email = form_data.username
    password = form_data.password

    user = db.query(User).filter(User.email == email).first()

    if not user or not verify_password(password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"user_id": user.id, "role": user.role})
    return {"access_token": token}
