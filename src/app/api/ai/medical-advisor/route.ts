import { getUserFamilyContext } from '@/lib/ai/prompts';
import { medicalAdvisor } from '@/lib/ai/rootconnect-ai';

export async function POST(req: Request) {
    try {
        const { symptoms = "General Checkup", age = 30, gender = "Unknown" } = await req.json().catch(() => ({}));

        const context = await getUserFamilyContext();

        const contextStr = `
Family Members: ${JSON.stringify(context.members)}
`;

        const advisorReport = await medicalAdvisor(symptoms, age, gender, contextStr);

        return Response.json(advisorReport);
    } catch (error: any) {
        console.error("Medical Advisor API Error:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}
