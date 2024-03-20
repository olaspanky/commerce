import React, { useState } from 'react';
import Image from 'next/image';
import arrow from "../../../public/assets/farrow.svg"
import eye from "../../../public/assets/eye.svg"
import Link from 'next/link';
import pic1 from "../../../public/assets/picturecommerce1.svg";


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
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
    {data && data.map((box, index) => (
        <div
        key={box.id}
         
        ><div className="w-full">
          <div className="flex flexflex-col justify-between rounded-md shadow-md xl:h-[500px]  flex-col gap-3 w-full">
            <div className="">
            {box.imageUrl && (
                    <Image alt="alt" src={box.imageUrl} width={100} height={100} className="w-full" />
                  )}             
            </div>

            <div className=''>

            <div className='px-5 text-xs'>
              <p>{box.location}</p>
            </div>
            <div className='flex justify-between px-5 text-xs text-[#1567E0] pb-5'>
              <div className='flex gap-2'>
              <p className="">
              ${box.price}
            </p>
            <Link href={`/pages/product/${box.slug}`}>
            <Image src={arrow}/>
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
        </div>
      ))}
    </div>
  );
};

export default BoxGrid;
