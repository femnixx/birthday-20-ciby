"use client";

import { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import FloatingElements from './components/FloatingElements';
import ReasonCard from './components/ReasonCard';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CatchGame from './components/CatchGame';
import FortuneCookie from './components/FortuneCookie';
import ArcadeFooter from './components/ArcadeFooter';

import mapImg from '../app/assets/maps.jpg'; 

// Curation Asset Matrix Mapping
import hodaiLogo from '../app/assets/hodai.jpg';
import kaizenLogo from '../app/assets/kaizen.png';
import holycowLogo from '../app/assets/holycow.jpg';
import guriLogo from '../app/assets/guriramen.jpg';
import signoraLogo from '../app/assets/signorapasta.jpg';
import paneLogo from '../app/assets/paneepane.png';

export default function Page() {
  const [selectedDinner, setSelectedDinner] = useState<number | null>(null);

  const reasons = [
    { icon: "🌸", title: "Your Smile", text: "It literally makes the whole sky brighter, like actual sunshine in human form." },
    { icon: "🌙", title: "Your Softness", text: "The way you are gentle and kind to everything around you is the most beautiful thing." },
    { icon: "🐾", title: "Your Silliness", text: "Nobody makes me laugh the way you do. You're perfectly wonderfully weird." },
    { icon: "🍡", title: "Your Warmth", text: "Being near you feels like wrapping up in the coziest blanket on a cloudy day." },
    { icon: "✨", title: "Your Heart", text: "You love so deeply and so purely. The world is genuinely luckier having you in it." },
    { icon: "🌈", title: "All of You", text: "Every little part of you, every quirk, every habit — I'd choose all of it, every day." },
  ];

  const dinnerSpots = [
    { name: "Hodai AYCE", type: "Japanese BBQ & Shabu", logo: hodaiLogo, desc: "Infinite premium beef slices, melting cheese dips, and cozy vapor clouds.", color: "from-amber-50 to-orange-100/40", border: "hover:border-orange-300", url: "https://linktr.ee/hodai_ayce", hasWhiteBg: false },
    { name: "Kaizen AYCE", type: "Premium Japanese Grill", logo: kaizenLogo, desc: "Top-tier selections where you can feast like royalty without any limits.", color: "from-red-50 to-rose-100/40", border: "hover:border-rose-300", url: "https://msha.ke/kaizenayce.id", hasWhiteBg: true },
    { name: "Holy Cow", type: "Gourmet Steakhouse", logo: holycowLogo, desc: "Incredibly juicy wagyu cuts cooked exactly right with signature sauces.", color: "from-amber-50 to-yellow-100/40", border: "hover:border-yellow-300", url: "https://linktr.ee/steakholycow", hasWhiteBg: true },
    { name: "Guri Ramen", type: "Authentic Japanese Ramen", logo: guriLogo, desc: "Rich, deeply savory broths served with perfectly springy noodles and premium toppings.", color: "from-emerald-50/60 to-emerald-100/30", border: "hover:border-emerald-400", url: "https://linktr.ee/guriramen.id", hasWhiteBg: false },
    { name: "Signora Pasta", type: "Authentic Italian Kitchen", logo: signoraLogo, desc: "Rich, velvety handcrafted pasta tossed in aromatic garden herbs and olive oils.", color: "from-purple-50 to-indigo-100/30", border: "hover:border-indigo-300", url: "https://www.instagram.com/signorapastamalang/?hl=en", hasWhiteBg: false },
    { name: "Pane e Pane", type: "Artisanal Italian Bakery", logo: paneLogo, desc: "Freshly baked sourdoughs, flaky traditional pastries, and authentic Italian comforting bites.", color: "from-stone-50 to-amber-100/20", border: "hover:border-amber-200", url: "https://linktr.ee/paneepane.id", hasWhiteBg: true }
  ];

  const handleCardClick = (idx: number) => {
    if (selectedDinner === idx) {
      setSelectedDinner(null);
    } else if (selectedDinner !== null) {
      setSelectedDinner(null);
      setTimeout(() => {
        setSelectedDinner(idx);
      }, 300);
    } else {
      setSelectedDinner(idx);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 18 } 
    }
  };

  const sectionFadeReveal: Variants = {
    offscreen: { opacity: 0 },
    onscreen: { 
      opacity: 1, 
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-sky-50 text-slate-900 relative overflow-x-hidden antialiased selection:bg-sky-200 selection:text-sky-900 perspective-1000">
      <FloatingElements />
      <Navbar />
      
      {/* 1. HERO SECTION */}
      <HeroSection />

      {/* 2. REASONS SECTION */}
      <motion.section 
        id="reasons" 
        className="py-28 bg-white relative z-20"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionFadeReveal}
      >
        <div className="absolute -top-2 left-0 right-0 h-4 bg-white z-10 pointer-events-none" />
        <div className="absolute top-40 left-10 w-40 h-40 bg-sky-200/40 rounded-full filter blur-2xl pointer-events-none" />
        <div className="absolute bottom-40 right-10 w-48 h-48 bg-indigo-200/30 rounded-full filter blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-24 space-y-2"
          >
            <h2 className="text-3xl md:text-5xl font-serif font-black tracking-tight text-slate-950">
              Our <span className="text-sky-600 italic font-bold">Collection</span>
            </h2>
            <p className="text-xs font-semibold text-slate-400 tracking-widest uppercase">
              Discover our handpicked selection of premium features designed for the modern individual
            </p>
            <div className="w-16 h-1 bg-sky-600 mx-auto !mt-6 rounded-full" />
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {reasons.map((r, i) => {
              const offsetClass = i % 2 === 1 ? "md:translate-y-6" : "";
              return (
                <motion.div 
                  key={i} 
                  variants={itemVariants}
                  whileHover={{ 
                    y: -10, 
                    scale: 1.03, 
                    rotateZ: i % 2 === 0 ? 0.5 : -0.5,
                    boxShadow: "0px 20px 30px rgba(14, 165, 233, 0.1)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className={`h-full ${offsetClass}`}
                >
                  <ReasonCard {...r} />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* 3. CATCH GAME SECTION */}
      <CatchGame />

      {/* 4. THE ORACLE (FORTUNE COOKIE) SECTION */}
      <motion.section
        id="fortune-cookie"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionFadeReveal}
      >
        <FortuneCookie />
      </motion.section>

      {/* 5. DINNER RECOMMENDATIONS SECTION */}
      <motion.section
        id="dinner"
        className="py-28 bg-white relative z-20 border-t border-slate-200/50"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionFadeReveal}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16 space-y-2">
            <h2 className="text-xs font-extrabold uppercase tracking-[0.3em] text-sky-600">The Birthday Menu</h2>
            <h3 className="text-3xl md:text-5xl font-serif font-black text-slate-950">Dinner Recommendations</h3>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-widest !mt-3">Tap a card to inspect tonight's curation</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {dinnerSpots.map((spot, idx) => (
              <motion.div
                key={idx}
                onClick={() => handleCardClick(idx)}
                className={`group bg-gradient-to-b ${spot.color} border border-slate-200/70 rounded-2xl p-5 cursor-pointer flex flex-col justify-between transition-all duration-300 shadow-sm ${spot.border}`}
                whileHover={{ y: -8, scale: 1.02, boxShadow: "0px 12px 24px rgba(14, 165, 233, 0.08)" }}
                whileTap={{ scale: 0.97 }}
                layout
              >
                <div className="space-y-4">
                  <motion.div 
                    className="w-12 h-12 relative rounded-xl overflow-hidden shadow-sm border border-slate-200/60 bg-white p-0.5 origin-center -rotate-3"
                    variants={{
                      hover: {
                        rotate: [-3, 6, -8, 4, -3],
                        scale: 1.12,
                        transition: { duration: 0.45, ease: "easeInOut" }
                      }
                    }}
                    whileHover="hover"
                  >
                    <Image 
                      src={spot.logo} 
                      alt={`${spot.name} Logo`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </motion.div>
                  <div>
                    <h4 className="font-serif font-bold text-slate-950 text-sm leading-tight group-hover:text-sky-700 transition-colors">{spot.name}</h4>
                    <p className="text-[9px] text-sky-700 font-extrabold tracking-wider uppercase mt-1">{spot.type}</p>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-200/40 text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-slate-900 transition-colors">
                    {selectedDinner === idx ? "Collapse ▲" : "View Details ▼"}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {selectedDinner !== null && (
              <div className="relative mt-8">
                <motion.div
                  key={selectedDinner}
                  initial={{ opacity: 0, height: 0, y: 15 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: 15 }}
                  transition={{ type: "spring", stiffness: 140, damping: 22 }}
                  className="relative z-10 backdrop-blur-md bg-white/80 border border-sky-100/70 rounded-3xl p-6 md:p-8 overflow-hidden shadow-lg grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                >
                  {/* Left Side Info Panel with Clean Backdrop Image Layer */}
                  <div className="text-center md:text-left space-y-5 relative p-2 overflow-hidden rounded-2xl min-h-[220px] flex flex-col justify-center md:justify-start">
                    
                    {/* Unblurred, Large Watermark Layer with a custom background for white logos */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 opacity-[0.06] pointer-events-none z-0 select-none flex items-center justify-center">
                      <div className={`w-full h-full relative rounded-2xl overflow-hidden ${dinnerSpots[selectedDinner].hasWhiteBg ? 'bg-slate-950/10 p-4 shadow-inner' : ''}`}>
                        <Image 
                          src={dinnerSpots[selectedDinner].logo} 
                          alt="Card Center Watermark" 
                          className="w-full h-full object-contain rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="relative z-10 flex flex-col items-center md:items-start gap-3">
                      <motion.div 
                        className="w-16 h-16 relative rounded-2xl overflow-hidden shadow-md border border-slate-200/60 bg-white p-1 -rotate-3"
                        whileHover={{ scale: 1.08, rotate: 2 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      >
                        <Image 
                          src={dinnerSpots[selectedDinner].logo} 
                          alt={dinnerSpots[selectedDinner].name} 
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </motion.div>
                      <div>
                        <h5 className="font-serif font-black text-slate-900 text-2xl mb-1">{dinnerSpots[selectedDinner].name}</h5>
                        <p className="text-xs font-bold uppercase tracking-wider text-sky-700">{dinnerSpots[selectedDinner].type}</p>
                      </div>
                    </div>

                    <p className="relative z-10 text-slate-600 text-sm max-w-md leading-relaxed">{dinnerSpots[selectedDinner].desc}</p>
                    
                    <div className="relative z-10 pt-2">
                      <a 
                        href={dinnerSpots[selectedDinner].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-white bg-sky-600 hover:bg-sky-700 px-5 py-3 rounded-xl shadow-md transition-all duration-200 hover:-translate-y-0.5"
                      >
                        ✨ Open Menu & Socials
                      </a>
                    </div>
                  </div>

                  {/* Right Side Link Preview Area */}
                  <a 
                    href={dinnerSpots[selectedDinner].url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block group relative w-full aspect-[16/10] md:aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-slate-200/60 cursor-pointer bg-slate-100 z-10"
                  >
                    <Image 
                      src={mapImg} 
                      alt="Social Media Link Preview"
                      placeholder="blur"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    
                    <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[1px] transition-colors duration-300 group-hover:bg-slate-900/5" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative flex items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-sky-500 opacity-60" />
                        <span className="animate-pulse absolute inline-flex h-8 w-8 rounded-full bg-sky-400 opacity-40" />
                        
                        <motion.div 
                          animate={{ y: [0, -8, 0] }}
                          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                          className="relative z-10 text-4xl filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)] select-none"
                        >
                          ✨
                        </motion.div>
                      </div>
                    </div>

                    <div className="absolute bottom-3 right-3 bg-slate-950/70 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-white uppercase tracking-wider opacity-80 group-hover:opacity-100 transition-opacity">
                      Open Socials ↗
                    </div>
                  </a>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>
      
      {/* FOOTER */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <ArcadeFooter />
      </motion.div>
    </div>
  );
}