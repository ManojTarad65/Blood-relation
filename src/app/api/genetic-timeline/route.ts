import Groq from "groq-sdk";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { familyData } = body;

        if (!familyData || !Array.isArray(familyData)) {
            return NextResponse.json({ error: "Missing or invalid familyData" }, { status: 400 });
        }

        const groq = new Groq({
            apiKey: process.env.GROQ_API_KEY,
        });

        const completion = await groq.chat.completions.create({
            model: "mixtral-8x7b-32768",
            response_format: { type: "json_object" },
            messages: [
                {
                    role: "system",
                    content: "You are a genetic health expert. Generate structured timeline by age groups. Return response strictly in JSON format with this exact structure: { \"timeline\": [ { \"ageRange\": \"0-18\", \"risks\": [\"Low immunity\"], \"advice\": \"Regular checkups\" } ] }"
                },
                {
                    role: "user",
                    content: JSON.stringify(familyData)
                }
            ],
        });

        const output = completion.choices[0]?.message?.content || "{}";
        
        // Parse the Groq output back into a JSON object to prevent stringification issues on frontend
        const parsedOutput = JSON.parse(output);

        // If the model didn't wrap it in a 'timeline' key, wrap it safely to match frontend expectations
        if (!parsedOutput.timeline && Array.isArray(parsedOutput)) {
            return NextResponse.json({ timeline: parsedOutput });
        }

        return NextResponse.json(parsedOutput);

    } catch (error: any) {
        console.error("Timeline API Error:", error);
        return NextResponse.json({ error: "Failed to generate timeline" }, { status: 500 });
    }
}
