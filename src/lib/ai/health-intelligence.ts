import { generateObject } from "ai"
import { groq } from "@/lib/ai/groq"
import { z } from "zod"

const AI_MODEL = groq("llama-3.3-70b-versatile");

// Health Risk Predictor
export async function analyzeHealthRisk(familyMembersJSON: string) {
    const prompt = `Analyze hereditary health risks based on the following family medical history:

${familyMembersJSON}

Detect possible hereditary conditions.

Return response in this JSON structure:

{
"risk_insights": [],
"recommended_tests": [],
"lifestyle_improvements": [],
"risk_score": {
"heart_disease": "",
"diabetes": "",
"cancer": ""
},
"summary": ""
}

Rules:

• Risk score values must be LOW, MEDIUM, or HIGH
• Keep explanations short
• Focus on hereditary patterns`;

    const { object } = await generateObject({
        model: AI_MODEL,
        schema: z.object({
            risk_insights: z.array(z.string()),
            recommended_tests: z.array(z.string()),
            lifestyle_improvements: z.array(z.string()),
            risk_score: z.object({
                heart_disease: z.enum(["LOW", "MEDIUM", "HIGH"]),
                diabetes: z.enum(["LOW", "MEDIUM", "HIGH"]),
                cancer: z.enum(["LOW", "MEDIUM", "HIGH"])
            }),
            summary: z.string()
        }),
        prompt: prompt
    });

    return object;
}

// Medical Advisor
export async function generateMedicalAdvice(familyMembersJSON: string) {
    const prompt = `You are RootConnect Medical AI.

Based on the following family medical history:

${familyMembersJSON}

Generate preventive medical advice.

Return JSON in this format:

{
"risk_insights": [],
"recommended_tests": [],
"lifestyle_improvements": [],
"preventive_strategy": [],
"summary": ""
}

Rules:

• Provide actionable health recommendations
• Focus on prevention
• Avoid long paragraphs
• Use short bullet insights

Always include medical disclaimer in summary.`;

    const { object } = await generateObject({
        model: AI_MODEL,
        schema: z.object({
            risk_insights: z.array(z.string()),
            recommended_tests: z.array(z.string()),
            lifestyle_improvements: z.array(z.string()),
            preventive_strategy: z.array(z.string()),
            summary: z.string()
        }),
        prompt: prompt
    });

    return object;
}
