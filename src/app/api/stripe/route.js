import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

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

// import Stripe from "stripe";
// import getRawBody from "raw-body";
// import { Webhook } from "lucide-react";
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// const endpointSecret = process.env.STRIPE_SECRET_KEY

// export const config = {
//     api: {
//         bodyParser: false,
//     }
// }

// export default async function handler(
//     req, res
// ){
//     try{
//         console.log("req.headers", req.header);
//         if (req.method !== "POST")
//         return res.status(405).send("ONLY POST requests Allowed");

//         const sig = req.headers("stripe-signature");
//         const rawBody = await getRawBody(req);

//         let event;

//         try{
//             event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
//         }catch (err){
//             return res.status(400).send(`Webhook Error: ${err.message}`);
//         }

//         console.log("event.type", JSON.stringify(event.type));

//         if (event.type === "checkout.session.completed"){
//             const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
//                 (event.data.object).id,
//                 {
//                     expand: ["line_items"],
//                 }
//             );
//             const lineItems = sessionWithLineItems.line_items;

//             if (!lineItems) return res.status(500).send("internal Server Error");

//             try{
//                 console.log("fulfill the order wity custom logic");
//                 console.log("data", lineItems.data)
//                 console.log("customer email", (event.data.object).customer_details.email)
//                 console.log("created", (event.data.object).created);
//             } catch(error){
//                 console.log("Handling when unable to save an order");
//             }

//         }
//         res.status(200).end();

//     } catch(error){
//         console.error(error);
//         res.status(500).json("internal Server Error")

//     }

// }