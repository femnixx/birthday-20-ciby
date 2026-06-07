"use client";

import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-[95vh] flex flex-col justify-between pt-24 bg-gradient-to-b from-sky-100/60 to-sky-50">
      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full flex-grow flex flex-col md:flex-row items-center justify-center gap-12 py-12">
        
        {/* Left Text Block */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 space-y-6 text-center md:text-left"
        >
          <div className="inline-block bg-white border border-slate-200 text-sky-700 text-[10px] font-extrabold uppercase tracking-[0.25em] px-4 py-1.5 rounded-full shadow-sm">
            ✨ Premium Celebration ✨
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-black tracking-tight text-slate-950 leading-[1.15]">
            Discover Your <br />
            <span className="text-sky-600 italic">Perfect Style</span>
          </h1>
          <p className="text-sm md:text-base text-slate-600 max-w-md leading-relaxed tracking-wide">
            Elevate your wardrobe with premium fashion pieces that blend elegance, quality, and timeless style tailored perfectly for Ciby.
          </p>
          <div className="pt-2">
            <a href="#reasons" className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full shadow-md hover:shadow-lg transition-all duration-200 inline-block">
              Explore Collection
            </a>
          </div>
        </motion.div>

        {/* Right Floating Display Block */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex-1 w-full max-w-md relative aspect-[4/3] bg-white rounded-2xl border border-slate-200/80 p-4 shadow-[0_20px_50px_rgba(15,23,42,0.06)]"
        >
          <div className="w-full h-full rounded-xl bg-slate-100 overflow-hidden relative group border border-slate-200">
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-900/40 to-transparent z-10" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3rem_3rem] flex items-center justify-center">
              <span className="text-4xl filter drop-shadow-md animate-pulse">🌸</span>
            </div>
          </div>
          <div className="absolute -bottom-4 -left-4 bg-white border border-slate-200 p-4 rounded-xl shadow-lg flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-sm font-bold text-sky-700">6+</div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Core Modules</p>
              <p className="text-xs font-bold text-slate-800">Verified Exhibits</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Dynamic Smooth Wave Transition Divider */}
      <div className="w-full overflow-hidden leading-[0] transform rotate-180 -mb-px">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] fill-white">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,4.75,55.05,10.3,81.39,15.11,155.73,28.87,233.9,64.21,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
}