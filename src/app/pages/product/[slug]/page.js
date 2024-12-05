"use client"
import React from "react";
import Nav from "../../../components/Navbar";
import ProductDetail from "../../../components/More";
import MobileNavbar from "@/app/components/MobileNav";
import Footer from "@/app/components/Footer";
const ProductPage = ({ params }) => {
  return (
    <div className="h-full ">
<div className="hidden md:flex w-full"> {/* Desktop Menu */}
<Nav/>        </div>
          <div className="md:hidden">
<MobileNavbar/>
      </div> 
      <div className="h-auto ">
      <ProductDetail params={params} />
      </div>
<div className="h-20"></div>
<Footer/>
    </div>
  );
};

export default ProductPage;
