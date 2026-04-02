import { getUserFamilyContext } from '@/lib/ai/prompts';
import { ancestryChat } from '@/lib/ai/rootconnect-ai';

export async function POST(req: Request) {
    try {
        const { message } = await req.json();

        // Feed the unified user records into the AI Brain
        const context = await getUserFamilyContext();

        const contextStr = `
Family Trees Context: ${JSON.stringify(context.trees)}
Family Members Detail: ${JSON.stringify(context.members.map((m: any) => ({
            name: m.first_name,
            surname: m.last_name,
            birth_year: m.birth_year,
            death_year: m.death_year,
            gender: m.gender,
            location: m.birth_place
        })))}
Memories & Stories Context: ${JSON.stringify(context.memories)}
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