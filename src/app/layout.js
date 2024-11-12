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
import GoogleAnalytics from "./components/GoogleAnalytics";

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
          <GoogleAnalytics />

          
            
            {children}
            <TawkMessengerReact
                propertyId="66c47c33ea492f34bc08163c"
                widgetId="1i5noaafu"/>
            
          </CartProviders>
          </ChakraProvider>
          </MantineProvider>
      </body>
    </html>
  );
}


