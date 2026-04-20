from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Bcrypt max = 72 BYTES (not chars)
def safe_truncate(password: str) -> str:
    pw_bytes = password.encode("utf-8")
    if len(pw_bytes) > 72:
        pw_bytes = pw_bytes[:72]
    return pw_bytes.decode("utf-8", errors="ignore")

def hash_password(password: str) -> str:
    safe_password = safe_truncate(password)
    return pwd_context.hash(safe_password)

def verify_password(password: str, hashed: str) -> bool:
    safe_password = safe_truncate(password)
    return pwd_context.verify(safe_password, hashed)
