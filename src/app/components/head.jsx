

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import frame1 from"../../../public/assets/frame1.png";
import frame2 from"../../../public/assets/frame2.png";
import frame3 from"../../../public/assets/frame3.png";
import frame4 from"../../../public/assets/frame4.png";
import frame5 from"../../../public/assets/frame5.png";
import frame6 from"../../../public/assets/frame6.png";
import frame7 from"../../../public/assets/frame7.png";
import frame8 from"../../../public/assets/frame8.png";
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import Navbar from "../components/Nav2"
import Carousel from "./Carousel"

const spanStyle = {
  padding: '20px',
  background: '#efefef',
  color: '#000000'
};

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: 'cover',
  position: 'relative', // Added position relative
  zIndex: 1, // Added z-index
};

const buttonStyle = {
  width: "0px",
  background: 'none',
  border: '0px'
};

const properties = {
  prevArrow: <button style={{ ...buttonStyle }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none"><path d="M242 180.6v-138L0 256l242 213.4V331.2h270V180.6z"/></svg></button>,
  nextArrow: <button style={{ ...buttonStyle }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none"><path d="M512 256L270 42.6v138.2H0v150.6h270v138z"/></svg></button>
};

const slideImages = [
  {
    url: frame1,
    caption: 'Slide 1'
  },
  {
    url: frame2,
    caption: 'Slide 2'
  },
  {
    url: frame3,
    caption: 'Slide 3'
  },
  {
    url: frame4,
    caption: 'Slide 1'
  },
  {
    url: frame5,
    caption: 'Slide 2'
  },
  {
    url: frame6,
    caption: 'Slide 3'
  },
  {
    url: frame7,
    caption: 'Slide 1'
  },
  {
    url: frame8,
    caption: 'Slide 2'
  },
 
];

const Hero = ({ scrollToHero }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (slideRef.current) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slideImages.length);
        slideRef.current.goTo(currentIndex);
      }
    }, 15000); // 15 seconds

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex]);

  return (
    <div className='max-w-[100vw]  z-0 relative  top-0'> {/* Added relative position */}
      <div className="slide-container">
        <Fade ref={slideRef} {...properties} controls={false}>
          {slideImages.map((slideImage, index) => (
            <div key={index}>
              <div style={{ ...divStyle }}>
                <Image src={slideImage.url} alt={slideImage.caption} className='h-auto lg:h-[100vh] w-[100vw]'  />
              </div>
            </div>
          ))}
        </Fade>
      </div>
      
      <div className=' bg-black bg-opacity-50  absolute top-0 z-10 left-0 w-full h-full'>
        <div className='z-15'>
        <Navbar/>


        </div>
        <div className='   absolute  z-10 left-0 w-full h-auto top-auto bottom-0  flex flex-col justify-between '>

        <div className=' p-3 lg:py-20 xl:px-20 xl:py-36 2xl:px-36 2xl:py-48 my-auto flex flex-col gap-5 xl-gap-7 2xl:gap-10 md:gap-5'>
        <h1 className='text-md xl:text-2xl font-light font-work text-[#FFFFFF]'>Leverage the power of real world data when you subscribe to </h1>
          <h1 className='text-sm md:text-3xl  xl:text-5xl font-extrabold font-work text-[#FFFFFF]'>PBR MARKET INTELLIGENCE REPORT</h1>
          <h1 className='text-xs lg:text-md xl:text-xl font-light font-work text-white hidden md:flex'>The reports are focused on insights from patients, healthcare practitioners,<br/> healthcare ecosystems and channels within emerging markets</h1>
          <div className="flex items-center gap-3">
            <button className=" p-2 px-3 2xl:w-48 texy-sm lg:text-lg font-bold lg:w-[15%] bg-[#1567E0] text-[white] rounded-md hover:bg-blue-900 "
                      onClick={scrollToHero}  // Add onClick handler to scroll to Hero section
                      >
              ORDER NOW
            </button>
          </div>
        </div>
        <div className="w-[100vw] max-h-[20]  top-auto hidden md:flex"><Carousel/></div>



        </div>

      </div>


    </div>
  );
};

export default Hero;
