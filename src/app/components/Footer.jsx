import React from "react";
import location from "../../../public/assets/location.svg";
import logo from "../../../public/assets/white_logo.svg";
import foot from "../../../public/assets/foot.svg";
import Image from "next/image";
import { SocialIcon } from "react-social-icons";
import Link from "next/link";

const footer = () => {
  return (
    <div className="bg-[#3348b4f1]" style={{ position: "relative" }}>

    <div className="flex justify-center items-center w-full" style={{ position: "absolute", top: 0, left: 0, height: "100%" }}>
            <Image src={foot}/>
          </div>

          <div className="  text-[white]] lg:px-7 px-1 py-8" style={{ position: "relative", zIndex: 1 }}>
      <div className=" bg-no-repeat flex flex-col justify-between lg:mx-7 lg:flex-row grid-cols-1 place-content-center ">
        <div className="col-span-5 flex flex-col gap-5 m-1 ">
          <Image src={logo} />
          <h1 className="lg:text-sm text-xs  my-5 text-white ">
            Transforming healthcare through Real-world
            <br /> Data, Technology, and People
          </h1>
        </div>
        <div className=" flex flex-col lg:gap-20 gap-10 2xl:gap-36 lg:flex-row">
          <div className="col-span-2 flex flex-col gap-3 ">
            <h1 className="text-xs my-5 text-white font-bold">Products</h1>
            <Link href="https://pbr-site.vercel.app/pages/versus">
            <p className="text-xs font-bold text-[#D1D1D1]">Versus</p>
            </Link>
            <Link href="https://pbr-site.vercel.app/pages/sonus">
            <p className="text-xs font-bold  text-[#D1D1D1]">SONUS </p>
            </Link>
            <Link href="https://pbr-site.vercel.app/pages/market_sizer">
            <p className="text-xs font-bold  text-[#D1D1D1]">MARKETSIZER</p>
            </Link>
            <Link href="https://pbr-site.vercel.app/pages/invisio">
              <p className="text-xs font-bold  text-[#D1D1D1]">INVISIO</p>
            </Link>
            <div className="flex flex-row gap-2 items-center">
              <Link href="https://pbr-site.vercel.app/pages/sonusApp">
                <p className="text-xs font-bold  text-[#D1D1D1]">SONUS APP</p>
              </Link>
              <button className="bg-white px-3 py-2 rounded-3xl text-xs text-black">
                new
              </button>
            </div>{" "}
          </div>
          <div className="col-span-2 flex flex-col gap-5 ">
            <h1 className="text-xs my-5 font-bold">Company</h1>
            <Link href="https://pbr-site.vercel.app/pages/company">
              <p className="text-xs font-bold text-white">About us</p>
            </Link>
            <Link href="https://pbr-site.vercel.app/pages/career">
              <p className="text-xs font-bold  text-[#D1D1D1]">Career</p>
            </Link>
            <Link href="https://pbr-site.vercel.app/pages/blog">
              <p className="text-xs font-bold  text-[#D1D1D1]">Blog</p>
            </Link>
            <div className="flex flex-row gap-2 items-center">
              <Link href="https://pbr-site.vercel.app/pages/invisio">
                <p className="text-xs font-bold  text-[#D1D1D1]">News</p>
              </Link>
              <button className="bg-white px-3 py-2 rounded-3xl text-xs text-black">
                new
              </button>
            </div>
          </div>
          <div className="col-span-3 flex flex-col gap-5 ">
            <h1 className="text-xs my-5 font-bold">Services</h1>
            <Link href="https://pbr-site.vercel.app/pages/consulting">
              <p className="text-xs font-bold text-[#D1D1D1]">Consulting</p>
            </Link>
            <Link href="https://pbr-site.vercel.app/pages/whitepaper">
              <p className="text-xs font-bold text-[#D1D1D1]">whitepaper</p>
            </Link>
            <Link href="https://pbr-site.vercel.app/pages/pharmacovigilance">
              <p className="text-xs font-bold  text-[#D1D1D1]">
                Patient Management
              </p>
            </Link>
            <div className="flex flex-row gap-2 items-center">
              <Link href="/">
                <p className="text-xs font-bold  text-[#D1D1D1]">
                  Market Intelligence Report
                </p>
              </Link>
              <button className="bg-white px-3 py-2 rounded-3xl text-xs text-black">
                new
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border border-1 m-10 lg:m-5"></div>

      <div className="flex flex-col lg:flex-row justify-between lg:mx-7">
        <div className="col-span-1 flex flex-col gap-3 ">
          <div className="grid grid-cols-12 flex items-center">
            <div className="col-span-1">
              <Image src={location} alt="" />
            </div>
            <div className="col-span-10 flex flex-col gap-2">
              <h1 className="text-sm font-bold my-1 text-white">PBR International</h1>
              <p className="text-xs text-[#D1D1D1]">
                Kemp House, 152-160 City Road,London EC1V 2NX,United Kingdom
              </p>
            </div>
          </div>
          <div className="grid grid-cols-12 flex items-center">
            <div className="col-span-1">
              <Image src={location} alt="" />
            </div>
            <div className="col-span-10 flex flex-col gap-2">
              <h1 className="text-sm font-bold my-1 text-white">PBR Sub-Saharan Africa</h1>
              <p className="text-xs text-[#D1D1D1]">
                Plot 9, Gbagada Industrial Scheme, Gbagada Expy, Araromi, Lagos
                105102, Lagos
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 my-5">
          <h1 className="text-xs lg:text-end text-white">
            Reach us at marketanalytics@pbrinsight.com <br /> or through our
            online contact form.
          </h1>

          <div className="my-5 flex ">
            <SocialIcon network="linkedin" bgColor="none" />
            <SocialIcon network="twitter" bgColor="none" />
            <SocialIcon network="facebook" bgColor="none" />
          </div>
        </div>
      </div>

      <div className="text-xs flex gap-3 text-white m-7">
        <p>@2022 PBr</p>
        <p>Privacy</p>
        <p>Terms</p>
      </div>


      
    </div>
    </div>
  );
};

export default footer;


{/* <div>
    <video src={require('../../../public/pbrvideo.mp4')} autoPlay muted loop className="w-[100vw] h-96" />
  </div> */}