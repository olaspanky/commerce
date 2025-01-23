
import { MongoClient } from 'mongodb';
import Stripe from 'stripe';
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    // Parse the request body
    const { email, plan } = await request.json();

    // Validate required fields
    if (!email || !plan) {
      return NextResponse.json(
        { success: false, error: 'Email and plan are required' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();

    try {
      // Generate a unique token
      const token = Math.random().toString(36).substr(2, 10);

      // Determine the number of reports based on the plan
      let reportsAllowed;
      switch (plan.toString()) {
        case '20':
          reportsAllowed = 1;
          break;
        case '30':
          reportsAllowed = 2;
          break;
        case '50':
          reportsAllowed = 4;
          break;
        default:
          throw new Error('Invalid plan');
      }

      // Save the subscription to the database
      await db.collection('subscriptions').insertOne({
        email,
        token,
        reportsAllowed,
        reportsUsed: 0,
        createdAt: new Date(),
      });

      // Configure email transport
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: "pbrmarketintellligencereport@gmail.com",
          pass: "aasl uuwn lmrw dsvl",
        },
      });

      // Setup email options
      const mailOptions = {
        from: "pbrmarketintellligencereport@gmail.com",
        to: email,
        subject: 'Your Subscription Token',
        text: `Your token is: ${token}. You can use this token to download your reports.`,
      };

      // Send the email
      await transporter.sendMail(mailOptions);

      return NextResponse.json({ success: true, token }, { status: 200 });
    } finally {
      // Always close the MongoDB connection
      await client.close();
    }
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}