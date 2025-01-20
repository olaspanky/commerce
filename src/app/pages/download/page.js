"use client"
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function DownloadPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setMessage("");
    setMessageType("");

    try {
      // Validate the token and check remaining downloads
      const validationResponse = await axios.post("/api/validateToken", {
        email,
        token,
      });

      if (validationResponse.data.success) {
        // If token is valid, send the report to the user's email
        const emailResponse = await axios.post("/api/sendReport", {
          email,
          token,
        });

        if (emailResponse.data.success) {
          setMessage(
            `Report sent to your email! You have ${validationResponse.data.reportsLeft} downloads left.`
          );
          setMessageType("success");
        } else {
          setMessage("Failed to send the report. Please try again.");
          setMessageType("error");
        }
      } else {
        setMessage(validationResponse.data.error);
        setMessageType("error");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      setMessageType("error");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
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
            <input
              id="token"
              type="text"
              required
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
      </div>
    </div>
  );
}