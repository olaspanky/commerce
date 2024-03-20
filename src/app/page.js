"use client"
import Image from "next/image";
import Head from "./components/head"
import Carousel from "./components/Carousel"
import Nav from "./components/Navbar"
import Hero from "./components/Hero";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="">
      <Nav/>
      <Head/>
      <Hero/>
      <Footer/>
    </main>
  );
}
