// app/api/validateToken/route.js
import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
export async function POST(request) {
  try {
    // Parse the JSON body
    const { email, token } = await request.json();

    // Validate required fields
    if (!email || !token) {
      return NextResponse.json(
        { success: false, error: "Email and token are required." },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();

    try {
      // Find the subscription
      const subscription = await db.collection("subscriptions").findOne({
        email,
        token,
      });

      if (!subscription) {
        return NextResponse.json(
          { success: false, error: "Invalid token or email." },
          { status: 404 }
        );
      }

      if (subscription.reportsUsed >= subscription.reportsAllowed) {
        return NextResponse.json(
          { success: false, error: "Token maxed out." },
          { status: 400 }
        );
      }

      // Return the remaining downloads
      return NextResponse.json({
        success: true,
        reportsLeft: subscription.reportsAllowed - subscription.reportsUsed,
      });
    } finally {
      // Ensure the client is closed even if an error occurs
      await client.close();
    }
  } catch (error) {
    console.error('Error in validateToken route:', error);
    return NextResponse.json(
      { success: false, error: "An error occurred." },
      { status: 500 }
    );
  }
}