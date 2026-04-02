import { getUserFamilyContext } from '@/lib/ai/prompts';
import { genealogyInsights } from '@/lib/ai/rootconnect-ai';

export async function POST(req: Request) {
    try {
        const context = await getUserFamilyContext();

        // Extracting required fields from context for Genealogy Insights
        const locations = [...new Set(context.members.map((m: any) => m.birth_place).filter(Boolean))];
        const surnames = [...new Set(context.members.map((m: any) => m.last_name).filter(Boolean))];
        const generations = Math.max(1, new Set(context.members.map((m: any) => m.generation_level || 1)).size);

        const treeDataStr = JSON.stringify(context.trees);

        const aiResult = await genealogyInsights(
            treeDataStr,
            locations as string[],
            generations,
            surnames as string[]
        );

        return Response.json(aiResult);
    } catch (error: any) {
        console.error("Genealogy API Error:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}
