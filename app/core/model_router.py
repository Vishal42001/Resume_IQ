# app/core/model_router.py
"""
Hybrid model routing: OpenAI + Local Model
Routes requests based on complexity, rate limits, and availability.
"""
import os
from enum import Enum
from typing import Optional
import httpx
from openai import AsyncOpenAI

class ModelType(Enum):
    OPENAI = "openai"
    LOCAL = "local"

class ModelRouter:
    def __init__(self):
        self.openai_client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        self.local_model_url = os.getenv("LOCAL_MODEL_URL", "http://localhost:11434")  # Ollama default
        self.local_model_name = os.getenv("LOCAL_MODEL_NAME", "llama2")
        
        # Complexity thresholds
        self.simple_tasks = ["review", "checklist"]  # Use local model
        self.complex_tasks = ["editor", "analyst", "behavioral_fit", "hidden_requirements", "clustering", "interview_prep"]  # Use OpenAI
        
    async def is_local_model_available(self) -> bool:
        """Check if local model (Ollama) is running"""
        try:
            async with httpx.AsyncClient(timeout=2.0) as client:
                response = await client.get(f"{self.local_model_url}/api/tags")
                return response.status_code == 200
        except:
            return False
    
    async def generate_with_local(self, prompt: str, max_tokens: int = 2000) -> str:
        """Generate using local model (Ollama)"""
        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.post(
                f"{self.local_model_url}/api/generate",
                json={
                    "model": self.local_model_name,
                    "prompt": prompt,
                    "stream": False,
                    "options": {
                        "num_predict": max_tokens,
                        "temperature": 0.7,
                    }
                }
            )
            response.raise_for_status()
            return response.json()["response"]
    
    async def generate_with_openai(self, prompt: str, model: str = "gpt-4o-mini", max_tokens: int = 2000) -> str:
        """Generate using OpenAI"""
        response = await self.openai_client.chat.completions.create(
            model=model,
            messages=[{"role": "user", "content": prompt}],
            max_tokens=max_tokens,
            temperature=0.7,
        )
        return response.choices[0].message.content
    
    async def route_and_generate(
        self,
        prompt: str,
        task_type: str,
        preferred_model: Optional[str] = None,
        fallback_to_local: bool = True,
    ) -> tuple[str, ModelType]:
        """
        Route request to appropriate model and generate response.
        
        Args:
            prompt: The prompt to send
            task_type: Type of task (review, editor, etc.)
            preferred_model: User's preferred OpenAI model (gpt-4o-mini, gpt-4o, etc.)
            fallback_to_local: Whether to fallback to local model if OpenAI fails
            
        Returns:
            Tuple of (response_text, model_used)
        """
        # Check if local model is available
        local_available = await self.is_local_model_available()
        
        # Determine which model to use
        use_local = False
        
        # Strategy 1: Simple tasks can use local model
        if task_type in self.simple_tasks and local_available:
            use_local = True
        
        # Strategy 2: If OpenAI rate limited or unavailable, use local
        # (This would be determined by catching exceptions)
        
        try:
            if use_local:
                print(f"🏠 Using local model ({self.local_model_name}) for {task_type}")
                response = await self.generate_with_local(prompt)
                return response, ModelType.LOCAL
            else:
                print(f"☁️ Using OpenAI ({preferred_model or 'gpt-4o-mini'}) for {task_type}")
                response = await self.generate_with_openai(
                    prompt,
                    model=preferred_model or "gpt-4o-mini"
                )
                return response, ModelType.OPENAI
                
        except Exception as e:
            # Fallback logic
            if fallback_to_local and local_available and not use_local:
                print(f"⚠️ OpenAI failed, falling back to local model: {e}")
                response = await self.generate_with_local(prompt)
                return response, ModelType.LOCAL
            else:
                raise

# Global router instance
model_router = ModelRouter()

async def get_model_router() -> ModelRouter:
    return model_router
