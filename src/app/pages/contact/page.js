"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import Nav from "../../components/Navbar"
import Form from "../../components/Contactform"
import data from "../../components/data"
import lady from "../../../../public/assets/lady.png"
import Image from 'next/image';

import { useParams } from "next/navigation";



const ProductDetail = () => {
const params = useParams();
const card = data.find((item) => item.id === parseInt(params.productid));
console.log("card is", card)
  

  return (
    <div>
      <Nav/>
      <div className="w-full  mt-20 flex lg:flex-row flex-col  lg:my-20  place-content-center items-center justify-center ">
        <div className="lg:w-1/2 p-20  justify-center  items-center">
          <Image
            src={lady}
            alt=""
            className=" "
          />
         
        </div>

        <div className="lg:w-1/2 p-1 flex flex-col lg:px-20 justify-center gap-3 ">
          <h1 className="font-work font-extrabold text-3xl ">
            Get Intouch with Us
          </h1>
          <h1 className=" text-[#666666]">
            Kick-start your business planning with real-word data and market
            insight today
          </h1>{" "}
          <Form />
        </div>
      </div>
          </div>
  );
};

export default ProductDetail;

// Fetch data based on the productId

