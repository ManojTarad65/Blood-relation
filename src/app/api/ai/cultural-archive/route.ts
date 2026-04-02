import { getUserFamilyContext } from '@/lib/ai/prompts';
import { culturalArchiveInsights } from '@/lib/ai/rootconnect-ai';

export async function POST(req: Request) {
    try {
        const context = await getUserFamilyContext();

        // Extracting relevant context data for Cultural Archive AI
        const locations = [...new Set(context.members.map((m: any) => m.birth_place).filter(Boolean))];

        // Ensure there's a fallback if memories data structure isn't populated smoothly
        const stories = (context.memories || []).map((m: any) => m.content || m.description).filter(Boolean);
        const imageMetadata = (context.memories || []).map((m: any) => m.image_url ? `Image at ${m.location || 'Unknown location'}` : null).filter(Boolean);
        const traditions = (context.memories || []).filter((m: any) => m.type === 'tradition').map((m: any) => m.title);

        const aiResult = await culturalArchiveInsights(
            stories as string[],
            imageMetadata as string[],
            traditions as string[],
            locations as string[]
        );

        return Response.json(aiResult);
    } catch (error: any) {
        console.error("Cultural Archive API Error:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}
