import React from "react";
import Image from "next/image";
import Link from 'next/link';

// Import your category images
import cat1 from "../../../public/assets/hcp.png";
import cat2 from "../../../public/assets/cat2.png";
import cat3 from "../../../public/assets/cat3.png";
import cat4 from "../../../public/assets/patient.png";

const CategoryComponent = ({ isLoading = false }) => {
  // Skeleton Loader for Category
  const CategorySkeleton = () => (
    <div className="flex flex-col my-20 animate-pulse">
      <div className="text-center flex flex-col gap-5">
        <div className="h-10 bg-gray-300 w-1/2 mx-auto rounded"></div>
        <div className="h-6 bg-gray-300 w-3/4 mx-auto rounded"></div>
      </div>

      <div className="flex flex-row gap-5 p-3 xl:px-20 2xl:px-36 items-center">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="w-1/3 bg-gray-200 h-64 rounded-lg"></div>
        ))}
      </div>
    </div>
  );

  // If loading, return skeleton
  if (isLoading) {
    return <CategorySkeleton />;
  }

  return (
    <div className="flex flex-col my-20">
      <div className="text-center flex flex-col gap-5">
        <h1 className="xl:text-3xl text-[#3D3D3D]">
          View Our Range Of Categories
        </h1>
        <h1 className="text-[#666666] m-2 xl:mx-48 text-sm">
          Deep dive into emerging markets with our reports on markets, channels,
          <br className="hidden lg:flex"/> Healthcare practioners, Patients and Health Care Ecosystem
        </h1>
      </div>

      <div className="flex flex-row gap-5 p-3 xl:px-20 2xl:px-36 items-center">
        <div className="w-1/3 cursor-pointer transition-transform duration-300 transform hover:scale-105">
          <Link href={`/pages/category/Hcp`}>
            <Image alt="Healthcare Professionals" src={cat1} className="w-full" />
          </Link>
        </div>

        <div className="w-1/3 flex flex-col gap-5">
          <div className="cursor-pointer transition-transform duration-300 transform hover:scale-105">
            <Link href={`/pages/category/Healthcare-Ecosystem-Insights`}>
              <Image alt="Healthcare Ecosystem Insights" src={cat2} className="w-full" />
            </Link>
          </div>
          <div className="cursor-pointer transition-transform duration-300 transform hover:scale-105">
            <Link href={`/pages/category/Market-Insight`}>
              <Image alt="Market Insights" src={cat3} className="w-full" />
            </Link>
          </div>
        </div>
        <div className="w-1/3 cursor-pointer transition-transform duration-300 transform hover:scale-105">
          <Link href={`/pages/category/Patient-Insight`}>
            <Image alt="Patient Insights" src={cat4} className="w-full" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryComponent;