
import { TERRAFORM_SYSTEM_PROMPT } from '../constants';

// Warn if environment variables are missing at startup
if (!process.env.AZURE_OPENAI_API_KEY) {
    console.warn("AZURE_OPENAI_API_KEY environment variable not set. Azure service will be unavailable.");
}
if (!process.env.AZURE_OPENAI_ENDPOINT) {
    console.warn("AZURE_OPENAI_ENDPOINT environment variable not set. Azure service will be unavailable.");
}
if (!process.env.AZURE_OPENAI_DEPLOYMENT_NAME) {
    console.warn("AZURE_OPENAI_DEPLOYMENT_NAME environment variable not set. Azure service will be unavailable.");
}

/**
 * Generates a Terraform script using Azure OpenAI's streaming chat completions.
 * This async generator function mimics the behavior of the Google GenAI SDK's stream,
 * yielding chunks with a `text` property.
 * @param {string} prompt The user's prompt.
 * @returns {AsyncGenerator<{ text: string }>} An async generator yielding text chunks.
 */
export async function* generateTerraformScriptStreamWithAzure(prompt: string) {
    const apiKey = process.env.AZURE_OPENAI_API_KEY;
    const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
    const deployment = process.env.AZURE_OPENAI_DEPLOYMENT_NAME;

    if (!apiKey || !endpoint || !deployment) {
        throw new Error("Azure OpenAI environment variables are not properly configured.");
    }
    
    // The API version is often required as a query parameter
    const url = `${endpoint}/openai/deployments/${deployment}/chat/completions?api-version=2024-02-15-preview`;

    const requestBody = {
        messages: [
            { role: "system", content: TERRAFORM_SYSTEM_PROMPT },
            { role: "user", content: prompt }
        ],
        stream: true,
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key': apiKey,
        },
        body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        console.error("Error from Azure OpenAI:", response.status, errorBody);
        throw new Error(`Failed to communicate with Azure OpenAI model. Status: ${response.status}`);
    }

    if (!response.body) {
        throw new Error("Response body is null");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
        const { done, value } = await reader.read();
        if (done) {
            break;
        }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // Keep the last partial line in the buffer

        for (const line of lines) {
            if (line.startsWith('data: ')) {
                const dataStr = line.substring(6);
                if (dataStr.trim() === '[DONE]') {
                    return;
                }
                try {
                    const data = JSON.parse(dataStr);
                    const content = data.choices?.[0]?.delta?.content;
                    if (content) {
                        // Yield an object that matches the Gemini SDK chunk structure for compatibility
                        yield { text: content };
                    }
                } catch (e) {
                    console.error('Failed to parse stream data chunk:', dataStr, e);
                }
            }
        }
    }
}
