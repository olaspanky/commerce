"use client"
import Image from "next/image";
import Head2 from "./components/head"
import Carousel from "./components/Carousel"
import Nav from "./components/Navbar"
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Head from "next/head";

export default function Home() {
  return (
    <main className="">
      <Head>
      <script id='pixel-script-poptin' src='https://cdn.popt.in/pixel.js?id=b6981d0c90768' async='true'></script> 
      </Head>
      <Nav/>
      <Head2/>
      <Hero/>
      <Footer/>
    </main>
  );
}
