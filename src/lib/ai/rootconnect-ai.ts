import { generateText, generateObject } from "ai";
import { groq } from "@/lib/ai/groq";
import { z } from "zod";

// RootConnect Central Intelligence Engine
const AI_MODEL = groq("llama-3.3-70b-versatile");

// 1. Health Risk Predictor
export async function analyzeFamilyHealthRisk(familyContextStr: string) {
    const systemPrompt = `You are the RootConnect AI Health Predictor. Analyze the provided family health history to detect potential hereditary diseases and calculate a risk score.
DISCLAIMER: This analysis is informational only and not a substitute for professional medical advice.

User Family Context:
${familyContextStr}`;

    const { object } = await generateObject({
        model: AI_MODEL,
        system: systemPrompt,
        schema: z.object({
            high_risk_conditions: z.array(z.string()).describe("Conditions with strong hereditary flags"),
            medium_risk_conditions: z.array(z.string()).describe("Conditions with moderate risk"),
            low_risk_conditions: z.array(z.string()).describe("Conditions with minimal risk"),
            recommended_tests: z.array(z.string()).describe("Suggested medical screenings"),
            preventive_actions: z.array(z.string()).describe("Lifestyle actions to mitigate risk")
        }),
        messages: [{ role: "user", content: "Analyze my family health history." }],
    });

    return object;
}

// 2. Medical Advisor
export async function medicalAdvisor(symptoms: string, age: number, gender: string, familyContextStr: string) {
    const systemPrompt = `You are the RootConnect AI Medical Advisor. Based on the provided symptoms, age, gender, and family medical history, offer general health advice, recommend potential medical tests, and suggest lifestyle improvements.
DISCLAIMER: This analysis is informational only and not a substitute for professional medical advice. Always consult a certified doctor before acting.

Patient Data:
Age: ${age}
Gender: ${gender}
Symptoms: ${symptoms}

Family Context:
${familyContextStr}`;

    const { object } = await generateObject({
        model: AI_MODEL,
        system: systemPrompt,
        schema: z.object({
            possible_risks: z.array(z.string()).describe("Potential underlying causes or risks"),
            preventive_advice: z.array(z.string()).describe("Steps to mitigate symptoms"),
            lifestyle_suggestions: z.array(z.string()).describe("Diet. exercise, or habit changes"),
            doctor_consultation_recommendations: z.array(z.string()).describe("When and what type of specialist to see")
        }),
        messages: [{ role: "user", content: "Provide medical advice based on my setup." }],
    });

    return object;
}

// 3. Genealogy Insights
export async function genealogyInsights(familyContextStr: string) {
    const systemPrompt = `You are the RootConnect AI Genealogy Intelligence System. Analyze the provided family tree data, generations, locations, and surnames.
Focus strictly on lineage patterns, migration history, potential missing relative gaps, and cultural heritage insights.

Family Context:
${familyContextStr}`;

    const { object } = await generateObject({
        model: AI_MODEL,
        system: systemPrompt,
        schema: z.object({
            lineage_patterns: z.array(z.string()).describe("Naming conventions, lifespan trends, or common professions"),
            migration_history: z.array(z.string()).describe("Geographic movement across generations"),
            potential_relatives: z.array(z.string()).describe("Suggestions on missing branches to investigate"),
            cultural_heritage_insights: z.array(z.string()).describe("Historical or cultural background of the family surnames and locations")
        }),
        messages: [{ role: "user", content: "Provide deep genealogy insights on my connected tree." }],
    });

    return object;
}

// 4. Cultural Memory Analysis
export async function culturalMemoryAnalysis(familyContextStr: string) {
    const systemPrompt = `You are the RootConnect AI Cultural Archive System. Analyze the provided uploaded stories, photos metadata, locations, and traditions embedded in the user's memories.

Family Context (Focus on Memories):
${familyContextStr}`;

    const { object } = await generateObject({
        model: AI_MODEL,
        system: systemPrompt,
        schema: z.object({
            cultural_summary: z.string().describe("A broad summary of the family's observed culture"),
            preserved_traditions: z.array(z.string()).describe("Specific traditions or events passed down"),
            generational_story_timeline: z.array(z.string()).describe("A chronological breakdown of major family life events")
        }),
        messages: [{ role: "user", content: "Analyze my cultural archive." }],
    });

    return object;
}

// 5. Genetic Risk Prediction
export async function predictGeneticRisks(familyContextStr: string) {
    const systemPrompt = `You are the RootConnect AI Genetic Risk Predictor. Calculate the probability of genetic diseases based on the provided family member health data.
DISCLAIMER: This analysis is informational only and not a substitute for professional medical advice. Always consult a genetic counselor or certified doctor.

Family Context:
${familyContextStr}`;

    const { object } = await generateObject({
        model: AI_MODEL,
        system: systemPrompt,
        schema: z.object({
            geneticRisks: z.array(z.object({
                diseaseName: z.string(),
                probabilityPercentage: z.number().describe("Estimated probability percentage"),
                riskFactors: z.array(z.string()).describe("List of specific risk factors contributing to this probability")
            }))
        }),
        messages: [{ role: "user", content: "Calculate probabilities of genetic diseases based on the family lineage." }],
    });

    return object;
}

// 6. Central AI Chatbot (Gateway)
export async function ancestryChat(userMessage: string, familyContextStr: string) {
    const systemPrompt = `You are the RootConnect AI Ancestry Intelligence System. 
Your goal is to be a multi-purpose intelligence assistant answering genealogy questions, providing health risk insights, summarizing cultural heritage, and recounting family history.
Use the provided family tree data and memories context to answer the user's questions accurately.
Always maintain a respectful, empathetic, and knowledgeable tone.
If the information requested is not present in the context, politely state that you don't have that information.
DISCLAIMER: For any health or medical inquiries, remind the user that this analysis is informational only and not a substitute for professional medical advice.

User's Family Context:
${familyContextStr}`;

    const result = await generateText({
        model: AI_MODEL,
        system: systemPrompt,
        messages: [{ role: "user", content: userMessage }],
    });

    return result.text;
}
