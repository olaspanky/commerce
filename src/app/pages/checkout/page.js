"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import Nav from "../../components/Navbar"
import Cart from "../../components/Checkout"
import data from "../../components/data"

import { useParams } from "next/navigation";



const ProductDetail = () => {
const params = useParams();
const card = data.find((item) => item.id === parseInt(params.productid));
console.log("card is", card)
  

  return (
    <div>
      <Nav/>
      <Cart/>
    </div>
  );
};

export default ProductDetail;

// Fetch data based on the productId

