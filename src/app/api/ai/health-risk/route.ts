import { analyzeHealthRisk } from "@/lib/ai/health-service"
import { createClient } from "@/lib/supabase/server"

export async function POST() {
    try {
        const supabase = await createClient()

        const { data } = await supabase
            .from("family_members")
            .select("*")

        // Fail Safe: If no family members exist
        if (!data || data.length === 0) {
            return Response.json({
                // Directly matching the UI's variable expectation fallback wrapper
                riskScore: 0,
                confidenceLevel: 'Low',
                detectedDiseases: ["No family data available"],
                recommendations: [],
                summary: "Please add family members first."
            })
        }

        const result = await analyzeHealthRisk(data)

        // Mapping LLM Object properties to what the frontend UI expects (riskScore, detectedDiseases, recommendations, confidenceLevel)
        let riskScore = 20; // Default Low
        let confidenceLevel: 'Low' | 'Medium' | 'High' = 'Low';

        const scores = [
            result.risk_score?.heart_disease,
            result.risk_score?.diabetes,
            result.risk_score?.cancer
        ];

        if (scores.includes("HIGH")) {
            riskScore = 85;
            confidenceLevel = 'High';
        } else if (scores.includes("MEDIUM")) {
            riskScore = 55;
            confidenceLevel = 'Medium';
        }

        return Response.json({
            riskScore,
            confidenceLevel,
            detectedDiseases: result.risk_insights || ["AI could not parse results"],
            recommendations: [
                ...(result.recommended_tests || []),
                ...(result.lifestyle_improvements || [])
            ]
        })

    } catch (e) {
        console.error(e)
        return Response.json({
            error: "Failed to analyze health data"
        }, { status: 500 })
    }
}
