import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/assets/white_logo.svg";
import cart from "../../../public/assets/cart.svg";
import { ChevronDown, ChevronUp } from "lucide-react"; // Import the icons from lucide-react
import { useCart } from "react-use-cart"; // Import the useCart hook

const MobileNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);
  const { totalItems } = useCart(); // Get the total items in the cart

  const menuItems = [
    { title: "Home", route: "/" },
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  // Handle scroll to show/hide navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // Scrolling down
        setShowNavbar(false);
      } else {
        // Scrolling up
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div
      className={`text-white relative z-50 transition-transform duration-300 ${
        showNavbar ? "translate-y-full" : "-translate-y-full"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center px-5 py-1 bg-[#1567E0] sticky top-0 z-50">
        {/* Logo */}
        <Link href="/">
          <Image src={Logo} className="w-10" alt="Logo" />
        </Link>
        {/* Hamburger Icon */}
        <button
          onClick={toggleMenu}
          className="text-3xl focus:outline-none hover:text-blue-300"
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white text-black transform transition-transform duration-300 ease-in-out z-50 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={toggleMenu}
            className="text-3xl text-gray-700 focus:outline-none hover:text-blue-500"
          >
            ✕
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col gap-6 px-6 py-8 text-lg">
          {menuItems.map((item, index) =>
            item.children ? (
              <div key={index} className="relative">
                {/* Parent Button */}
                <button
                  onClick={() => toggleDropdown(index)}
                  className="w-full text-left flex justify-between items-center text-gray-700 hover:text-blue-500"
                >
                  {item.title}
                  <span className="text-xl">
                    {activeDropdown === index ? (
                      <ChevronUp size={24} />
                    ) : (
                      <ChevronDown size={24} />
                    )}
                  </span>
                </button>
                {/* Dropdown */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    activeDropdown === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="flex flex-col gap-4 pl-4 mt-2 text-gray-700">
                    {item.children.map((subItem) => (
                      <Link
                        key={subItem.route}
                        href={subItem.route}
                        className="hover:text-blue-500"
                        onClick={toggleMenu}
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={index}
                href={item.route}
                className="hover:text-blue-500"
                onClick={toggleMenu}
              >
                {item.title}
              </Link>
            )
          )}
        </nav>

        {/* Cart */}
        <div className="left-0 right-0  p-4 max-w-[200px]">
        <a href="/pages/cart" className="text-black">
            <div className="flex gap-3 px-3 py-2 border rounded-lg border-[#1567E0] items-center justify-center">
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
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleMenu}
        ></div>
      )}
    </div>
  );
};

export default MobileNavbar;
