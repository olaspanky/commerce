import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Dropdown from "./Dropdown";
import Logo from "../../../public/assets/white_logo.svg";
import cart from "../../../public/assets/cart.svg";
import { useCart } from "react-use-cart";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    title: "Home",
    route: "/",
  },
  {
    title: "Categories",
    route: "",
    children: [
      { title: "HCP Insight", route: "/pages/category/Hcp" },
      { title: "Healthcare Ecosystem Insight", route: "/pages/category/Healthcare-Ecosystem-Insights" },
      { title: "Market Insight", route: "/pages/category/Market-Insight" },
      { title: "Patients Insight", route: "/pages/category/Patient-Insight" },
    ],
  },
  { title: "Blog", route: "/pages/blog" },
  { title: "Contact Us", route: "/pages/contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const path = usePathname();
  const { totalItems } = useCart();
  let inactivityTimeout = null;

  // Close menu after 4 seconds of inactivity
  const closeMenuAfterInactivity = useCallback(() => {
    inactivityTimeout = setTimeout(() => {
      setIsMenuOpen(false);
    }, 1500); // 4 seconds
  }, []);

  // Reset inactivity timer whenever there is interaction
  const resetInactivityTimer = () => {
    if (inactivityTimeout) clearTimeout(inactivityTimeout);
    if (isMenuOpen) closeMenuAfterInactivity();
  };

  // Toggle menu and reset inactivity timer
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
    resetInactivityTimer();
  };

  useEffect(() => {
    if (isMenuOpen) {
      closeMenuAfterInactivity(); // Start timer when the menu opens
    }

    return () => {
      if (inactivityTimeout) clearTimeout(inactivityTimeout); // Clear timeout when component unmounts or menu closes
    };
  }, [isMenuOpen, closeMenuAfterInactivity]);

  return (
    <div className="bg-white w-full flex justify-between px-5 xl:px-20 2xl:px-36 gap-10 items-center">
      <div className="lg:p-5 p-2 rounded-br-[25%] rounded-bl-[25%] bg-[#1567E0]">
        <Link href="/">
          <Image src={Logo} className="w-5 lg:w-20" alt="logo" />
        </Link>
      </div>

      <div className="hidden md:flex h-auto cursor-pointer gap-8 items-center text-black">
        {menuItems.map((item) => {
          return item.children ? (
            <Dropdown key={item.title} item={item} />
          ) : (
            <Link key={item.title} href={item.route}>
              <span className={`${item.route === path ? "text-[#FFFFFF] hover:text-[#1567E0] cursor-pointer border-b-2 px-3 border-[#FFFFFF] font-semibold pb-1" : ""}`}>
                {item.title}
              </span>
            </Link>
          );
        })}
        <a href="/pages/cart" className="text-white">
          <div className="flex gap-3 px-3 py-2 border rounded-lg border-[#1567E0] items-center justify-center">
            <div className="relative">
              <Image src={cart} alt="cart" />
              {totalItems > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs">
                  {totalItems}
                </div>
              )}
            </div>
            <p className="text-xs text-[#1567E0]">Cart</p>
          </div>
        </a>
      </div>

      <div className="md:hidden text-black">
        <button onClick={toggleMenu} className="hover:text-blue-500">
          &#9776;
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden fixed top-0 right-0 bottom-0 z-30 bg-white w-[70%] h-screen overflow-y-auto p-8 transition-all duration-1000">
          <button onClick={toggleMenu} className="hover:text-blue-500 flex justify-end ml-48 rounded-full p-2 text-blue-500">
            X
          </button>
          {menuItems.map((item) => (
            <div key={item.title} className="mb-4">
              {item.children ? (
                <Dropdown item={item} />
              ) : (
                <Link href={item.route || ''} onClick={toggleMenu}>
                  <div className="hover:text-blue-500 cursor-pointer">{item.title}</div>
                </Link>
              )}
            </div>
          ))}
          <a href="/pages/cart" className="text-black">
            <div className="flex gap-3 px-3 py-2 border rounded-lg border-white items-center justify-center">
              <div className="relative">
                <Image src={cart} alt="cart" />
                {totalItems > 0 && (
                  <div className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs">
                    {totalItems}
                  </div>
                )}
              </div>
              <p className="text-xs text-white">Cart</p>
            </div>
          </a>
        </div>
      )}
    </div>
  );
}
