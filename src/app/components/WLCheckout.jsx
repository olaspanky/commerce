// import React from "react";
// import Image from "next/image";
// import arrow from "../../../public/assets/farrow.svg";
// import eye from "../../../public/assets/eye.svg";
// import Link from "next/link";
// import progress1 from "../../../public/assets/progress1.svg";
// import bin from "../../../public/assets/trashbin.svg";
// import PayStack from "./Paystack";
// import { useCart } from "react-use-cart";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import { useState, useEffect } from "react";


// const CustomAlert = ({ message, type }) => {
//   const [isVisible, setIsVisible] = useState(false);
  

//   useEffect(() => {
//     if (message) {
//       setIsVisible(true);
//       const timeoutId = setTimeout(() => {
//         setIsVisible(false);
//       }, 3000);

//       return () => clearTimeout(timeoutId);
//     }
//   }, [message]);

//   const alertClass =
//     type === "success" ? "text-primary text-xl" : "text-red-500";

//   return (
//     <div
//       className={`p-3   ${alertClass} ${
//         isVisible ? "slide-in border bg-white mt-5 " : "slide-out"
//       }`}
//     >
//       {message}
//     </div>
//   );
// };

// const BoxGrid = () => {
//   const { items, isEmpty, totalUniqueItems, totalItems, cartTotal, updateItemQuantity, removeItem, emptyCart } = useCart();
  
//   const [alertMessage, setAlertMessage] = useState("");
//   const [alertType, setAlertType] = useState("");

//   const showAlert = (message, type) => {
//     setAlertMessage(message);
//     setAlertType(type);
//     setTimeout(() => {
//       setAlertMessage("");
//       setAlertType("");
//     }, 3000);
//   };

//   return (
//     <div>
//                   <CustomAlert message={alertMessage} type={alertType} />

//     <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-10 my-20 p-2 lg:px-10 2xl:px-36">

//       <div className="col-span-6 flex flex-col gap-5  ">
//         <h1>Checkout</h1>

//         <div className="flex flex-col gap-5 justify-center items-center">
//           <Image src={progress1} alt="" />
//           <div className="border border-gray-100 w-full"></div>
//         </div>

//         <div className="flex flex-col gap-5">
//           <h1>Payment method</h1>
          // <PayStack />
//         </div>
//       </div>

//       <div className="col-span-6  flex flex-col justify-between h-[60vh] 2xl:min-h-[80vh] p-2  lg:px-10 rounded-md ">
//         <div>
//           <h1 className="text-xl">Your Order</h1>

//           <div className="flex  flex-col w-full gap-5 justify-center items-center">
//             <div className="border border-gray-100 w-full my-1"></div>
//             {items.map((item) => (
//               <div key={item.id} className="flex flex-col border-blue-800 items-center w-full justify-between">
//                 <div className="flex justify-between w-full">
//                   <h1 className="text-md">Anti-infective Report Analysis</h1>
//                   <div onClick={() => removeItem(item._id)}>
//                 <Image src={bin} />
//               </div>
//                 </div>

//                 <div className="flex w-full justify-between gap-2 items-center">
//                   <div className="flex gap-2 items-center justify-center">

//                 <div className="w-20  flex justify-center items-center ">
//                   <div className="flex justify-between py-3 ">
//                     {/* image */}
                   
//                       <div className="flex justify-between rounded-md shadow-md flex-col gap-3">
//                         <div>
//                           <Image alt="alt" src={item.imageUrl} className="w-full" width={100} height={100} />
//                         </div>
//                         <div className="px-5 text-xs">
//                           <p>{item.location}</p>
//                         </div>
//                       </div>
//                     </div>
//                 </div>
//                 <div className="">
//                 <h1 className="text-xs flex items-start ">{item.name}</h1>
//                 </div>
//                 </div>
                
//                 <div className="w-auto justify-end items-center flex flex-col text-xs gap-5">
//                 <div className=" flex flex-row items-center justify-center gap-10">
              
//             </div>
//             <h1 className="text-left">Quantity</h1>

//             <div className="flex justify-center items-center gap-3">
//               {/* <button className="p-2 rounded-md bg-red-500 text-white" onClick={() => updateItemQuantity(item._id, item.quantity - 1)}>-</button> */}
//               <h1>{item.quantity}</h1>
//               {/* <button className="p-2 rounded-md bg-blue-500 text-white" onClick={() => updateItemQuantity(item._id, item.quantity + 1)}>+</button> */}

//             </div>
//             <h1 className="text-md font-bold">${item.price}</h1>

//                 </div>

                  
//                 </div>
                
//               </div>
//             ))}
//           </div>
//         </div>



//         <div className="flex flex-col gap-2 text-sm">
//         <div className="border border-gray-100 w-full"></div>

           
//             <div className="flex w-full justify-between">
//                 <h1>Total</h1>
//                 <p>${cartTotal}</p>
//             </div>
//             </div>

       
//       </div>
//     </div>
//     </div>
//   );
// };

// export default BoxGrid;
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
import CheckoutButton from "./CheckoutStripe";
import PayStack from "./DownloadWhitelist";




const BoxGrid = () => {
  const {items, isEmpty, totalUniqueItems, totalItems, cartTotal, updateItemQuantity, removeItem, emptyCart} = useCart()  
  console.log("items is", items)


  return (
    <div className="flex flex-col lg:grid md:grid-cols-2 lg:grid-cols-12 place-content-center gap-10 my-20 p-2 lg:px-10 xl:px-36">
      <div className="col-span-7 border border-gray-100 rounded-lg">
        <div className="bg-[#1567E0] p-3 flex justify-between  text-white rounded-tr-lg rounded-tl-lg lg:px-9">
          <h1>Personal</h1>
          <h1>Billing</h1>
          <h1>Confirmation</h1>
        </div>
        <div>
          <div className="p-2 lg:p-5">
          <PayStack />

          </div>

        </div>

      </div>





      

      <div className="col-span-5  border border-gray-100 rounded-lg">
        <div className="bg-[#1567E0] p-3 flex justify-between  text-white rounded-tr-lg rounded-tl-lg px-9">
          <h1 className="w-[40%]">Cart Details</h1>
        </div>
        <div className=" p-3 py-5 border-b-2 flex justify-between px-9">
          <p className="text-lg">PRODUCT</p>
          <p className="text-lg">SUBTOTAL</p>
        </div>
        {items.map((item, index) => (
        <div key={index} className="p-3 py-5 border-b-2 flex justify-between px-9">
          <p className="text-md text-gray-300">WHITEPAPER</p>
          <p className="text-lg">FREE</p>
        </div>
      ))}
        <div className=" p-3 py-5 border-b-2 flex justify-between px-9">
          <p className="text-lg">DISCOUNT</p>
        </div>
        <div className=" p-3 py-5 border-b-2 flex justify-between px-9">
          <p className="text-lg">TOTAL</p>
          <p className="text-lg">FREE</p>
        </div>
        

       
         
      </div>
    </div>
  );
};

export default BoxGrid;
