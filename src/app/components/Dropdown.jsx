import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Dropdown({ item, active, onToggle, onMouseEnter, onMouseLeave }) {
  const menuItems = item?.children || [];
  const path = usePathname();

  return (
    <div
      className="relative"
      onMouseEnter={onMouseEnter} // Keep the dropdown open
      onMouseLeave={onMouseLeave} // Allow closing after mouse leaves
    >
      <button
        className="hover:text-blue-400"
        onClick={onToggle} // Toggle dropdown on click
      >
        {item.title}
      </button>
      {active && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-8 z-30 w-[200px] min-h-[200px] flex text-black flex-col px-3 gap-3 py-4 bg-white rounded-md shadow-md"
        >
          {menuItems.map((child) => (
            <Link
              key={child.route}
              className={`${
                child.route === path ? "text-blue-700" : "text-black"
              } hover:text-blue-500`}
              href={child?.route || ""}
              onClick={onToggle} // Close dropdown when a link is clicked
            >
              <motion.div whileHover={{ scale: 1.1 }}>{child.title}</motion.div>
            </Link>
          ))}
        </motion.div>
      )}
    </div>
  );
}
