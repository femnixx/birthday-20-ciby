"use client";

import { motion, Variants } from 'framer-motion';
import FloatingElements from './components/FloatingElements';
import ReasonCard from './components/ReasonCard';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CatchGame from './components/CatchGame';
import FortuneCookie from './components/FortuneCookie';
import ArcadeFooter from './components/ArcadeFooter';

export default function Page() {
  const reasons = [
    { icon: "🌸", title: "Your Smile", text: "It literally makes the whole sky brighter, like actual sunshine in human form." },
    { icon: "🌙", title: "Your Softness", text: "The way you are gentle and kind to everything around you is the most beautiful thing." },
    { icon: "🐾", title: "Your Silliness", text: "Nobody makes me laugh the way you do. You're perfectly wonderfully weird." },
    { icon: "🍡", title: "Your Warmth", text: "Being near you feels like wrapping up in the coziest blanket on a cloudy day." },
    { icon: "✨", title: "Your Heart", text: "You love so deeply and so purely. The world is genuinely luckier having you in it." },
    { icon: "🌈", title: "All of You", text: "Every little part of you, every quirk, every habit — I'd choose all of it, every day." },
  ];

  // Grid container orchestration variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  };

  // Card items fly upwards from an angle on reveal, and collapse smoothly on exit
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.9, rotateX: -10 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      rotateX: 0,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 18
      } 
    }
  };

  // Section level wrapper entry and exit behaviors
  const sectionFadeReveal: Variants = {
    offscreen: { opacity: 0, y: 60, scale: 0.98 },
    onscreen: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 70, damping: 20, duration: 0.8 }
    }
  };

  return (
    <div className="min-h-screen bg-sky-50 text-slate-900 relative overflow-x-hidden antialiased selection:bg-sky-200 selection:text-sky-900 perspective-1000">
      <FloatingElements />
      <Navbar />
      
      {/* Hero Wrapper Section */}
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        exit="offscreen"
        viewport={{ once: false, amount: 0.15 }}
        variants={sectionFadeReveal}
      >
        <HeroSection />
      </motion.div>

      {/* Collection Grid Container Section */}
      <motion.section 
        id="reasons" 
        className="py-28 bg-sky-50/50 relative border-t border-slate-200/60 z-20"
        initial="offscreen"
        whileInView="onscreen"
        exit="offscreen"
        viewport={{ once: false, amount: 0.1 }}
        variants={sectionFadeReveal}
      >
        <div className="absolute top-40 left-10 w-40 h-40 bg-sky-200/40 rounded-full filter blur-2xl pointer-events-none" />
        <div className="absolute bottom-40 right-10 w-48 h-48 bg-indigo-200/30 rounded-full filter blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            className="text-center mb-24 space-y-2"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
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

      {/* Catch Game Section Wrapper */}
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        exit="offscreen"
        viewport={{ once: false, amount: 0.2 }}
        variants={sectionFadeReveal}
        whileHover={{ scale: 1.005 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <CatchGame />
      </motion.div>

      {/* Fortune Cookie Section Wrapper */}
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        exit="offscreen"
        viewport={{ once: false, amount: 0.2 }}
        variants={sectionFadeReveal}
      >
        <FortuneCookie />
      </motion.div>
      
      {/* Footer Wrapper */}
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