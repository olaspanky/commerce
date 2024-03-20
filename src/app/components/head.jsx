import React from 'react'
import { useState } from 'react';
import Image from 'next/image';
import earth from"../../../public/Earth.svg"


const Hero = () => {
    const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  return (
    <div className='bg-bgImage h-[950px] bg-cover bg-no-repeat'>
        <div className='grid grid-cols-12 h-full'>
            <div className='col-span-7 p-36 my-auto flex flex-col gap-10 h-full justify-center mt-10  '>
                <h1 className='text-5xl font-extrabold font-work text-white'>PBR MARKET <br/>INTELLIGENCE REPORT</h1>
                <h1 className='text-2xl font-light font-work text-white'>Achieve Business Success with Real-World Data and Insights from In-Market Industry Experts!</h1>
                <div class="flex items-center gap-3 ">
  <input type="text" class="rounded-md p-2 border border-white  bg-transparent  w-[70%]" placeholder="Search..."/>
  <button class="ml-2 p-2 w-[30%] bg-white text-[#1567E0] rounded-md hover:bg-blue-600 ">
    Search
  </button>
</div>

<div className='grid grid-cols-3 gap-2 text-white'>
    <h1 className='border p-1 border-white rounded-md text-center text-xs'>Pharma Intelligence Report </h1>
    <h1 className='border p-1 border-white rounded-md text-center text-xs'>FMCG - Consumer Intelligence Report  </h1>
    <h1 className='border p-1 border-white rounded-md text-center text-xs'>Diagnostics Intelligence Report  </h1>
</div>

            </div>

            <div className='col-span-5 flex items-center justify-center'>
<Image src={earth}/>
            </div>
            
        </div>
    

    </div>
  )
}

export default Hero