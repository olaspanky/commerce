"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import Nav from "../../components/Nav3"
import Form from "../../components/Contactform"
import data from "../../components/data"
import lady from "../../../../public/assets/maint.png"
import logo from "../../../../public/assets/logo.svg"
import Image from 'next/image';
import Link from "next/link";
import { SocialIcon } from "react-social-icons";


import { useParams } from "next/navigation";



const ProductDetail = () => {
const params = useParams();
const card = data.find((item) => item.id === parseInt(params.productid));
console.log("card is", card)
  

  return (
    <div className='w-[100vw]  '>
      <Nav/>
<div className= "lg:py-9 lg:p-20 2xl:px-36">      
        </div>
      <div className="lg:grid grid-cols-12">

        <div className="col-span-9 p-1 flex flex-col lg:px-20 2xl:px-36 justify-center gap-20 ">
      

          <h1 className="font-work font-extrabold text-3xl ">
          </h1>
          <h1 className=" text-[#31456A] text-7xl font-bold">
            Under<br/ >Maintenance
          </h1>{" "}
          <div className='flex justify-center gap-2 items-center'>
          <h1 className=" text-[#666666]">
Website is currently under construction, we will let you know when things are good to go.
You can subscribe to our mailing list so you can be notified when we go live
          </h1>{" "}

          </div>
          
       <div class="flex flex-col gap-3">
  <input type="text" placeholder="Enter your email" class="w-[70%] px-4 py-2 bg-bbg  bg-cover placeholder-[#1F1D21]  text-[#1F1D21] rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"/>
  <button class="  px-4 py-2 w-48 bg-bbg text-left  text-[#1F1D21] rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Subscribe</button>
</div>



        </div> 



        <div className="col-span-3 h-full flex justify-end  items-end">
          <Image
            src={lady}
            alt=""
            className=""
          />
         
        </div>
      </div>
          </div>
  );
};

export default ProductDetail;

// Fetch data based on the productId

