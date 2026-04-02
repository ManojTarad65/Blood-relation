import { generateText } from "ai"
import { groq } from "@/lib/ai/groq"

export async function generateGeneticTimeline(members:any) {

  const prompt = `
  You are an AI genetic risk analysis engine.

  Family health data:

  ${JSON.stringify(members)}

  Predict how hereditary disease risk evolves across age groups.

  Return ONLY JSON.

  Format:

  {
    "timeline":[
      {
        "age":30,
        "risk":"LOW",
        "insight":"Low hereditary disease probability."
      },
      {
        "age":40,
        "risk":"MEDIUM",
        "insight":"Diabetes risk may increase due to family history."
      },
      {
        "age":50,
        "risk":"MEDIUM",
        "insight":"Cardiovascular monitoring recommended."
      },
      {
        "age":60,
        "risk":"HIGH",
        "insight":"High risk of heart disease based on genetic history."
      }
    ]
  }

  Rules:

  • Always return valid JSON
  • Risk values must be LOW MEDIUM or HIGH
  • If family data is empty assume LOW risk
  `

  const result = await generateText({
    model: groq("llama-3.3-70b-versatile"),
    prompt
  })

  try{
    return JSON.parse(result.text)
  }catch{
    return {
      timeline:[
        {age:30,risk:"LOW",insight:"No hereditary risk detected"},
        {age:40,risk:"LOW",insight:"Preventive health recommended"},
        {age:50,risk:"LOW",insight:"Routine screening advised"},
        {age:60,risk:"LOW",insight:"Maintain healthy lifestyle"}
      ]
    }
  }

}
