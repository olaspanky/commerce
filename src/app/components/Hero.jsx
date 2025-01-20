import React, { forwardRef, useState, useEffect } from 'react';
import Card from "./Cards";
import { client } from "../lib/sanity";
import Carousel from "../components/Carousel"
import { Book, Sparkles, Search } from 'lucide-react';
import Link from 'next/link';


async function fetchData() {
  const query = `*[_type == 'product'] | order(_createdAt desc){
    _id, image, location, position, price, name, available, details, sumary, objective, methodology, pdfFile,
    "slug": slug.current,
    "imageUrl": image[0].asset->url      
  }`;
  const data = await client.fetch(query);
  return data;
}

const Hero = forwardRef((props, ref) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchDataAndUpdateState() {
      try {
        const fetchedData = await fetchData();
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchDataAndUpdateState();
  }, []);

  const [showCarousel, setShowCarousel] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCarousel(true);
    }, 4000); // 4 seconds delay

    return () => clearTimeout(timer); // Clean up the timer if the component unmounts
  }, []);

  const features = [
    {
      icon: <Book className="w-5 h-5" />,
      text: "Premium Health Reports"
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      text: "Expert Market Analysis"
    },
    {
      icon: <Search className="w-5 h-5" />,
      text: "Comprehensive Insights"
    }
  ];

  return (
    <div ref={ref} className="flex flex-col justify-center items-center">
      <div className="flex md:hidden bg-gray-100">
        <h1 className='text-xs lg:text-md xl:text-xl font-light font-work text-black p-2 '>The reports are focused on insights from patients, healthcare practitioners,<br className="hidden lg:flex"/> healthcare ecosystems and channels within emerging markets</h1>
      </div>
        <div className="flex w-[100vw] h-20">
          <Carousel /> 
        </div>

         {/* Main Hero Section */}
         <div className="w-full  ">
        <div className="text-center max-w-3xl mx-auto">
         

          {/* Feature Pills */}
        

          {/* CTA Button */}
          
        </div>
      </div>
      <h1 className="text-3xl text-center my-5 font-bold">
  Chart Your Course to Success -{" "}
  <span className="text-[#1567E0]">
    <Link href="/pages/sub">
      <button
        className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium shadow-lg shadow-blue-100 transition-transform duration-200 hover:shadow-xl hover:shadow-blue-100 transform hover:-translate-y-0.5"
      >
        Subscribe Now
      </button>
    </Link>
  </span>
</h1>



      <div className="mx-1 p-3 my-5 w-full lg:px-10  2xl:px-20">
        <Card data={data} />
      </div>


       
    </div>
  );
});

export default Hero;
