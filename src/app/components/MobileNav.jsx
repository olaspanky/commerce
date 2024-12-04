import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/assets/white_logo.svg";
import cart from "../../../public/assets/cart.svg";
import { ChevronDown, ChevronUp } from "lucide-react"; // Import icons
import { useCart } from "react-use-cart"; // Get cart functionality

const MobileNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);
  const { totalItems } = useCart(); // Cart item count

  const menuItems = [
    { title: "Home", route: "/" },
    {
      title: "Categories",
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

  // Toggle full menu
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Toggle dropdown visibility
  const toggleDropdown = (index) => setActiveDropdown((prev) => (prev === index ? null : index));

  // Navbar scroll logic
  useEffect(() => {
    const handleScroll = () => {
      setShowNavbar(window.scrollY <= lastScrollY);
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className={`relative z-50 transition-transform duration-300 ${showNavbar ? "translate-y-0" : "-translate-y-full"}`}>
      {/* Header */}
      <div className="flex justify-between items-center px-5 py-2 bg-[#1567E0] sticky top-0 z-50">
        <Link href="/">
          <Image src={Logo} className="w-10" alt="Logo" />
        </Link>
        <button onClick={toggleMenu} className="text-3xl text-white focus:outline-none hover:text-blue-300">
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Fullscreen Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white text-black transform transition-transform duration-300 ease-in-out z-50 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button onClick={toggleMenu} className="text-3xl text-gray-700 focus:outline-none hover:text-blue-500">
            ✕
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col gap-6 px-6 py-8 text-lg">
          {menuItems.map((item, index) =>
            item.children ? (
              <div key={index} className="relative">
                {/* Parent Dropdown */}
                <button
                  onClick={() => toggleDropdown(index)}
                  className="w-full flex justify-between items-center text-left text-gray-700 hover:text-blue-500"
                >
                  {item.title}
                  <span>{activeDropdown === index ? <ChevronUp size={24} /> : <ChevronDown size={24} />}</span>
                </button>
                {/* Dropdown Menu */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${activeDropdown === index ? "max-h-96" : "max-h-0"}`}
                >
                  <div className="flex flex-col gap-4 pl-4 mt-2">
                    {item.children.map((subItem) => (
                      <Link
                        key={subItem.route}
                        href={subItem.route}
                        className="text-gray-700 hover:text-blue-500"
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
                className="text-gray-700 hover:text-blue-500"
                onClick={toggleMenu}
              >
                {item.title}
              </Link>
            )
          )}
        </nav>

        {/* Cart Section */}
        <div className="px-6 py-4">
          <Link href="/pages/cart" className="text-black">
            <div className="flex items-center gap-3 px-4 py-2 border rounded-lg border-[#1567E0] hover:bg-[#1567E0] hover:text-white">
              <div className="relative">
                <Image src={cart} alt="Cart" />
                {totalItems > 0 && (
                  <div className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs">
                    {totalItems}
                  </div>
                )}
              </div>
              <span>Cart</span>
            </div>
          </Link>
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
