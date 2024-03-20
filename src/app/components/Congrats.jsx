import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import congrats from "../../../public/assets/congrats1.svg"
import progress from "../../../public/assets/progress3.svg"
import back from "../../../public/assets/back.svg"

const BoxGrid = () => {
  return (
    <div>

      <div className='flex  p-10 gap-5 justify-items-start items-center'>
        <Image src={back} alt=''/>
        <h1 className='text-3xl font-bold'>Checkout</h1>
      </div>
         <div className="w-full h-[70vh]  flex flex-col justify-between items-center">
          <div></div>

          <div>
            <Image src={progress} alt=''/>
          </div>

          <div>
            <Image src={congrats} alt=''/>
          </div>

<h1>Congratulations</h1>
<h1>Your order has been placed and will be delivered to you soon.</h1>
<h1>Order ID: 123456789</h1>
<Link href="/">
<button className="w-96 text-white rounded-md bg-[#1567E0] p-2">Order Details</button>
</Link>



  </div> 
    </div>
  )
}
export default BoxGrid;
