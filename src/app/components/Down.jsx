"use client"
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "react-use-cart";

export default function DownloadPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const {items, isEmpty, totalUniqueItems, totalItems, cartTotal, updateItemQuantity, removeItem, emptyCart} = useCart()  
console.log("items is", items)

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsProcessing(true);
  setMessage("");
  setMessageType("");

  try {
    // Extract report details from all items in the cart
    const reports = items.map((item) => ({
      reportUrl: item.pdfFileURL,
      reportName: item.name,
    }));

    if (reports.length === 0) {
      setMessage("No reports found in the cart. Please add reports and try again.");
      setMessageType("error");
      return;
    }

    // Validate the token
    const validationResponse = await axios.post("/api/validateToken", {
      email,
      token,
    });

    if (validationResponse.data.success) {
      // Check if the number of reports exceeds the remaining downloads
      const reportsLeft = validationResponse.data.reportsLeft;
      if (reports.length > reportsLeft) {
        setMessage(
          `You can only download ${reportsLeft} report(s) with this token. Please reduce the number of reports in your cart or subscribe for more downloads.`
        );
        setMessageType("error");
        return;
      }

      // Send all reports along with the email and token
      const emailResponse = await axios.post("/api/sendReport", {
        email,
        token,
        reports, // Pass all reports to the API
      });

      if (emailResponse.data.success) {
        setMessage(
          `Reports sent to your email! You have ${reportsLeft - reports.length} downloads left.`
        );
        setMessageType("success");
      } else {
        setMessage("Failed to send the reports. Please try again.");
        setMessageType("error");
      }
    } else {
      setMessage(validationResponse.data.error);
      setMessageType("error");
    }
  } catch (error) {
    setMessage("Token invalid or expired. Please try again.");
    setMessageType("error");
  } finally {
    setIsProcessing(false);
  }
};

  const handleSubscribe = () => {
    router.push('/subscribe');
  };

  const handleNoToken = () => {
    router.push('/get-token');
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Download Your Report</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 font-medium">
              Email:
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="token" className="mb-2 font-medium">
              Token:
            </label>
            <div className="flex items-center gap-2">
              <input
                id="token"
                type="text"
                required
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
              />
              {/* <button
                type="button"
                onClick={handleNoToken}
                className="text-sm text-blue-600 hover:text-blue-800 whitespace-nowrap"
              >
                Get token
              </button> */}
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
          >
            {isProcessing ? "Processing..." : "Validate and Download"}
          </button>

          {message && (
            <div
              className={`mt-4 p-3 rounded-md text-sm ${
                messageType === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}
        </form>

        {/* Subtle subscription link */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Don't have a download token?  {" "}
          <button
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
                    <a href="/pages/sub" className=" w-full">

            Subscribe now
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}