"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function FortuneCookie() {
  const [isCracked, setIsCracked] = useState(false);
  const [fortune, setFortune] = useState("");

  const fortunes = [
    "Your presence is verified as the absolute best part of my daily routine. 🌸",
    "An excellent year ahead full of breakthrough layouts and pure bliss awaits you! ✨",
    "Error 404: Words not found to describe how wonderfully amazing you are. 🐾",
    "You are bound to bring immense smiles to everyone you interact with today. 🍰",
    "Today's documentation decrees that you deserve a massive slice of cake immediately! 🎂",
  ];

  const handleCrack = () => {
    if (isCracked) {
      setIsCracked(false);
    } else {
      const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
      setFortune(randomFortune);
      setIsCracked(true);
    }
  };

  return (
    <section id="fortune-cookie" className="py-24 bg-sky-50/30 relative z-20 border-t border-slate-200/50">
      <div className="max-w-md mx-auto px-6 text-center">
        <h2 className="text-xs font-extrabold uppercase tracking-[0.3em] text-sky-600 mb-2">Mini-Game Two</h2>
        <h3 className="text-3xl font-serif font-black text-slate-900 mb-8">The Oracle Cookie</h3>

        <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-[0_4px_20px_rgba(15,23,42,0.02)] min-h-[260px] flex flex-col justify-between items-center">
          
          {/* Animated interactive cookie geometry */}
          <motion.div
            animate={isCracked ? { rotate: [0, -10, 10, 0] } : { y: [0, -4, 0] }}
            transition={isCracked ? { duration: 0.4 } : { repeat: Infinity, duration: 3, ease: "easeInOut" }}
            onClick={handleCrack}
            className="text-6xl cursor-pointer select-none py-4 filter drop-shadow-sm"
          >
            {isCracked ? "🥠" : "🍪"}
          </motion.div>

          {/* Reveal Box state */}
          <div className="h-20 flex items-center justify-center">
            {isCracked ? (
              <motion.p
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-slate-700 text-sm font-medium italic px-4 py-2 border-l-2 border-sky-400 bg-sky-50/50 rounded-r-lg leading-relaxed"
              >
                "{fortune}"
              </motion.p>
            ) : (
              <p className="text-slate-400 text-xs font-semibold tracking-wide uppercase animate-pulse">
                Click the cookie to break it open
              </p>
            )}
          </div>

          <button
            onClick={handleCrack}
            className="mt-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-sky-600 border border-slate-200 hover:border-sky-200 px-4 py-2 rounded-xl transition duration-200 bg-white shadow-sm"
          >
            {isCracked ? "Reset Oracle" : "Crack Cookie"}
          </button>
        </div>
      </div>
    </section>
  );
}