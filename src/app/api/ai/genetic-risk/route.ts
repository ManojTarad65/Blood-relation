import { geminiPro } from '@/lib/ai/gemini';
import { SchemaType } from '@google/generative-ai';
import { AI_SYSTEM_PROMPTS, getUserFamilyContext } from '@/lib/ai/prompts';

export async function POST(req: Request) {
    try {
        const context = await getUserFamilyContext();

        // Convert context to a formatted string
        const contextStr = `
Family Members: ${JSON.stringify(context.members)}
`;

        const systemPrompt = `${AI_SYSTEM_PROMPTS.geneticRisk} \n\nUser's Family Context:\n${contextStr}`;

        const result = await geminiPro.generateContent({
            contents: [{ role: 'user', parts: [{ text: "Calculate probabilities of genetic diseases based on the family lineage." }] }],
            systemInstruction: systemPrompt,
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: SchemaType.OBJECT,
                    properties: {
                        geneticRisks: {
                            type: SchemaType.ARRAY,
                            description: "List of calculated genetic risks.",
                            items: {
                                type: SchemaType.OBJECT,
                                properties: {
                                    diseaseName: { type: SchemaType.STRING },
                                    probabilityPercentage: { type: SchemaType.NUMBER, description: "Estimated probability percentage." },
                                    riskFactors: {
                                        type: SchemaType.ARRAY,
                                        description: "List of specific risk factors contributing to this probability.",
                                        items: { type: SchemaType.STRING }
                                    }
                                },
                                required: ["diseaseName", "probabilityPercentage", "riskFactors"]
                            }
                        }
                    },
                    required: ["geneticRisks"]
                }
            }
        });

        const outputText = result.response.text();
        return Response.json(JSON.parse(outputText));
    } catch (error: any) {
        console.error("Genetic Risk API Error:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}
