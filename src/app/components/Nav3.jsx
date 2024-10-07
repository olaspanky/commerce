// // // // import { useState } from "react";
// // // // import Image from "next/image";
// // // // import logo from "../../../public/assets/logo.svg";
// // import cart from "../../../public/assets/cart2.svg";
// // // // import Link from "next/link";

// // // // function Demo() {
// // // //   const [isMenuOpen, setIsMenuOpen] = useState(false);

// // // //   const toggleMenu = () => {
// // // //     setIsMenuOpen(!isMenuOpen);
// // // //   };

  

// // // //   return (
// // // //     <>
// // // //       <nav class="bg-white border-gray-200 shadow-lg shadow-[#1566e029]">
// // // //         <div class="w-auto flex flex-wrap items-center justify-between mx-auto p-4 px-10">
// // // //           <a
// // // //             href="/"
// // // //             class="flex items-center space-x-3 rtl:space-x-reverse"
// // // //           >
// // // //             <Image
// // // //               src={logo}
// // // //               alt="logo"
// // // //               width={isMenuOpen ? 50 : 100}
// // // //               height={50}
// // // //             />
// // // //           </a>
// // // //           <button
// // // //             onClick={toggleMenu}
// // // //             data-collapse-toggle="navbar-default"
// // // //             type="button"
// // // //             class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
// // // //             aria-controls="navbar-default"
// // // //             aria-expanded="false"
// // // //           >
// // // //             <span class="sr-only">Open main menu</span>
// // // //             <svg
// // // //               class="w-5 h-5"
// // // //               aria-hidden="true"
// // // //               xmlns="http://www.w3.org/2000/svg"
// // // //               fill="none"
// // // //               viewBox="0 0 17 14"
// // // //             >
// // // //               <path
// // // //                 stroke="currentColor"
// // // //                 stroke-linecap="round"
// // // //                 stroke-linejoin="round"
// // // //                 stroke-width="2"
// // // //                 d="M1 1h15M1 7h15M1 13h15"
// // // //               />
// // // //             </svg>
// // // //           </button>
// // // //           <div
// // // //             className={` w-full md:block md:w-auto ${
// // // //               isMenuOpen ? "block" : "hidden"
// // // //             }`}
// // // //             id="navbar-default"
// // // //           >
// // // //             <ul class="font-medium text-xs justify-start lg:gap-10 gap-10 items-center flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 text-white ">
             
// // // //               <li>
// // // //                 <a
// // // //                   href="/pages/company"
// // // //                   class="text-black"
// // // //                 >
// // // //                   About us
// // // //                 </a>
// // // //               </li>
              
// // // //               <li>
// // // //                 <a
// // // //                   href="#"
// // // //                   class="text-black"
// // // //                 >
// // // //                   services
// // // //                 </a>
// // // //               </li>
              
// // // //               <li>
// // // //                 <a
// // // //                   href="#"
// // // //                   class="text-black"
// // // //                 >
// // // //                    Insight
// // // //                 </a>
// // // //               </li>
              
              
// // // //             </ul>
// // // //           </div>
// // // //           <a
// // // //                   href="/pages/cart"
// // // //                   class="text-black"
// // // //                 >

// // // //           <div className="flex gap-3 px-3 py-2 border rounded-lg border-[#1567E0] items-center justify-center">
// // // //             <Image src={cart}/>
// // // //             <p className="text-xs text-[#1567E0]">Cart</p>

// // // //           </div>
// // // //           </a>

          
// // // //         </div>
// // // //       </nav>
// // // //     </>
// // // //   );
// // // // }

// // // // export default Demo;

// // // import { useState } from "react";
// // // import Image from "next/image";
// // // import logo from "../../../public/assets/logo.svg";
// // // import cart from "../../../public/assets/cart.svg";
// // // import Link from "next/link";
// // import { useCart } from "react-use-cart";

// // // function Navbar() {
// // //   const [isMenuOpen, setIsMenuOpen] = useState(false);
// //   // const { totalItems } = useCart();

// // //   const toggleMenu = () => {
// // //     setIsMenuOpen(!isMenuOpen);
// // //   };

