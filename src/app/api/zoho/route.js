// // app/api/submit-lead/route.js
// import { NextResponse } from 'next/server';

// export async function POST(request) {
//   try {
//     // Parse the incoming form data
//     const formData = await request.json();

//     // Prepare the data for Zoho CRM
//     const zohoFormData = new URLSearchParams({
//       'First Name': formData.firstName || '',
//       'Last Name': formData.lastName,
//       'Company': formData.company,
//       'Email': formData.email || '',
//       'Mobile': formData.mobile || '',
//       'Country': formData.country || '',
//       'xnQsjsdp': '90470b8c6f786278b937e49e44c6ab678bb8451619e5f0af531d358550e4f037',
//       'xmIwtLD': 'c91bd066d11707ea6dea46e9fb3f50284ec55911e24eed3d0e656ff7e11bfc049ab1ea5e2a8c497a795964a8b4f1dcf3',
//       'actionType': 'TGVhZHM=',
//       'returnURL': 'null',
//     });

//     // Submit to Zoho CRM
//     const zohoResponse = await fetch('https://crm.zoho.com/crm/WebToLeadForm', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       body: zohoFormData,
//     });

//     // Check if Zoho submission was successful
//     if (zohoResponse.ok) {
//       return NextResponse.json({ 
//         success: true, 
//         message: 'Lead submitted successfully' 
//       }, { status: 200 });
//     } else {
//       return NextResponse.json({ 
//         success: false, 
//         message: 'Failed to submit lead to Zoho CRM' 
//       }, { status: 400 });
//     }
//   } catch (error) {
//     console.error('Form submission error:', error);
//     return NextResponse.json({ 
//       success: false, 
//       message: 'Internal server error' 
//     }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Parse the incoming form data
    const formData = await request.json();

    // Prepare the data for Zoho CRM
    const zohoFormData = new URLSearchParams({
      'First Name': formData.firstName || '',
      'Last Name': formData.lastName,
      'Email': formData.email || '',
      'Mobile': formData.mobile || '',
      'Country': formData.mailingCountry || '',
      'xnQsjsdp': '90470b8c6f786278b937e49e44c6ab678bb8451619e5f0af531d358550e4f037',
      'xmIwtLD': 'c91bd066d11707ea6dea46e9fb3f50284ec55911e24eed3d0e656ff7e11bfc049ab1ea5e2a8c497a795964a8b4f1dcf3',
      'actionType': 'TGVhZHM=',
      'returnURL': 'null',
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
