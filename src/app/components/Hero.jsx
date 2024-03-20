import React from "react";
import Card from "./Cards";
import alldata from "./data";
import { client } from "../lib/sanity";
import { useState, useEffect } from "react";
import Confetti from './Confetti';

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
       <h1 className="text-green-500">
        </h1>
      <h1 className="text-3xl my-5 font-bold ">
       
        Chart Your Course to Success -{" "}
        <span className="text-[#1567E0]">Order Your Report Today</span>
      </h1>

      <div className="mx-1 p-3 my-20">
        <Card data={cardData} />
      </div>
     
    </div>
  );
}