// // //   return (
// // //     <>
// // //       <nav className="bg-white border-gray-200 shadow-lg shadow-[#1566e029]">
// // //         <div className="w-auto flex flex-wrap items-center justify-between mx-auto p-4 px-10">
// // //           <a
// // //             href="/"
// // //             className="flex items-center space-x-3 rtl:space-x-reverse"
// // //           >
// // //             <Image
// // //               src={logo}
// // //               alt="logo"
// // //               width={isMenuOpen ? 50 : 100}
// // //               height={50}
// // //             />
// // //           </a>
// // //           <button
// // //             onClick={toggleMenu}
// // //             data-collapse-toggle="navbar-default"
// // //             type="button"
// // //             className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
// // //             aria-controls="navbar-default"
// // //             aria-expanded="false"
// // //           >
// // //             <span className="sr-only">Open main menu</span>
// // //             <svg
// // //               className="w-5 h-5"
// // //               aria-hidden="true"
// // //               xmlns="http://www.w3.org/2000/svg"
// // //               fill="none"
// // //               viewBox="0 0 17 14"
// // //             >
// // //               <path
// // //                 stroke="currentColor"
// // //                 strokeLinecap="round"
// // //                 strokeLinejoin="round"
// // //                 strokeWidth="2"
// // //                 d="M1 1h15M1 7h15M1 13h15"
// // //               />
// // //             </svg>
// // //           </button>
// // //           <div
// // //             className={` w-full md:block md:w-auto ${
// // //               isMenuOpen ? "block" : "hidden"
// // //             }`}
// // //             id="navbar-default"
// // //           >
// // //             <ul className="font-medium text-xs justify-start lg:gap-10 gap-10 items-center flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 text-white ">
// // //               <li>
// // //                 <a href="/pages/company" className="text-black">
// // //                   About us
// // //                 </a>
// // //               </li>
// // //               <li>
// // //                 <a href="#" className="text-black">
// // //                   Services
// // //                 </a>
// // //               </li>
// // //               <li>
// // //                 <a href="#" className="text-black">
// // //                   Insight
// // //                 </a>
// // //               </li>
// // //             </ul>
// // //           </div>
// //           // <a href="/pages/cart" className="text-black">
// //           //   <div className="flex gap-3 px-3 py-2 border rounded-lg border-[#1567E0] items-center justify-center">
// //           //     <div className="relative">
// //           //       <Image src={cart} />
// //           //       {totalItems > 0 && (
// //           //         <div className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs">
// //           //           {totalItems}
// //           //         </div>
// //           //       )}
// //           //     </div>
// //           //     <p className="text-xs text-[#1567E0]">Cart</p>
// //           //   </div>
// //           // </a>
// // //         </div>
// // //       </nav>
// // //     </>
// // //   );
// // // }

// // // export default Navbar;

// // import React from "react";
// // import Image from "next/image";
// // import Link from "next/link";
// // import Dropdown from "./Dropdown";
// // import Logo from "../../../public/assets/white_logo.svg"
// // import { useState } from "react";
// // import { usePathname } from "next/navigation";


// // const menuItems = [

// //     {
// //       title: "Home",
// //       route: "/"
  
     
// //     },
// //     {
// //       title: "Categories",
// //       route: "",
// //       children: [
// //         {
// //           title: "HCP Insight",
// //           route: "/pages/category/Hcp",
// //         },
// //         {
// //           title: "Healthcare Ecosystem Insight",
// //           route: "/pages/category/Healthcare-Ecosystem-Insights",
// //         },
// //         {
// //           title: "Market Insight",
// //           route: "/pages/category/Market-Insight",
// //         },
// //         {
// //           title: "Patients Insight",
// //           route: "/pages/category/Patient-Insight",
// //         },
       
// //       ],

    
// //     },
  
// //     {
// //       title: "Blog",
// //       route: "https://pbr-site.vercel.app/pages/blog",
  
  
// //     },
// //     {
// //       title: "Contact Us",
// //       route: "/pages/contact",
// //     },
  
// //   ];
  

// // export default function Header() {
// //   const [isMenuOpen, setIsMenuOpen] = useState(false);
// //   const path = usePathname()
// //   const { totalItems } = useCart();


