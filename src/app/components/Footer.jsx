import React from "react";
import location from "../../../public/assets/location.svg";
import logo from "../../../public/assets/white_logo.svg";
import foot from "../../../public/assets/foot.svg";
import Image from "next/image";
import { SocialIcon } from "react-social-icons";
import Link from "next/link";

const footer = () => {
  return (
    <div className="bg-footer" style={{ position: "relative" }}>

   

          <div className="  text-[white]] lg:px-7 px-1 py-8" style={{ position: "relative", zIndex: 1 }}>
     


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
        <p>@2022 PBR</p>
        <p>Privacy .</p>
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