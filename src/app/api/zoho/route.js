// pages/api/contact.js (unchanged from previous version)
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.text();
    const formData = new URLSearchParams(body);

    // Submit to Zoho CRM WebToContactForm
    const zohoResponse = await fetch('https://crm.zoho.com/crm/WebToContactForm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    if (zohoResponse.ok) {
      return NextResponse.json({
        success: true,
        message: 'Contact submitted successfully'
      }, { status: 200 });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Failed to submit contact to Zoho CRM'
      }, { status: 400 });
    }
  } catch (error) {
    console.error('Form submission error:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 });
  }
}