// ContactForm.jsx
import React, { useState } from "react";

export default function ContactForm() {
  const [lead, setLead] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    mailingCountry: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    success: false,
    message: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLead((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!lead.lastName) {
      setSubmitStatus({
        loading: false,
        success: false,
        message: "Last Name cannot be empty.",
      });
      return false;
    }
    if (lead.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(lead.email)) {
        setSubmitStatus({
          loading: false,
          success: false,
          message: "Please enter a valid email address.",
        });
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus({ loading: true, success: false, message: null });

    if (!validateForm()) {
      setSubmitting(false);
      return;
    }

    try {
      const zohoFormData = new URLSearchParams({
        'First Name': lead.firstName,
        'Last Name': lead.lastName,
        'Email': lead.email,
        'Mobile': lead.mobile,
        'Mailing Country': lead.mailingCountry,
        'xnQsjsdp': 'bfcccc38a3fc99522af00f844f5108fc8b1271e0437565f9e9fb14617b659f17',
        'xmIwtLD': 'dcbf2f72adf8763c70106513bb17bf232b8a1b7d7ad070b0d0894f021f7b4554a45987fb5c618a908718ffb4fe47c286',
        'actionType': 'Q29udGFjdHM=',
        'returnURL': 'null',
      });

      const servicesData = {
        firstName: lead.firstName,
        lastName: lead.lastName,
        email: lead.email,
        mobile: lead.mobile,
        mailingCountry: lead.mailingCountry,
      };

      const [zohoResponse, servicesResponse] = await Promise.all([
        fetch('/api/zoho', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: zohoFormData,
        }),
        fetch('/api/services', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(servicesData),
        }),
      ]);

      const zohoResult = await zohoResponse.json();
      const servicesResult = await servicesResponse.json();

      if (zohoResponse.ok && servicesResponse.ok) {
        setLead({
          firstName: "",
          lastName: "",
          email: "",
          mobile: "",
          mailingCountry: "",
        });
        setSubmitStatus({
          loading: false,
          success: true,
          message: "please check your mail for the free pdf",
        });
      } else {
        setSubmitStatus({
          loading: false,
          success: false,
          message: 
            (!zohoResponse.ok && !servicesResponse.ok) 
              ? "Failed to submit to both services"
              : !zohoResponse.ok 
                ? "Failed to submit to Zoho CRM"
                : "Failed to submit to services",
        });
      }
    } catch (error) {
      setSubmitStatus({
        loading: false,
        success: false,
        message: "A network error occurred. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={lead.firstName}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            maxLength={40}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lead.lastName}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            maxLength={80}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={lead.email}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            maxLength={100}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="mobile"
            className="block text-sm font-medium text-gray-700"
          >
            Mobile
          </label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={lead.mobile}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            maxLength={30}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="mailingCountry"
            className="block text-sm font-medium text-gray-700"
          >
            Mailing Country
          </label>
          <input
            type="text"
            id="mailingCountry"
            name="mailingCountry"
            value={lead.mailingCountry}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            maxLength={100}
          />
        </div>

        {submitStatus.message && (
          <div
            className={`mb-4 p-3 rounded ${
              submitStatus.success
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {submitStatus.message}
          </div>
        )}

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}