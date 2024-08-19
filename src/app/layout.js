"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import '@mantine/carousel/styles.css';
import { Poppins } from "next/font/google";
import CartProviders from "./components/provider";
import { ChakraProvider } from '@chakra-ui/react'
import Head from "next/head";
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';


const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
})



export default function RootLayout({ children }) {


  return (
    <html lang="en">
     
      <body className={poppins.className}>
        <MantineProvider>
          <ChakraProvider>
          <CartProviders>
          
            
            {children}
            <TawkMessengerReact
                propertyId="66c2d0b9146b7af4a43be001"
                widgetId="1i5kfulu3"/>
            
          </CartProviders>
          </ChakraProvider>
          </MantineProvider>
      </body>
    </html>
  );
}


