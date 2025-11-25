import OpenAI from 'openai';
import { generateWithLocal, checkOllamaStatus, parseJSONResponse } from './localLLM';

/**
 * Hybrid LLM Service - Supports both OpenAI (online) and Ollama (offline)
 */

/**
 * Generate content using either OpenAI or local Ollama
 * @param {string} prompt - The prompt to send
 * @param {string} model - OpenAI model name (ignored if useLocal is true)
 * @param {boolean} useLocal - Whether to use local Ollama instead of OpenAI
 * @param {string} localModel - Which local model to use (llama3, qwen2, etc.)
 */
export const generateContent = async (prompt, model = "gpt-4o-mini", useLocal = false, localModel = "llama3") => {
    // If local mode is enabled, use Ollama
    if (useLocal) {
        try {
            console.log(`🏠 Using local Ollama model: ${localModel}...`);
            const response = await generateWithLocal(prompt, {
                model: localModel,
                temperature: 0.7,
                maxTokens: 2000,
            });

            // Try to parse as JSON
            try {
                return parseJSONResponse(response);
            } catch (e) {
                console.warn("Could not parse JSON from local model, returning raw text", e);
                return response;
            }
        } catch (error) {
            console.error("Local LLM Error:", error);
            throw new Error(`Local model failed: ${error.message}. Make sure Ollama is running (ollama serve)`);
        }
    }

    // Otherwise, use OpenAI (online mode)
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

    if (!apiKey) {
        throw new Error("API Key is not configured. Please set VITE_OPENAI_API_KEY in your .env file or switch to Local mode");
    }

    try {
        console.log(`☁️ Using OpenAI model: ${model}...`);
        const openai = new OpenAI({
            apiKey: apiKey,
            dangerouslyAllowBrowser: true // Required for client-side usage
        });

        const response = await openai.chat.completions.create({
            model: model,
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],
            response_format: { type: "json_object" },
            temperature: 0.7,
        });

        const text = response.choices[0].message.content;

        // Attempt to parse JSON
        try {
            return JSON.parse(text);
        } catch (e) {
            console.warn("Could not parse JSON from response, returning raw text", e);
            return text;
        }

    } catch (error) {
        console.error("OpenAI Error:", error);
        throw new Error(error.message || "Failed to fetch from OpenAI API");
    }
};

/**
 * Check if local model is available
 */
export const checkLocalModelStatus = async () => {
    return await checkOllamaStatus();
};

export default {
    generateContent,
    checkLocalModelStatus,
};
