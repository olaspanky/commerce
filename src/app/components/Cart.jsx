// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import bin from "../../../public/assets/trashbin.svg";
// import eye from "../../../public/assets/eye.svg";
// import { useCart } from "react-use-cart";
// import CheckoutButton from "../components/CheckoutStripe";



// const BoxGrid = () => {
//   const {items, isEmpty, totalUniqueItems, totalItems, cartTotal, updateItemQuantity, removeItem, emptyCart} = useCart()  
//   console.log("items is", items)


//   if (isEmpty) return <div className="w-full h-[70vh] flex flex-col justify-between items-center p-36">

// <h1>Cart is empty</h1>
// <Link href="/">
// <button className="w-96 text-white rounded-md bg-[#1567E0] p-2">Start Shopping</button>
// </Link>



//   </div> 
//   return (
//     <div className="flex flex-col lg:grid md:grid-cols-2 lg:grid-cols-12 place-content-center gap-10 my-20 px-10">
//       <div className="col-span-7">
//         <div className="bg-[#1567E0] p-3 flex justify-between mx-5 text-white rounded-tr-lg rounded-tl-lg px-20">
//           <h1 className="w-[40%]">Product</h1>
//           <h1>Price</h1>
//           <h1>Total</h1>
//         </div>

//         {items.map((item) => (
//           <div>
//                     {/* <div className="border border-gray-400 w-full "></div> */}

//           <div key={item.id} className="flex justify-between items-center py-3 px-10">
//             {/* image */}
//             <div className="w-3/10">
//               <div className="flex rounded-md  items-center  gap-3 ">
//                 <div className="w-20 shadow-md rounded-md">
//                 {item.imageUrl && (
//                     <Image alt="alt" src={item.imageUrl} width={20} height={20} className="w-full" />
//                   )}            
                  
//                   </div>
//                   <div className="">
//               <h1 className="text-md text-[#949494] font-bold">{item.name}</h1>
//             </div>
               
//               </div>
//             </div>

           
            
//             <div className=" flex flex-row items-center justify-center gap-10">
//               <h1 className="text-md">${item.price}</h1>
//               <div onClick={() => removeItem(item._id)}>
//                 <Image src={bin} />
//               </div>
//             </div>

//           </div>
//           </div>
//         ))}
//         <div className="border border-gray-400"></div>
//       </div>

//       <div className="col-span-3 h-96 text-center bg-[#F5F5F5] p-10 rounded-md">
//         <h1 className="my-5"> Your Order</h1>
//         <div className="col-span-3 flex flex-col gap-5 items-center w-full justify-center">
//           <Link href="/pages/payment">
//             <button className="rounded-lg  p-3 bg-[#1567E0] text-white text-xs]">Proceeed to checkout</button>
//           </Link>

// {/* <CheckoutButton amount={cartTotal} /> */}


//           <h1>Or</h1>
//           <Link href="/">
//             <button className="rounded-lg  p-3 bg-[#D1D1D1] ">Continue Shopping</button>
//           </Link>

          
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BoxGrid;
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
    <div className="flex flex-col lg:grid md:grid-cols-2 lg:grid-cols-12 place-content-center gap-10 m-2 p-3 lg:my-20 lg:px-10">
      <div className="col-span-7 lg:px-5">
        <div className="bg-[#1567E0] p-3 flex justify-between  text-white rounded-tr-lg rounded-tl-lg lg:px-9">
          <h1 className="w-[40%]">Product</h1>
          <h1>Price</h1>
          <h1>Total</h1>
        </div>

        {items.map((item) => (
          <div className="border border-gray-200 rounded-bl-lg border-br-lg">
                    {/* <div className="border border-gray-400 w-full "></div> */}

          <div key={item.id} className="flex justify-between items-center py-3 p-2 lg:px-10">
            {/* image */}
            <div className="w-3/10">
           
              <div className="flex rounded-md  items-center  gap-3 ">
              <div onClick={() => removeItem(item._id)}>
x 
             </div>
                <div className="w-2 lg:w-20 shadow-md rounded-md">
                {item.imageUrl && (
                    <Image alt="alt" src={item.imageUrl} width={20} height={20} className="w-full" />
                  )}            
                  
                  </div>
                  <div className="">
              <h1 className="text-xs lg:text-md text-[#949494] w-20 font-bold">{item.name}</h1>
            </div>
               
              </div>
            </div>

           
            
            <div className=" flex flex-row items-center justify-center gap-10">
              <h1 className="text-md">${item.price}</h1>
            </div>
            <div className=" flex flex-row items-center justify-center gap-10">
              <h1 className="text-md">${cartTotal}</h1>
             
            </div>

          </div>
          </div>
        ))}
      </div>





      

      <div className="col-span-5  border border-gray-100 rounded-lg text-[#3D3D3D]">
        <div className="bg-[#1567E0] p-3 flex justify-between  text-white rounded-tr-lg rounded-tl-lg px-9">
          <h1 className="w-[40%]">Cart Total</h1>
        </div>
        <div className=" p-3 py-5 border-b-2 flex justify-between lg:px-9">
          <p className="text-md lg:text-lg ">SUBTOTAL</p>
          <p className="text-md text-sm">${cartTotal}</p>
        </div>
        <div className=" p-3 py-5 border-b-2 flex justify-between lg:px-9">
          <p className="text-md lg:text-lg">DISCOUNT</p>
        </div>
        <div className=" p-3 py-5 border-b-2 flex justify-between lg:px-9">
          <p className="text-md lg:text-lg">TOTAL</p>
          <p className=" text-sm">${cartTotal}</p>

        </div>
         <Link href="/pages/payment">

        <div className="bg-[#1567E0] cursor-pointer	  p-3 flex justify-center  text-white rounded-br-lg rounded-bl-lg px-9">
          <h1 className="">Proceed To Checkout</h1>
        </div>
        </Link>

       
         
      </div>
    </div>
  );
};

export default BoxGrid;
