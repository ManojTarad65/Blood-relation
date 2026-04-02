import { getUserFamilyContext } from '@/lib/ai/prompts';
import { analyzeHealthRisk } from '@/lib/ai/rootconnect-ai';

export async function POST() {
    try {
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

        // Map AI output to Genetic-Risk UI expected schema
        const geneticRisks = [
            ...aiResult.high_risk_conditions.map(c => ({ diseaseName: c, probabilityPercentage: 85, riskFactors: ["Strong family history detected"] })),
            ...aiResult.medium_risk_conditions.map(c => ({ diseaseName: c, probabilityPercentage: 45, riskFactors: ["Moderate hereditary pattern"] })),
            ...aiResult.low_risk_conditions.map(c => ({ diseaseName: c, probabilityPercentage: 15, riskFactors: ["Distant lineage correlation"] }))
        ];

        return Response.json({ geneticRisks });
    } catch (error: any) {
        console.error("Genetic Risk API Error:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}
