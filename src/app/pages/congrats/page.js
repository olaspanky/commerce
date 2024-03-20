"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import Nav from "../../components/Navbar"
import Cart from "../../components/Congrats"
import data from "../../components/data"




const ProductDetail = () => {

  

  return (
    <div>
      <Nav/>
      <Cart/>
    </div>
  );
};

export default ProductDetail;

// Fetch data based on the productId

