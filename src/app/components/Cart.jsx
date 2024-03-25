import React from "react";
import Image from "next/image";
import Link from "next/link";
import bin from "../../../public/assets/trashbin.svg";
import eye from "../../../public/assets/eye.svg";
import { useCart } from "react-use-cart";
import CheckoutButton from "../components/CheckoutStripe";



const BoxGrid = () => {
  const {items, isEmpty, totalUniqueItems, totalItems, cartTotal, updateItemQuantity, removeItem, emptyCart} = useCart()  
  console.log("items is", items)


  if (isEmpty) return <div className="w-full h-[70vh] flex flex-col justify-between items-center p-36">

<h1>Cart is empty</h1>
<Link href="/">
<button className="w-96 text-white rounded-md bg-[#1567E0] p-2">Start Shopping</button>
</Link>



  </div> 
  return (
    <div className="flex flex-col lg:grid md:grid-cols-2 lg:grid-cols-12 place-content-center gap-10 my-20 px-10">
      <div className="col-span-9">
        <div className=" flex justify-between mx-5">
          <h1>Name</h1>
          <h1>Price</h1>
        </div>

        {items.map((item) => (
          <div>
                    <div className="border border-gray-400 w-full "></div>

          <div key={item.id} className="flex justify-between items-center py-3 px-10">
            {/* image */}
            <div className="w-3/10">
              <div className="flex rounded-md shadow-md flex-col gap-3 w-36">
                <div className="">
                {item.imageUrl && (
                    <Image alt="alt" src={item.imageUrl} width={100} height={100} className="w-full" />
                  )}            </div>
                <div className="px-5 text-xs">
                  <p>{item.location}</p>
                </div>
                <div className="flex justify-between px-5 text-xs text-[#1567E0] pb-5">
                  <div className="flex gap-2">
                    <p className="">${item.price}</p>
                  </div>
                  <div className="flex gap-2">
                    <p className="">{item.view}</p>
                    <Image src={eye} />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-4/10">
              <h1 className="text-xl text-[#1567E0] font-bold">{item.name}</h1>
            </div>
            
            <div className="w-3/10 flex flex-row items-center justify-center gap-10">
              <h1 className="text-md">${item.price}</h1>
              <div onClick={() => removeItem(item._id)}>
                <Image src={bin} />
              </div>
            </div>

          </div>
          </div>
        ))}
        <div className="border border-gray-400"></div>
      </div>

      <div className="col-span-3 h-96 text-center bg-[#F5F5F5] p-10 rounded-md">
        <h1 className="my-5"> Your Order</h1>
        <div className="col-span-3 flex flex-col gap-5 items-center w-full justify-center">
          <Link href="/pages/payment">
            <button className="rounded-lg  p-3 bg-[#1567E0] text-white text-xs]">Proceeed to checkout</button>
          </Link>

{/* <CheckoutButton amount={cartTotal} /> */}


          <h1>Or</h1>
          <Link href="/">
            <button className="rounded-lg  p-3 bg-[#D1D1D1] ">Continue Shopping</button>
          </Link>

          
        </div>
      </div>
    </div>
  );
};

export default BoxGrid;
