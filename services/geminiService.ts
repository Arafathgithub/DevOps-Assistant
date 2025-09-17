
import { GoogleGenAI } from "@google/genai";
import { TERRAFORM_SYSTEM_PROMPT } from '../constants';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateTerraformScriptStream = async (prompt: string) => {
    try {
        const result = await ai.models.generateContentStream({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction: TERRAFORM_SYSTEM_PROMPT,
            },
        });
        return result;
    } catch (error) {
        console.error("Error generating content:", error);
        throw new Error("Failed to communicate with the AI model.");
    }
};