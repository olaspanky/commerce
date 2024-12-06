// pages/api/submit-lead.js
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Zoho CRM form submission details
      const ZOHO_WEBFORM_URL = 'https://crm.zoho.com/crm/WebToLeadForm';
      
      // Prepare form data for Zoho
      const zohoFormData = new URLSearchParams({
        'xnQsjsdp': '90470b8c6f786278b937e49e44c6ab678bb8451619e5f0af531d358550e4f037',
        'xmIwtLD': 'c91bd066d11707ea6dea46e9fb3f50284ec55911e24eed3d0e656ff7e11bfc049ab1ea5e2a8c497a795964a8b4f1dcf3',
        'actionType': 'TGVhZHM=',
        'returnURL': 'null',
        'First Name': req.body.firstName || '',
        'Last Name': req.body.lastName,
        'Company': req.body.company,
        'Email': req.body.email || '',
        'Mobile': req.body.mobile || '',
        'Country': req.body.country || ''
      });

      // Submit to Zoho
      const zohoResponse = await axios.post(ZOHO_WEBFORM_URL, zohoFormData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      // Respond to client
      res.status(200).json({ 
        message: 'Lead submitted successfully', 
        zohoResponse: zohoResponse.data 
      });
    } catch (error) {
      console.error('Zoho submission error:', error);
      res.status(500).json({ 
        message: 'Error submitting lead', 
        error: error.message 
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}