import crypto from "crypto"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: Request) {
  const body = await req.json()

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body

  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex")

  if (generated_signature === razorpay_signature) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      await supabase
        .from("users")
        .update({ subscription_tier: "PRO" })
        .eq("id", user.id)
    }

    return Response.json({
      success: true
    })
  }

  return Response.json({
    success: false
  })
}
