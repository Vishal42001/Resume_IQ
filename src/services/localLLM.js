// src/services/localLLM.js
/**
 * Local LLM Service - Direct communication with Ollama
 * Works completely offline, no internet required
 */

const OLLAMA_URL = import.meta.env.VITE_OLLAMA_URL || 'http://localhost:11434';
const DEFAULT_MODEL = import.meta.env.VITE_LOCAL_MODEL || 'llama2';

/**
 * Check if Ollama is running and available
 */
export async function checkOllamaStatus() {
    try {
        const response = await fetch(`${OLLAMA_URL}/api/tags`, {
            method: 'GET',
        });

        if (!response.ok) {
            return { available: false, models: [] };
        }

        const data = await response.json();
        return {
            available: true,
            models: data.models || [],
        };
    } catch (error) {
        console.error('Ollama not available:', error);
        return { available: false, models: [], error: error.message };
    }
}

/**
 * Generate content using local Ollama model
 */
export async function generateWithLocal(prompt, options = {}) {
    const {
        model = DEFAULT_MODEL,
        temperature = 0.7,
        maxTokens = 2000,
    } = options;

    try {
        const response = await fetch(`${OLLAMA_URL}/api/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: model,
                prompt: prompt,
                stream: false,
                options: {
                    temperature: temperature,
                    num_predict: maxTokens,
                },
            }),
        });

        if (!response.ok) {
            throw new Error(`Ollama error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error('Local LLM generation failed:', error);
        throw error;
    }
}

/**
 * Generate content with streaming support
 */
export async function generateWithLocalStream(prompt, onChunk, options = {}) {
    const {
        model = DEFAULT_MODEL,
        temperature = 0.7,
        maxTokens = 2000,
    } = options;

    try {
        const response = await fetch(`${OLLAMA_URL}/api/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: model,
                prompt: prompt,
                stream: true,
                options: {
                    temperature: temperature,
                    num_predict: maxTokens,
                },
            }),
        });

        if (!response.ok) {
            throw new Error(`Ollama error: ${response.statusText}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullResponse = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split('\n').filter(line => line.trim());

            for (const line of lines) {
                try {
                    const json = JSON.parse(line);
                    if (json.response) {
                        fullResponse += json.response;
                        onChunk(json.response);
                    }
                } catch (e) {
                    // Skip invalid JSON lines
                }
            }
        }

        return fullResponse;
    } catch (error) {
        console.error('Local LLM streaming failed:', error);
        throw error;
    }
}

/**
 * Parse JSON response from LLM (handles both clean and messy responses)
 */
export function parseJSONResponse(text) {
    try {
        // Try direct parse first
        return JSON.parse(text);
    } catch (e) {
        // Try to extract JSON from markdown code blocks
        const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[1]);
        }

        // Try to find JSON object in text
        const objectMatch = text.match(/\{[\s\S]*\}/);
        if (objectMatch) {
            return JSON.parse(objectMatch[0]);
        }

        throw new Error('Could not parse JSON from response');
    }
}

export default {
    checkOllamaStatus,
    generateWithLocal,
    generateWithLocalStream,
    parseJSONResponse,
};
