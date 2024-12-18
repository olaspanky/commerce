'use client';

import React, { useEffect, useState } from 'react';

export default function ZohoCRMForm() {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    // Create script element
    const script = document.createElement('script');
    script.id = 'formScript6247397000001342038';
    script.src = 'https://crm.zoho.com/crm/WebFormServeServlet?rid=8a291ea5659af2cb54051f07b96696c3ae5a83635d2c08cebccc9cd4492fca1976ac5ec1e7e3c1b4755b0a2d8ad707d6gide6c38c873f9a36e278be797baf80a8ed9bc82faf8da3cf1c2d067fcb5147d31f&script=$sYG';
    script.type = 'text/javascript';

    // Add onload and onerror event handlers
    script.onload = () => {
      console.log('Zoho CRM form script loaded successfully');
      setIsScriptLoaded(true);
    };

    script.onerror = () => {
      console.error('Failed to load Zoho CRM form script');
      setIsScriptLoaded(false);
    };

    // Append script to body
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div>
      {/* Zoho CRM Web Form will be automatically inserted here */}
      {!isScriptLoaded && (
        <div className="text-center py-4">
          <p>Loading form...</p>
        </div>
      )}
      
      {/* This div is where Zoho will inject its form */}
      <div id="formContainer6247397000001342038"></div>
    </div>
  );
}