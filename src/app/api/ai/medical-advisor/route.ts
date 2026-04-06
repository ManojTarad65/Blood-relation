import { createClient } from "@/lib/supabase/server"

export async function POST(req: Request) {
    try {
        const supabase = await createClient()

        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          return Response.json({ advice: "Unauthorized" }, { status: 401 })
        }

        const { data: profile } = await supabase
          .from("users")
          .select("subscription_tier")
          .eq("id", user.id)
          .single()

        if (profile?.subscription_tier !== "PRO" && profile?.subscription_tier !== "premium") {
          return Response.json({ advice: "Requires PRO subscription." }, { status: 403 })
        }

        const { familyData } = await req.json();

        // Fail Safe: If no family members exist
        if (!familyData || familyData.length === 0) {
            return Response.json({
                advice: "No family data found"
            })
        }

        let advice = "";

        try {
            // PRIMARY AI (Gemini)
            const response = await fetch("https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=" + process.env.GEMINI_API_KEY, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `Give medical advice based on this family history. Provide clear sections for General Advice, Screenings, and Lifestyle. Keep it readable plain text or markdown without complex formatting. History: ${JSON.stringify(familyData)}`
                        }]
                    }]
                }),
            });

            const data = await response.json();
            advice = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        } catch (err) {
            console.log("Gemini failed, using fallback...");
        }

        // 🔥 FALLBACK (IMPORTANT)
        if (!advice) {
            advice = generateFallbackAdvice(familyData);
        }

        return Response.json({ advice });

    } catch (error) {
        console.error(error)
        return Response.json({
            advice: "AI insights are currently limited. Showing general recommendations: Maintain a balanced diet, exercise regularly, and consult a doctor for personalized care."
        })
    }
}

function generateFallbackAdvice(data: any) {
  return `General Health Suggestions:
- Maintain regular health checkups
- Focus on diet and exercise
- Monitor family risk factors
- Stay hydrated and sleep well

(Advanced AI insights temporarily unavailable)
`;
}
