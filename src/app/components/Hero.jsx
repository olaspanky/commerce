import React from "react";
import Card from "./Cards";
import alldata from "./data";
import { client } from "../lib/sanity";
import { useState, useEffect } from "react";
import Confetti from './Confetti';
import Carousel from "./Carousel"

async function getData() {
  const query = `*[_type == 'product'] | order(_createdAt desc){
    _id, image, location, price, name, details,sumary, objective,methodology,pdfFile,
      "slug": slug.current,
      "imageUrl": image[0].asset->url      
  }`;
  const data = await client.fetch(query);
  return data;
}

async function fetchData(slug) {
  const query = `*[_type == 'product'] | order(_createdAt desc){
    _id, image, location, price, name, details,sumary, objective,methodology,pdfFile,
      "slug": slug.current,
      "imageUrl": image[0].asset->url      
  }`;
    const data = await client.fetch(query);
  return data;
}





export default  function Hero() {
  const [data1, setData1] = useState(null);
  const [isVisible, setIsVisible] = useState(false);



  useEffect(() => {
    async function getData() {
      try {
        const data = await fetchData();
        setData1(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getData();
  }, []);


  const data = data1;
  const cardData = data
  console.log("Carddata is,:", cardData);
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex md:hidden bg-gray-100">
      <h1 className='text-xs lg:text-md xl:text-xl font-light font-work text-black p-2 '>The reports are focused on insights from patients, healthcare practitioners,<br className="hidden lg:flex"/> healthcare ecosystems and channels within emerging markets</h1>
         
        </div>
        <div className="flex md:hidden w-full py-2 top-auto h-full bg-black "><Carousel/></div>
      
      <h1 className="text-3xl text-center my-5 font-bold ">
       
        Chart Your Course to Success -{" "}
        <span className="text-[#1567E0]">Order Your Report Today</span>
      </h1>

      <div className="mx-1 p-3 my-5 w-full lg:px-10  2xl:px-20">
        <Card data={cardData} />
      </div>
     
    </div>
  );
}
