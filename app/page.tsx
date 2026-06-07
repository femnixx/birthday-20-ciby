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
import SuggestionBox from './components/SuggestionBox';

import { CurationHeader, DinnerSpotDetailCard } from './components/DinnerSectionDetails';
import { reasons, dinnerSpots } from './data/dinnerData';

import mapImg from '../app/assets/maps.jpg'; 

export default function Page() {
  const [selectedDinner, setSelectedDinner] = useState<number | null>(null);

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
          <CurationHeader 
            subtitle="The Birthday Menu"
            title="Dinner Recommendations"
            caption="Tap a card to inspect tonight's curation"
          />

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
                <DinnerSpotDetailCard 
                  spot={dinnerSpots[selectedDinner]} 
                  mapImg={mapImg} 
                />
              </div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* 6. SUGGESTION BOX SECTION */}
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionFadeReveal}
      >
        <SuggestionBox />
      </motion.div>
      
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