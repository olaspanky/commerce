"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import Nav from "../../components/Navbar"
import Cart from "../../components/Cart"
import data from "../../components/data"
import Footer from '@/app/components/Footer';
import { useParams } from "next/navigation";
import MobileNavbar from '@/app/components/MobileNav';


const ProductDetail = () => {
const params = useParams();
const card = data.find((item) => item.id === parseInt(params.productid));
//console.log("card is", card)
  

  return (
    <div>
<div className="hidden md:flex jus w-full"> {/* Desktop Menu */}
<Nav/>        </div>
          <div className="md:hidden">
<MobileNavbar/>
      </div>  
      <div className='min-h-[100vh]'>
      <Cart/>
        </div>     

      <Footer/>      
    </div>
  );
};

export default ProductDetail;

// Fetch data based on the productId

