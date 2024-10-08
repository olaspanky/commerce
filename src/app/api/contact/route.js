
import { NextResponse } from 'next/server';
const path = require("path");
const nodemailer = require('nodemailer');

// Handles POST requests to /api/contact
export async function POST(request) {
    const username = "pbrmarketintellligencereport@gmail.com";
    const password = "aasl uuwn lmrw dsvl"; // Use your Gmail app-specific password

    console.log("Dealing with request");

    try {
        const formData = await request.json();
        const { name, email, message } = formData;

        if (!email) {
            throw new Error("No recipients defined");
        }

        console.log("formdate", formData);


        // Create transporter object using Gmail SMTP service
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: username,
                pass: password,
            },
        });
        const logoPath = path.join(process.cwd(), "public", "logo.png"); // Assuming your logo is named logo.png

        // Send mail
        const mail = await transporter.sendMail({
            from: username,
            to: email,
            subject: `Website activity from ${email}`,
            html: `
                 <p>Dear ${name},</p>
                <p>We are excited to share that your free report: <strong>Winning in Anti-Malaria Segment through Innovation</strong>, is now available for you to download! We hope you find it valuable and insightful as you explore.</p>
                <p>Please download your Purchase with the link provided below</p>
                 <p>Download your PDF here ${message} </p>
            `,
         
        });

        return NextResponse.json({ message: `Email Successfully sent to ${email}` });
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json({ message: "COULD NOT SEND MESSAGE" }, { status: 500 });
    }
}
