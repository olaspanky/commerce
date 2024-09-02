import { NextResponse } from "next/server";
const nodemailer = require("nodemailer");
const path = require("path");

// Handles POST requests to /api/services
export async function POST(request) {
  try {
    const formData = await request.json();
    const { name, email, message } = formData;

    // Gmail SMTP configuration
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "pbrmarketintellligencereport@gmail.com", // Your Gmail address
        pass: "aasl uuwn lmrw dsvl", // Your app-specific password
      },
    });

    // Path to the PDF and logo in the public folder
    const pdfPath = path.join(process.cwd(), "public", "whitepaper.pdf");
    const logoPath = path.join(process.cwd(), "public", "logo.png"); // Assuming your logo is named logo.png

    const emailBody = `
    <p>Dear Adeoye,</p>
    <p>We are excited to share that your free report, <strong>Antihypertensive White paper</strong>, is now available for you to download! We hope you find it valuable and insightful as you explore [the topic of the report].</p>
    <p><a href="[Download Link]" style="color: #007bff;">Download Your Free Report Here</a></p>
   
    <img src="cid:companyLogo" alt="Company Logo" style="width:200px;"/>
`;

    const mail = await transporter.sendMail({
      from: "olakareemomobolarinwa@gmail.com",
      to: email,
      replyTo: email,
      subject: `Website activity from ${name}`,
      html: `
                <p>Dear ${name},</p>
                <p>We are excited to share that your free report, <strong>Antihypertensive White paper</strong>, is now available for you to download! We hope you find it valuable and insightful as you explore [the topic of the report].</p>
                <p><strong>Message:</strong> ${message}</p>
                <p>But that’s not all! As a token of our appreciation for your continued interest, we are pleased to offer you an exclusive 30% discount on your next purchase of any paid report from our collection.</p>
                <p><strong>Your Discount Code:</strong> PBR Life Sciences</p>
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
                <p>Akinwunmi</p>
                <img src="cid:companyLogo" alt="Company Logo" style="width:200px;"/>
            `,
      attachments: [
        {
          filename: "whitepaper.pdf", // Match the filename
          path: pdfPath, // Attach the PDF file
          contentType: "application/pdf",
        },
        {
          filename: "logo.png",
          path: logoPath, // Attach the logo file
          cid: "companyLogo", // Content ID for embedding the logo
        },
      ],
    });

    return NextResponse.json({ message: `Email Succesfully sent to ${email}` });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "COULD NOT SEND MESSAGE" },
      { status: 500 }
    );
  }
}
