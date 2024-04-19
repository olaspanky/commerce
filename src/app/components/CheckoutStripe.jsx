

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useCart } from "react-use-cart";
import { useRouter } from "next/navigation";
import Link from "next/link";
import suc from "../../../public/assets/Vectorsuc.svg"
import Image from "next/image";



export default function PaymentForm() {
  const router= useRouter()
  const { items, cartTotal, emptyCart } = useCart();
  // const [showSuccessModal, setShowSuccessModal] = useState(false); // Step 1: State variable for success modal
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false); 

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
      }else {
        console.log("Payment successful");
        setShowMessageModal(true); // Show message modal on message success 
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
    <>
    <form onSubmit={onSubmit} enctype="multipart/form-data" className="flex flex-col gap-5">

      <div className="flex flex-col my-5">
        <label htmlFor="form-name">Name On Card* </label>
        <input
          id="form-name"
          autoComplete="name"
          maxLength={50}
          size="lg"
          name="name"
          className="text-black border border-gray-200 p-2 rounded-md my-2"
        />

        <label htmlFor="form-email"> Email:</label>
        <input
          id="form-email"
          required
          autoComplete="email"
          maxLength={80}
          name="email"
          type="email"
          className="text-black border border-gray-200 p-2 rounded-md my-2"
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
        <div className="my-2" htmlFor="card-element">Credit or debit card</div>
       
        <CardElement
                  id="card-element"
                  className="text-black border border-gray-200 p-2 rounded-md my-2"

        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
              padding: "10px 15px",
              border: "2px solid black",
              borderRadius: "5px",
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
        className="w-48 rounded-full text-center p-2 bg-blue-700 text-white"
      >
        Pay ${cartTotal}
      </button>
    </form>

         {/* Success Modal */}
         {/* {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
            <p>Your payment was successfully processed.</p>
          </div>
        </div>
      )} */}

      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-[500px] rounded-lg p-8 shadow-lg">
            <div className="w-full flex justify-center my-9">
              <Image src={suc} alt=""/>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-center">Thank you!</h2>
            <p className="text-gray-300 font-extralight text-sm text-center">Your order has been confirmed & it is on the way. Check your email for the details</p>
            <div className="flex justify-center mt-4 space-x-4">
              <Link href="/">
              <button
                onClick={() => setShowMessageModal(false)}
                className="px-4 py-2 bg-[#1567E0] text-white rounded-full"
              >
                Go to Homepage
              </button>
              </Link>
              <button
                onClick={() => setShowMessageModal(false)}
                className="px-4 py-2 bg-white text-[#1567E0] border border-[#1567E0] rounded-full"
              >
                Check Order status
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
}
