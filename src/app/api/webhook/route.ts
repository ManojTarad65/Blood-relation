import crypto from "crypto";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
    try {
        const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

        if (!secret) {
            console.warn("RAZORPAY_WEBHOOK_SECRET is not defined in environment variables");
            return new NextResponse("Server Configuration Error", { status: 500 });
        }

        const body = await req.text();
        const signature = req.headers.get("x-razorpay-signature");

        if (!signature) {
            return new NextResponse("Missing signature", { status: 400 });
        }

        const expected = crypto
            .createHmac("sha256", secret)
            .update(body)
            .digest("hex");

        if (expected === signature) {
            console.log("Payment verified");

            const event = JSON.parse(body);
            const payment = event.payload.payment.entity;
            const userId = payment.notes?.userId;

            // Using standard Supabase JS Client directly, as Webhooks do not carry cookies
            const supabase = createClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
            );

            if (event.event === "payment.captured") {
                console.log("Processing payment.captured event:", payment.id);

                if (userId) {
                    // --- PREVENT DUPLICATES ---
                    const { data: existingPayment } = await supabase
                        .from("payments")
                        .select("id")
                        .eq("payment_id", payment.id)
                        .single();

                    if (existingPayment) {
                        console.warn("Duplicate webhook signature. Payment already captured:", payment.id);
                        return new NextResponse("OK", { status: 200 });
                    }

                    // Update User subscription
                    const { error: userError } = await supabase
                        .from("users")
                        .update({ 
                            subscription_tier: "PRO",
                            is_premium: true
                        })
                        .eq("id", userId);

                    if (userError) {
                        console.error("Failed to update user premium status:", userError);
                    } else {
                        console.log("User premium status updated successfully:", userId);
                    }

                    // Log Payment Record
                    const { error: paymentError } = await supabase
                        .from("payments")
                        .insert([{
                            payment_id: payment.id,
                            user_id: userId,
                            amount: payment.amount,
                            status: "success",
                            created_at: new Date().toISOString()
                        }]);

                    if (paymentError) console.error("Failed to log success payment:", paymentError);
                }
            }

            if (event.event === "payment.failed") {
                console.log("Processing payment.failed event:", payment.id);
                
                if (userId) {
                    // Log Failed Payment Record
                    const { error: paymentError } = await supabase
                        .from("payments")
                        .insert([{
                            payment_id: payment.id,
                            user_id: userId,
                            amount: payment.amount,
                            status: "failed",
                            created_at: new Date().toISOString()
                        }]);

                    if (paymentError) console.error("Failed to log failed payment:", paymentError);
                }
            }

            return new NextResponse("OK", { status: 200 });
        } else {
            return new NextResponse("Invalid signature", { status: 400 });
        }
    } catch (error) {
        console.error("Webhook processing error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
