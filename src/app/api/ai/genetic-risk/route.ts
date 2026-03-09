import { getUserFamilyContext } from '@/lib/ai/prompts';
import { predictGeneticRisks } from '@/lib/ai/rootconnect-ai';

export async function POST() {
    try {
        const context = await getUserFamilyContext();

        // Convert context to a formatted string
        const contextStr = `
Family Members: ${JSON.stringify(context.members)}
`;

        const geneticReport = await predictGeneticRisks(contextStr);

        return Response.json(geneticReport);
    } catch (error: any) {
        console.error("Genetic Risk API Error:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}
