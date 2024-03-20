import React, { useState } from 'react';
import Image from 'next/image';
import arrow from "../../../public/assets/farrow.svg"
import eye from "../../../public/assets/eye.svg"
import Link from 'next/link';
import pic12 from "../../../public/assets/picturecommerce12.svg"
import pic1 from "../../../public/assets/picturecommerce1.svg"
import { client } from '../lib/sanity';

async function getData() {
  const query = `*[_type == 'product'] | order(_createdAt desc){
    _id, image, location, price, name, details,sumary, objective,methodology,pdfFile,
      "slug": slug.current,
      "imageUrl": image[0].asset->url      
  }`;
  const data = await client.fetch(query);
  return data;
}

export default async function BoxGrid({carddata}) {
  const data = await getData();
  const card = data.find((item) => item.id === parseInt(carddata));
  console.log("dynamic card is", card)
  console.log("dynamic carddata is", carddata)
  const [hoveredIndex, setHoveredIndex] = useState(0);


  const [activeTitle, setActiveTitle] = useState('Report Overview');
  const [displayText, setDisplayText] = useState('The Nigerian anti-infectives market plays a pivotal role in addressing a wide spectrum of infections. Notably, in 2022, the anti-infectives segment made a substantial contribution, accounting for 25.90% of the total pharmaceutical market revenue, reaching an impressive $835 million. This market exhibited a robust growth pattern, primarily fueled by the profound impact of the COVID-19 pandemic. In 2022, it recorded significant expansion, with a notable increase in revenue amounting to +$237 million compared to the previous year. Projections indicate a continuous growth trend, with market revenue expected to reach $722 million by 2028(CAGR: 6.60%). However, it is essential to acknowledge that the anticipated decline in market revenue from 2022 to 2028 is primarily attributed to currency devaluation. As the local currency undergoes devaluation, it triggers a chain reaction of effects. This includes increased production costs for pharmaceutical companies, resulting in higher drug prices for consumers. Consequently, consumers purchasing power may diminish, potentially posing challenges for local pharmaceutical enterprises as they compete on the global stage. These combined factors are expected to constrain the revenue growth within the anti-infectives market (CAGR: 6.60%). Major industry players, including GSK, Sanofi, Fidson Healthcare, Pfizer, Roche, and Taylek have made substantial contributions. GSK, driven by Augmentin and Ampiclox, accounted for 31.94% of the 2022 revenue..');

  const handleTitleClick = (title) => {
    setActiveTitle(title);

    // Set the corresponding text based on the clicked title
    switch (title) {
      case 'Report Overview':
        setDisplayText('The Nigerian anti-infectives market plays a pivotal role in addressing a wide spectrum of infections. Notably, in 2022, the anti-infectives segment made a substantial contribution, accounting for 25.90% of the total pharmaceutical market revenue, reaching an impressive $835 million. This market exhibited a robust growth pattern, primarily fueled by the profound impact of the COVID-19 pandemic. In 2022, it recorded significant expansion, with a notable increase in revenue amounting to +$237 million compared to the previous year. Projections indicate a continuous growth trend, with market revenue expected to reach $722 million by 2028(CAGR: 6.60%). However, it is essential to acknowledge that the anticipated decline in market revenue from 2022 to 2028 is primarily attributed to currency devaluation. As the local currency undergoes devaluation, it triggers a chain reaction of effects. This includes increased production costs for pharmaceutical companies, resulting in higher drug prices for consumers. Consequently, consumers purchasing power may diminish, potentially posing challenges for local pharmaceutical enterprises as they compete on the global stage. These combined factors are expected to constrain the revenue growth within the anti-infectives market (CAGR: 6.60%). Major industry players, including GSK, Sanofi, Fidson Healthcare, Pfizer, Roche, and Taylek have made substantial contributions. GSK, driven by Augmentin and Ampiclox, accounted for 31.94% of the 2022 revenue.');
        break;
      case 'Report':
        setDisplayText('This is the Report text.');
        break;
      case 'Methodology':
        setDisplayText('This report is built on a rigorous and comprehensive research methodology aimed at delivering accurate, insightful, and actionable information to our readers. The methodology employed for this study is a combination of primary research, data collection from proprietary sources, and analytical expertise. The following elements constitute the core of our research approach:1. Primary Research:Interviews with Key Industry Figures: We conducted in-depth interviews with key stakeholders, industry experts, healthcare professionals, and representatives from pharmaceutical companies operating in the anti-infective drugs market in Nigeria. These interviews provided valuable firsthand insights, expert opinions, and qualitative data.<br/> 2. Data from Proprietary Sources:Versus Database: To enrich our analysis with real-world data, we leveraged our proprietary Versus database. This database provides access to a wealth of information related to market trends, consumer behavior, and sales figures within the cardiovascular drug segment in Nigeria. By tapping into this data, we gained a data-driven perspective on the market.<br/> 3. Analyst Expertise:Synthesizing Insights: Our in-house team of skilled analysts played a critical role in synthesizing the primary research data and proprietary data. Their analytical expertise ensured that the information presented in this report is not only accurate but also actionable for our readers.The combined use of primary research, real-world data, and the analytical capabilities of our team enhances the depth and quality of our analysis. This multifaceted approach allows us to provide a comprehensive understanding of the Nigerian antihypertensive drugs market and offer insights that can inform strategic decision-making.');
        break;
      default:
        setDisplayText('');
    }
  };
  if(!card){
    return(
      <>
      <h1>nothing to show</h1>
      </>
    )
  }



  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-10 my-20 px-10 h-[70vh]">
        <div className='col-span-3 px-20'>
            <div className="w-full">
          <div className="flex rounded-md shadow-md flex-col gap-3 w-full">
            <div className="">
              <Image alt="alt"  src={card.icon} className='w-full' />
            </div>
            <div className='px-5 text-xs'>
              <p>{card.location}</p>
            </div>
            <div className='flex justify-between px-5 text-xs text-[#1567E0] pb-5'>
              <div className='flex gap-2'>
              <p className="">
              {card.price}
            </p>
            <Link href={`/pages/${card.id}`}>
            <Image src={arrow}/>
            </Link>
              </div>
              <div className='flex gap-2'>
              <p className="">
              {card.view}
            </p>
                <Image src={eye}/>
              </div>
           
           
            </div>
          </div>
          <div>
           
          </div>
        </div>
        </div>


        <div className='col-span-6 flex flex-col gap-3'>
            <p className='text-2xl text-[#1567E0] font-bold'>Anti-infective Report Analysis 2023</p>
            <div className='flex justify-between text-xs lg:w-[55%] '>
                <p>Published: October 18, 2023</p>
                <p>Report Code: PBR -LS1200</p>
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
        <p>{displayText}</p>
      </div>

      <style jsx>{`
        .flex {
          display: flex;
        }

        .title {
          padding: 10px;
          cursor: pointer;
        }

        .active {
          border-bottom: 2px solid blue; /* Add your desired underline style */
        }

        .content {
          margin-top: 20px;
        }
      `}</style>
    </div>
        </div>


        <div className='col-span-3 flex flex-col gap-5 items-center w-full justify-center'>
            <button className='rounded-lg w-[60%] p-3 bg-[#1567E0] text-white text-xs]'>Add to Cart</button>
            <button className='rounded-lg w-[60%] p-3 bg-gray-200 '>Download Summary</button>
        </div>
    </div>
  );
};

