import { generateGeneticTimeline } from "@/lib/ai/genetic-timeline"
import { createClient } from "@/lib/supabase/server"

export async function POST(){

  try{

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

    const {data} = await supabase
      .from("family_members")
      .select("*")

    const timeline = await generateGeneticTimeline(data || [])

    return Response.json(timeline)

  }catch(e){

    return Response.json({
      timeline:[]
    })
  }

}
