"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import Nav from "../../components/Navbar"
import Pay from "../../components/Payment"
import data from "../../components/data"
import MobileNavbar from '@/app/components/MobileNav';
import { useParams } from "next/navigation";
import Footer from '@/app/components/Footer';


const ProductDetail = () => {
const params = useParams();
const card = data.find((item) => item.id === parseInt(params.productid));
//console.log("card is", card)
  

  return (
    <div>
<div className="hidden md:flex"> {/* Desktop Menu */}
<Nav/>        </div>
          <div className="md:hidden">
<MobileNavbar/>
      </div>    
      
      <div className='min-h-[100vh]'><Pay/></div>   

      <Footer/>     
    </div>
  );
};

export default ProductDetail;

// Fetch data based on the productId

