"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";



import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState } from "react";

const PaymentForm = ({ onSuccess, onClose, plan }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const stripe = useStripe();
  const elements = useElements();

  // Fallback for onClose
  const handleClose = onClose || (() => {
    console.warn("onClose is not defined");
  });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const cardElement = elements?.getElement("card");

    if (!stripe || !cardElement || isProcessing || !plan) return;

    setIsProcessing(true);

    try {
      const amountToCharge = plan.price * 100;

      const { data } = await axios.post("/api/stripe", {
        data: { amount: amountToCharge },
      });
      const clientSecret = data;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      if (result.error) {
        alert(result.error.message);
      } else {
        const subscriptionResponse = await axios.post("/api/subscribe", {
          email: formData.email,
          plan: plan.price,
        });

        if (subscriptionResponse.data.success) {
          onSuccess(subscriptionResponse.data.token);
        } else {
          throw new Error("Subscription creation failed");
        }
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Remove the useEffect and simplify the plan check
  if (!plan) {
    return (
      <div className="p-6">
        <p className="text-red-500">No plan selected. Please try again.</p>
        <button
          onClick={handleClose}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="p-6">
      <h3 className="text-xl font-bold mb-4">Complete Purchase</h3>
      <p className="text-gray-600 mb-6">
        {plan.name} Plan - ${plan.price} ({plan.reports} reports)
      </p>

      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleFormChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="card-element" className="block text-sm font-medium text-gray-700 mb-1">
            Card Details
          </label>
          <CardElement
            id="card-element"
            className="p-3 border rounded-lg"
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>

        <button
          type="submit"
          disabled={isProcessing}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          {isProcessing ? "Processing..." : `Pay $${plan.price}`}
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;