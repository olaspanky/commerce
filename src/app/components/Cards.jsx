// import React, { useState } from "react";
// import Image from "next/image";
// import free from "../../../public/assets/amatem.jpeg";
// import Link from "next/link";

// const BoxGrid = ({ data }) => {
//   const [hoveredIndex, setHoveredIndex] = useState(null);

//   if (!Array.isArray(data)) {
//     return <div>Loading...</div>;
//   }

//   const handleHover = (index) => {
//     setHoveredIndex(index);
//   };

//   const isAvailable = (box) => box.available === "yes";

//   // Sort the data based on the position field
//   const sortedData = data.sort((a, b) => a.position - b.position);

//   return (
    // <div className="grid md:grid-cols-2 grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-10">
     
 
    //   {/* Dynamic product cards sorted by position */}
    //   {sortedData &&
    //     sortedData.map((box, index) => (
    //       <div
    //         key={box.id}
    //         className="w-full relative h-full"
    //         onMouseEnter={() => handleHover(index)}
    //         onMouseLeave={() => setHoveredIndex(null)}
    //       >
    //         <Link href={isAvailable(box) ? `/pages/product/${box.slug}` : "#"}>
    //           <div className="flex justify-between rounded-lg shadow-md h-full flex-col gap-3 w-full">
    //             <div className="h-full">
    //               {box.imageUrl && (
    //                 <img
    //                   alt="alt"
    //                   src={box.imageUrl}
    //                   className="w-full h-full"
    //                 />
    //               )}
    //             </div>

    //             {/* Explore div for product cards */}
    //             {hoveredIndex === index && (
    //               <div className="absolute inset-0 flex items-center justify-center text-white text-lg bg-black opacity-60 pointer-events-none rounded-lg">
    //                 {isAvailable(box) ? "Explore" : "Coming Soon"}
    //               </div>
    //             )}

    //             <div className="flex-1 flex flex-col justify-between">
    //               <div className="px-5 flex justify-between text-sm gap-3 items-center lg:text-lg my-2 font-light text-[#404040] h-20 lg:h-20 2xl:h-12">
    //                 <p>{box.name}</p>
    //               </div>
    //               <div className="px-5 text-xs"></div>
    //               <div className="flex justify-between px-5 text-xs text-[black] pb-5 mt-5">
    //                 <div className="flex flex-col gap-2"></div>
    //                 <div className="flex gap-2"></div>
    //               </div>
    //             </div>
    //           </div>
    //         </Link>
    //       </div>
    //     ))}
    // </div>
//   );
// };

// export default BoxGrid;


import React, { useState } from "react";
import Link from "next/link";

const BoxGrid = ({ data, isLoading }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Skeleton Card Component
  const SkeletonCard = () => (
    <div className="w-full relative h-full animate-pulse">
      <div className="flex justify-between rounded-lg shadow-md h-full flex-col gap-3 w-full">
        {/* Image Placeholder */}
        <div className="h-48 bg-gray-300 w-full rounded-t-lg"></div>

        <div className="flex-1 flex flex-col justify-between p-4">
          {/* Title Placeholder */}
          <div className="h-6 bg-gray-300 w-3/4 mb-2 rounded"></div>

          {/* Additional Details Placeholders */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 w-1/2 rounded"></div>
            <div className="h-4 bg-gray-300 w-1/3 rounded"></div>
          </div>

          {/* Bottom Section Placeholders */}
          <div className="mt-4 flex justify-between">
            <div className="h-4 bg-gray-300 w-1/4 rounded"></div>
            <div className="h-4 bg-gray-300 w-1/4 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );

  // Check if data is loading or invalid
  if (isLoading || !Array.isArray(data)) {
    return (
      <div className="grid md:grid-cols-2 grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-10">
        {[1, 2, 3, 4].map((card) => (
          <SkeletonCard key={card} />
        ))}
      </div>
    );
  }

  const handleHover = (index) => {
    setHoveredIndex(index);
  };

  const isAvailable = (box) => box.available === "yes";

  // Sort the data based on the position field
  const sortedData = data.sort((a, b) => a.position - b.position);

  return (
    <div className="grid md:grid-cols-2 grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-10">
     
 
    {/* Dynamic product cards sorted by position */}
    {sortedData &&
      sortedData.map((box, index) => (
        <div
          key={box.id}
          className="w-full relative h-full"
          onMouseEnter={() => handleHover(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <Link href={isAvailable(box) ? `/pages/product/${box.slug}` : "#"}>
            <div className="flex justify-between rounded-lg shadow-md h-full flex-col gap-3 w-full">
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

              <div className="flex-1 flex flex-col justify-between">
                <div className="px-5 flex justify-between text-sm gap-3 items-center lg:text-lg my-2 font-light text-[#404040] h-20 lg:h-20 2xl:h-12">
                  <p>{box.name}</p>
                </div>
                <div className="px-5 text-xs"></div>
                <div className="flex justify-between px-5 text-xs text-[black] pb-5 mt-5">
                  <div className="flex flex-col gap-2"></div>
                  <div className="flex gap-2"></div>
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