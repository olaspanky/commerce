"use client"
import React, { useRef } from "react";
import Image from "next/image";
import Head2 from "./components/head";
import Carousel from "./components/Carousel";
import Nav from "./components/Nav2";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Category from "./components/Category";
import Head from "next/head";
import { FloatingWhatsApp } from 'react-floating-whatsapp'
import logo from "../../public/assets/logo.svg"
import WhatsAppWidget from "react-whatsapp-chat-widget";
import ChatwootWidget from './components/Woochat'


export default function Home() {
  const heroRef = useRef(null);

  const scrollToHero = () => {
    heroRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="h-[500px]">
      <Head>
        <script id='pixel-script-poptin' src='https://cdn.popt.in/pixel.js?id=b6981d0c90768' async='true'></script>
      </Head>
      <Head2 scrollToHero={scrollToHero} />
      <Hero ref={heroRef} />
      <div className="h-0 bg-black">
 <ChatwootWidget/>
      </div>
      <Category />
      <Footer />
    </main>
  );
}
