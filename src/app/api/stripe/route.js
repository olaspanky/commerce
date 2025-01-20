import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

console.log("Stripe Secret Key from env:", process.env.STRIPE_SECRET_KEY); // Debugging line

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export async function POST(req) {
  const { data } = await req.json();
  const { amount } = data;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100,
      currency: "USD",
    });

    return new NextResponse(paymentIntent.client_secret, { status: 200 });
  } catch (error) {
    return new NextResponse(error, {
      status: 400,
    });
  }
}

