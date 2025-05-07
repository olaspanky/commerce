
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
         user: "pbrmarketintellligencereport@gmail.com",
          pass: "aasl uuwn lmrw dsvl",
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        replyTo: email,
        subject: `Your Free Report from PBR Life Sciences`,
        html: `
           <p>Dear ${firstName},</p>
          <p>We are excited to share that your free report: <strong>${selectedWhitepaper.title}</strong>, is now available for you to download! We hope you find it valuable and insightful as you explore.</p>
          <p>But that’s not all! As a token of our appreciation for your continued interest, we are pleased to offer you an exclusive 30% discount on your next purchase of any paid report from our collection.</p>
          <p style="background-color: yellow; padding: 2px;"><strong>Your Discount Code:</strong> PBR Life Sciences</p>
          <p>You can use this code at checkout to save 30% on any of our premium reports. This is a limited-time offer, so be sure to take advantage of this opportunity to access even more in-depth insights and data.</p>
          <p><strong>How to Redeem Your Discount:</strong></p>
          <ol>
            <li>Visit our <a href="https://www.pbrmir.com.ng/" style="color: #007bff;">Reports Page</a>.</li>
            <li>Select the report(s) you wish to purchase.</li>
            <li>Enter the discount code “PBR Life Sciences” at checkout.</li>
            <li>Enjoy your report at a reduced price!</li>
          </ol>
          <p>If you have any questions or need assistance with your purchase, please don't hesitate to contact our customer support team. We’re here to help!</p>
          <p>Thank you for choosing us as your trusted source for insightful reports. We look forward to continuing to support your needs.</p>
          <p>Best regards,</p>
          <p>Mr Akinwunmi</p>
          <p>Product Manager</p>
          <p>PBR Life Sciences</p>
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
