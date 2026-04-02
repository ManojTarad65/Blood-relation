import { razorpay } from "@/lib/razorpay"

export async function POST() {
  try {
    const order = await razorpay.orders.create({
      amount: 19900,
      currency: "INR",
      receipt: "rcpt_rootconnect"
    })

    return Response.json(order)
  } catch (err) {
    console.error("ORDER ERROR", err)
    return Response.json(
      { error: "Order creation failed" },
      { status: 500 }
    )
  }
}
