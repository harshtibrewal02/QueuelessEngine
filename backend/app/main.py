from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.routes import auth
from app.routes.queue import router as queue_router
from app.routes.business import router as business_router

app = FastAPI(title="QueueLess API")

# ✅ CORS (FIX)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "http://127.0.0.1:3000",
        "http://10.64.117.60:3000",
        "*" # We'll remove allow_credentials temporarily to allow * if we need it, but let's stick to explicit array for now
    ], 
    allow_credentials=False, # Dropping credentials true so we can safely accept wildcards
    allow_methods=["*"],
    allow_headers=["*"],
)


# Create tables (Handled by Alembic now, so we comment this out for production)
# Base.metadata.create_all(bind=engine)

# Routes
app.include_router(auth.router)
app.include_router(queue_router)
app.include_router(business_router)

@app.get("/")
def root():
    return {"message": "QueueLess backend is running 🚀"}
