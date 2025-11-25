# Setup Instructions for Hybrid Model System

## 1. Install Dependencies

```bash
pip install fastapi uvicorn redis httpx openai python-dotenv
```

## 2. Setup Local Model (Ollama)

### Install Ollama
```bash
# macOS
brew install ollama

# Linux
curl https://ollama.ai/install.sh | sh
```

### Start Ollama and Pull a Model
```bash
# Start Ollama service
ollama serve

# In another terminal, pull a model
ollama pull llama2
# or
ollama pull mistral
# or
ollama pull codellama
```

## 3. Setup Redis

```bash
# macOS
brew install redis
brew services start redis

# Linux
sudo apt-get install redis-server
sudo systemctl start redis
```

## 4. Configure Environment Variables

Update your `.env` file:
```env
# OpenAI
OPENAI_API_KEY=your_key_here

# Local Model (Ollama)
LOCAL_MODEL_URL=http://localhost:11434
LOCAL_MODEL_NAME=llama2

# Redis
REDIS_URL=redis://localhost:6379/0
```

## 5. Run the Backend

```bash
# Create app/__init__.py if it doesn't exist
mkdir -p app/api app/core
touch app/__init__.py app/api/__init__.py app/core/__init__.py

# Run FastAPI server
uvicorn main:app --reload --port 8000
```

## 6. Test the Hybrid System

### Check Model Status
```bash
curl http://localhost:8000/api/models/status
```

### Analyze Resume (will auto-route to best model)
```bash
curl -X POST http://localhost:8000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "resume": "Your resume text...",
    "job_description": "Job description...",
    "task_type": "review",
    "model": "gpt-4o-mini",
    "use_local_when_possible": true
  }'
```

## How It Works

**Routing Strategy:**
- **Simple tasks** (review, checklist) → Local model (faster, free)
- **Complex tasks** (editor, analyst, behavioral_fit) → OpenAI (better quality)
- **Automatic fallback** → If OpenAI fails, uses local model
- **Rate limiting** → Protects both APIs from overuse

**Benefits:**
- 💰 **Cost savings** - Use free local model when possible
- 🚀 **Speed** - Local model has no API latency
- 🛡️ **Reliability** - Fallback ensures service continuity
- 🔒 **Privacy** - Sensitive data can stay local
