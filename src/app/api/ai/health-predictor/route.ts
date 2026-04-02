import { getUserFamilyContext } from '@/lib/ai/prompts';
import { analyzeHealthRisk } from '@/lib/ai/rootconnect-ai';
import { createClient } from '@/lib/supabase/server';

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

        const context = await getUserFamilyContext();

        const familyMedicalHistory = context.members
            .filter((m: any) => m.health_status || m.medical_history)
            .map((m: any) => `${m.relationship_to_user || m.first_name}: ${m.health_status || ''} ${m.medical_history || ''}`)
            .join(' | ');

        const aiResult = await analyzeHealthRisk(
            30,
            "Unknown",
            [],
            familyMedicalHistory || "No significant family medical history documented."
        );

        // Map AI engine output to the UI expected type
        let riskScore = 15; // default low
        let confidenceLevel: 'Low' | 'Medium' | 'High' = 'Low';

        if (aiResult.high_risk_conditions.length > 0) {
            riskScore = 85;
            confidenceLevel = 'High';
        } else if (aiResult.medium_risk_conditions.length > 0) {
            riskScore = 55;
            confidenceLevel = 'Medium';
        } else if (aiResult.low_risk_conditions.length > 0) {
            riskScore = 25;
            confidenceLevel = 'Low';
        }

        const detectedDiseases = [
            ...aiResult.high_risk_conditions,
            ...aiResult.medium_risk_conditions,
            ...aiResult.low_risk_conditions
        ];

        const mappedReport = {
            riskScore,
            detectedDiseases,
            confidenceLevel,
            recommendations: [
                ...aiResult.preventive_actions,
                ...aiResult.recommended_tests.map(t => `Recommend screening: ${t}`)
            ]
        };

        return Response.json(mappedReport);
    } catch (error: any) {
        console.error("Health Predictor API Error:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}
