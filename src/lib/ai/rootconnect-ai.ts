import { generateText, generateObject } from "ai";
import { groq } from "@/lib/ai/groq";
import { z } from "zod";

// RootConnect Central Intelligence Engine
const AI_MODEL = groq("llama-3.3-70b-versatile");

// 1. Health Risk Predictor
export async function analyzeHealthRisk(
    age: number,
    gender: string,
    knownDiseases: string[],
    familyMedicalHistory: string
) {
    const systemPrompt = `You are the RootConnect AI Health Predictor. Analyze the provided health records and family medical history to detect hereditary patterns and calculate potential health risks.
DISCLAIMER: This analysis is informational only and not a substitute for professional medical advice. Always consult a certified doctor before acting.

Patient Data:
Age: ${age}
Gender: ${gender}
Known Diseases: ${knownDiseases.join(', ') || 'None'}

Family Medical History Context:
${familyMedicalHistory}`;

    const { object } = await generateObject({
        model: AI_MODEL,
        system: systemPrompt,
        schema: z.object({
            high_risk_conditions: z.array(z.string()).describe("Conditions with strong hereditary flags"),
            medium_risk_conditions: z.array(z.string()).describe("Conditions with moderate risk"),
            low_risk_conditions: z.array(z.string()).describe("Conditions with minimal risk"),
            recommended_tests: z.array(z.string()).describe("Suggested medical screenings based on risks"),
            preventive_actions: z.array(z.string()).describe("Lifestyle actions to mitigate identified risks")
        }),
        messages: [{ role: "user", content: "Analyze my family health history and provide a risk prediction." }],
    });

    return object;
}

// 2. Medical Advisor AI
export async function medicalAdvisor(
    symptoms: string,
    age: number,
    gender: string,
    familyMedicalHistory: string
) {
    const systemPrompt = `You are the RootConnect AI Medical Advisor. Based on the provided symptoms, age, gender, and family medical history, offer general health advice, recommend potential medical tests, and suggest lifestyle improvements.
DISCLAIMER: This analysis is informational only and not a substitute for professional medical advice. Always consult a certified doctor before acting.

Patient Data:
Age: ${age}
Gender: ${gender}
Symptoms: ${symptoms}

Family Medical History Context:
${familyMedicalHistory}`;

    const { object } = await generateObject({
        model: AI_MODEL,
        system: systemPrompt,
        schema: z.object({
            possible_causes: z.array(z.string()).describe("Potential underlying causes for the symptoms"),
            preventive_suggestions: z.array(z.string()).describe("Steps to mitigate symptoms or prevent worsening"),
            lifestyle_advice: z.array(z.string()).describe("Diet, exercise, or habit changes"),
            when_to_consult: z.string().describe("Advice on when and what type of specialist to see")
        }),
        messages: [{ role: "user", content: "Provide medical advice based on my symptoms and family history." }],
    });

    return object;
}

// 3. Genealogy Intelligence
export async function genealogyInsights(
    familyTreeData: string,
    locations: string[],
    generations: number,
    surnames: string[]
) {
    const systemPrompt = `You are the RootConnect AI Genealogy Intelligence System. Analyze the provided family tree data, generations, locations, and surnames.
Focus strictly on lineage patterns, migration history, potential unknown relatives or gaps, and cultural origin insights.

Family Data:
Generations Logged: ${generations}
Key Locations: ${locations.join(', ') || 'N/A'}
Surnames: ${surnames.join(', ') || 'N/A'}

Tree & Member Context:
${familyTreeData}`;

    const { object } = await generateObject({
        model: AI_MODEL,
        system: systemPrompt,
        schema: z.object({
            lineage_patterns: z.array(z.string()).describe("Naming conventions, lifespan trends, or common professions identified"),
            migration_history: z.array(z.string()).describe("Geographic movement and settlements across generations"),
            potential_unknown_relatives: z.array(z.string()).describe("Suggestions on missing branches or relationships to investigate"),
            cultural_origin_insights: z.array(z.string()).describe("Historical or cultural background of the family surnames and locations")
        }),
        messages: [{ role: "user", content: "Provide deep genealogy insights on my family tree." }],
    });

    return object;
}

// 4. Cultural Archive AI
export async function culturalArchiveInsights(
    familyStories: string[],
    imageMetadata: string[],
    traditions: string[],
    locations: string[]
) {
    const systemPrompt = `You are the RootConnect AI Cultural Archive System. Analyze the provided family stories, uploaded image metadata, traditions, and locations.
Provide a rich summary of the family's cultural heritage, highlighting preserved traditions and organizing a generational story timeline.

Data Provided:
Locations: ${locations.join(', ') || 'N/A'}
Traditions: ${traditions.join(', ') || 'N/A'}
Image Metadata: ${imageMetadata.join('; ') || 'N/A'}

Family Stories & Memories:
${familyStories.join('\n\n') || 'N/A'}`;

    const { object } = await generateObject({
        model: AI_MODEL,
        system: systemPrompt,
        schema: z.object({
            cultural_heritage_summary: z.string().describe("A broad summary of the family's observed culture based on the archives"),
            preserved_traditions: z.array(z.string()).describe("Specific traditions or customs identified from the stories and images"),
            generational_story_timeline: z.array(z.string()).describe("A chronological breakdown of major family life events or stories")
        }),
        messages: [{ role: "user", content: "Analyze my cultural archive and memories." }],
    });

    return object;
}

// 5. Central AI Engine (Chatbot Gateway)
export async function ancestryChat(userMessage: string, familyContextStr: string) {
    const systemPrompt = `You are "RootConnect AI Family Intelligence System". 
Your main capabilities are:
- Answer genealogy questions
- Analyze family history
- Detect hereditary health risks
- Explain cultural heritage
- Provide medical prevention suggestions
- Explain family lineage patterns

Use the provided family_trees, family_members, and memories context to answer the user's questions intelligently and specifically referencing their data.

Guidelines for Response Formatting:
- Be more conversational and friendly in tone.
- Use short, structured paragraphs.
- Heavily use bullet lists for insights to make them readable.
- Provide clear explanations.
- Avoid generic LLM responses. Reference the user's provided family data directly if applicable.
- If asked for medical advice, include a brief medical disclaimer reminding them you are an AI.

User's Family Context:
${familyContextStr}`;

    const result = await generateText({
        model: AI_MODEL,
        system: systemPrompt,
        messages: [{ role: "user", content: userMessage }],
    });

    return result.text;
}
