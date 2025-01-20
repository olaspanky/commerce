"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "../components/CheckoutStripe";
import { useCart } from "react-use-cart";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function Home({ onSuccess, onClose, plan }) {
    const {items, isEmpty, totalUniqueItems, totalItems, cartTotal, updateItemQuantity, removeItem, emptyCart} = useCart()  

  return (
    <Elements stripe={stripePromise}>
    <PaymentForm onSuccess={onSuccess} onClose={onClose} plan={plan} />
  </Elements>
  );
}