// //   const toggleMenu = () => {
// //     setIsMenuOpen(!isMenuOpen);
// //   };
// //   " hover:text-blue-500"

// //   return (
// //     <div className="flex justify-between px-5 xl:px-20 2xl:px-36 gap-10 items-center ">
// //       <div className="lg:p-5 p-2 rounded-br-[25%] rounded-bl-[25%] bg-[#1567E0]">
// //      <Link href="/" >
// //         <Image src={Logo} className="w-5 lg:w-20" alt="logo" />
// //       </Link>

// //       </div>
      
// //       <div className="hidden md:flex gap-8 items-center text-white">
// //         {menuItems.map((item) => {
// //           return item.hasOwnProperty("children") ? (
// //             <Dropdown item={item} />
// //           ) : (
// //             <Link className={`${item.route === path ? "text-[#FFFFFF] border-b-2 px-3 border-[#FFFFFF] font-semibold pb-1" : ""}`} href={item?.route || ""}>
// //               {item.title}
// //             </Link>
// //           );
// //         })}
// //         <a href="/pages/cart" className="text-white">
// //             <div className="flex gap-3 px-3 py-2 border rounded-lg border-white items-center justify-center">
// //               <div className="relative">
// //                 <Image src={cart} />
// //                 {totalItems > 0 && (
// //                   <div className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs">
// //                     {totalItems}
// //                   </div>
// //                 )}
// //               </div>
// //               <p className="text-xs text-[white]">Cart</p>
// //             </div>
// //           </a>
// //       </div>
// //       <div className="md:hidden text-black">
// //         <button onClick={toggleMenu} className="hover:text-blue-500">
// //           &#9776;
// //         </button>
// //       </div>
// //       {isMenuOpen && (
// //         <div className={`md:hidden fixed top-0 right-0 bottom-0 z-30 bg-white w-[70%] h-screen overflow-y-auto p-8 transition-all duration-1000`}>
// //            <button onClick={toggleMenu} className="hover:text-blue-500 flex justify-end ml-48 rounded-full p-2 text-blue-500 bg-black text-right">
// //           X
// //         </button>
// //           {menuItems.map((item) => (
// //             <div key={item.title} className="mb-4">
// //               {item.hasOwnProperty('children') ? (
// //                 <Dropdown item={item} />
// //               ) : (
// //                 <Link href={item?.route || ''} onClick={toggleMenu}>
// //                   <div className="hover:text-blue-500">{item.title}</div>
// //                 </Link>
// //               )}
// //             </div>
// //           ))}
// //          <a href="/pages/cart" className="text-black">
// //             <div className="flex gap-3 px-3 py-2 border rounded-lg border-white items-center justify-center">
// //               <div className="relative">
// //                 <Image src={cart} />
// //                 {totalItems > 0 && (
// //                   <div className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs">
// //                     {totalItems}
// //                   </div>
// //                 )}
// //               </div>
// //               <p className="text-xs text-white">Cart</p>
// //             </div>
// //           </a>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // // import { useState } from "react";
// // // import Image from "next/image";
// // // import logo from "../../../public/assets/logo.svg";
//  import cart from "../../../public/assets/cart3.svg";
// // // import Link from "next/link";

// // // function Demo() {
// // //   const [isMenuOpen, setIsMenuOpen] = useState(false);

// // //   const toggleMenu = () => {
// // //     setIsMenuOpen(!isMenuOpen);
// // //   };

  

