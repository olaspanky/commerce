import { NextResponse, NextRequest } from 'next/server'
const nodemailer = require('nodemailer');

// Handles POST requests to /api


export async function POST(request) {

    const username = "olakareemomobolarinwa@gmail.com";
    const password = "67905662E6A51E2FFA375C3B0D0702562057";
    const myEmail = "olakareemomobolarinwa@gmail.com";


    console.log("dealing with request")
    const formData = await request.formData()
    const name = formData.get('name')
    const email = formData.get('email')
    const message = formData.get('message')


    // create transporter object
    const transporter = nodemailer.createTransport({
        host: "smtp.elasticemail.com",
        port: 2525,
        tls: {
            rejectUnauthorized: true,
            minVersion: "TLSv1.2"
        },

        

        auth: {

            user: username,
            pass: password
        }
    });

    try {

        const mail = await transporter.sendMail({
            from: username,
            to: email,
            replyTo: email,
            subject: `Website activity from ${email}`,
            html: `
            <p>Name: ${name} </p>
            <p>Email: ${email} </p>
            <p>Message: ${message} </p>
            `,
        })

        return NextResponse.json({ message: "Success: email was sent" })

    } catch (error) {
        console.log(error)
        NextResponse.status(500).json({ message: "COULD NOT SEND MESSAGE" })
    }


}