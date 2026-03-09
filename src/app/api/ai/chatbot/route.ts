import { streamText } from 'ai';
import { googleAI } from '@/lib/ai/gemini';
import { AI_SYSTEM_PROMPTS, getUserFamilyContext } from '@/lib/ai/prompts';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();
        const context = await getUserFamilyContext();

        const contextStr = `
Family Trees: ${JSON.stringify(context.trees)}
Family Members: ${JSON.stringify(context.members)}
Memories: ${JSON.stringify(context.memories)}
`;

        const systemPrompt = `${AI_SYSTEM_PROMPTS.chatbot}\n\nUser's Family Context:\n${contextStr}`;

        const result = streamText({
            model: googleAI('gemini-1.5-flash'),
            system: systemPrompt,
            messages,
        });

        return result.toTextStreamResponse();
    } catch (error: any) {
        console.error("Chatbot API Error:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}
