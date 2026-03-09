import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function POST(req: Request) {
    try {
        const { message } = await req.json();

        if (!message) {
            return Response.json({ error: "Message is required" }, { status: 400 });
        }

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash"
        });

        const result = await model.generateContent(message);
        const response = await result.response;

        return Response.json({
            reply: response.text()
        });

    } catch (error) {
        console.error("Gemini API Error:", error);
        return Response.json({ error: "AI service temporarily unavailable." }, { status: 500 });
    }
}
