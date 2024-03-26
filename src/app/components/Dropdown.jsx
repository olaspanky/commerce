import React, { useState } from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion,AnimatePresence } from 'framer-motion'

import { MenuItem } from './Navbar';
export default function Dropdown(props) {
    const { item } = props;
    const [isOpen, setIsOpen] = useState(false);
    const menuItems = item?.children ? item.children : [];
    const path = usePathname()


    const toggle = () => {
        setIsOpen(old => !old);
    }

    const transClass = isOpen
        ?
        "flex"
        :
        "hidden";

    return (
        <>
            <div className="relative">
                <button
                    className="hover:text-blue-400"
                    onMouseEnter={toggle}
                    >{item.title}</button>
                <div 
                className={`absolute top-8 z-30 w-[200px] min-h-[200px] flex text-black flex-col px-3 gap-3 py-4 bg-white rounded-md ${transClass}`}>
                    {
                        menuItems.map(item =>
                            <Link
                                key={item.route}
                             className={`${item.route === path ? "text-blue-700" : "text-black"}`} 
                                href={item?.route || ''}
                                onClick={toggle}
                            >
                                <motion.div
                                                whileHover={{scale: 1.1}}
                                                >
                                                    {item.title}
                                    </motion.div></Link>
                        )
                    }
                </div>
            </div>
            {
                isOpen
                    ?
                    <div
                        className="fixed top-0 right-0 bottom-0 left-0 z-20 "
                        onClick={toggle}
                    ></div>
                    :
                    <></>
            }
        </>
    )
}