"use client"
import React from "react";
import { client } from "@/app/lib/sanity";
import { useState, useEffect } from "react";
import Image from "next/image";
import arrow from "../../../../../public/assets/farrow.svg";
import eye from "../../../../../public/assets/eye.svg";
import Nav from "../../../components/Navbar"
import pic1 from "../../../../../public/assets/picturecommerce1.svg"
import { CartProvider, useCart } from "react-use-cart";

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
        <Nav/>
      <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-10 my-20 px-10 h-[70vh]">
        <div className='col-span-3 lg:px-10 2xl:px-20'>
          <div className="w-full">
            <div className="flex rounded-md shadow-md flex-col gap-3 w-full">
              <div className="">
              {card?.imageUrl && (
                    <Image alt="alt" src={card?.imageUrl} width={100} height={100} className="w-full" />
                  )}                           </div>
              <div className='px-5 text-xs'>
                <p>{card?.location}</p>
              </div>
              <div className='flex justify-between px-5 text-xs text-[#1567E0] pb-5'>
                <div className='flex gap-2'>
                  <p className="">${card?.price}</p>
                  <Image src={arrow} />
                </div>
                <div className='flex gap-2'>
                  <p className="">{card?.view}</p>
                  <Image src={eye} />
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>

        <div className='col-span-6 flex flex-col gap-3'>
          <div className="lg:w-[55%]">
          <p className='text-2xl text-[#1567E0] font-bold'>Anti-infective Report Analysis 2023</p>
          <div className='flex justify-between text-xs w-full '>
            <p>Published: October 18, 2023</p>
            <p>Report Code: PBR -LS1200</p>
          </div>

          </div>
          
          <div className='w-full '>
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
          </div>
        </div>

        <div className='col-span-3 flex flex-col gap-5 items-center w-full mt-20'>
          <button className='rounded-lg w-[60%] p-3 bg-[#1567E0] text-white ' onClick={handleAddToCart}>Add to cart</button>
          <button className='rounded-lg w-[60%] p-3 bg-gray-200 '>Download Summary</button>
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
    </div>
  );
}
