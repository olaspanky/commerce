import { NextResponse } from "next/server";
import { createTransport } from "nodemailer";
import { MongoClient } from "mongodb";

const whitepapers = [
  {
    id: "1",
    title: "Winning in Anti-Malaria Segment through Innovation",
    pdfUrl: "https://raw.githubusercontent.com/olaspanky/wasset/main/The%20Case%20of%20Amatem%20Nn.pdf",
  },
  {
    id: "2",
    title: "PBR Artemiter Final",
    pdfUrl: "https://raw.githubusercontent.com/olaspanky/wasset/main/PBR-Artemiter-Final.pdf",
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
      await db.collection("whitepaperDownloads").insertOne({
        firstName,
        lastName,
        email,
        mobile,
        mailingCountry,
        whitepaperId,
        downloadedAt: new Date(),
      });

      const transporter = createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        replyTo: email,
        subject: `Your Free Report from PBR Life Sciences`,
        html: `
          <p>Dear ${firstName},</p>
          <p>We are excited to share that your free report: <strong>${selectedWhitepaper.title}</strong>, is now available for you to download! <a href="${selectedWhitepaper.pdfUrl}">Click here to download</a>.</p>
          <!-- rest of your email content -->
          <img src="${logoUrl}" alt="Company Logo" style="width:200px;"/>
        `,
      });

      return NextResponse.json({
        message: `Email successfully sent to ${email}`,
      });
    } finally {
      await client.close();
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Could not send message" },
      { status: 500 }
    );
  }
}
