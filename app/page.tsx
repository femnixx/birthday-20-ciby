"use client";

import { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import FloatingElements from './components/FloatingElements';
import ReasonCard from './components/ReasonCard';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CatchGame from './components/CatchGame';
import FortuneCookie from './components/FortuneCookie';
import ArcadeFooter from './components/ArcadeFooter';

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
    { name: "Hodai AYCE", type: "Japanese BBQ & Shabu", icon: "🥩", desc: "Infinite premium beef slices, melting cheese dips, and cozy vapor clouds.", color: "from-amber-50 to-orange-100/50", border: "hover:border-orange-300" },
    { name: "Kaizen AYCE", type: "Premium Japanese Grill", icon: "🍣", desc: "Top-tier selections where you can feast like royalty without any limits.", color: "from-red-50 to-rose-100/50", border: "hover:border-rose-300" },
    { name: "Holy Cow", type: "Gourmet Steakhouse", icon: "🐄", desc: "Incredibly juicy wagyu cuts cooked exactly right with signature sauces.", color: "from-amber-50 to-yellow-100/50", border: "hover:border-yellow-300" },
    { name: "Steak 'n Shake", type: "Classic Diner Comforts", icon: "🥤", desc: "Crispy smashed burgers alongside thick, hand-dipped premium milkshakes.", color: "from-slate-50 to-sky-100/50", border: "hover:border-sky-300" },
    { name: "Signora Pasta", type: "Authentic Italian Kitchen", icon: "🍝", desc: "Rich, velvety handcrafted pasta tossed in aromatic garden herbs and olive oils.", color: "from-emerald-50 to-teal-100/50", border: "hover:border-teal-300" }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.9, rotateX: -10 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      rotateX: 0,
      transition: { type: "spring", stiffness: 100, damping: 18 } 
    }
  };

  const sectionFadeReveal: Variants = {
    offscreen: { opacity: 0, y: 70, scale: 0.97 },
    onscreen: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 60, damping: 22, duration: 0.8 }
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
        exit="offscreen"
        viewport={{ once: false, amount: 0.1 }}
        variants={sectionFadeReveal}
      >
        <div className="absolute top-40 left-10 w-40 h-40 bg-sky-200/40 rounded-full filter blur-2xl pointer-events-none" />
        <div className="absolute bottom-40 right-10 w-48 h-48 bg-indigo-200/30 rounded-full filter blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div className="text-center mb-24 space-y-2">
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
                    rotateZ: i % 2 === 0 ? 1 : -1,
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
        exit="offscreen"
        viewport={{ once: false, amount: 0.15 }}
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
        exit="offscreen"
        viewport={{ once: false, amount: 0.1 }}
        variants={sectionFadeReveal}
      >
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16 space-y-2">
            <h2 className="text-xs font-extrabold uppercase tracking-[0.3em] text-sky-600">The Birthday Menu</h2>
            <h3 className="text-3xl md:text-5xl font-serif font-black text-slate-950">Dinner Recommendations</h3>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-widest !mt-3">Tap a card to inspect tonight's curation</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {dinnerSpots.map((spot, idx) => (
              <motion.div
                key={idx}
                onClick={() => setSelectedDinner(selectedDinner === idx ? null : idx)}
                className={`bg-gradient-to-b ${spot.color} border border-slate-200/70 rounded-2xl p-5 cursor-pointer flex flex-col justify-between transition-all duration-300 shadow-sm ${spot.border}`}
                whileHover={{ y: -8, scale: 1.02, boxShadow: "0px 12px 24px rgba(0,0,0,0.04)" }}
                whileTap={{ scale: 0.97 }}
                layout
              >
                <div className="space-y-3">
                  <span className="text-3xl inline-block filter drop-shadow-sm">{spot.icon}</span>
                  <div>
                    <h4 className="font-serif font-bold text-slate-950 text-base leading-tight">{spot.name}</h4>
                    <p className="text-[10px] text-sky-700 font-extrabold tracking-wider uppercase mt-1">{spot.type}</p>
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
              <motion.div
                initial={{ opacity: 0, height: 0, y: 10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: 10 }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                className="mt-8 bg-sky-50/50 border border-sky-100 rounded-2xl p-6 text-center overflow-hidden shadow-inner"
              >
                <span className="text-2xl block mb-2">{dinnerSpots[selectedDinner].icon}</span>
                <h5 className="font-serif font-black text-slate-900 text-lg mb-1">{dinnerSpots[selectedDinner].name}</h5>
                <p className="text-slate-600 text-sm max-w-lg mx-auto leading-relaxed">{dinnerSpots[selectedDinner].desc}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>
      
      {/* FOOTER */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <ArcadeFooter />
      </motion.div>
    </div>
  );
}