// // //   return (
// // //     <>
// // //       <nav class="bg-white border-gray-200 shadow-lg shadow-[#1566e029]">
// // //         <div class="w-auto flex flex-wrap items-center justify-between mx-auto p-4 px-10">
// // //           <a
// // //             href="/"
// // //             class="flex items-center space-x-3 rtl:space-x-reverse"
// // //           >
// // //             <Image
// // //               src={logo}
// // //               alt="logo"
// // //               width={isMenuOpen ? 50 : 100}
// // //               height={50}
// // //             />
// // //           </a>
// // //           <button
// // //             onClick={toggleMenu}
// // //             data-collapse-toggle="navbar-default"
// // //             type="button"
// // //             class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
// // //             aria-controls="navbar-default"
// // //             aria-expanded="false"
// // //           >
// // //             <span class="sr-only">Open main menu</span>
// // //             <svg
// // //               class="w-5 h-5"
// // //               aria-hidden="true"
// // //               xmlns="http://www.w3.org/2000/svg"
// // //               fill="none"
// // //               viewBox="0 0 17 14"
// // //             >
// // //               <path
// // //                 stroke="currentColor"
// // //                 stroke-linecap="round"
// // //                 stroke-linejoin="round"
// // //                 stroke-width="2"
// // //                 d="M1 1h15M1 7h15M1 13h15"
// // //               />
// // //             </svg>
// // //           </button>
// // //           <div
// // //             className={` w-full md:block md:w-auto ${
// // //               isMenuOpen ? "block" : "hidden"
// // //             }`}
// // //             id="navbar-default"
// // //           >
// // //             <ul class="font-medium text-xs justify-start lg:gap-10 gap-10 items-center flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 text-white ">
             
// // //               <li>
// // //                 <a
// // //                   href="/pages/company"
// // //                   class="text-black"
// // //                 >
// // //                   About us
// // //                 </a>
// // //               </li>
              
// // //               <li>
// // //                 <a
// // //                   href="#"
// // //                   class="text-black"
// // //                 >
// // //                   services
// // //                 </a>
// // //               </li>
              
// // //               <li>
// // //                 <a
// // //                   href="#"
// // //                   class="text-black"
// // //                 >
// // //                    Insight
// // //                 </a>
// // //               </li>
              
              
// // //             </ul>
// // //           </div>
// // //           <a
// // //                   href="/pages/cart"
// // //                   class="text-black"
// // //                 >

// // //           <div className="flex gap-3 px-3 py-2 border rounded-lg border-[#1567E0] items-center justify-center">
// // //             <Image src={cart}/>
// // //             <p className="text-xs text-[#1567E0]">Cart</p>

// // //           </div>
// // //           </a>

          
// // //         </div>
// // //       </nav>
// // //     </>
// // //   );
// // // }

// // // export default Demo;

// // import { useState } from "react";
// // import Image from "next/image";
// // import logo from "../../../public/assets/logo.svg";
// // import cart from "../../../public/assets/cart.svg";
// // import Link from "next/link";
// import { useCart } from "react-use-cart";

// // function Navbar() {
// //   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   // const { totalItems } = useCart();

// //   const toggleMenu = () => {
// //     setIsMenuOpen(!isMenuOpen);
// //   };

// //   return (
// //     <>
// //       <nav className="bg-white border-gray-200 shadow-lg shadow-[#1566e029]">
// //         <div className="w-auto flex flex-wrap items-center justify-between mx-auto p-4 px-10">
// //           <a
// //             href="/"
// //             className="flex items-center space-x-3 rtl:space-x-reverse"
// //           >
// //             <Image
// //               src={logo}
// //               alt="logo"
// //               width={isMenuOpen ? 50 : 100}
// //               height={50}
// //             />
// //           </a>
// //           <button
// //             onClick={toggleMenu}
// //             data-collapse-toggle="navbar-default"
// //             type="button"
// //             className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
// //             aria-controls="navbar-default"
// //             aria-expanded="false"
// //           >
// //             <span className="sr-only">Open main menu</span>
// //             <svg
// //               className="w-5 h-5"
// //               aria-hidden="true"
// //               xmlns="http://www.w3.org/2000/svg"
// //               fill="none"
// //               viewBox="0 0 17 14"
// //             >
// //               <path
// //                 stroke="currentColor"
// //                 strokeLinecap="round"
// //                 strokeLinejoin="round"
// //                 strokeWidth="2"
// //                 d="M1 1h15M1 7h15M1 13h15"
// //               />
// //             </svg>
// //           </button>
// //           <div
// //             className={` w-full md:block md:w-auto ${
// //               isMenuOpen ? "block" : "hidden"
// //             }`}
// //             id="navbar-default"
// //           >
// //             <ul className="font-medium text-xs justify-start lg:gap-10 gap-10 items-center flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 text-white ">
// //               <li>
// //                 <a href="/pages/company" className="text-black">
// //                   About us
// //                 </a>
// //               </li>
// //               <li>
// //                 <a href="#" className="text-black">
// //                   Services
// //                 </a>
// //               </li>
// //               <li>
// //                 <a href="#" className="text-black">
// //                   Insight
// //                 </a>
// //               </li>
// //             </ul>
// //           </div>
//           // <a href="/pages/cart" className="text-black">
//           //   <div className="flex gap-3 px-3 py-2 border rounded-lg border-[#1567E0] items-center justify-center">
//           //     <div className="relative">
//           //       <Image src={cart} />
//           //       {totalItems > 0 && (
//           //         <div className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs">
//           //           {totalItems}
//           //         </div>
//           //       )}
//           //     </div>
//           //     <p className="text-xs text-[#1567E0]">Cart</p>
//           //   </div>
//           // </a>
// //         </div>
// //       </nav>
// //     </>
// //   );
// // }

