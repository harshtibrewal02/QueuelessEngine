from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.routes import auth
from app.routes.queue import router as queue_router

app = FastAPI(title="QueueLess API")

# ✅ CORS (FIX)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Create tables
Base.metadata.create_all(bind=engine)

# Routes
app.include_router(auth.router)
app.include_router(queue_router)

@app.get("/")
def root():
    return {"message": "QueueLess backend is running 🚀"}
