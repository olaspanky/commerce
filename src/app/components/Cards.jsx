import React, { useState } from "react";
import Image from "next/image";
import arrow from "../../../public/assets/farrow.svg";
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

  const isAvailable = (box) => box.available === "yes";

  return (
    <div className="grid md:grid-cols-2 grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-10">
      {data &&
        data.map((box, index) => (
          <div
            key={box.id}
            onMouseEnter={() => handleHover(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Link href={isAvailable(box) ? `/pages/product/${box.slug}` : "#"}>
              <div className="w-full">
                <div className="flex relative  justify-between rounded-lg shadow-md xl:h-[100%] pb-3 flex-col gap-3 w-full">
                  <div className="h-full">
                    {box.imageUrl && (
                      <img
                        alt="alt"
                        src={box.imageUrl}
                        className="w-full h-full"
                      />
                    )}
                  </div>

                  {hoveredIndex === index && (
                    <div className="absolute inset-0 flex items-center justify-center text-white text-lg bg-black opacity-60 pointer-events-none rounded-lg">
                      {isAvailable(box) ? "Explore" : "Coming Soon"}
                    </div>
                  )}

                  <div className="">
                    <div className="px-5 flex justify-between text-sm gap-3 items-center lg:text-lg my-2 font-light text-[#404040] h-20 lg:h-20  2xl:h-12">
                      <p>{box.name}</p>
                    </div>

                    <div className="px-5 text-xs">
                      {/* <p>{box.location}</p> */}
                    </div>
                    <div className="flex justify-between px-5 text-xs text-[black] pb-5 mt-5">
                      <div className="flex flex-col gap-2">
                        <p className="">${box.price}</p>
                        <Link href={`/pages/product/${box.slug}`}></Link>
                      </div>
                      <div className="flex gap-2"></div>
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
            </Link>
          </div>
        ))}

<Link href={`/pages/whitepaper`}>
              <div className="w-full">
                <div className="flex relative  justify-between rounded-lg shadow-md xl:h-[100%] pb-3 flex-col gap-3 w-full">
                  <div className="h-full">
                   
                      <Image
                        alt="alt"
                        src={free}
                        className="w-full h-full"
                      />
                  
                  </div>

                    {/* <div className="absolute inset-0 flex items-center justify-center text-white text-lg bg-black opacity-60 pointer-events-none rounded-lg">
Explore                    </div> */}
                  

                  <div className="">
                    <div className="px-5 flex justify-between text-sm gap-3 items-center lg:text-lg my-2 font-light text-[#404040] h-20 lg:h-20  2xl:h-12">
                      <p>Whitepaper</p>
                    </div>

                    <div className="px-5 text-xs">
                      {/* <p>{box.location}</p> */}
                    </div>
                    <div className="flex justify-between px-5 text-xs text-[black] pb-5 mt-5">
                      <div className="flex flex-col gap-2">
                        <p className="">Free</p>
                        <Link href={`/pages/whitepaper`}></Link>
                      </div>
                      <div className="flex gap-2"></div>
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
            </Link>

        
    </div>
  );
};

export default BoxGrid;

// import React, { useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import eye from "../../../public/assets/eye.svg"

// const BoxGrid = ({ data }) => {
// const [hoveredIndex, setHoveredIndex] = useState(null);

// if (!Array.isArray(data)) {
//   return <div>Loading...</div>;
// }

// const handleHover = (index) => {
//   setHoveredIndex(index);
// };

// const isAvailable = (box) => box.price === 1;

//   return (
//     <div className="grid md:grid-cols-2 grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-10">
// {data && data.map((box, index) => (
//   <div
//     key={box.id}
//     onMouseEnter={() => handleHover(index)}
//     onMouseLeave={() => setHoveredIndex(null)}
//   >
// <Link href={isAvailable(box) ? `/pages/product/${box.slug}` : '#'}>
//             <div className="w-full relative">
//               <div className="flex flexflex-col justify-between rounded-md shadow-md xl:h-[100%] pb-3  flex-col gap-3 w-full">
//                 {box.imageUrl && (
//                   <Image alt="alt" src={box.imageUrl} width={100} height={100} className="w-full" />
//                 )}
//               </div>

//               {/* {isAvailable(box) && hoveredIndex === index && (
//                 <div className="absolute inset-0 flex items-center justify-center text-white text-lg bg-black opacity-60 pointer-events-none">
//                   Explore
//                 </div>
//               )} */}

// {hoveredIndex === index && (
//                 <div className="absolute inset-0 flex items-center justify-center text-white text-lg bg-black opacity-60 pointer-events-none">
//                   {isAvailable(box) ? 'Explore' : 'Not Available'}
//                 </div>
//               )}

//               <div className=''>
//                 <div className='px-5 text-lg my-2 font-light text-[#404040] h-20 lg:h-20  2xl:h-12'>{box.name}</div>

//                 <div className='px-5 text-xs'>
//                   {/* <p>{box.location}</p> */}
//                 </div>

//                 <div className='flex justify-between px-5 text-xs text-[black] pb-5'>
//                   <div className='flex gap-2'>
//                     <p className="">
//                       ${box.price}
//                     </p>
//                   </div>
//                   <div className='flex gap-2'>
//                     <p className="">
//                       {box.view}
//                     </p>
//                     <Image src={eye} alt=""/>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Link>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default BoxGrid;
