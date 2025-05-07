import { NextResponse } from "next/server";
import { createTransport } from "nodemailer";
import { MongoClient } from "mongodb";
import fetch from 'node-fetch';

const whitepapers = [
  {
    id: "1",
    title: "Winning in Anti-Malaria Segment through Innovation",
    pdfUrl: "https://raw.githubusercontent.com/olaspanky/wasset/main/The%20Case%20of%20Amatem%20Nn.pdf",
    pdfFilename: "Winning-in-Anti-Malaria-Segment.pdf"
  },
  {
    id: "2",
    title: "PBR Artemiter Final",
    pdfUrl: "https://raw.githubusercontent.com/olaspanky/wasset/main/PBR-Artemiter-Final.pdf",
    pdfFilename: "PBR-Artemiter-Final.pdf"
  },
];

const logoUrl = "https://raw.githubusercontent.com/olaspanky/wasset/main/logo.svg";

export async function POST(request) {
  try {
    const formData = await request.json();
    const { firstName, lastName, email, mobile, mailingCountry, whitepaperId } = formData;

    const selectedWhitepaper = whitepapers.find((wp) => wp.id === whitepaperId);
    if (!selectedWhitepaper) {
      return NextResponse.json(
        { message: "Invalid whitepaper selected" },
        { status: 400 }
      );
    }

    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();

    try {
      // Save download record to MongoDB
      await db.collection("whitepaperDownloads").insertOne({
        firstName,
        lastName,
        email,
        mobile,
        mailingCountry,
        whitepaperId,
        downloadedAt: new Date(),
      });

      // Download the PDF from GitHub
      const pdfResponse = await fetch(selectedWhitepaper.pdfUrl);
      if (!pdfResponse.ok) throw new Error('Failed to fetch PDF');
      const pdfBuffer = await pdfResponse.buffer();

      // Create email transporter
      const transporter = createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER || "pbrmarketintellligencereport@gmail.com",
          pass: process.env.EMAIL_PASSWORD || "aasl uuwn lmrw dsvl",
        },
      });

      // Send email with PDF attachment
      await transporter.sendMail({
        from: process.env.EMAIL_USER || "pbrmarketintellligencereport@gmail.com",
        to: email,
        replyTo: email,
        subject: `Your Free Report from PBR Life Sciences`,
        html: `
          <p>Dear ${firstName},</p>
          <p>We are excited to share that your free report: <strong>${selectedWhitepaper.title}</strong>, is attached to this email for your convenience.</p>
          <p>But that's not all! As a token of our appreciation, we're pleased to offer you an exclusive 30% discount on your next purchase.</p>
          <p style="background-color: yellow; padding: 2px;"><strong>Your Discount Code:</strong> PBR Life Sciences</p>
          <p><strong>How to Redeem Your Discount:</strong></p>
          <ol>
            <li>Visit our <a href="https://www.pbrmir.com.ng/">Reports Page</a></li>
            <li>Select the report(s) you wish to purchase</li>
          </ol>
          <p>Best regards,</p>
          <p>Mr Akinwunmi<br>Product Manager<br>PBR Life Sciences</p>
          <img src="${logoUrl}" alt="Company Logo" style="width:200px;"/>
        `,
        attachments: [
          {
            filename: selectedWhitepaper.pdfFilename,
            content: pdfBuffer,
            contentType: 'application/pdf'
          }
        ]
      });

      return NextResponse.json({
        message: `Email with PDF attachment successfully sent to ${email}`,
      });
    } finally {
      await client.close();
    }
  } catch (error) {
    console.error('Error in PDF email service:', error);
    return NextResponse.json(
      { message: "Could not send message with PDF attachment" },
      { status: 500 }
    );
  }
}
