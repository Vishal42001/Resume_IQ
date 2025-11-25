# main.py
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
load_dotenv()

from app.core.rate_limit import rate_limiter
from app.api.analyze import router as analyze_router

app = FastAPI(title="Resume AI - Hybrid Model API")

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Vite default ports
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(analyze_router, prefix="/api", tags=["analyze"])

@app.get("/health")
async def health():
    return {"status": "ok", "service": "Resume AI Hybrid"}

@app.get("/expensive-ai-operation", dependencies=[Depends(rate_limiter)])
async def expensive_ai_operation():
    # Here you would call OpenAI or do heavy stuff
    return {"message": "This was allowed under rate limit."}
