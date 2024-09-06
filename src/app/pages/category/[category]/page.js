"use client";
import React from "react";
import Image from "next/image";
import Nav from "../../../components/Navbar";
import catti from "../../../../../public/assets/catti1.png";
import Card from "../../../components/Cards";
import { useState, useEffect } from "react";
import Link from 'next/link';
import arrow from "../../../../../public/assets/vec.svg";
import catbg from "../../../../../public/assets/catbg.jpg";



import { client } from "@/app/lib/sanity";

async function fetchData(category) {
  const query = `*[_type == "product" && category->name == "${category}"] | order(_createdAt desc){
      _id, image, location, price, name, details, sumary, objective, methodology, pdfFile,
        "slug": slug.current,
        "imageUrl": image[0].asset->url,
        "categoryName": category->name,      
        "categoryDescription": category->description,
        "categoryImage": category->image[0].asset->url    
    }`;
  const data = await client.fetch(query);
  return data;
}

export default function categoryPage({ params }) {
  const [cat, setCat] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const data = await fetchData(params.category);
        setCat(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getData();
  }, [params.slug]);

  const data = cat;
  const cardData = data;
  console.log("Carddata category is,:", cardData);

  return (
    <div className="bg-white h-full">
      <Nav />
      <div className="flex gap-2 lg:gap-10 my-5 p-2 xl:px-20 2xl:px-36 cursor-pointer">
          <Link href="/">
          <p className="text-sm ">         Range of Categories
</p> 
          </Link>
          <Image src={arrow} alt=""/>
          <p className="text-sm font-bold capitalize"> {cardData && cardData.length > 0 && cardData[0].categoryName}</p>

        </div>
      <div className="lg:px-20 2xl:px-36 my-20 flex flex-col gap-5 lg:gap-20">
      <div className="flex flex-col gap-5 lg:gap-9 lg:flex-row ">
        <div className="lg:w-1/2 ">
        {cardData && cardData.length > 0 &&
        //  <div className=" bg-catbg z-20">
        //  <img src={cardData[0].categoryImage} alt="" className="w-full z-5" />
        //  </div>
        <div class="relative mb-2 h-[50vh]">
    <img class="cursor-pointer absolute  hover:shadow-outline" src={cardData[0].categoryImage} width="600" />


  <Image class="absolute  opacity-20" src={catbg} alt="Workplace" width="600" />


</div>
                  }

        </div>
        <div className="lg:w-1/2 flex flex-col gap-3 text-black">
          
          <p className="text-[#666666] text-md">
          {cardData && cardData.length > 0 && cardData[0].categoryDescription}
          </p>

          <p className="my-3 text-xs text-gray-300 ">15 Apr 2024</p>
        </div>
      </div>
      <div className="mt-2">
        <Card data={cardData} />
      </div>
      </div>
    </div>
  );
}
