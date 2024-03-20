import { Carousel } from "@mantine/carousel";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import fidson from "../../../public/assets/fidson.svg";
import sanofi from "../../../public/assets/sanofi.svg";
import pg from "../../../public/assets/pg.svg";
import pwc from "../../../public/assets/pwc.svg";
import sygen from "../../../public/assets/sygen.svg";
import merk from "../../../public/assets/merk.png";
import Slider from 'react-slick';


import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const InfiniteLoopSlider = () => {
  const settings = {
    autoplay: true,
    autoplaySpeed: 0,
    speed: 3500, // Adjust the speed according to your preference
    cssEase: 'linear',
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    initialSlide: 0,
    arrows: false,
    variableWidth: true,
    pauseOnHover: false,
  };

  return (
    <Slider className=" justify-center items-center gap-10 my-5" {...settings}>
      <div className="mx-20 flex justify-center items-center">
      <Image src={fidson} alt="Slide 1" />
      </div>
      <div className="mx-20 flex justify-center items-center">
      <Image src={sanofi} alt="Slide 1" />
      </div>
      <div className="mx-20 flex justify-center items-center">
      <Image src={pg} alt="Slide 1" />
      </div>
      <div className="mx-20 flex justify-center items-center">
      <Image src={pwc} alt="Slide 1" />
      </div>
      <div className="mt-5 flex justify-center items-center">
      <Image src={sygen} alt="Slide 1" />
      </div>
      <div className="mx-20 flex justify-center items-center">
      <Image src={merk} alt="Slide 1" />
      </div>
      <div className="mx-20 flex justify-center items-center">
      <Image src={fidson} alt="Slide 1" />
      </div>
      <div className="mx-20 flex justify-center items-center">
      <Image src={sanofi} alt="Slide 1" />
      </div>
      <div className="mx-20 flex justify-center items-center">
      <Image src={pg} alt="Slide 1" />
      </div>
      <div className="mx-20 flex justify-center items-center">
      <Image src={pwc} alt="Slide 1" />
      </div>
      <div className="mt-5 mx-20 flex justify-center items-center">
      <Image src={sygen} alt="Slide 1" />
      </div>
      <div className="mx-20 flex justify-center items-center">
      <Image src={merk} alt="Slide 1" />
      </div>
      <div className="mx-20 flex justify-center items-center">
      <Image src={fidson} alt="Slide 1" />
      </div>
      <div className="mx-20 flex justify-center items-center">
      <Image src={sanofi} alt="Slide 1" />
      </div>
      <div className="mx-20 flex justify-center items-center">
      <Image src={pg} alt="Slide 1" />
      </div>
      <div className="mx-20 flex justify-center items-center">
      <Image src={pwc} alt="Slide 1" />
      </div>
      <div className="mt-5 mx-20 flex justify-center items-center">
      <Image src={sygen} alt="Slide 1" />
      </div>
      <div className="mx-20 flex justify-center items-center">
      <Image src={merk} alt="Slide 1" />
      </div>
      
      

      {/* Add more images as needed */}
    </Slider>
  );
};

export default InfiniteLoopSlider;
