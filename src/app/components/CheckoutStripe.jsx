import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useCart } from "react-use-cart";
import { useRouter } from "next/navigation";
import Link from "next/link";
import suc from "../../../public/assets/Vectorsuc.svg";
import Image from "next/image";
import Confetti from "react-confetti";


export default function PaymentForm() {
  const router = useRouter();
  const { items, cartTotal, emptyCart } = useCart();
  // const [showSuccessModal, setShowSuccessModal] = useState(false); // Step 1: State variable for success modal
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountedTotal, setDiscountedTotal] = useState(cartTotal);
  const [promoMessage, setPromoMessage] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiOpacity, setConfettiOpacity] = useState(1); // State to track opacity


  //console.log("items are", items);
  //console.log("items name", items[0]?.details);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: `Here are your PDFs: \n${items
      .map((item) => item.pdfFileURL)
      .join("\n")}`,
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

  const applyPromoCode = () => {
    if (promoCode === "PBR Life Sciences") {
      const discount = cartTotal * 0.3;
      setDiscountedTotal(cartTotal - discount);
      setDiscountApplied(true);
      setPromoMessage("Congratulations!!! Promo Code Applied");
      setShowConfetti(true);

      setTimeout(() => {
        let opacity = 1;
        const fadeInterval = setInterval(() => {
          if (opacity > 0) {
            opacity -= 0.05; 
            setConfettiOpacity(opacity);
          } else {
            clearInterval(fadeInterval); 
            setShowConfetti(false); 
          }
        }, 100); 
      }, 3000); 
    } else {
      setPromoMessage("❌ Invalid promo code");
    }
  };



  async function handleSubmit() {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        //console.log("Failed to send email");
        throw new Error(`Response status: ${response.status}`);
      }
  
      const responseData = await response.json();
      //console.log(responseData["message"]);
      showAlert("PDF Successfully sent to your email", "success");
    } catch (err) {
      console.error(err);
      showAlert("Error, please try resubmitting the form", "error");
    }
  }
  

  const onSubmit = async (e) => {
    e.preventDefault();
    const cardElement = elements.getElement("card");
  
    if (!stripe || !cardElement || isProcessing) return;
  
    setIsProcessing(true);
  
    try {
      // Apply the discount if applicable
      const amountToCharge = discountApplied ? discountedTotal : cartTotal;
  
      const { data } = await axios.post("/api/stripe", {
        data: { amount: amountToCharge }, // Use the discounted amount here
      });
      const clientSecret = data;
  
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });
  
      if (result.error) {
        //console.log(result.error.message);
        setShowErrorModal(true);
      } else {
        // Payment successful, now send the email
        await handleSubmit(); // This sends the email
        //console.log("Payment successful");
        setShowMessageModal(true);
      }
    } catch (error) {
      //console.log("Payment error is", error);
      setShowErrorModal(true);
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
          {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />} 

      <form
        onSubmit={onSubmit}
        enctype="multipart/form-data"
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col my-5">
          <label htmlFor="form-name">Name On Card* </label>
          <input
            id="form-name"
            autoComplete="name"
            maxLength={50}
            size="lg"
            name="name"
            value={formData.name} // Bind value to state
      onChange={handleFormChange} // Update state on change
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
            value={formData.email} // Bind value to state
            onChange={handleFormChange} // Update state on change
            className="text-black border border-gray-200 p-2 rounded-md my-2"
          />


<label htmlFor="promo-code">Promo Code:</label>
          <div className="flex justify-center items-center gap-2 w-full">
            <input
              id="promo-code"
              name="promoCode"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="text-black border border-gray-200 w-full p-2 rounded-md my-2"
            />
            <button
              type="button"
              onClick={applyPromoCode}
              className="rounded-full  border border-[#1567E0] p-3 bg-[#1567E0] text-[white] hover:shadow-lg hover:scale-105 hover:transition-transform hover:translate-y-[-2px] "
              >
              Apply
            </button>
          </div>
          {promoMessage && <p className="text-blue-700">{promoMessage}</p>}

          <label className="hidden" htmlFor="form-message">
            {" "}
            Message:{" "}
          </label>
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
          <div className="my-2" htmlFor="card-element">
            Credit or debit card
          </div>

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
          className="w-48 rounded-full  border border-[#1567E0] p-3 bg-[#1567E0] text-[white] hover:shadow-lg hover:scale-105 hover:transition-transform hover:translate-y-[-2px] "
          disabled={isProcessing} // Disable button when processing
        >
          {isProcessing ? (
            <div className="flex justify-center items-center">
              <div className="loader mr-2"></div> Processing...
            </div>
          ) : (
            `Pay $${discountApplied ? discountedTotal.toFixed(2) : cartTotal.toFixed(2)}`
          )}
        </button>
      </form>

      {/* Processing spinner */}
      <style jsx>{`
        .loader {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #3498db;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>

    
{showMessageModal && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div className="bg-white w-[500px] rounded-lg p-8 shadow-lg animate-pop-in-out">
      <div className="w-full flex justify-center my-9">
        <Image src={suc} alt="" />
      </div>
      <h2 className="text-2xl font-bold mb-4 text-center">Thank you!</h2>
      <p className="text-gray-800 font-extralight text-sm text-center">
        Your order has been confirmed & it is on the way. Check your email for the details
      </p>
      <div className="flex justify-center mt-4 space-x-4">
        <Link href="/">
          <button
            onClick={() => {
              setShowMessageModal(false);
              emptyCart(); // Empty cart when the user clicks on "Go to Homepage"
            }}
            className="px-4 py-2 bg-[#1567E0] text-white rounded-full"
          >
            Go to Homepage
          </button>
        </Link>
      </div>
    </div>
  </div>
)}

{showErrorModal && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div className="bg-white w-[500px] rounded-lg p-8 shadow-lg animate-pop-in-out">
      <h2 className="text-2xl font-bold mb-4 text-center">Error!</h2>
      <p className="text-gray-300 font-extralight text-sm text-center">
        Something went Wrong
      </p>
      <div className="flex justify-center mt-4 space-x-4">
        <Link href="/">
          <button
            onClick={() => {
              setShowMessageModal(false);
              emptyCart(); // Empty cart when the user clicks on "Go to Homepage"
            }}
            className="px-4 py-2 bg-[#1567E0] text-white rounded-full"
          >
            Go to Homepage
          </button>
        </Link>
      </div>
    </div>
  </div>
)}

{/* CSS Animations */}
<style jsx>{`
  @keyframes pop-in {
    0% {
      transform: scale(0.5);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes pop-out {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(0.5);
      opacity: 0;
    }
  }

  .animate-pop-in-out {
    animation: pop-in 0.4s ease-out forwards, pop-out 0.4s ease-out reverse;
  }
`}</style>

    </>
  );
}
