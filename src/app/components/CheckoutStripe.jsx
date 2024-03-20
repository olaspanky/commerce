import { CardElement, useElements, useStripe, CardCvcElement } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState } from "react";
import { useCart } from "react-use-cart";
import { useRouter } from 'next/navigation';


export default function PaymentForm() {
  const { items, isEmpty, totalUniqueItems, totalItems, cartTotal, updateItemQuantity, removeItem, emptyCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const downloadPdf = () => {
    // Construct the URL for the PDF file on localhost
    const pdfUrl = `http://localhost:3000/healthReport.pdf`;
    
    // Create an anchor element
    const anchor = document.createElement("a");
    anchor.href = pdfUrl; // Set the href to the PDF URL
    anchor.download = "Health-Report.pdf"; // Specify the file name for download
    anchor.click(); // Simulate a click event to trigger the download
  };

  const stripe = useStripe();
  const elements = useElements();

  const onSubmit = async (e) => {
    e.preventDefault();
    const cardElement = elements?.getElement("card");

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
        // Payment successful
        console.log("Payment successful");
        let message = `Payment Complete! Reference`;
        alert(message);
        // router.push("/pages/congrats")
        downloadPdf(); // Call the function with parentheses to execute it
        emptyCart()
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
        padding: "10px 15px", // Adjust card field padding
        border: "2px solid black", // Add a border
        borderRadius: "5px", // Round the corners
        display: "flex",
        flexDirection: "column",
        gap: "10px"
      },
      invalid: {
        color: "#9e2146",
      
      
      
      
      
      },
    },
  };
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <div class="form-group" className="flex flex-col gap-5">
    <label for="card-element">Credit or debit card</label>
    <div id="card-element" class="form-control" className="" >
    <CardElement style={{
            height: "150px", // Adjust height as needed
            display: "flex",
            flexFlow: "column wrap",
          }} options={cardElementOptions} />
    </div>
  </div>
      <button className="w-full rounded-md text-center p-2 bg-blue-700 text-white" type="submit" disabled={isProcessing}>Pay ${cartTotal}</button>
    </form>
  );
}


// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import axios from "axios";
// import React, { useState } from "react";
// import { useCart } from "react-use-cart";
// import { useRouter } from 'next/navigation';

// export default function PaymentForm() {
//   const { items, isEmpty, totalUniqueItems, totalItems, cartTotal, updateItemQuantity, removeItem, emptyCart } = useCart();
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [email, setEmail] = useState("");

//   // ... other functions

//   const stripe = useStripe();
//   const elements = useElements();

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     const paymentElement = elements?.getElement("payment");

//     if (!stripe || !paymentElement || isProcessing) return;

//     setIsProcessing(true);

//     try {
//       const { data } = await axios.post("/api/stripe", {
//         data: { amount: 89, email }, // Include email in server-side request
//       });
//       const clientSecret = data;

//       const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: paymentElement,
//       });

//       if (error) {
//         console.log(error);
//       } else {
//         // Payment successful
//         console.log("Payment successful");
//         // ... success actions
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <form onSubmit={onSubmit}>
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Enter your email address"
//         required
//       />
//       <CardElement  />
//       <button type="submit" disabled={isProcessing}>Submit {cartTotal}</button>
//     </form>
//   );
// }
