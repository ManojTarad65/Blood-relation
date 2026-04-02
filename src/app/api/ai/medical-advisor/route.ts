import { generateMedicalAdvice } from "@/lib/ai/health-service"
import { createClient } from "@/lib/supabase/server"

export async function POST() {
    try {
        const supabase = await createClient()

        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) {
          return Response.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { data: profile } = await supabase
          .from("users")
          .select("subscription_tier")
          .eq("id", user.id)
          .single()

        if (profile?.subscription_tier !== "PRO" && profile?.subscription_tier !== "premium") {
          return Response.json({ error: "Requires PRO subscription." }, { status: 403 })
        }

        const { data } = await supabase
            .from("family_members")
            .select("*")

        // Fail Safe: If no family members exist
        if (!data || data.length === 0) {
            // Mapping straight to the UI's existing state layout to prevent crashes
            const fallbackAdvice = `Insights:\n• No family data available\n\nStrategy:\n• N/A\n\nPlease add family members first.`;
            return Response.json({
                healthAdvice: fallbackAdvice,
                recommendedTests: [],
                lifestyleRecommendations: []
            })
        }

        const result = await generateMedicalAdvice(data)

        // Mapping AI output safely into UI expected variables: healthAdvice, recommendedTests, lifestyleRecommendations
        const insights = result.risk_insights ? `Insights:\n${result.risk_insights.map((i: string) => `• ${i}`).join('\n')}` : '';
        const strategy = result.preventive_strategy ? `Prevention Strategy:\n${result.preventive_strategy.map((i: string) => `• ${i}`).join('\n')}` : '';
        const summary = result.summary || '';

        const combinedAdvice = `${insights}\n\n${strategy}\n\n${summary}`.trim();

        return Response.json({
            healthAdvice: combinedAdvice,
            recommendedTests: result.recommended_tests || [],
            lifestyleRecommendations: result.lifestyle_improvements || []
        })

    } catch (e) {
        console.error(e)
        return Response.json({
            error: "Failed to generate medical advice"
        }, { status: 500 })
    }
}
