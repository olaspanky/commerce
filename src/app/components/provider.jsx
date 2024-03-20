"use client"
import { ReactNode } from "react"
import { CartProvider } from "react-use-cart"

export default function CartProviders ({children}) {
    return(
        <CartProvider >
        {children}
        
        </CartProvider>

    )
}