"use client"; // Required for client-side interactivity in Next.js 13

import { useEffect } from "react";

const LeadForm = () => {
  // Load the Zoho tracking script on component mount
  useEffect(() => {
    const script = document.createElement("script");
    script.id = "wf_anal";
    script.src =
      "https://crm.zohopublic.com/crm/WebFormAnalyticsServeServlet?rid=66f59df6dfadbadd865f696cae4eb73b29f5de9da0709e6bcb458c2a54af2663ee66201d45cb9c41443e5cbbfea4d2begid494b6a4d02f460947793059fe1e81a3604f2655419491db586f70314988bb94cgid1af5db1ff64547b1c47fa323572d66292026ad02d564e3c53f0d840b48b78bc1gid38b80d3f25ce75d50f09ef14fda4ea8599b8229d92d06cffcf28ea1ff41beb2a&tw=14f8a148e25297a2ee855309918db4af3a2b41ca66b296c154da4b5ced8714cb";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Form validation and submission logic
  const validateEmail = () => {
    const emailFld = document.querySelectorAll('[ftype="email"]');
    for (let i = 0; i < emailFld.length; i++) {
      const emailVal = emailFld[i].value.trim();
      if (emailVal.length !== 0) {
        const atpos = emailVal.indexOf("@");
        const dotpos = emailVal.lastIndexOf(".");
        if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= emailVal.length) {
          alert("Please enter a valid email address.");
          emailFld[i].focus();
          return false;
        }
      }
    }
    return true;
  };

  const checkMandatory = (e) => {
    e.preventDefault();
    const mndFileds = ["Last Name"];
    const fldLangVal = ["Last Name"];
    for (let i = 0; i < mndFileds.length; i++) {
      const fieldObj = document.forms["WebToContacts6247397000001342038"][mndFileds[i]];
      if (fieldObj) {
        if (fieldObj.value.trim().length === 0) {
          alert(fldLangVal[i] + " cannot be empty.");
          fieldObj.focus();
          return false;
        }
      }
    }
    if (!validateEmail()) return false;

    // Disable submit button to prevent multiple submissions
    const submitButton = document.querySelector('.formsubmit');
    if (submitButton) {
      submitButton.setAttribute('disabled', true);
    }

    // Submit the form
    document.getElementById("webform6247397000001342038").submit();
  };

  return (
    <div
      id="crmWebToEntityForm"
      className="bg-white text-black max-w-[600px] mx-auto p-6"
    >
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="content-type" content="text/html;charset=UTF-8" />

      <form
        id="webform6247397000001342038"
        action="https://crm.zoho.com/crm/WebToContactForm"
        name="WebToContacts6247397000001342038"
        method="POST"
        onSubmit={checkMandatory}
        acceptCharset="UTF-8"
      >
        <input type="hidden" name="xnQsjsdp" value="c723bed7789f76ba37f1aaf9831b6914a80e7b141d45e2508322fad0fb97df7d" />
        <input type="hidden" name="zc_gad" id="zc_gad" value="" />
        <input type="hidden" name="xmIwtLD" value="13670da44177d38c1148f46c2dc378171c414d0d1a20c35c012944a7e9027a145cd0563808c3ee4f822e96ebb743f525" />
        <input type="hidden" name="actionType" value="Q29udGFjdHM=" />
        <input type="hidden" name="returnURL" value="https://pbrmir.com" />

        <div className="text-black font-bold text-xl mb-6">PBR MIR Lead Generation</div>

        <div className="mb-4">
          <label htmlFor="First_Name" className="block text-sm font-medium mb-1">
            First Name
          </label>
          <input
            type="text"
            id="First_Name"
            name="First Name"
            className="w-full p-2 border border-gray-300 rounded"
            maxLength={40}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="Last_Name" className="block text-sm font-medium mb-1">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="Last_Name"
            name="Last Name"
            className="w-full p-2 border border-gray-300 rounded"
            maxLength={80}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="Email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="Email"
            name="Email"
            className="w-full p-2 border border-gray-300 rounded"
            maxLength={100}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="Mobile" className="block text-sm font-medium mb-1">
            Mobile
          </label>
          <input
            type="text"
            id="Mobile"
            name="Mobile"
            className="w-full p-2 border border-gray-300 rounded"
            maxLength={30}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="Mailing_Country" className="block text-sm font-medium mb-1">
            Mailing Country
          </label>
          <input
            type="text"
            id="Mailing_Country"
            name="Mailing Country"
            className="w-full p-2 border border-gray-300 rounded"
            maxLength={100}
          />
        </div>

        <div className="flex gap-2 mt-6">
          <button
            type="submit"
            className="formsubmit bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
          {/* <button
            type="reset"
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            Reset
          </button> */}
        </div>
      </form>
    </div>
  );
};

export default LeadForm;