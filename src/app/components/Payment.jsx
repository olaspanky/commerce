import React from "react";
import Image from "next/image";
import Link from "next/link";
import bin from "../../../public/assets/trashbin.svg";
import { useCart } from "react-use-cart";
import PayStack from "./Paystack";
import Down from "@/app/components/Down";

const BoxGrid = () => {
  const {
    items,
    isEmpty,
    totalUniqueItems,
    totalItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();

  if (isEmpty)
    return (
      <div className="w-full h-[70vh] flex flex-col justify-between items-center p-36">
        <h1>Cart is empty</h1>
        <Link href="/">
          <button className="w-96 text-white rounded-md bg-[#1567E0] p-2">
            Start Shopping
          </button>
        </Link>
      </div>
    );

  return (
    <div className="flex flex-col lg:grid md:grid-cols-2 lg:grid-cols-12 place-content-center gap-10 my-20 p-2 lg:px-10 xl:px-36">
      {/* Left Column: Download Section */}
      <div className="col-span-7 border border-gray-100 rounded-lg">
        <div className="bg-[#1567E0] p-3 flex justify-between text-white rounded-tr-lg rounded-tl-lg lg:px-9">
          <h1>Download Your Report</h1>
        </div>
        <div>
          <div className="">
            <Down />
          </div>
        </div>
      </div>

      {/* Right Column: Download Details */}
      <div className="col-span-5 border border-gray-100 rounded-lg">
        <div className="bg-[#1567E0] p-3 flex justify-between text-white rounded-tr-lg rounded-tl-lg px-9">
          <h1 className="w-[40%]">Download Details</h1>
        </div>
        <div className="p-3 py-5 border-b-2 flex justify-between px-9">
          <p className="text-lg">PRODUCT</p>
        </div>

        {/* List of Items in Cart */}
        {items.map((item, index) => (
          <div
            key={index}
            className="p-3 py-5 border-b-2 flex justify-between items-center px-9"
          >
            <p className="text-md text-gray-300">{item.name}</p>
            {/* Delete Button */}
            <button onClick={() => removeItem(item.id)}>
              <Image src={bin} alt="Delete" width={20} height={20} />
            </button>
          </div>
        ))}

        {/* Total Section */}
        <div className="p-3 py-5 border-b-2 flex justify-between px-9">
          <p className="text-lg">TOTAL</p>
          <p className="text-lg">${cartTotal}</p>
        </div>
      </div>
    </div>
  );
};

export default BoxGrid;