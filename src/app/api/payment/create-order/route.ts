import Razorpay from "razorpay"
import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID as string,
      key_secret: process.env.RAZORPAY_KEY_SECRET as string
    })

    const order = await razorpay.orders.create({
      amount: 19900, // Amount in paise
      currency: "INR",
      receipt: "rcpt_" + user.id.slice(0, 10),
      notes: {
        userId: user.id
      }
    })

    return NextResponse.json(order)
  } catch (err) {
    console.error("ORDER ERROR:", err)
    return NextResponse.json(
      { error: "Order creation failed" },
      { status: 500 }
    )
  }
}
