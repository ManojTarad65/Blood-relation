import { geminiPro } from '@/lib/ai/gemini';
import { SchemaType } from '@google/generative-ai';
import { AI_SYSTEM_PROMPTS, getUserFamilyContext } from '@/lib/ai/prompts';

export async function POST(req: Request) {
    try {
        const context = await getUserFamilyContext();

        const contextStr = `
Family Members: ${JSON.stringify(context.members)}
`;

        const systemPrompt = `${AI_SYSTEM_PROMPTS.medicalAdvisor}\n\nUser's Family Context:\n${contextStr}`;

        const result = await geminiPro.generateContent({
            contents: [{ role: 'user', parts: [{ text: "Provide medical advice based on the provided family health history." }] }],
            systemInstruction: systemPrompt,
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: SchemaType.OBJECT,
                    properties: {
                        healthAdvice: { type: SchemaType.STRING, description: "General health advice based on family history." },
                        recommendedTests: {
                            type: SchemaType.ARRAY,
                            description: "Potential medical tests to consider.",
                            items: { type: SchemaType.STRING }
                        },
                        lifestyleRecommendations: {
                            type: SchemaType.ARRAY,
                            description: "Lifestyle improvements (diet, exercise, etc.).",
                            items: { type: SchemaType.STRING }
                        }
                    },
                    required: ["healthAdvice", "recommendedTests", "lifestyleRecommendations"]
                }
            }
        });

        const outputText = result.response.text();
        return Response.json(JSON.parse(outputText));
    } catch (error: any) {
        console.error("Medical Advisor API Error:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}
