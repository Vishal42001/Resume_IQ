# Complete Offline Setup Guide - Resume AI with Local LLM

## 🎯 Goal
Run the Resume AI application **completely offline** using a local LLM (Ollama) - no internet connection required!

## 📋 Prerequisites
- macOS, Linux, or Windows
- At least 8GB RAM (16GB recommended)
- 10GB free disk space for models

---

## 🚀 Step-by-Step Setup

### 1. Install Ollama

**macOS:**
```bash
brew install ollama
```

**Linux:**
```bash
curl https://ollama.ai/install.sh | sh
```

**Windows:**
Download from https://ollama.ai/download

### 2. Start Ollama Service

```bash
# Start Ollama in the background
ollama serve
```

Keep this terminal open or run it as a service.

### 3. Download a Local Model

Choose and download a model (this will take a few minutes):

**Recommended for Resume Analysis:**
```bash
# Llama 2 (7B) - Good balance of speed and quality
ollama pull llama2

# OR Mistral (7B) - Faster, good for simple tasks
ollama pull mistral

# OR Llama 3 (8B) - Better quality, slower
ollama pull llama3
```

**Verify the model is installed:**
```bash
ollama list
```

### 4. Configure Environment Variables

Update your `.env` file:

```env
# Ollama Configuration (for offline mode)
VITE_OLLAMA_URL=http://localhost:11434
VITE_LOCAL_MODEL=llama2

# OpenAI (optional - only needed for online mode)
VITE_OPENAI_API_KEY=your_key_here
```

### 5. Test Ollama

Test that Ollama is working:

```bash
# Test the model
ollama run llama2 "Hello, how are you?"

# Check API is accessible
curl http://localhost:11434/api/tags
```

### 6. Run the Application

```bash
# Install dependencies (if not already done)
npm install

# Start the frontend
npm run dev
```

### 7. Use Offline Mode

1. Open the app in your browser (http://localhost:5173)
2. **Toggle to "Local" mode** using the switch in the header
3. The app will now use your local Ollama model
4. **Disconnect from WiFi** - it still works! 🎉

---

## 🔧 Troubleshooting

### "Local model failed" error

**Solution:**
```bash
# Make sure Ollama is running
ollama serve

# Check if model is installed
ollama list

# If not, pull it
ollama pull llama2
```

### Slow performance

**Solutions:**
- Use a smaller model: `ollama pull mistral`
- Increase RAM allocation
- Close other applications
- Use GPU acceleration (if available)

### Model not found

```bash
# List available models
ollama list

# Pull the model you want
ollama pull llama2

# Update .env to match the model name
VITE_LOCAL_MODEL=llama2
```

---

## 📊 Model Comparison

| Model | Size | Speed | Quality | Best For |
|-------|------|-------|---------|----------|
| **Mistral** | 4GB | ⚡⚡⚡ Fast | ⭐⭐⭐ Good | Simple tasks, quick responses |
| **Llama 2** | 4GB | ⚡⚡ Medium | ⭐⭐⭐⭐ Great | Balanced - recommended |
| **Llama 3** | 5GB | ⚡ Slower | ⭐⭐⭐⭐⭐ Excellent | Complex analysis |
| **CodeLlama** | 4GB | ⚡⚡ Medium | ⭐⭐⭐⭐ Great | Technical content |

---

## 🎨 How It Works

**Online Mode (☁️):**
```
Frontend → OpenAI API → GPT-4o → Response
(Requires internet)
```

**Offline Mode (🏠):**
```
Frontend → Ollama (localhost:11434) → Llama 2 → Response
(No internet required!)
```

---

## ✅ Verification Checklist

- [ ] Ollama installed and running (`ollama serve`)
- [ ] Model downloaded (`ollama list` shows your model)
- [ ] `.env` configured with correct model name
- [ ] Frontend running (`npm run dev`)
- [ ] Toggle switch set to "Local" mode
- [ ] Test with WiFi **disconnected** ✨

---

## 💡 Tips

**For Best Results:**
- Use **Llama 2** or **Mistral** for general resume analysis
- Use **CodeLlama** if analyzing technical/developer resumes
- Keep Ollama running in the background
- First analysis might be slow (model loading), subsequent ones are faster

**Privacy Benefits:**
- ✅ Your resume never leaves your computer
- ✅ No API costs
- ✅ No rate limits
- ✅ Works anywhere, anytime

---

## 🆘 Need Help?

**Check Ollama Status:**
```bash
curl http://localhost:11434/api/tags
```

**View Ollama Logs:**
```bash
ollama serve
# Watch the terminal output
```

**Restart Ollama:**
```bash
# Stop (Ctrl+C in the ollama serve terminal)
# Then restart
ollama serve
```

---

## 🎉 You're Ready!

Your Resume AI now works **completely offline**! Switch to Local mode and enjoy unlimited, private resume analysis without any internet connection.
