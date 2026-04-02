import { generateText } from "ai"
import { groq } from "@/lib/ai/groq"

export async function analyzeHealthRisk(members: any) {

    const prompt = `
You are a medical AI analyzing hereditary disease risks.

Family members data:
${JSON.stringify(members)}

Return JSON:

{
"risk_insights": [],
"recommended_tests": [],
"lifestyle_improvements": [],
"risk_score": {
"heart_disease":"",
"diabetes":"",
"cancer":""
},
"summary":""
}
`

    const result = await generateText({
        model: groq("llama-3.3-70b-versatile"),
        prompt
    })

    try {
        return JSON.parse(result.text)
    } catch {
        return {
            risk_insights: ["AI could not parse results"],
            recommended_tests: [],
            lifestyle_improvements: [],
            summary: "No data available"
        }
    }

}

export async function generateMedicalAdvice(members: any) {

    const prompt = `
You are an AI medical advisor.

Family health data:
${JSON.stringify(members)}

Generate preventive advice.

Return JSON:

{
"risk_insights":[],
"recommended_tests":[],
"lifestyle_improvements":[],
"preventive_strategy":[],
"summary":""
}
`

    const result = await generateText({
        model: groq("llama-3.3-70b-versatile"),
        prompt
    })

    try {
        return JSON.parse(result.text)
    } catch {
        return {
            risk_insights: ["AI could not parse results"],
            recommended_tests: [],
            lifestyle_improvements: [],
            summary: "No advice generated"
        }
    }

}
