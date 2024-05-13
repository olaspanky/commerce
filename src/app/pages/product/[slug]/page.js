"use client"
import React from "react";
import Nav from "../../../components/Navbar";
import ProductDetail from "../../../components/More";

const ProductPage = ({ params }) => {
  return (
    <div>
      <Nav />
      <ProductDetail params={params} />
    </div>
  );
};

export default ProductPage;
