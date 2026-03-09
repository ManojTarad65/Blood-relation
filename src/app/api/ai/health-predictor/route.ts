import { getUserFamilyContext } from '@/lib/ai/prompts';
import { analyzeFamilyHealthRisk } from '@/lib/ai/rootconnect-ai';

export async function POST() {
    try {
        const context = await getUserFamilyContext();

        const contextStr = `
Family Members: ${JSON.stringify(context.members)}
`;

        const healthReport = await analyzeFamilyHealthRisk(contextStr);

        return Response.json(healthReport);
    } catch (error: any) {
        console.error("Health Predictor API Error:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}