// // export default Navbar;

// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import Dropdown from "./Dropdown";
// import Logo from "../../../public/assets/white_logo.svg"
// import { useState } from "react";
// import { usePathname } from "next/navigation";


// const menuItems = [

//   {
//     title: "Home",
//     route: "/"

   
//   },
//   {
//     title: "Categories",
//     route: "",
//     children: [
//       {
//         title: "HCP Insight",
//         route: "/pages/category/Hcp",
//       },
//       {
//         title: "Healthcare Ecosystem Insight",
//         route: "/pages/category/Healthcare-Ecosystem-Insights",
//       },
//       {
//         title: "Market Insight",
//         route: "/pages/category/Market-Insight",
//       },
//       {
//         title: "Patients Insight",
//         route: "/pages/category/Patient-Insight",
//       },
     
//     ],

  
//   },

//   {
//     title: "Blog",
//     route: "/pages/blog",


//   },
//   {
//     title: "Contact Us",
//     route: "/pages/contact",
//   },

// ];

// export default function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const path = usePathname()
//   const { totalItems } = useCart();


//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };
//   " hover:text-blue-500"

//   return (
//     <div className=" flex justify-between px-5 xl:px-20 2xl:px-36 gap-10 items-center ">
//       <div className="lg:p-5 p-2 rounded-br-[25%] rounded-bl-[25%] bg-[#1567E0]">
//      <Link href="/" >
//         <Image src={Logo} className="w-5 lg:w-20" alt="logo" />
//       </Link>

//       </div>
      
//       <div 
//  className="hidden md:flex gap-8 items-center text-white">
//         {menuItems.map((item) => {
//           return item.hasOwnProperty("children") ? (
//             <Dropdown item={item} />
//           ) : (
//             <Link className={`${item.route === path ? "text-[#FFFFFF] border-b-2 px-3 border-[#FFFFFF] font-semibold pb-1" : ""}`} href={item?.route || ""}>
//               {item.title}
//             </Link>
//           );
//         })}
//         <a href="/pages/cart" className="text-white">
//             <div className="flex gap-3 px-3 py-2 border rounded-lg border-[white] items-center justify-center">
//               <div className="relative">
//                 <Image src={cart} />
//                 {totalItems > 0 && (
//                   <div className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs">
//                     {totalItems}
//                   </div>
//                 )}
//               </div>
//               <p className="text-xs text-[white]">Cart</p>
//             </div>
//           </a>
//       </div>
//       <div className="md:hidden text-black">
//         <button onClick={toggleMenu} className="hover:text-blue-500">
//           &#9776;
//         </button>
//       </div>
//       {isMenuOpen && (
//         <div className={`md:hidden fixed top-0 right-0 bottom-0 z-30 bg-white w-[70%] h-screen overflow-y-auto p-8 transition-all duration-1000`}>
//            <button onClick={toggleMenu} className="hover:text-blue-500 flex justify-end ml-48 rounded-full p-2 text-blue-500 bg-black text-right">
//           X
//         </button>
//           {menuItems.map((item) => (
//             <div key={item.title} className="mb-4">
//               {item.hasOwnProperty('children') ? (
//                 <Dropdown item={item} />
//               ) : (
//                 <Link href={item?.route || ''} onClick={toggleMenu}>
//                   <div className="hover:text-blue-500">{item.title}</div>
//                 </Link>
//               )}
//             </div>
//           ))}
//          <a href="/pages/cart" className="text-black">
//             <div className="flex gap-3 px-3 py-2 border rounded-lg border-white items-center justify-center">
//               <div className="relative">
//                 <Image src={cart} />
//                 {totalItems > 0 && (
//                   <div className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs">
//                     {totalItems}
//                   </div>
//                 )}
//               </div>
//               <p className="text-xs text-white">Cart</p>
//             </div>
//           </a>
//         </div>
//       )}
//     </div>
//   );
// }


