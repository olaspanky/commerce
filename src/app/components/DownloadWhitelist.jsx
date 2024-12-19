

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setSubmissionStatus({ loading: true, success: false, error: null });

  //   if (!validateForm()) {
  //     setSubmissionStatus({ loading: false, success: false, error: null });
  //     return;
  //   }

  //   try {
  //     const data = {
  //       name: `${formData.firstName} ${formData.lastName}`,
  //       email: formData.email,
  //       message: `Company: ${formData.company}, Mobile: ${formData.mobile}, Country: ${formData.country}`,
  //     };

  //     const [zohoResponse, servicesResponse] = await Promise.all([
  //       fetch("/api/zoho", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(data),
  //       }),
  //       fetch("/api/services", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(data),
  //       }),
  //     ]);

  //     if (zohoResponse.ok && servicesResponse.ok) {
  //       setFormData({
  //         firstName: "",
  //         lastName: "",
  //         company: "",
  //         email: "",
  //         mobile: "",
  //         country: "",
  //       });
  //       setSubmissionStatus({ loading: false, success: true, error: null });
  //     } else {
  //       const errorData = await zohoResponse.json();
  //       setSubmissionStatus({
  //         loading: false,
  //         success: false,
  //         error: errorData.message || "Submission failed for one or more services.",
  //       });
  //     }
  //   } catch (error) {
  //     setSubmissionStatus({
  //       loading: false,
  //       success: false,
  //       error: "A network error occurred. Please try again.",
  //     });
  //   }
  // };



  import React, { useState } from 'react';

export default function ContactForm() {
  const [lead, setLead] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    mailingCountry: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLead(prev => ({ ...prev, [name]: value }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus({ loading: true, success: false, error: null });

    if (!validateForm()) {
      setSubmissionStatus({ loading: false, success: false, error: null });
      return;
    }

    try {
      const data = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        message: `Company: ${formData.company}, Mobile: ${formData.mobile}, Country: ${formData.country}`,
      };

      const [zohoResponse, servicesResponse] = await Promise.all([
        fetch("/api/zoho2", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }),
        fetch("/api/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }),
      ]);

      if (zohoResponse.ok && servicesResponse.ok) {
        setFormData({
          firstName: "",
          lastName: "",
          company: "",
          email: "",
          mobile: "",
          country: "",
        });
        setSubmissionStatus({ loading: false, success: true, error: null });
      } else {
        const errorData = await zohoResponse.json();
        setSubmissionStatus({
          loading: false,
          success: false,
          error: errorData.message || "Submission failed for one or more services.",
        });
      }
    } catch (error) {
      setSubmissionStatus({
        loading: false,
        success: false,
        error: "A network error occurred. Please try again.",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">PBR MIR Lead Generation</h2>
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
          <button 
            type="reset"
            onClick={() => setLead({
              firstName: '',
              lastName: '',
              email: '',
              mobile: '',
              mailingCountry: ''
            })}
            className="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}