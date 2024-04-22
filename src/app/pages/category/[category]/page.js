"use client";
import React from "react";
import Image from "next/image";
import Nav from "../../../components/Navbar";
import catti from "../../../../../public/assets/catti1.png";
import Card from "../../../components/Cards";
import { useState, useEffect } from "react";

import { client } from "@/app/lib/sanity";

async function fetchData(category) {
  const query = `*[_type == "product" && category->name == "${category}"] | order(_createdAt desc){
      _id, image, location, price, name, details, sumary, objective, methodology, pdfFile,
        "slug": slug.current,
        "imageUrl": image[0].asset->url,
        "categoryName": category->name      
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
      <div className="lg:px-20 2xl:px-36 my-20 flex flex-col gap-5 lg:gap-20">
      <div className="flex flex-col gap-5 lg:gap-9 lg:flex-row ">
        <div className="lg:w-1/2 ">
          <Image src={catti} alt="" />
        </div>
        <div className="lg:w-1/2 flex flex-col gap-3 text-black">
          <h1 className="text-[#404040] text-lg text-left">
            Lorem Ipsum Is a Dummy Text Used As The Heading Of Insight
          </h1>
          <p className="text-[#666666] text-md">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam.
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam.
          </p>
        </div>
      </div>
      <div>
        <Card data={cardData} />
      </div>
      </div>
    </div>
  );
}
