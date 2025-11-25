# app/api/analyze.py
"""
API endpoints for resume analysis with hybrid model routing
"""
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from app.core.rate_limit import rate_limiter
from app.core.model_router import get_model_router, ModelRouter, ModelType

router = APIRouter()

class AnalyzeRequest(BaseModel):
    resume: str
    job_description: str
    task_type: str  # review, editor, analyst, etc.
    model: str = "gpt-4o-mini"  # OpenAI model preference
    use_local_when_possible: bool = True

class AnalyzeResponse(BaseModel):
    result: dict
    model_used: str
    is_local: bool

@router.post("/analyze", dependencies=[Depends(rate_limiter)])
async def analyze_resume(
    request: AnalyzeRequest,
    router: ModelRouter = Depends(get_model_router),
) -> AnalyzeResponse:
    """
    Analyze resume against job description using hybrid model routing.
    
    - Simple tasks (review, checklist) → Local model (if available)
    - Complex tasks (editor, analyst, etc.) → OpenAI
    - Automatic fallback to local if OpenAI fails
    """
    
    # Build the prompt based on task type
    # (You would import your PROMPTS from prompts.js equivalent)
    prompt = f"""
Task: {request.task_type}

RESUME:
{request.resume}

JOB DESCRIPTION:
{request.job_description}

Please analyze and provide structured output.
"""
    
    try:
        # Route to appropriate model
        response_text, model_used = await router.route_and_generate(
            prompt=prompt,
            task_type=request.task_type,
            preferred_model=request.model,
            fallback_to_local=request.use_local_when_possible,
        )
        
        # Parse JSON response
        import json
        try:
            result = json.loads(response_text)
        except json.JSONDecodeError:
            # If not valid JSON, wrap in a result object
            result = {"raw_response": response_text}
        
        return AnalyzeResponse(
            result=result,
            model_used=model_used.value,
            is_local=(model_used == ModelType.LOCAL),
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@router.get("/models/status")
async def get_models_status(router: ModelRouter = Depends(get_model_router)):
    """Check availability of OpenAI and local models"""
    local_available = await router.is_local_model_available()
    
    return {
        "openai": {
            "available": True,  # Assuming API key is set
            "models": ["gpt-4o-mini", "gpt-4o", "gpt-4-turbo"]
        },
        "local": {
            "available": local_available,
            "url": router.local_model_url,
            "model": router.local_model_name if local_available else None
        }
    }
