"use client"
import React, { useState } from "react";
import Image from "next/image";
import free from "../../../public/assets/amatem.jpeg";
import art from "../../../public/assets/art.png";
import Link from "next/link";

const BoxGrid = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const imageMap = { free, art };
  const testData = [
    {
      id: "1",
      title: "Explore innovative strategies in the anti-malaria segment.",
      image: "free",
      slug: "test-1",
      price: "Free",
    },
    {
      id: "2",
      title: "In-depth analysis of Artemiter solutions.",
      image: "art",
      slug: "PBR-Artemiter-Final.pdf",
      price: "Free",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 h-full">
      {testData.map((whitepaper, index) => (
        <Link key={whitepaper.id}    
         href={`/pages/form2?whitepaperId=${whitepaper.id}`}
>
          <div
            className="relative border p-4 h-96"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="h-full w-full relative">
              <Image
                alt={whitepaper.title}
                src={imageMap[whitepaper.image] || free}
                layout="fill"
                className=" object-contain "
              />
            </div>
            {hoveredIndex === index && (
              <div className="absolute inset-0 flex items-center justify-center text-white bg-black opacity-60">
                Explore
              </div>
            )}
            
          </div>
          <p>{whitepaper.title}</p>
            <p>{whitepaper.price}</p>
        </Link>
      ))}
    </div>
  );
};

export default BoxGrid;