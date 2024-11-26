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
import BoxGrid from '@/app/components/blogCard';
import { useParams } from "next/navigation";
import { client } from "@/app/lib/sanity";
import MobileNavbar from '@/app/components/MobileNav';

import Footer from '@/app/components/Footer';



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
     
      <div className='p-2 lg:p-20 '>
      <h1 className="text-3xl text-center my-5 font-bold ">
        Chart Your Course to Success -{" "}
        <span className="text-[#1567E0]">Order Your Report Today</span>
      </h1>


      <div className="mx-1 p-3 my-5 w-full lg:px-10  2xl:px-20">
        <BoxGrid />
      </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ProductDetail;

// Fetch data based on the productId

