

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useCart } from "react-use-cart";
import { useRouter } from "next/navigation";

const CustomAlert = ({ message, type }) => {
  const [isVisible, setIsVisible] = useState(false);
  

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [message]);

  const alertClass =
    type === "success" ? "text-primary text-xl" : "text-red-500";

  return (
    <div
      className={`p-3   ${alertClass} ${
        isVisible ? "slide-in border bg-white mt-5 " : "slide-out"
      }`}
    >
      {message}
    </div>
  );
};

export default function PaymentForm() {
  const router= useRouter()
  const { items, cartTotal, emptyCart } = useCart();
  console.log("items are", items)
  console.log("items name", items[0]?.details)
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: `Here are your PDFs: \n${items.map(item => item.pdfFileURL).join('\n')}`,
    
  });
  const stripe = useStripe();
  const elements = useElements();

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const showAlert = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setTimeout(() => {
      setAlertMessage("");
      setAlertType("");
    }, 3000);
  };


  async function handleSubmit(event) {
    event.preventDefault();
  
    const formData = new FormData(event.target);
  
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        console.log("falling over");
        throw new Error(`response status: ${response.status}`);
      }
      const responseData = await response.json();
      console.log(responseData["message"]);
      showAlert("Pdf Succesfully sent to your Mail");  
      alert("Message successfully sent");
    } catch (err) {
      console.error(err);
      showAlert("Error, please try resubmitting the form");  

      alert("Error, please try resubmitting the form");
    }
  }
  

  const onSubmit = async (e) => {
    e.preventDefault();
    const cardElement = elements.getElement("card");

    if (!stripe || !cardElement || isProcessing) return;

    setIsProcessing(true);

    try {
      const { data } = await axios.post("/api/stripe", {
        data: { amount: cartTotal },
      });
      const clientSecret = data;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      if (result.error) {
        console.log(result.error.message);
      } else {
        console.log("Payment successful");
        let message = `Payment Complete! Reference`;
        showAlert("Payment Confirmed");
        alert(message);
        handleSubmit(e);
        emptyCart();
        router.push('/pages/congrats')
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "14px",
        color: "black",
        "::placeholder": {
          color: "black",
        },
        padding: "10px 15px",
        border: "2px solid black",
        borderRadius: "5px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };

  return (
    <form onSubmit={onSubmit} enctype="multipart/form-data" className="flex flex-col gap-5">
            <CustomAlert message={alertMessage} type={alertType} />

      <div className="mb-4 flex flex-col w-500">
        <label htmlFor="form-name">Name </label>
        <input
          id="form-name"
          autoComplete="name"
          maxLength={50}
          size="lg"
          name="name"
          className="text-black border border-gray-200 p-2 rounded-md"
        />

        <label htmlFor="form-email"> Email:</label>
        <input
          id="form-email"
          required
          autoComplete="email"
          maxLength={80}
          name="email"
          type="email"
          className="text-black border border-gray-200 p-2 rounded-md"
        />

        <label className="hidden" htmlFor="form-message"> Message: </label>
        <textarea
          id="form-message"
          required
          name="message"
          rows={5}
          className="text-black border border-gray-200 p-2 rounded-md hidden"
          value={formData.message} // Add this line
          onChange={handleFormChange} // Add this line
        />
      </div>
   
      <div className="form-group">
        <label htmlFor="card-element">Credit or debit card</label>
        <CardElement
          id="card-element"
          options={{ style: { base: { fontSize: "14px", color: "black" } } }}
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-md text-center p-2 bg-blue-700 text-white"
      >
        Pay ${cartTotal}
      </button>
    </form>
  );
}

