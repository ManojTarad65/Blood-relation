import { geminiPro } from '@/lib/ai/gemini';
import { SchemaType } from '@google/generative-ai';
import { AI_SYSTEM_PROMPTS, getUserFamilyContext } from '@/lib/ai/prompts';

export async function POST(req: Request) {
    try {
        const context = await getUserFamilyContext();

        const contextStr = `
Family Members: ${JSON.stringify(context.members)}
`;

        const systemPrompt = `${AI_SYSTEM_PROMPTS.healthPredictor} \n\nUser's Family Context:\n${contextStr}`;

        const result = await geminiPro.generateContent({
            contents: [{ role: 'user', parts: [{ text: "Analyze the family health history and provide a health prediction report." }] }],
            systemInstruction: systemPrompt,
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: SchemaType.OBJECT,
                    properties: {
                        riskScore: { type: SchemaType.NUMBER, description: "A score between 0 and 100 representing overall hereditary health risk." },
                        detectedDiseases: {
                            type: SchemaType.ARRAY,
                            description: "List of diseases detected or inferred from family history.",
                            items: { type: SchemaType.STRING }
                        },
                        confidenceLevel: {
                            type: SchemaType.STRING,
                            description: "Confidence level in the prediction (Low, Medium, High).",
                        },
                        recommendations: {
                            type: SchemaType.ARRAY,
                            description: "Actionable health recommendations.",
                            items: { type: SchemaType.STRING }
                        }
                    },
                    required: ["riskScore", "detectedDiseases", "confidenceLevel", "recommendations"]
                }
            }
        });

        const outputText = result.response.text();
        return Response.json(JSON.parse(outputText));
    } catch (error: any) {
        console.error("Health Predictor API Error:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}
