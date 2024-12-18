
  import { NextResponse } from 'next/server';

export async function POST(request) {
  const ZOHO_XNQJSDP = '3ba891c21384f21089d08ebc8b1f0d4ec19c3076a208c12ca07151e7d97b4787';
  const ZOHO_XMWITLD = '7f1129157f6549ce3c1246cd3f09aed3819315941fe000142af10c6a1f5551dc14c1436af51766c9cbbb51a16ca7e551';


  if (!ZOHO_XNQJSDP || !ZOHO_XMWITLD) {
    console.error('Zoho credentials are missing');
    return NextResponse.json({ 
      success: false, 
      message: 'Internal server error - Missing credentials' 
    }, { status: 500 });
  }

  try {
    const body = await request.json();

    // Validation
    const errors = [];
    if (!body.lastName) {
      errors.push('Last Name is required');
    }

    if (body.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(body.email)) {
        errors.push('Invalid email address');
      }
    }

    if (errors.length > 0) {
      return NextResponse.json({ 
        success: false, 
        errors 
      }, { status: 400 });
    }

    // Send data to Zoho CRM Web-to-Lead endpoint
    const zohoResponse = await fetch('https://crm.zoho.com/crm/WebToContactForm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'First Name': body.firstName || '',
        'Last Name': body.lastName,
        'Email': body.email || '',
        'Mobile': body.mobile || '',
        'Mailing Country': body.mailingCountry || '',
        'xnQsjsdp': ZOHO_XNQJSDP,
        'xmIwtLD': ZOHO_XMWITLD,
        'actionType': 'Q29udGFjdHM=',
      }).toString(),
    });

    if (!zohoResponse.ok) {
      console.error('Zoho submission failed with status:', zohoResponse.status);
      return NextResponse.json({ 
        success: false, 
        message: 'Zoho submission failed' 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Lead submitted successfully' 
    }, { status: 200 });
  } catch (error) {
    console.error('Form submission error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Internal server error' 
    }, { status: 500 });
  }
}
