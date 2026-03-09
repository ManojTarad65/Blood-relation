import { getUserFamilyContext } from '@/lib/ai/prompts';
import { genealogyInsights } from '@/lib/ai/rootconnect-ai';

export async function POST() {
    try {
        const context = await getUserFamilyContext();

        const contextStr = `
Family Trees: ${JSON.stringify(context.trees)}
Family Members: ${JSON.stringify(context.members)}
`;

        const genealogyReport = await genealogyInsights(contextStr);

        return Response.json(genealogyReport);
    } catch (error: any) {
        console.error("Relationship Predictor API Error:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}
