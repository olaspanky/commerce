import React from "react";
import Image from "next/image";
import cat1 from "../../../public/assets/hcp.png";
import cat2 from "../../../public/assets/cat2.png";
import cat3 from "../../../public/assets/cat3.png";
import cat4 from "../../../public/assets/patient.png";
import Link from 'next/link';


const category = () => {
  return (
    <div className="flex flex-col my-20">
      <div className="text-center flex flex-col gap-5">
        <h1 className="xl:text-3xl text-[#3D3D3D]">
          View Our Range Of Categories
        </h1>
        <h1 className="text-[#666666] m-2 xl:mx-48 text-sm">
          Deep dive into emerging markets with our reports on markets, channels,
          <br className="hidden lg:flex"/> Healthcare practioners, Patients and Health Care Ecosystem

        </h1>
      </div>

      <div className="flex flex-row  gap-5 p-3 xl:px-20 2xl:px-36 items-center">
        <div className="w-1/3 cursor-pointer transition-transform duration-300 transform hover:scale-105">
        <Link href={`/pages/category/Healthcare-Ecosystem-Insights`}>

          <Image alt="alt" src={cat1} className="w-full" />
          </Link>

        </div>

        <div className="w-1/3 flex flex-col gap-5 ">
        <div className=" cursor-pointer transition-transform duration-300 transform hover:scale-105">
            {" "}
            <Image alt="alt" src={cat2} className="w-full" />
          </div>
          <div className=" cursor-pointer transition-transform duration-300 transform hover:scale-105">
            <Image alt="alt" src={cat3} className="w-full" />
          </div>
        </div>
        <div className="w-1/3 cursor-pointer transition-transform duration-300 transform hover:scale-105">
          {" "}
          <Image alt="alt" src={cat4} className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default category;
