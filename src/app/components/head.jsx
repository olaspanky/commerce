import React, { useState, useRef } from "react";
import Image from "next/image";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Navbar from "../components/Nav2";
import Carousel from "./Carousel";
import Link from "next/link";
import frame1 from "../../../public/assets/frame1.png";
import frame2 from "../../../public/assets/frame2.png";
import frame3 from "../../../public/assets/frame3.png";
import frame4 from "../../../public/assets/frame4.png";
import frame5 from "../../../public/assets/frame5.png";
import frame6 from "../../../public/assets/frame6.png";
import frame7 from "../../../public/assets/frame7.png";
import frame8 from "../../../public/assets/frame8.png";

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  zIndex: 1,
  overflow: "hidden",
  height: "100vh",
  width: "100vw",
};

const buttonStyle = {
  width: "0px",
  background: "none",
  border: "0px",
};

const properties = {
  prevArrow: (
    <button style={{ ...buttonStyle }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff">
        <path d="M242 180.6v-138L0 256l242 213.4V331.2h270V180.6z" />
      </svg>
    </button>
  ),
  nextArrow: (
    <button style={{ ...buttonStyle }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff">
        <path d="M512 256L270 42.6v138.2H0v150.6h270v138z" />
      </svg>
    </button>
  ),
  duration: 15000,
  transitionDuration: 1000,
  indicators: false,
  arrows: false,
};

const slideImages = [
  { url: frame1, caption: "Slide 1", zoomDirection: "center", zoomScale: 1.3 },
  { url: frame2, caption: "Slide 2", zoomDirection: "top-right", zoomScale: 1.25 },
  { url: frame3, caption: "Slide 3", zoomDirection: "bottom-left", zoomScale: 1.4 },
  { url: frame4, caption: "Slide 4", zoomDirection: "center", zoomScale: 1.3 },
  { url: frame5, caption: "Slide 5", zoomDirection: "top-left", zoomScale: 1.35 },
  { url: frame6, caption: "Slide 6", zoomDirection: "bottom-right", zoomScale: 1.3 },
  { url: frame7, caption: "Slide 7", zoomDirection: "center", zoomScale: 1.4 },
  { url: frame8, caption: "Slide 8", zoomDirection: "top-right", zoomScale: 1.3 },
];

const Hero = ({ scrollToHero }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const slideRef = useRef(null);

  const handleSlideChange = (previousIndex, nextIndex) => {
    setActiveIndex(nextIndex);
  };

  return (
    <div className="relative w-screen h-screen z-0">
      <style jsx global>{`
        @keyframes zoomEffect {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(var(--target-scale));
          }
        }
        .zoom-container {
          width: 100%;
          height: 100%;
          position: relative;
          will-change: transform;
        }
        .zoom-active {
          animation: zoomEffect ${properties.duration}ms ease-in-out forwards;
        }
        .react-slideshow-container {
          width: 100%;
          height: 100%;
        }
      `}</style>

      <div className="slide-container w-full h-full">
        <Fade
          ref={slideRef}
          {...properties}
          onChange={handleSlideChange}
          cssClass="w-full h-full"
        >
          {slideImages.map((slide, index) => (
            <div key={index} className="w-full h-full">
              <div style={divStyle}>
                <div
                  className={`zoom-container ${activeIndex === index ? "zoom-active" : ""}`}
                  style={{
                    "--target-scale": slide.zoomScale,
                    transformOrigin: slide.zoomDirection,
                  }}
                >
                  <Image
                    src={slide.url}
                    alt={slide.caption}
                    fill
                    sizes="100vw"
                    quality={100}
                    priority={index === 0}
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </Fade>
      </div>

      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10">
        <div className="w-full z-20">
          <div className="hidden md:block">
            <Navbar />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full flex flex-col justify-between h-auto z-10">
          <div className="p-3 lg:py-20 xl:px-20 xl:py-36 2xl:px-36 2xl:py-48 flex flex-col gap-5 xl:gap-7 2xl:gap-10 md:gap-5">
            <h1 className="text-md xl:text-2xl font-light font-work text-white">
              Leverage the power of real world data when you subscribe to
            </h1>
            <h1 className="text-sm md:text-3xl xl:text-5xl font-extrabold font-work text-white">
              PBR MARKET INTELLIGENCE REPORT
            </h1>
            <h1 className="text-xs lg:text-md xl:text-xl font-light font-work text-white hidden md:block">
              The reports are focused on insights from patients, healthcare
              practitioners,
              <br /> healthcare ecosystems and channels within emerging markets
            </h1>
            <div className="flex items-center gap-3">
              <button
                className="p-2 px-3 2xl:w-48 text-sm lg:text-lg font-bold lg:w-[25%] bg-[#1567E0] text-white rounded-md hover:bg-blue-900"
                onClick={scrollToHero}
              >
                <Link href="/pages/sub">SUBSCRIBE NOW</Link>
              </button>
            </div>
          </div>
          <div className="w-full max-h-[20%] h-20 hidden md:block">
            <Carousel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
