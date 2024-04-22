import React, { useState } from 'react';
import Image from 'next/image';
import arrow from "../../../public/assets/farrow.svg"
import eye from "../../../public/assets/eye.svg"
import Link from 'next/link';


const BoxGrid = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState(0);

  if (!Array.isArray(data)) {
    return <div>Loading...</div>;
  }

  const handleHover = (index) => {
    if (index !== 0) {
      setHoveredIndex(index);
    } else {
      setHoveredIndex(0);
    }
  };

  return (
    <div className="grid md:grid-cols-2 grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-10">
    {data && data.map((box, index) => (
        <div
        key={box.id}
         
        >
                      <Link href={`/pages/product/${box.slug}`}>

          
          <div className="w-full">
          <div className="flex flexflex-col justify-between rounded-md shadow-md xl:h-[100%] pb-3  flex-col gap-3 w-full">
            <div className="">
            {box.imageUrl && (
              <Image alt="alt" src={box.imageUrl} width={100} height={100} className="w-full" />
                  )}             
            </div>

            <div className=''>
              <div className='px-5 text-lg my-2 font-light text-[#404040] h-20 lg:h-12  xl:h-20'>{box.name}</div>

            <div className='px-5 text-xs'>
              <p>{box.location}</p>
            </div>
            <div className='flex justify-between px-5 text-xs text-[black] pb-5'>
              <div className='flex gap-2'>
              <p className="">
              ${box.price}
            </p>
            <Link href={`/pages/product/${box.slug}`}>
            </Link>
              </div>
              <div className='flex gap-2'>
              <p className="">
              {box.view}
            </p>
                <Image src={eye}/>
              </div>
           
           
            </div>
            </div>



          </div>
          <div>
           
          </div>
        </div>
        </Link>
        </div>
      ))}
    </div>
  );
};

export default BoxGrid;
