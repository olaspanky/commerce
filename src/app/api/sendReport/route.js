// import { MongoClient } from "mongodb";
// import nodemailer from "nodemailer";
// import { NextResponse } from "next/server";

// export async function POST(request) {
//   try {
//     // Parse the request body
//     const { email, token, reports } = await request.json();

//     // Validate required fields
//     if (!email || !token || !reports || reports.length === 0) {
//       return NextResponse.json(
//         { success: false, error: "Email, token, and reports are required." },
//         { status: 400 }
//       );
//     }

//     // Connect to MongoDB
//     const client = await MongoClient.connect(process.env.MONGODB_URI);
//     const db = client.db();

//     try {
//       // Find the subscription
//       const subscription = await db.collection("subscriptions").findOne({
//         email,
//         token,
//       });

//       if (!subscription) {
//         return NextResponse.json(
//           { success: false, error: "Invalid token or email." },
//           { status: 404 }
//         );
//       }

//       if (subscription.reportsUsed >= subscription.reportsAllowed) {
//         return NextResponse.json(
//           { success: false, error: "Token maxed out." },
//           { status: 400 }
//         );
//       }

//       // Increment the reportsUsed count
//       await db.collection("subscriptions").updateOne(
//         { email, token },
//         { $inc: { reportsUsed: reports.length } } // Increment by the number of reports
//       );

//       // Prepare download links for the email
//       const reportLinks = reports.map((report) => ({
//         name: report.reportName,
//         url: report.reportUrl, // Use the direct URL or generate a secure link
//       }));

//       // Configure email transport
//       const transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//           user: "pbrmarketintellligencereport@gmail.com",
//           pass: "aasl uuwn lmrw dsvl",
//         },
//       });

//       // Setup email options
//       const mailOptions = {
//         from: "pbrmarketintellligencereport@gmail.com",
//         to: email,
//         subject: "Your Report Downloads",
//         text: `Please download your reports:\n\n${reportLinks
//           .map((link) => `${link.name}: ${link.url}`)
//           .join("\n")}`,
//         html: `<p>Please download your reports:</p><ul>${reportLinks
//           .map((link) => `<li><a href="${link.url}">${link.name}</a></li>`)
//           .join("")}</ul>`,
//       };

//       // Send the email
//       await transporter.sendMail(mailOptions);

//       return NextResponse.json({ success: true }, { status: 200 });
//     } finally {
//       // Always close the MongoDB connection
//       await client.close();
//     }
//   } catch (error) {
//     console.error("Download report error:", error);
//     return NextResponse.json(
//       { success: false, error: "An error occurred." },
//       { status: 500 }
//     );
//   }
// }

import { MongoClient } from "mongodb";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Parse the request body
    const { email, token, reports } = await request.json();

    // Validate required fields
    if (!email || !token || !reports || reports.length === 0) {
      return NextResponse.json(
        { success: false, error: "Email, token, and reports are required." },
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

      // Increment the reportsUsed count
      await db.collection("subscriptions").updateOne(
        { email, token },
        { $inc: { reportsUsed: reports.length } } // Increment by the number of reports
      );

      // Save the download information
      await db.collection("reportDownloads").insertMany(
        reports.map(report => ({
          email,
          token,
          reportName: report.reportName,
          reportUrl: report.reportUrl,
          downloadedAt: new Date(),
        }))
      );

      // Prepare download links for the email
      const reportLinks = reports.map((report) => ({
        name: report.reportName,
        url: report.reportUrl, // Use the direct URL or generate a secure link
      }));

      // Configure email transport
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "pbrmarketintellligencereport@gmail.com",
          pass: "aasl uuwn lmrw dsvl",
        },
      });

      // Setup email options
      const mailOptions = {
        from: "pbrmarketintellligencereport@gmail.com",
        to: email,
        subject: "Your Report Downloads",
        text: `Please download your reports:\n\n${reportLinks
          .map((link) => `${link.name}: ${link.url}`)
          .join("\n")}`,
        html: `<p>Please download your reports:</p><ul>${reportLinks
          .map((link) => `<li><a href="${link.url}">${link.name}</a></li>`)
          .join("")}</ul>`,
      };

      // Send the email
      await transporter.sendMail(mailOptions);

      return NextResponse.json({ success: true }, { status: 200 });
    } finally {
      // Always close the MongoDB connection
      await client.close();
    }
  } catch (error) {
    console.error("Download report error:", error);
    return NextResponse.json(
      { success: false, error: "An error occurred." },
      { status: 500 }
    );
  }
}