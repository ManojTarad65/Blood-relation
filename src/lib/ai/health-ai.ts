import { generateText } from "ai"
import { groq } from "@/lib/ai/groq"

export async function analyzeHealthRisk(familyMembers: any) {

    const prompt = `
You are a medical AI that analyzes hereditary health risks.

Family Data:
${JSON.stringify(familyMembers)}

Return JSON only:

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

Risk score must be LOW / MEDIUM / HIGH.
Focus on hereditary patterns.
Keep responses short.
`

    const result = await generateText({
        model: groq("llama-3.3-70b-versatile"),
        prompt
    })

    return JSON.parse(result.text)
}

export async function generateMedicalAdvice(familyMembers: any) {

    const prompt = `
You are an AI medical advisor.

Based on this family health data:

${JSON.stringify(familyMembers)}

Generate preventive advice.

Return JSON only:

{
"risk_insights": [],
"recommended_tests": [],
"lifestyle_improvements": [],
"preventive_strategy": [],
"summary": ""
}

Keep answers short and structured.
`

    const result = await generateText({
        model: groq("llama-3.3-70b-versatile"),
        prompt
    })

    return JSON.parse(result.text)
}
