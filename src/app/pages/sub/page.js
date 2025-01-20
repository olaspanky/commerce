"use client"
import React, { useState } from "react";
import { Check, X } from "lucide-react";
import Nav from "../../components/Navbar";
import PaymentForm from "../../components/Paystack";

const PricingSection = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [downloadToken, setDownloadToken] = useState(null);

  const handlePaymentSuccess = (token) => {
    setDownloadToken(token);
    localStorage.setItem("downloadToken", token);
    setIsPaymentModalOpen(false);
  };

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan);
    setIsPaymentModalOpen(true);
  };

  const plans = [
    {
      name: "Basic",
      price: 20,
      reports: 1,
      description: "Download 1 report",
      features: [
        "Access to 1 full report",
      ],
      buttonText: "Get Started",
      popular: false,
    },
    {
      name: "Standard",
      price: 30,
      reports: 2,
      description: "Download 2 reports",
      features: [
        "Access to 2 full reports",
      ],
      buttonText: "Get Started",
      popular: true,
    },
    {
      name: "Professional",
      price: 50,
      reports: 4,
      description: "Download 4 reports",
      features: [
        "Access to 4 full reports",
        "Priority email support",
      ],
      buttonText: "Get Started",
      popular: false,
    },
  ];

  return (
    <div>
      <Nav />
      <div className="w-full max-w-6xl mx-auto px-4 py-8">
        {downloadToken && (
          <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg" role="alert">
            <p className="text-green-800">
              Your download token:{" "}
              <span className="font-mono font-bold">{downloadToken}</span>
            </p>
            <p className="text-sm text-green-600 mt-1">
              Use this token to download your reports. Keep it safe!
            </p>
          </div>
        )}

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get access to comprehensive health records and reports with our
            flexible subscription plans
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-lg border p-6 flex flex-col
                transform transition-all duration-300 ease-in-out
                ${selectedPlan?.name === plan.name ? "ring-2 ring-blue-500 shadow-lg" : ""}
                ${plan.popular ? "border-blue-500 shadow-lg" : "border-gray-200"}
                `}
              role="region"
              aria-label={`${plan.name} plan`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-5">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-600">{plan.description}</p>
              </div>

              <div className="flex-grow">
                <div className="mb-6">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-gray-600">/month</span>
                </div>

                <ul className="space-y-3 mb-6" role="list">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 transition-transform duration-200 hover:translate-x-2"
                    >
                      <Check className="h-5 w-5 text-green-500" aria-hidden="true" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className={`w-full py-2 px-4 rounded-lg font-medium
                  transition-all duration-300 ease-in-out
                  transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  ${
                    plan.popular
                      ? "bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg"
                      : "border border-gray-300 hover:border-blue-400 hover:text-blue-500 bg-white"
                  }`}
                onClick={() => handlePlanSelection(plan)}
                aria-label={`Select ${plan.name} plan`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        {isPaymentModalOpen && selectedPlan && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            role="dialog"
            aria-modal="true"
            aria-labelledby="payment-modal-title"
          >
            <div className="bg-white rounded-xl w-full max-w-md relative overflow-hidden">
              <button
                onClick={() => setIsPaymentModalOpen(false)}
                className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close payment modal"
              >
                <X size={20} />
              </button>

              <PaymentForm
                onSuccess={handlePaymentSuccess}
                onClose={() => setIsPaymentModalOpen(false)}
                plan={selectedPlan}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingSection;