import React, { useState } from "react";
import Image from "next/image";
import free from "../../../public/assets/amatem.jpeg";
import Link from "next/link";

const BoxGrid = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  if (!Array.isArray(data)) {
    return <div>Loading...</div>;
  }

  const handleHover = (index) => {
    setHoveredIndex(index);
  };

  console.log("data is :", data)

  const isAvailable = (box) => box.available === "yes";

  // Sort the data based on the position field
  const sortedData = data.sort((a, b) => a.position - b.position);

  return (
    <div className="grid md:grid-cols-2 grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-10">
      {/* Whitepaper section */}
      <Link href={`/pages/whitepaper`}>
        <div
          className="w-full relative"
          onMouseEnter={() => setHoveredIndex("whitepaper")}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className="flex justify-between rounded-lg shadow-md xl:h-[100%] pb-3 flex-col gap-3 w-full">
            <div className="h-full">
              <Image alt="alt" src={free} className="w-full h-full" />
            </div>

            {/* Explore div for whitepaper */}
            {hoveredIndex === "whitepaper" && (
              <div className="absolute inset-0 flex items-center justify-center text-white text-lg bg-black opacity-60 pointer-events-none rounded-lg">
                Explore
              </div>
            )}

            <div>
              <div className="px-5 flex justify-between text-sm gap-3 items-center lg:text-lg my-2 font-light text-[#404040] h-20 lg:h-20 2xl:h-12">
                <p>Whitepaper</p>
              </div>
              <div className="px-5 text-xs"></div>
              <div className="flex justify-between px-5 text-xs text-[black] pb-5 mt-5">
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
      {sortedData &&
        sortedData.map((box, index) => (
          <div
            key={box.id}
            onMouseEnter={() => handleHover(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Link href={isAvailable(box) ? `/pages/product/${box.slug}` : "#"}>
              <div className="w-full">
                <div className="flex relative justify-between rounded-lg shadow-md xl:h-[100%] pb-3 flex-col gap-3 w-full">
                  <div className="h-full">
                    {box.imageUrl && (
                      <img
                        alt="alt"
                        src={box.imageUrl}
                        className="w-full h-full"
                      />
                    )}
                  </div>

                  {/* Explore div for product cards */}
                  {hoveredIndex === index && (
                    <div className="absolute inset-0 flex items-center justify-center text-white text-lg bg-black opacity-60 pointer-events-none rounded-lg">
                      {isAvailable(box) ? "Explore" : "Coming Soon"}
                    </div>
                  )}

                  <div>
                    <div className="px-5 flex justify-between text-sm gap-3 items-center lg:text-lg my-2 font-light text-[#404040] h-20 lg:h-20 2xl:h-12">
                      <p>{box.name}</p>
                    </div>

                    <div className="px-5 text-xs"></div>
                    <div className="flex justify-between px-5 text-xs text-[black] pb-5 mt-5">
                      <div className="flex flex-col gap-2">
                      </div>
                      <div className="flex gap-2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default BoxGrid;
