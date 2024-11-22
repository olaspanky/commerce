import React, { useState } from "react";
import Image from "next/image";
import free from "../../../public/assets/amatem.jpeg";
import Link from "next/link";

const BoxGrid = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

 

  const handleHover = (index) => {
    setHoveredIndex(index);
  };


  // Sort the data based on the position field

  return (
    <div className="grid md:grid-cols-2 grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-10">
      {/* Whitepaper section */}
      <Link href={"/pages/whitepaper"}>
        <div
          className="w-full relative h-full"
          onMouseEnter={() => setHoveredIndex("whitepaper")}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className="flex justify-between rounded-lg shadow-md h-full flex-col gap-3 w-full">
            <div className="h-full">
              <Image alt="alt" src={free} className="w-full h-full" />
            </div>

            {/* Explore div for whitepaper */}
            {hoveredIndex === "whitepaper" && (
              <div className="absolute inset-0 flex items-center justify-center text-white text-lg bg-black opacity-60 pointer-events-none rounded-lg">
                Explore
              </div>
            )}

            <div className="flex-1 flex flex-col justify-between">
              <div className="px-5 flex justify-between text-sm gap-3 items-center lg:text-lg my-2 font-light text-[#404040] h-20 lg:h-20 2xl:h-12">
                <p>Whitepaper</p>
              </div>
              <div className="px-5 text-xs"></div>
              <div className="flex justify-between px-5 text-xs text-[black] mt-5 mb-3">
                <div className="flex flex-col gap-2">
                  <p className="">Free</p>
                </div>
                <div className="flex gap-2"></div>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Dynamic product cards sorted by position */}
     
    </div>
  );
};

export default BoxGrid;