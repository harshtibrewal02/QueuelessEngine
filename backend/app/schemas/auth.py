from pydantic import BaseModel, EmailStr, Field, field_validator

class UserRegister(BaseModel):
    name: str
    phone_number: str = Field(..., min_length=10, max_length=15, description="Phone number up to 15 digits")
    email: EmailStr
    password: str = Field(..., max_length=72)
    role: str = "admin"

    @field_validator('email')
    @classmethod
    def validate_email_domain(cls, v: str) -> str:
        allowed_domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"]
        domain = v.split("@")[-1].lower()
        if domain not in allowed_domains:
            raise ValueError(f"Only {', '.join(allowed_domains)} emails are allowed.")
        return v

class UserLogin(BaseModel):
    email: EmailStr
    password: str = Field(..., max_length=72)

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
