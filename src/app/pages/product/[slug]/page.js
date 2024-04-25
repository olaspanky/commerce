"use client"
import React from "react";
import { client } from "@/app/lib/sanity";
import { useState, useEffect } from "react";
import Image from "next/image";
import arrow from "../../../../../public/assets/vec.svg";
import eye from "../../../../../public/assets/eye.svg";
import Nav from "../../../components/Navbar"
import pic1 from "../../../../../public/assets/Picturecommerce1.svg"
import { CartProvider, useCart } from "react-use-cart";
import Head from "next/head";


async function fetchData(slug) {
  const query = `*[_type == "product" && slug.current == "${slug}"][0]{
    _id, image, location, price, name, details,sumary, objective,methodology,pdfFile,
      "slug": slug.current,
      "imageUrl": image[0].asset->url , "pdfFileURL": pdfFile.asset-> url,     
  }`;
  const data = await client.fetch(query);
  return data;
}

export default function productPage({ params }) {
  const { addItem, inCart } = useCart();
  const [card, setCard] = useState(null);
  const [displayText, setDisplayText] = useState("Loading..."); // Default value
  const [value, setValue] = useState(2);

  const objective = "The Nigerian anti-infectives market plays a pivotal role in addressing a wide spectrum of infections. Notably, in 2022, the anti-infectives segment made a substantial contribution, accounting for 25.90% of the total pharmaceutical market revenue, reaching an impressive $835 million. This market exhibited a robust growth pattern, primarily fueled by the profound impact of the COVID-19 pandemic. In 2022, it recorded significant expansion, with a notable increase in revenue amounting to +$237 million compared to the previous year. Projections indicate a continuous growth trend, with market revenue expected to reach $722 million by 2028(CAGR: 6.60%). However, it is essential to acknowledge that the anticipated decline in market revenue from 2022 to 2028 is primarily attributed to currency devaluation. As the local currency undergoes devaluation, it triggers a chain reaction of effects. This includes increased production costs for pharmaceutical companies, resulting in higher drug prices for consumers. Consequently, consumers' purchasing power may diminish, potentially posing challenges for local pharmaceutical enterprises as they compete on the global stage. These combined factors are expected to constrain the revenue growth within the anti-infectives market (CAGR: 6.60%).Major industry players, including GSK, Sanofi, Fidson Healthcare, Pfizer, Roche, and Taylek have made substantial contributions. GSK, driven by Augmentin and Ampiclox, accounted for 31.94% of the 2022 revenue."
  const methodology = ""

  

  useEffect(() => {
    async function getData() {
      try {
        const data = await fetchData(params.slug);
        setCard(data);
        setDisplayText(data.details); // Set default display text here
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getData();
  }, [params.slug]);

  const [activeTitle, setActiveTitle] = useState("Report Overview");

  const handleTitleClick = (title) => {
    setActiveTitle(title);

    switch (title) {
      case "Report Overview":
        setDisplayText(card.details);
        break;
      case "Report":
        setDisplayText(card.objective);
        break;
      case "Methodology":
        setDisplayText(card.methodology);
        break;
      default:
        setDisplayText("");
    }
  };

  const [showModal, setShowModal] = useState(false);

  const handleAddToCart = () => {
    if (inCart(card._id)) {
      setShowModal(true);
    } else {
      addItem({ ...card, id: card._id });
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

 
  return (
    <div>
      <Head>
      <script id='pixel-script-poptin' src='https://cdn.popt.in/pixel.js?id=b6981d0c90768' async='true'></script> 
      </Head>

        <Nav/>
        <div className="flex gap-2 lg:gap-10 my-5 p-2 2xl:px-48">
          <p className="text-sm ">Product Listing</p> 
          <Image src={arrow} alt=""/>
          <p className="text-sm font-bold">Product Page</p> 

        </div>
      <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-12 gap-10 my-20 p-2 2xl:px-48">
       
        <div className='lg:col-span-6 lg:px-10 2xl:px-20'>
          <div className="w-full">
            <div className="flex rounded-md shadow-md flex-col gap-3 w-full">
              <div className="">
              {card?.imageUrl && (
                    <img alt="alt" src={card?.imageUrl}  className="w-full h-full" />

                  )}                           
                  </div>
            </div>
            <div></div>
          </div>
        </div>

        <div className='lg:col-span-6 flex flex-col gap-3'>
          <div className="flex flex-col gap-2">
          <p className='text-2xl text-black w-96 font-bold'>The Anti-infectives Drugs
Market in Nigeria</p>
          <div className="flex my-2 items-center">
            <p className="text-xl mr-5 ">${card?.price}</p>
            {/* <Rating name="read-only" value={value} readOnly /> */}
            <div class="flex items-center border-l-2 px-2">
    <svg class="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <svg class="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <svg class="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <svg class="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <svg class="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
</div>
<div>
<p className="text-xs ">(20 views)</p>

</div>

          </div>

          <div className="border border-gray-200 "></div>

          <div className="flex flex-col my-2 gap-9">
            <p className="text-sm "> {objective}
                        </p>
        
          </div>

          <div className='lg:col-span-3 flex flex-col gap-5 items-center w-full mt-3'>
            <div className="flex w-full gap-5">
            <button className='rounded-full w-[30%] border border-[#1567E0]  p-3 bg-[white] text-[#1567E0] '>1</button>
            <button className='rounded-full w-full  p-3 bg-[#1567E0] text-white ' onClick={handleAddToCart}>Add to cart</button>


            </div>
            <div className="w-full">
            <a href="/pages/payment" className="text-black w-full">
          <button className='rounded-full w-full border border-[#1567E0]  p-3 bg-[white] text-[#1567E0]  ' onClick={handleAddToCart}>Buy now</button>
          </a>
            </div>
           
        </div>

         

          </div>
          
          {/* <div className='w-full '>
            <div className="flex justify-between w-full text-[#1567E0] font-bold">
              <div
                className={`title ${activeTitle === 'Report Overview' ? 'active' : ''}`}
                onClick={() => handleTitleClick('Report Overview')}
              >
                Report Overview
              </div>
              <div
                className={`title ${activeTitle === 'Report' ? 'active' : ''}`}
                onClick={() => handleTitleClick('Report')}
              >
                Report
              </div>
              <div
                className={`title ${activeTitle === 'Methodology' ? 'active' : ''}`}
                onClick={() => handleTitleClick('Methodology')}
              >
                Methodology
              </div>
            </div>
            <div className="content text-sm text-[#292d325b] ">
            {card ? (
        <p>{displayText}</p>
      ) : (
        <p>Loading...</p> // Or any loading indicator
      )}            </div>
            <style jsx>{`
              .flex {
                display: flex;
              }

              .title {
                padding: 10px;
                cursor: pointer;
              }

              .active {
                border-bottom: 2px solid blue;
              }

              .content {
                margin-top: 20px;
              }
            `}</style>
          </div> */}
        </div>

       


        {/* Modal */}
        {showModal && (
          <div className="fixed z-10 inset-0 overflow-y-auto flex justify-center items-center">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div onClick={closeModal} className="mx-auto  flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Item Already in Cart</h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">This item is already in your cart.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button onClick={closeModal} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>


      <div className='w-full lg:p-20 bg-[#F8F8F8] p-2 2xl:px-36 mt-9'>
            <div className="flex gap-5 w-full text-[#696969] font-light">
              <div
                className={`title ${activeTitle === 'Report Overview' ? 'active' : ''} border-r-2 border-[#696969]`}
                onClick={() => handleTitleClick('Report Overview')}
              >
Description
              </div>
              <div
                className={`title ${activeTitle === 'Report' ? 'active' : ''}`}
                onClick={() => handleTitleClick('Report')}
              >
                Reviews
              </div>
              
            </div>
            <div className="content text-sm text-[#575757] ">
            {card ? (
        <p>{displayText}</p>
      ) : (
        <p>Loading...</p> // Or any loading indicator
      )}            </div>
            <style jsx>{`
              .flex {
                display: flex;
              }

              .title {
                padding: 10px;
                cursor: pointer;
              }

              .active {
                color: #696969;
                font-weight: bold;
              }

              .content {
                margin-top: 20px;
              }
            `}</style>
          </div>
    </div>
  );
}
