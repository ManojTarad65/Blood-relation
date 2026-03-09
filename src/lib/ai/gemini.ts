import { GoogleGenerativeAI } from '@google/generative-ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

const apiKey = process.env.GEMINI_API_KEY || '';

if (!apiKey) {
    console.warn("GEMINI_API_KEY is not set in the environment variables.");
}

// System prompts requires official SDK for structured JSON output
export const genAI = new GoogleGenerativeAI(apiKey);
export const geminiPro = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
export const geminiFlash = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Vercel AI SDK provider for streaming features (like the Chatbot)
export const googleAI = createGoogleGenerativeAI({
    apiKey: apiKey,
});
