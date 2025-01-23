"use client";

import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const AdminDashboard = () => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("subscriptions");
  const [subscriptions, setSubscriptions] = useState([]);
  const [whitepaperDownloads, setWhitepaperDownloads] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check authentication state on initial load
  useEffect(() => {
    const savedAuth = localStorage.getItem("isAuthenticated");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
      fetchData(); // Fetch data immediately if authenticated
    }
  }, []);

  // Fetch data from the backend
  const fetchData = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await fetch("/api/admin");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const { data, whitepaperDownloads } = await response.json();
      setSubscriptions(data || []); // Ensure data is not undefined
      setWhitepaperDownloads(whitepaperDownloads || []); // Ensure data is not undefined
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  // Handle password submission
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === "PBR2024#") {
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true"); // Persist authentication state
      fetchData(); // Fetch data after authentication
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  // Toggle sidebar on mobile
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Export table as PDF
  const exportTableToPDF = (tableId, fileName) => {
    const doc = new jsPDF();
    const table = document.getElementById(tableId);

    if (table) {
      const headers = [];
      const rows = [];

      // Extract headers
      table.querySelectorAll("thead th").forEach((th) => {
        headers.push(th.innerText);
      });

      // Extract rows
      table.querySelectorAll("tbody tr").forEach((tr) => {
        const row = [];
        tr.querySelectorAll("td").forEach((td) => {
          row.push(td.innerText);
        });
        rows.push(row);
      });

      // Generate PDF
      doc.autoTable({
        head: [headers],
        body: rows,
      });

      // Save PDF
      doc.save(`${fileName}.pdf`);
    }
  };

  // Render password prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-gray-800">
        <form
          onSubmit={handlePasswordSubmit}
          className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700"
        >
          <h2 className="text-2xl font-bold mb-6 text-white text-center">
            Admin Login
          </h2>
          <input
            type="text"
            name="username"
            autoComplete="username"
            style={{ display: "none" }}
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-gray-700 text-white rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="new-password"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }

  // Render the dashboard
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-64"
        } lg:translate-x-0 transition-transform duration-200 ease-in-out z-50`}
      >
        <button
          onClick={toggleSidebar}
          className="lg:hidden absolute top-2 right-2 p-2 text-gray-400 hover:text-white"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-2xl font-bold text-center text-white">Admin Dashboard</h2>
        <nav>
          <button
            onClick={() => setActiveTab("subscriptions")}
            className={`w-full py-2 px-4 text-left hover:bg-gray-700 rounded-lg transition duration-300 ${
              activeTab === "subscriptions" ? "bg-gray-700" : ""
            }`}
          >
            Subscriptions
          </button>
          <button
            onClick={() => setActiveTab("whitepaperDownloads")}
            className={`w-full py-2 px-4 text-left hover:bg-gray-700 rounded-lg transition duration-300 ${
              activeTab === "whitepaperDownloads" ? "bg-gray-700" : ""
            }`}
          >
            Whitepaper Downloads
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Mobile Sidebar Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-4 bg-gray-800 text-white fixed top-0 left-0 z-40"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Content */}
        <div className="p-8">
          {/* Refresh Data Button */}
          <div className="flex justify-end mb-6">
            <button
              onClick={fetchData}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Refreshing...
                </>
              ) : (
                "Refresh Data"
              )}
            </button>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}

          {/* Subscriptions Tab */}
          {!isLoading && activeTab === "subscriptions" && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-white">
                Subscriptions & Report Downloads
              </h2>
              <button
                onClick={() => exportTableToPDF("subscriptions-table", "subscriptions")}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300 mb-4"
              >
                Download as PDF
              </button>
              <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
                <table id="subscriptions-table" className="min-w-full">
                  <thead>
                    <tr className="bg-gray-700">
                      <th className="px-6 py-3 text-left">Email</th>
                      <th className="px-6 py-3 text-left">Token</th>
                      <th className="px-6 py-3 text-left">Plan</th>
                      <th className="px-6 py-3 text-left">Price</th>
                      <th className="px-6 py-3 text-left">Reports Allowed</th>
                      <th className="px-6 py-3 text-left">Reports Used</th>
                      <th className="px-6 py-3 text-left">Downloads</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscriptions?.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-700 hover:bg-gray-750 transition duration-300"
                      >
                        <td className="px-6 py-4">{item.email}</td>
                        <td className="px-6 py-4">{item.token}</td>
                        <td className="px-6 py-4">{item.plan}</td>
                        <td className="px-6 py-4">${item.price}</td>
                        <td className="px-6 py-4">{item.reportsAllowed}</td>
                        <td className="px-6 py-4">{item.reportsUsed}</td>
                        <td className="px-6 py-4">
                          <ul>
                            {item.downloads?.map((download, idx) => (
                              <li key={idx}>
                                <a
                                  href={download.reportUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-400 hover:text-blue-300 transition duration-300"
                                >
                                  {download.reportName} (Downloaded at:{" "}
                                  {new Date(download.downloadedAt).toLocaleString()})
                                </a>
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Whitepaper Downloads Tab */}
          {!isLoading && activeTab === "whitepaperDownloads" && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-white">
                Whitepaper Downloads
              </h2>
              <button
                onClick={() => exportTableToPDF("whitepaper-table", "whitepaper-downloads")}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300 mb-4"
              >
                Download as PDF
              </button>
              <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
                <table id="whitepaper-table" className="min-w-full">
                  <thead>
                    <tr className="bg-gray-700">
                      <th className="px-6 py-3 text-left">Name</th>
                      <th className="px-6 py-3 text-left">Email</th>
                      <th className="px-6 py-3 text-left">Downloaded At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {whitepaperDownloads?.map((download, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-700 hover:bg-gray-750 transition duration-300"
                      >
                        <td className="px-6 py-4">{download.name}</td>
                        <td className="px-6 py-4">{download.email}</td>
                        <td className="px-6 py-4">
                          {new Date(download.downloadedAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;