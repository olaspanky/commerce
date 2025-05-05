"use client";

import { useState } from "react";
import { whitepapers } from "@/lib/whitepapers";
import Modal from "../../components/Modall";
import ContactForm from "../../components/ContactForm";
import Image from "next/image";
import free from "../../../../public/assets/amatem.jpeg";
import art from "../../../../public/assets/art.png";
import MobileNavbar from '@/app/components/MobileNav';
import Nav from "../../components/Navbar";
import Footer from '@/app/components/Footer';

export default function BlogPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWhitepaperId, setSelectedWhitepaperId] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const imageMap = { free, art };

  const openModal = (whitepaperId) => {
    setSelectedWhitepaperId(whitepaperId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedWhitepaperId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="hidden md:block shadow-sm bg-white">
        <Nav />
      </div>
      <div className="md:hidden shadow-sm bg-white">
        <MobileNavbar />
      </div>
      
      {/* Hero Section */}
      <div className=" py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-center font-bold leading-tight mb-4">
            Chart Your Course to Success{" "}
            <span className="block mt-2 text-blue-600">Order Your Report Today</span>
          </h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
            Access our premium research papers and industry insights to stay ahead of the competition.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {whitepapers.map((whitepaper, index) => (
            <div 
              key={whitepaper.id}
              className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div
                className="relative h-64 cursor-pointer"
                onClick={() => openModal(whitepaper.id)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="h-full w-full relative">
                  <Image
                    alt={whitepaper.title}
                    src={imageMap[whitepaper.image] || free}
                    layout="fill"
                    className="object-contain transition-transform duration-300 transform group-hover:scale-105"
                  />
                </div>
                <div 
                  className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black to-transparent transition-opacity duration-300 ${
                    hoveredIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <span className="text-white text-lg font-medium mb-3">Download Free</span>
                  <button 
                    className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium transform transition-transform duration-300 hover:scale-105"
                    onClick={() => openModal(whitepaper.id)}
                  >
                    Get Access Now
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {whitepaper.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {whitepaper.description || "Access this comprehensive whitepaper to gain valuable industry insights and strategic knowledge."}
                </p>
                <div className="flex items-center justify-between">
                  <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Free Access
                  </span>
                  <button 
                    onClick={() => openModal(whitepaper.id)}
                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                  >
                    Download
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for form */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Download Whitepaper"
      >
        <ContactForm
          whitepapers={whitepapers}
          selectedWhitepaperId={selectedWhitepaperId}
          onClose={closeModal}
        />
      </Modal>

      {/* Footer */}
      <Footer />
    </div>
  );
}