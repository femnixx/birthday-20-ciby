"use client";

import { motion } from 'framer-motion';

export default function Navbar() {
  const links = [
    { name: "Home", href: "#hero" },
    { name: "Reasons", href: "#reasons" },
    { name: "Catch Game", href: "#catch-game" },
    { name: "The Oracle", href: "#fortune-cookie" }
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/60 backdrop-blur-md z-50 border-b border-slate-200/40 flex justify-center items-center py-4">
      <div className="flex items-center gap-6 md:gap-8 text-xs font-bold tracking-widest uppercase text-slate-600">
        {links.map((link, i) => (
          <motion.a 
            key={i}
            href={link.href} 
            className="relative hover:text-sky-600 transition-colors duration-200 py-1 px-2 group"
            whileHover={{ scale: 1.1, y: -1 }}
            whileTap={{ scale: 0.95 }}
          >
            {link.name}
            {/* Smooth sliding underline decorative bar */}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-500 transition-all duration-300 group-hover:w-full" />
          </motion.a>
        ))}
      </div>
    </nav>
  );
}