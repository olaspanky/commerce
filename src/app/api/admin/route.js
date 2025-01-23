import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const plans = [
  {
    name: "Basic",
    price: 20,
    reports: 1,
  },
  {
    name: "Standard",
    price: 30,
    reports: 2,
  },
  {
    name: "Professional",
    price: 50,
    reports: 4,
  },
];

export async function GET() {
  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();

    try {
      // Fetch all subscriptions
      const subscriptions = await db.collection("subscriptions").find().toArray();

      // Fetch all report downloads
      const reportDownloads = await db.collection("reportDownloads").find().toArray();

      // Fetch all whitepaper downloads
      const whitepaperDownloads = await db.collection("whitepaperDownloads").find().toArray();

      // Combine the data
      const data = subscriptions.map((subscription) => {
        const downloads = reportDownloads.filter(
          (download) => download.token === subscription.token
        );

        // Determine the plan based on reportsAllowed
        const plan = plans.find((p) => p.reports === subscription.reportsAllowed);

        return {
          email: subscription.email,
          token: subscription.token,
          plan: plan ? plan.name : "Unknown", // Use the plan name
          price: plan ? plan.price : 0, // Use the plan price
          reportsAllowed: subscription.reportsAllowed,
          reportsUsed: subscription.reportsUsed,
          downloads: downloads.map((download) => ({
            reportName: download.reportName,
            reportUrl: download.reportUrl,
            downloadedAt: download.downloadedAt,
          })),
        };
      });

      return NextResponse.json(
        { success: true, data, whitepaperDownloads },
        { status: 200 }
      );
    } finally {
      // Always close the MongoDB connection
      await client.close();
    }
  } catch (error) {
    console.error("Admin dashboard error:", error);
    return NextResponse.json(
      { success: false, error: "An error occurred." },
      { status: 500 }
    );
  }
}