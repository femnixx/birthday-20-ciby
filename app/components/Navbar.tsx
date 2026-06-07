"use client";

import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white/70 backdrop-blur-md z-50 border-b border-slate-200/50">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
        <motion.span 
          whileHover={{ scale: 1.02 }}
          className="font-serif text-lg font-black tracking-tight text-slate-900 flex items-center gap-2"
        >
          Indri Collection <span className="text-xs font-sans font-medium text-sky-600 border border-sky-200 bg-sky-50/50 px-2 py-0.5 rounded-full">Edition</span>
        </motion.span>
        <div className="hidden md:flex space-x-8 text-xs font-bold tracking-widest uppercase text-slate-600">
          <a href="#hero" className="hover:text-sky-600 transition-colors">Home</a>
          <a href="#about" className="hover:text-sky-600 transition-colors">About Us</a>
          <a href="#reasons" className="hover:text-sky-600 transition-colors">Reasons</a>
        </div>
        <button className="bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold px-4 py-2 rounded-full transition shadow-sm md:block hidden">
          Explore Collection
        </button>
      </div>
    </nav>
  );
}