import cart from "../../../public/assets/cart3.svg";
import cart2 from "../../../public/assets/cart.svg";

import { useCart } from "react-use-cart";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Dropdown from "./Dropdown";
import Logo from "../../../public/assets/logo.svg"
import { useState } from "react";
import { usePathname } from "next/navigation";


const menuItems = [

  {
    title: "Home",
    route: "/"

   
  },
  {
    title: "Categories",
    route: "",
    children: [
      {
        title: "HCP Insight",
        route: "/pages/category/Hcp",
      },
      {
        title: "Healthcare Ecosystem Insight",
        route: "/pages/category/Healthcare-Ecosystem-Insights",
      },
      {
        title: "Market Insight",
        route: "/pages/category/Market-Insight",
      },
      {
        title: "Patients Insight",
        route: "/pages/category/Patient-Insight",
      },
     
    ],

  
  },

  {
    title: "Blog",
    route: "/pages/blog",


  },
  {
    title: "Contact Us",
    route: "/pages/contact",
  },

];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const path = usePathname()
  const { totalItems } = useCart();


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  " hover:text-blue-500"

  return (
    <div className=" flex justify-between px-5 xl:px-20 2xl:px-36 gap-10 items-center ">
      <div className="lg:p-5 p-2 rounded-br-[25%] rounded-bl-[25%] bg-[#]">
     <Link href="/" >
        <Image src={Logo} className="w-5 lg:w-20" alt="logo" />
      </Link>

      </div>
      
      <div className="hidden md:flex  cursor-pointer gap-8 items-center text-black">
        {menuItems.map((item) => {
          return item.hasOwnProperty("children") ? (
            <Dropdown item={item} />
          ) : (
            <Link className={`${item.route === path ? "text-[black] border-b-2 px-3 border-[black] font-semibold pb-1" : ""}`} href={item?.route || ""}>
              {item.title}
            </Link>
          );
        })}
        <a href="/pages/cart" className="text-white">
        <div className="flex gap-3 px-3 py-2 border rounded-lg border-[#1567E0] items-center justify-center">
              <div className="relative">
                <Image src={cart2} />
                {totalItems > 0 && (
                  <div className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs">
                    {totalItems}
                  </div>
                )}
              </div>
              <p className="text-xs text-[#1567E0]">Cart</p>
            </div>
          </a>
      </div>
      <div className="md:hidden text-black">
        <button onClick={toggleMenu} className="hover:text-blue-500">
          &#9776;
        </button>
      </div>
      {isMenuOpen && (
        <div className={`md:hidden fixed top-0 right-0 bottom-0 z-30 bg-white w-[70%] h-screen overflow-y-auto p-8 transition-all duration-1000`}>
           <button onClick={toggleMenu} className="hover:text-blue-500 flex justify-end ml-48 rounded-full p-2 text-blue-500  text-right">
          X
        </button>
          {menuItems.map((item) => (
            <div key={item.title} className="mb-4">
              {item.hasOwnProperty('children') ? (
                <Dropdown item={item} />
              ) : (
                <Link href={item?.route || ''} onClick={toggleMenu}>
                  <div className="hover:text-blue-500">{item.title}</div>
                </Link>
              )}
            </div>
          ))}
         <a href="/pages/cart" className="text-black">
            <div className="flex gap-3 px-3 py-2 border rounded-lg border-white items-center justify-center">
              <div className="relative">
                <Image src={cart2} />
                {totalItems > 0 && (
                  <div className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs">
                    {totalItems}
                  </div>
                )}
              </div>
              <p className="text-xs text-[#1567E0]">Cart</p>
            </div>
          </a>
        </div>
      )}
    </div>
  );
}