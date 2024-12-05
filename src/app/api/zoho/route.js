// app/api/submit-lead/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Parse the incoming form data
    const formData = await request.json();

    // Prepare the data for Zoho CRM
    const zohoFormData = new URLSearchParams({
      'First Name': formData.firstName || '',
      'Last Name': formData.lastName,
      'Company': formData.company,
      'Email': formData.email || '',
      'Mobile': formData.mobile || '',
      'Country': formData.country || '',
      // Hidden fields from the original form
      'xnQsjsdp': '624567297a13bd735a0f8c0a92a285db4376ae3d8c159077a6888c181a867b2f',
      'actionType': 'TGVhZHM=',
    });

    // Submit to Zoho CRM
    const zohoResponse = await fetch('https://crm.zoho.com/crm/WebToLeadForm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: zohoFormData,
    });

    // Check if Zoho submission was successful
    if (zohoResponse.ok) {
      return NextResponse.json({ 
        success: true, 
        message: 'Lead submitted successfully' 
      }, { status: 200 });
    } else {
      return NextResponse.json({ 
        success: false, 
        message: 'Failed to submit lead to Zoho CRM' 
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