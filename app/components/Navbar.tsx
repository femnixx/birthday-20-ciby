"use client";

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", href: "#hero" },
    { name: "Reasons", href: "#reasons" },
    { name: "Catch Game", href: "#catch-game" },
    { name: "The Oracle", href: "#fortune-cookie" },
    { name: "Dinner", href: "#dinner" },
    { name: "Suggestions", href: "#suggestions" }
  ];

  // Hamburger line transformation animations
  const lineVariants: Variants = {
    topClosed: { rotate: 0, y: 0 },
    topOpen: { rotate: 45, y: 6 },
    middleClosed: { opacity: 1, scale: 1 },
    middleOpen: { opacity: 0, scale: 0 },
    bottomClosed: { rotate: 0, y: 0 },
    bottomOpen: { rotate: -45, y: -6 }
  };

  // Mobile drawer container slide-down effect
  const menuVariants: Variants = {
    closed: { 
      opacity: 0,
      height: 0,
      transition: { when: "afterChildren", staggerChildren: 0.05, ease: "easeInOut" }
    },
    open: { 
      opacity: 1,
      height: "auto",
      transition: { when: "beforeChildren", staggerChildren: 0.08, ease: "easeInOut" }
    }
  };

  // Individual item stagger animation for mobile list
  const linkItemVariants: Variants = {
    closed: { opacity: 0, y: -15, scale: 0.95 },
    open: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 120, damping: 15 } }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-md z-50 border-b border-slate-200/40 py-4 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6 flex justify-between md:justify-center items-center relative">
        
        {/* DESKTOP LINKS (Hidden on small screens, centered on desktop) */}
        <div className="hidden md:flex items-center gap-8 text-xs font-bold tracking-widest uppercase text-slate-600">
          {links.map((link, i) => (
            <motion.a 
              key={i}
              href={link.href} 
              className="relative hover:text-sky-600 transition-colors duration-200 py-1 px-2 group"
              whileHover={{ scale: 1.1, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-500 transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
        </div>

        {/* MOBILE BRANDING (Only visible on small viewports left side) */}
        <div className="md:hidden font-serif font-black text-sm tracking-tight text-slate-900 select-none">
          Ciby<span className="text-sky-600 italic">Arcade</span>
        </div>

        {/* MOBILE HAMBURGER BUTTON (Only visible on mobile) */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col justify-center items-center w-9 h-9 bg-slate-50 border border-slate-200 rounded-xl space-y-1 z-50 focus:outline-none"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Toggle Menu"
        >
          <motion.span 
            variants={lineVariants}
            animate={isOpen ? "topOpen" : "topClosed"}
            className="w-4 h-0.5 bg-slate-700 rounded-full origin-center"
          />
          <motion.span 
            variants={lineVariants}
            animate={isOpen ? "middleOpen" : "middleClosed"}
            className="w-4 h-0.5 bg-slate-700 rounded-full"
          />
          <motion.span 
            variants={lineVariants}
            animate={isOpen ? "bottomOpen" : "bottomClosed"}
            className="w-4 h-0.5 bg-slate-700 rounded-full origin-center"
          />
        </motion.button>
      </div>

      {/* MOBILE DRAWER ACCORDION WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="md:hidden w-full bg-white/95 border-b border-slate-200/60 overflow-hidden shadow-lg mt-4 px-6"
          >
            <div className="flex flex-col gap-4 py-6 text-center text-xs font-extrabold tracking-widest uppercase text-slate-600">
              {links.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  variants={linkItemVariants}
                  onClick={() => setIsOpen(false)} // Closes menu smoothly upon click
                  className="py-3 border-b border-slate-100 last:border-none hover:text-sky-600 text-slate-700 active:bg-sky-50 rounded-lg transition-colors"
                  whileTap={{ scale: 0.97, backgroundColor: "rgba(14, 165, 233, 0.05)" }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}