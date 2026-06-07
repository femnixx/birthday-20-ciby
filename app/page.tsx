"use client";

import { useState, useEffect } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Component Imports
import FloatingElements from './components/FloatingElements';
import ReasonCard from './components/ReasonCard';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CatchGame from './components/CatchGame';
import FortuneCookie from './components/FortuneCookie';
import ArcadeFooter from './components/ArcadeFooter';
import SuggestionBox from './components/SuggestionBox';
import LoadingScreen from './components/LoadingScreen';
import { CurationHeader, DinnerSpotDetailCard } from './components/DinnerSectionDetails';

// Data Imports
import { reasons, dinnerSpots } from './data/dinnerData';
import mapImg from '../app/assets/maps.jpg'; 

// Character Imports
import usagi1 from '../app/assets/usagi-1-removebg-preview.png';
import usagi2 from '../app/assets/usagi-2-removebg-preview.png';
import usagi3 from '../app/assets/usagi-3-removebg-preview.png';
import cinna1 from '../app/assets/cinnamoroll-1-removebg-preview.png';
import cinna2 from '../app/assets/cinnamoroll-2-removebg-preview.png';

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDinner, setSelectedDinner] = useState<number | null>(null);

  // Floating Character Helper Component
  const FloatingCharacter = ({ src, className }: { src: any, className: string }) => (
    <motion.div
      className={`absolute z-30 pointer-events-none ${className}`}
      animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      <Image src={src} alt="Character" width={100} height={100} className="w-16 h-16 md:w-24 md:h-24 object-contain opacity-90" />
    </motion.div>
  );

  // Asset Loading Logic
  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => setIsLoading(false), 800);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  const handleCardClick = (idx: number) => {
    if (selectedDinner === idx) {
      setSelectedDinner(null);
    } else if (selectedDinner !== null) {
      setSelectedDinner(null);
      setTimeout(() => setSelectedDinner(idx), 300);
    } else {
      setSelectedDinner(idx);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
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
    offscreen: { opacity: 0, y: 20 },
    onscreen: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const sectionSubtleReveal: Variants = {
    offscreen: { opacity: 0, y: 10 },
    onscreen: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut" } }
  };

  const sectionBounceReveal: Variants = {
    offscreen: { opacity: 0, y: 100, scale: 0.9 },
    onscreen: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", bounce: 0.5, duration: 0.8 } }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loading" />}
      </AnimatePresence>

      {!isLoading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen bg-sky-50 text-slate-900 relative overflow-x-hidden antialiased selection:bg-sky-200 selection:text-sky-900 perspective-1000"
        >
          <FloatingElements />
          <Navbar />
          
          {/* Hero Section */}
          <div className="relative">
            <FloatingCharacter src={usagi1} className="top-20 right-2 md:top-20 md:right-10" />
            <HeroSection />
          </div>

          {/* REASONS SECTION */}
          <motion.section 
            id="reasons" 
            className="py-28 bg-white relative z-20"
            initial="offscreen" 
            whileInView="onscreen" 
            viewport={{ once: true, amount: 0.1 }} 
            variants={sectionFadeReveal}
          >
            <FloatingCharacter src={cinna1} className="-top-8 left-0 md:-top-10 md:left-5" />
            <div className="absolute -top-2 left-0 right-0 h-4 bg-white z-10 pointer-events-none" />
            <div className="absolute top-40 left-10 w-40 h-40 bg-sky-200/40 rounded-full filter blur-2xl pointer-events-none" />
            <div className="absolute bottom-40 right-10 w-48 h-48 bg-indigo-200/30 rounded-full filter blur-3xl pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
              <motion.div className="text-center mb-24 space-y-2" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <h2 className="text-3xl md:text-5xl font-serif font-black tracking-tight text-slate-950">Why <span className="text-sky-600 italic font-bold">You</span></h2>
                <div className="w-16 h-1 bg-sky-600 mx-auto !mt-6 rounded-full" />
              </motion.div>
              
              <motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {reasons.map((r, i) => (
                  <motion.div key={i} variants={itemVariants} className={`h-full ${i % 2 === 1 ? "md:translate-y-6" : ""}`}>
                    <ReasonCard {...r} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.section>

          <CatchGame />

          <motion.section id="fortune-cookie" initial="offscreen" whileInView="onscreen" viewport={{ once: false, amount: 0.15 }} variants={sectionBounceReveal}>
            <FortuneCookie />
          </motion.section>

          {/* DINNER SECTION */}
          <motion.section id="dinner" className="py-28 bg-white relative z-20 border-t border-slate-200/50" initial="offscreen" whileInView="onscreen" viewport={{ once: false, amount: 0.1 }} variants={sectionSubtleReveal}>
            <FloatingCharacter src={usagi2} className="-top-8 right-0 md:-top-10 md:right-10" />
            <div className="max-w-6xl mx-auto px-6 md:px-12">
              <CurationHeader subtitle="The Birthday Menu" title="Dinner Recommendations" caption="Tap a card to inspect tonight's curation" />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {dinnerSpots.map((spot, idx) => (
                  <motion.div key={idx} onClick={() => handleCardClick(idx)} className={`group bg-gradient-to-b ${spot.color} border border-slate-200/70 rounded-2xl p-5 cursor-pointer flex flex-col justify-between transition-all duration-300 shadow-sm ${spot.border}`} whileHover={{ y: -8, scale: 1.02 }} whileTap={{ scale: 0.97 }} layout>
                    <div className="space-y-4">
                      <motion.div className="w-12 h-12 relative rounded-xl overflow-hidden shadow-sm border border-slate-200/60 bg-white p-0.5 origin-center -rotate-3" whileHover={{ rotate: [-3, 6, -8, 4, -3], scale: 1.12 }}>
                        <Image src={spot.logo} alt={`${spot.name} Logo`} className="w-full h-full object-cover rounded-lg" />
                      </motion.div>
                      <div>
                        <h4 className="font-serif font-bold text-slate-950 text-sm leading-tight">{spot.name}</h4>
                        <p className="text-[9px] text-sky-700 font-extrabold tracking-wider uppercase mt-1">{spot.type}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <AnimatePresence mode="wait">
                {selectedDinner !== null && (
                  <div className="relative mt-8"><DinnerSpotDetailCard spot={dinnerSpots[selectedDinner]} mapImg={mapImg} /></div>
                )}
              </AnimatePresence>
            </div>
          </motion.section>

          {/* Footer Area */}
          <div className="relative">
            <FloatingCharacter src={cinna2} className="top-10 left-0 md:top-10 md:left-10" />
            <FloatingCharacter src={usagi3} className="bottom-10 right-0 md:bottom-20 md:right-10" />
            <motion.div initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.1 }} variants={sectionFadeReveal}>
              <SuggestionBox />
            </motion.div>
            
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <ArcadeFooter />
            </motion.div>
          </div>
        </motion.div>
      )}
    </>
  );
}