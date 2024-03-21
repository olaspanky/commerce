import React, { useState } from "react";
import Image from "next/image";
import arrow from "../../../public/assets/farrow.svg";
import eye from "../../../public/assets/eye.svg";
import Link from "next/link";
import progress1 from "../../../public/assets/progress.svg";
import pic1 from "../../../public/assets/Picturecommerce1.svg";
import bin from "../../../public/assets/trashbin.svg";

const alldata = [
  {
    id: 1,
    location: "Nigeria",
    icon: pic1,
    price: "$200",
    view: "24",
    description:
      "Product 1 is a top-rated item from Nigeria. It comes with amazing features and is perfect for various occasions. Don't miss out on this fantastic product!",
  },
];

const BoxGrid = ({ card }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-10 my-20 px-10 2xl:px-36">
      <div className="col-span-6 flex flex-col gap-5  ">
        <h1>Checkout</h1>

        <div className="flex flex-col gap-5 justify-center items-center">
          <Image src={progress1} alt="" />
          <div className="border border-gray-100 w-full"></div>
        </div>

        <div className="flex flex-col gap-5 text-[#4F4F4F]">
          <h1>Contact Information</h1>
          <div className="flex flex-col gap-10">
            <div className="flex gap-5">
              <div className="flex flex-col gap-2 w-1/2">
                <label>First Name</label>
                <input className="w-full p-2 rounded-md border border-black" />
              </div>
              <div className="flex flex-col gap-2 w-1/2">
                <label>Last Name</label>
                <input className="w-full p-2 rounded-md border border-black" />
              </div>
            </div>
            <div className="flex gap-5">
              <div className="flex flex-col gap-2 w-1/2">
                <label>Email Address</label>
                <input className="w-full p-2 rounded-md border border-black" />
              </div>
              <div className="flex flex-col gap-2 w-1/2">
                <label>Phone Number</label>
                <input className="w-full p-2 rounded-md border border-black" />
              </div>
            </div>
          </div>
          <button className="bg-[#1567E0] p-3 rounded-md text-white my-9">
            Proceed to payment
          </button>
        </div>

    
      </div>

      <div className="col-span-6 flex flex-col justify-between h-[60vh] 2xl:h-[80vh] text-center px-10 rounded-md ">
        <div>

        <h1>Your Order</h1>

        <div className="flex flex-col gap-5 justify-center items-center">
          <div className="border border-gray-100 w-full my-5"></div>
          <div className="grid grid-cols-12">
            <div className="col-span-7 flex justify-center items-center ">
            <div className="flex w-1/2 justify-between items-center py-3 px-10">
            {/* image */}
          <div className="">
            <div className="flex rounded-md shadow-md flex-col gap-3">
              <div className="">
                <Image alt="alt" src={alldata[0].icon} className="w-full" />
              </div>
              <div className="px-5 text-xs">
                <p>{alldata[0].location}</p>
              </div>
             
            </div>
          </div>

          
        </div>
        <h1 className="text-xs flex w-1/2 ">Anti-infective Report Analysis-2023 Edition </h1>
            </div>
            <div className="col-span-5">
                <h1>Quantity</h1>
            </div>
          </div>
        </div>
        </div>

        <div className="flex flex-col gap-20 text-sm">
            <div className="flex w-full justify-between">
                <h1>Quantity</h1>
                <p>$850</p>
            </div>
            <div className="flex w-full justify-between">
                <h1>Total</h1>
                <p>$850</p>
            </div>
            
        </div>


      </div>
    </div>
  );
};

export default BoxGrid;
