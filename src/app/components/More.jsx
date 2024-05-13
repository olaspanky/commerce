// ProductDetail.js

import React, { useState, useEffect } from "react";
import { client } from "@/app/lib/sanity";
import Image from "next/image";
import arrow from "../../../public/assets/vec.svg";
import Nav from "@/app/components/Nav2";
import { useCart } from "react-use-cart";
import Head from "next/head";
import Link from "next/link";

async function fetchData(slug) {
  const query = `*[_type == "product" && slug.current == "${slug}"][0]{
    _id, image, location, price, name, details,sumary,available, objective,methodology,pdfFile,
      "slug": slug.current,
      "imageUrl": image[0].asset->url , "pdfFileURL": pdfFile.asset-> url,     
  }`;
  const data = await client.fetch(query);
  return data;
}

const ProductDetail = ({ params }) => {

  

  const { addItem, inCart } = useCart();
  const [card, setCard] = useState(null);
  const [displayText, setDisplayText] = useState("Loading...");
  const objective =
    "The Nigerian anti-infectives market plays a pivotal role in addressing a wide spectrum of infections. Notably, in 2022, the anti-infectives segment made a substantial contribution, accounting for 25.90% of the total pharmaceutical market revenue, reaching an impressive $835 million. This market exhibited a robust growth pattern, primarily fueled by the profound impact of the COVID-19 pandemic. In 2022, it recorded significant expansion, with a notable increase in revenue amounting to +$237 million compared to the previous year. Projections indicate a continuous growth trend, with market revenue expected to reach $722 million by 2028(CAGR: 6.60%). However, it is essential to acknowledge that the anticipated decline in market revenue from 2022 to 2028 is primarily attributed to currency devaluation. As the local currency undergoes devaluation, it triggers a chain reaction of effects. This includes increased production costs for pharmaceutical companies, resulting in higher drug prices for consumers. Consequently, consumers' purchasing power may diminish, potentially posing challenges for local pharmaceutical enterprises as they compete on the global stage. These combined factors are expected to constrain the revenue growth within the anti-infectives market (CAGR: 6.60%).Major industry players, including GSK, Sanofi, Fidson Healthcare, Pfizer, Roche, and Taylek have made substantial contributions. GSK, driven by Augmentin and Ampiclox, accounted for 31.94% of the 2022 revenue.";
  const [data1, setData1] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const data = await fetchData();
        setData1(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getData();
  }, []);

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

  const handleAddToCart = () => {
    if (inCart(card._id)) {
      setShowModal(true);
    } else {
      addItem({ ...card, id: card._id });
    }
  };

  return (
    <div>
      <Head>
        <script
          id="pixel-script-poptin"
          src="https://cdn.popt.in/pixel.js?id=b6981d0c90768"
          async="true"
        ></script>
      </Head>

      <Nav />
      <div className="flex gap-2 lg:gap-10 my-5 p-2 xl:px-20 2xl:px-36 cursor-pointer">
        <Link href="/">
          <p className="text-sm ">Product Listing</p>
        </Link>
        <Image src={arrow} alt="" />
        <p className="text-sm font-bold">Product Page</p>
      </div>
      <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-12 gap-10 my-20 p-2 xl:px-20 2xl:px-36">
        <div className="lg:col-span-6 lg:px-10 2xl:px-20">
          <div className="w-full">
            <div className="flex rounded-md shadow-md flex-col gap-3 w-full">
              <div className="">
                {card?.imageUrl && (
                  <img
                    alt="alt"
                    src={card?.imageUrl}
                    className="w-full h-full"
                  />
                )}
              </div>
            </div>
            <div></div>
          </div>
        </div>

        <div className="lg:col-span-6 flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <p className="text-2xl text-black w-96 font-bold">
              The Anti-infectives Drugs Market in Nigeria
            </p>
            <div className="flex my-2 items-center">
              <p className="text-xl mr-5 ">${card?.price}</p>
              <div class="flex items-center border-l-2 px-2">
                <svg
                  class="w-4 h-4 text-yellow-300 ms-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                {/* Add more stars */}
              </div>
              <div>
                <p className="text-xs ">(20 views)</p>
              </div>
            </div>

            <div className="border border-gray-200 "></div>

            <div className="flex flex-col my-2 gap-9">
              <p className="text-sm "> {objective}</p>
            </div>

            <div className="lg:col-span-3 flex flex-col gap-5 items-center w-full mt-3">
              <div className="flex w-full gap-5">
                <button className="rounded-full w-[30%] border border-[#1567E0]  p-3 bg-[white] text-[#1567E0] ">
                  1
                </button>
                <button
                  className="rounded-full w-full  p-3 bg-[#1567E0] text-white "
                  onClick={handleAddToCart}
                >
                  Add to cart
                </button>
              </div>
              <div className="w-full">
                <a href="/pages/payment" className="text-black w-full">
                  <button
                    className="rounded-full w-full border border-[#1567E0]  p-3 bg-[white] text-[#1567E0]  "
                    onClick={handleAddToCart}
                  >
                    Buy now
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
