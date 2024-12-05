"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import Nav from "../../components/Nav3"
import Form from "../../components/Contactform"
import data from "../../components/data"
import lady from "../../../../public/assets/cu.png"
import logo from "../../../../public/assets/logo.svg"
import Image from 'next/image';
import Link from "next/link";
import { SocialIcon } from "react-social-icons";
import MobileNavbar from '@/app/components/MobileNav';


import { useParams } from "next/navigation";



const ProductDetail = () => {
const params = useParams();
const card = data.find((item) => item.id === parseInt(params.productid));
//console.log("card is", card)
  

  return (
    <div className='w-[100vw] bg-white'>
 <div className="hidden md:flex justify-between w-full"> {/* Desktop Menu */}
<Nav/>        </div>
          <div className="md:hidden">
<MobileNavbar/>
      </div>
     
      <div className="flex flex-col-reverse lg:flex-row ">

        <div className="lg:w-1/2 p-2 flex flex-col lg:px-20 2xl:px-36 justify-center gap-9 ">
       

          <h1 className="font-work font-extrabold text-3xl ">
            Get Intouch with Us
          </h1>
          <h1 className=" text-[#666666]">
            Kick-start your business planning with real-word data and market
            insight today
          </h1>{" "}
          <div className='w-full'>
          <Form />

          </div>
          <div className='flex justify-center gap-2 items-center'>
          <h1 className=" text-[#666666]">
          You can also follow us on

          </h1>{" "}
          <SocialIcon network="linkedin"bgColor='none' fgColor="blue" />

          </div>
       


        </div>



        <div className="lg:w-1/2 h-full justify-center  items-center">
          <Image
            src={lady}
            alt=""
            className="w-full h-full"
          />
         
        </div>
      </div>
          </div>
  );
};

export default ProductDetail;

// Fetch data based on the productId

