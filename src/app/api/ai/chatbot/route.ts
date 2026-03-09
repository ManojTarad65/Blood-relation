import { getUserFamilyContext } from '@/lib/ai/prompts';
import { ancestryChat } from '@/lib/ai/rootconnect-ai';

export async function POST(req: Request) {
    try {
        const { message } = await req.json();

        // Feed the unified user records into the AI Brain
        const context = await getUserFamilyContext();
        const contextStr = `
Family Trees: ${JSON.stringify(context.trees)}
Family Members: ${JSON.stringify(context.members)}
Memories: ${JSON.stringify(context.memories)}
`;

        const resultText = await ancestryChat(message, contextStr);

        return Response.json({
            reply: resultText
        });
    } catch (error) {
        console.error("Central AI Chatbot Error:", error);
        return Response.json({
            reply: "AI Intelligence Engine temporarily unavailable."
        });
    }
}