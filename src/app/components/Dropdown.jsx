import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Dropdown({ item, active, onOpen, onInteract }) {
  const menuItems = item?.children || [];
  const path = usePathname();

  return (
    <div
      className="relative"
      onMouseEnter={onInteract} // Clear close timeout
      onMouseLeave={onOpen}    // Start close timeout
    >
      <button className="hover:text-blue-400">{item.title}</button>
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
              }`}
              href={child?.route || ""}
              onClick={onOpen} // Close dropdown on selection
            >
              <motion.div whileHover={{ scale: 1.1 }}>{child.title}</motion.div>
            </Link>
          ))}
        </motion.div>
      )}
    </div>
  );
}
