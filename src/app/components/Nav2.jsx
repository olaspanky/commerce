import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/assets/white_logo.svg";
import Dropdown from "./Dropdown"; // Assuming Dropdown is a separate component
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
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownTimeoutRef = useRef(null); // Using a ref for timeout
  const menuRef = useRef(null);
  const path = usePathname();
  const { totalItems } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDropdownOpen = (index) => {
    setActiveDropdown(index);
    console.log("Dropdown opened:", index); // Debugging
  
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
  
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      console.log("Dropdown closed:", index); // Debugging
    }, 1500); // 1.5 seconds
  };
  
  const handleDropdownInteraction = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    console.log("Dropdown interaction detected: timeout cleared."); // Debugging
  };
  

 

  useEffect(() => {
    // Cleanup timeout on unmount
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="flex w-full justify-between px-5 xl:px-20 2xl:px-36 gap-10 items-center">
      <div className="lg:p-5 p-2 rounded-br-[25%] rounded-bl-[25%] bg-[#1567E0]">
        <Link href="/">
          <Image src={Logo} className="w-5 lg:w-20" alt="logo" />
        </Link>
      </div>

      <div className="hidden md:flex gap-8 cursor-pointer items-center text-white">
        {menuItems.map((item, index) =>
          item.children ? (
            <Dropdown
              key={index}
              item={item}
              active={activeDropdown === index}
              onOpen={() => handleDropdownOpen(index)}
              onInteract={handleDropdownInteraction}
            />
          ) : (
            <Link
              key={index}
              href={item.route}
              className={`${
                item.route === path
                  ? "text-[#FFFFFF] border-b-2 px-3 border-[#FFFFFF] font-semibold pb-1"
                  : ""
              } hover:text-blue-500`}
            >
              {item.title}
            </Link>
          )
        )}
      </div>

      <div className="md:hidden text-black">
        <button onClick={toggleMenu} className="hover:text-blue-500">
          &#9776;
        </button>
      </div>

      {isMenuOpen && (
        <div
          ref={menuRef}
          className="md:hidden fixed top-0 right-0 bottom-0 z-30 bg-white w-[70%] h-screen overflow-y-auto p-8 transition-all duration-1000"
        >
          <button
            onClick={toggleMenu}
            className="hover:text-blue-500 flex justify-end ml-48 rounded-full p-2 text-blue-500 text-right"
          >
            X
          </button>
          {menuItems.map((item, index) => (
            <div key={index} className="mb-4">
              {item.children ? (
                <Dropdown
                  item={item}
                  active={activeDropdown === index}
                  onOpen={() => handleDropdownOpen(index)}
                  onInteract={handleDropdownInteraction}
                />
              ) : (
                <Link href={item.route} onClick={toggleMenu}>
                  <div className="hover:text-blue-500">{item.title}</div>
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}