"use client"
import { Button } from "@/components/ui/button"
import { useShoppingCart } from "use-shopping-cart"

export default function AddToBag({price, description, currency, title
}){
    const {addItem, handleCartClick}= useShoppingCart();
const product = {
    description: description,
    title: title,
    price: price,
    currency: currency,
    id: "lmaooo"
}
    return <Button onClick={()=>{ addItem(product), handleCartClick}}>Add</Button>
}