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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 20
      } 
    }
  };

  return (
    <div className="min-h-screen bg-sky-50 text-slate-900 relative overflow-x-hidden antialiased selection:bg-sky-200 selection:text-sky-900">
      <FloatingElements />
      <Navbar />
      <HeroSection />

      {/* Collection Grid Container */}
      <section id="reasons" className="py-28 bg-sky-50/50 relative border-t border-slate-200/60 z-20">
        <div className="absolute top-40 left-10 w-40 h-40 bg-sky-200/40 rounded-full filter blur-2xl pointer-events-none" />
        <div className="absolute bottom-40 right-10 w-48 h-48 bg-indigo-200/30 rounded-full filter blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
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
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {reasons.map((r, i) => {
              const offsetClass = i % 2 === 1 ? "md:translate-y-6" : "";
              return (
                <motion.div 
                  key={i} 
                  variants={itemVariants}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                  className={`h-full ${offsetClass}`}
                >
                  <ReasonCard {...r} />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Injecting Games Pipelines Instead of Old Sections */}
      <CatchGame />
      <FortuneCookie />
      
      <ArcadeFooter />
    </div>
  );
}