"use client"
import React, { useState, useEffect } from 'react';

export default function ZohoCRMLeadForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    mobile: '',
    country: ''
  });

  const [errors, setErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState({
    loading: false,
    success: false,
    error: null
  });

  useEffect(() => {
    // Add tracking script dynamically
    const script = document.createElement('script');
    script.id = 'wf_anal';
    script.src = 'https://crm.zohopublic.com/crm/WebFormAnalyticsServeServlet?rid=66f59df6dfadbadd865f696cae4eb73b29f5de9da0709e6bcb458c2a54af2663ee66201d45cb9c41443e5cbbfea4d2begid494b6a4d02f460947793059fe1e81a3604f2655419491db586f70314988bb94cgid1af5db1ff64547b1c47fa323572d66292026ad02d564e3c53f0d840b48b78bc1gid38b80d3f25ce75d50f09ef14fda4ea8599b8229d92d06cffcf28ea1ff41beb2a&tw=14f8a148e25297a2ee855309918db4af3a2b41ca66b296c154da4b5ced8714cb';
    script.type = 'text/javascript';
    document.body.appendChild(script);

    // Cleanup function to remove script if component unmounts
    return () => {
      const existingScript = document.getElementById('wf_anal');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []); 


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last Name is required';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company is required';
    }

    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous submission status
    setSubmissionStatus({ loading: true, success: false, error: null });

    // Validate form
    if (!validateForm()) {
      setSubmissionStatus({ loading: false, success: false, error: null });
      return;
    }

    try {
      const response = await fetch('/api/zoho', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        // Reset form on successful submission
        setFormData({
          firstName: '',
          lastName: '',
          company: '',
          email: '',
          mobile: '',
          country: ''
        });
        setSubmissionStatus({ loading: false, success: true, error: null });
      } else {
        setSubmissionStatus({ 
          loading: false, 
          success: false, 
          error: result.message || 'Submission failed' 
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmissionStatus({ 
        loading: false, 
        success: false, 
        error: 'Network error. Please try again.' 
      });
    }
  };

  return (
    <div className=" bg-white ">

    {submissionStatus.success && (
      <div
        className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
        role="alert"
      >
                  Thank you for submitting the form! We shall be in touch with you.

      </div>
    )}

    {submissionStatus.error && (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
        role="alert"
      >
        {submissionStatus.error}
      </div>
    )}

    <form onSubmit={handleSubmit} className="space-y-4">

      <div className="flex w-full lg:gap-2 flex-col justify-between lg:flex-row">
      <div className="w-full">
        <label htmlFor="firstName" className="block text-sm font-medium">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="text-black border w-full border-gray-200 p-2 rounded-md my-2"
          />
        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
      </div>

      <div className="w-full">
        <label htmlFor="lastName" className="block text-sm font-medium">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="text-black border w-full border-gray-200 p-2 rounded-md my-2"
          />
        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
      </div>
      </div>
      <div>
        <label htmlFor="company" className="block text-sm font-medium">
          Company
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="text-black border w-full border-gray-200 p-2 rounded-md my-2"
          />
        {errors.company && <p className="text-red-500 text-sm">{errors.company}</p>}
      </div>

      <div className="flex w-full lg:gap-2 flex-col justify-between lg:flex-row">
      <div className="w-full">
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="text-black border w-full border-gray-200 p-2 rounded-md my-2"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div className="w-full">
        <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
          Mobile
        </label>
        <input
          type="tel"
          id="mobile"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          maxLength={30}
          className="text-black border w-full border-gray-200 p-2 rounded-md my-2"
        />
      </div>
</div>
      <div>
        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
          Country
        </label>
        <input
          type="text"
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          maxLength={100}
          className="text-black border w-full border-gray-200 p-2 rounded-md my-2"
        />
      </div>


      <div className="flex space-x-4">
        <button
          type="submit"
          disabled={submissionStatus.loading}
          className={`w-full py-2 px-4 rounded-md ${
            submissionStatus.loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {submissionStatus.loading ? "Submitting..." : "Submit"}
        </button>
      
      </div>
    </form>
  </div>
  );
}
