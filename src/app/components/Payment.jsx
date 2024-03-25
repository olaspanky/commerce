import React from "react";
import Image from "next/image";
import arrow from "../../../public/assets/farrow.svg";
import eye from "../../../public/assets/eye.svg";
import Link from "next/link";
import progress1 from "../../../public/assets/progress1.svg";
import bin from "../../../public/assets/trashbin.svg";
import PayStack from "./Paystack";
import { useCart } from "react-use-cart";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const BoxGrid = () => {
  const { items, isEmpty, totalUniqueItems, totalItems, cartTotal, updateItemQuantity, removeItem, emptyCart } = useCart();
  

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-10 my-20 p-2 lg:px-10 2xl:px-36">
      <div className="col-span-6 flex flex-col gap-5  ">
        <h1>Checkout</h1>

        <div className="flex flex-col gap-5 justify-center items-center">
          <Image src={progress1} alt="" />
          <div className="border border-gray-100 w-full"></div>
        </div>

        <div className="flex flex-col gap-5">
          <h1>Payment method</h1>
          <PayStack />
        </div>
      </div>

      <div className="col-span-6  flex flex-col justify-between h-[60vh] 2xl:min-h-[80vh] p-2  lg:px-10 rounded-md ">
        <div>
          <h1 className="text-xl">Your Order</h1>

          <div className="flex  flex-col w-full gap-5 justify-center items-center">
            <div className="border border-gray-100 w-full my-1"></div>
            {items.map((item) => (
              <div key={item.id} className="flex flex-col border-blue-800 items-center w-full justify-between">
                <div className="flex justify-between w-full">
                  <h1 className="text-md">Anti-infective Report Analysis</h1>
                  <div onClick={() => removeItem(item._id)}>
                <Image src={bin} />
              </div>
                </div>

                <div className="flex w-full justify-between gap-2 items-center">
                  <div className="flex gap-2 items-center justify-center">

                <div className="w-20  flex justify-center items-center ">
                  <div className="flex justify-between py-3 ">
                    {/* image */}
                   
                      <div className="flex justify-between rounded-md shadow-md flex-col gap-3">
                        <div>
                          <Image alt="alt" src={item.imageUrl} className="w-full" width={100} height={100} />
                        </div>
                        <div className="px-5 text-xs">
                          <p>{item.location}</p>
                        </div>
                      </div>
                    </div>
                </div>
                <div className="">
                <h1 className="text-xs flex items-start ">{item.name}</h1>
                </div>
                </div>
                
                <div className="w-auto justify-end items-center flex flex-col text-xs gap-5">
                <div className=" flex flex-row items-center justify-center gap-10">
              
            </div>
            <h1 className="text-left">Quantity</h1>

            <div className="flex justify-center items-center gap-3">
              {/* <button className="p-2 rounded-md bg-red-500 text-white" onClick={() => updateItemQuantity(item._id, item.quantity - 1)}>-</button> */}
              <h1>{item.quantity}</h1>
              {/* <button className="p-2 rounded-md bg-blue-500 text-white" onClick={() => updateItemQuantity(item._id, item.quantity + 1)}>+</button> */}

            </div>
            <h1 className="text-md font-bold">${item.price}</h1>

                </div>

                  
                </div>
                
              </div>
            ))}
          </div>
        </div>



        <div className="flex flex-col gap-2 text-sm">
        <div className="border border-gray-100 w-full"></div>

           
            <div className="flex w-full justify-between">
                <h1>Total</h1>
                <p>${cartTotal}</p>
            </div>
            </div>

       
      </div>
    </div>
  );
};

export default BoxGrid;
