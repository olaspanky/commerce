"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Nav from "../../../components/Navbar";
import Card from "../../../components/Cards";
import arrow from "../../../../../public/assets/vec.svg";
import catbg from "../../../../../public/assets/catbg.jpg";
import { client } from "@/app/lib/sanity";
import MobileNavbar from "@/app/components/MobileNav";
import Footer from "@/app/components/Footer";

// Function to fetch data
async function fetchData(category) {
  const query = `*[_type == "product" && "${category}" in categories[]->name] | order(_createdAt desc){
    _id, 
    image, 
    location, 
    price, 
    name, 
    available, 
    details, 
    summary, 
    objective, 
    methodology, 
    pdfFile,
    "slug": slug.current,
    "imageUrl": image[0].asset->url,
    "categoryInfo": *[_type == "category" && name == "${category}"][0]{
        name,
        description,
        "imageUrl": image[0].asset->url
    }
  }`;

  const data = await client.fetch(query);
  return data;
}

export default function CategoryPage({ params }) {
  const [products, setProducts] = useState(null);
  const [categoryDetails, setCategoryDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Skeleton Loader Component
  const CategoryPageSkeleton = () => (
    <div className="bg-white h-full animate-pulse">
      {/* Navbar Skeleton */}
      <div className="hidden md:flex w-full h-16 bg-gray-200"></div>
      <div className="md:hidden h-16 bg-gray-200"></div>

      {/* Breadcrumb Skeleton */}
      <div className="flex gap-2 lg:gap-10 my-5 xl:px-20 2xl:px-36">
        <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
      </div>

      {/* Content Skeleton */}
      <div className="lg:px-20 2xl:px-36 my-20 p-2 flex flex-col gap-5 lg:gap-20">
        <div className="flex flex-col gap-5 lg:gap-9 lg:flex-row">
          {/* Image Placeholder */}
          <div className="lg:w-1/2 h-[50vh] bg-gray-200 rounded"></div>
          
          {/* Text Placeholder */}
          <div className="lg:w-1/2 flex flex-col gap-3">
            <div className="h-4 bg-gray-300 w-full rounded"></div>
            <div className="h-4 bg-gray-300 w-3/4 rounded"></div>
            <div className="h-4 bg-gray-300 w-1/2 rounded mt-4"></div>
          </div>
        </div>

        {/* Cards Skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-gray-200 h-64 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const data = await fetchData(params.category);
        setProducts(data);

        // Extract category details from the first product (they all share the same category)
        if (data.length > 0) {
          setCategoryDetails(data[0].categoryInfo);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [params.category]);

  // If loading, return skeleton
  if (isLoading) {
    return <CategoryPageSkeleton />;
  }

  const categoryImage = categoryDetails?.imageUrl;

  return (
    <div className="bg-white h-full">
      <div className="hidden md:flex w-full"> {/* Desktop Menu */}
        <Nav/>
      </div>
      <div className="md:hidden">
        <MobileNavbar/>
      </div>
      
      <div className="flex gap-2 lg:gap-10 my-5 xl:px-20 2xl:px-36 cursor-pointer">
        <Link href="/">
          <p className="text-sm">Range of Categories</p>
        </Link>
        <Image src={arrow} alt="Arrow" />
        <p className="text-sm font-bold capitalize">{params.category}</p>
      </div>
      
      <div className="lg:px-20 2xl:px-36 my-20 p-2 flex flex-col gap-5 lg:gap-20">
        <div className="flex flex-col gap-5 lg:gap-9 lg:flex-row">
          <div className="lg:w-1/2">
            {categoryImage && (
              <div className="relative mb-2 h-[50vh]">
                <img
                  className="cursor-pointer absolute hover:shadow-outline"
                  src={categoryImage}
                  alt="Category"
                  width="600"
                />
                <Image
                  className="absolute opacity-20"
                  src={catbg}
                  alt="Background"
                  width="600"
                />
              </div>
            )}
          </div>
          <div className="lg:w-1/2 flex flex-col gap-3 text-black">
            <p className="text-[#666666] text-md">{categoryDetails?.description}</p>
            <p className="my-3 text-xs text-gray-300">15 Apr 2024</p>
          </div>
        </div>
        
        <div className="mt-2">
          <Card data={products} />
        </div>
      </div>

      <Footer/>
    </div>
  );
}