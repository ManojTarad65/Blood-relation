import { geminiFlash } from '@/lib/ai/gemini';
import { SchemaType } from '@google/generative-ai';
import { AI_SYSTEM_PROMPTS, getUserFamilyContext } from '@/lib/ai/prompts';

export async function POST(req: Request) {
    try {
        const context = await getUserFamilyContext();

        const contextStr = `
Family Trees: ${JSON.stringify(context.trees)}
Family Members: ${JSON.stringify(context.members)}
`;

        const systemPrompt = `${AI_SYSTEM_PROMPTS.relationshipPredictor}\n\nUser's Family Context:\n${contextStr}`;

        const result = await geminiFlash.generateContent({
            contents: [{ role: 'user', parts: [{ text: "Analyze the family tree nodes and data to suggest missing relationships." }] }],
            systemInstruction: systemPrompt,
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: SchemaType.OBJECT,
                    properties: {
                        suggestedRelationships: {
                            type: SchemaType.ARRAY,
                            description: "List of possible missing relationships.",
                            items: {
                                type: SchemaType.OBJECT,
                                properties: {
                                    personA: { type: SchemaType.STRING },
                                    personB: { type: SchemaType.STRING },
                                    relationshipType: { type: SchemaType.STRING },
                                    confidence: { type: SchemaType.NUMBER, description: "Confidence percentage 0-100." },
                                    reasoning: { type: SchemaType.STRING, description: "Explanation of why this relationship is suggested." }
                                },
                                required: ["personA", "personB", "relationshipType", "confidence", "reasoning"]
                            }
                        }
                    },
                    required: ["suggestedRelationships"]
                }
            }
        });

        const outputText = result.response.text();
        return Response.json(JSON.parse(outputText));
    } catch (error: any) {
        console.error("Relationship Predictor API Error:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}
