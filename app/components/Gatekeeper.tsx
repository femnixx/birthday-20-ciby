"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Gatekeeper() {
  const [showGate, setShowGate] = useState(false);
  const [step, setStep] = useState(0); // 0: First q, 1: Second q

  useEffect(() => {
    // Check if user has already passed the gate
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setShowGate(true);
    }
  }, []);

  const handleYes = () => {
    if (step === 0) {
      setStep(1);
    } else {
      localStorage.setItem('hasVisited', 'true');
      setShowGate(false);
    }
  };

  const handleNo = () => {
    // "Quit" the website by redirecting to Google
    window.location.href = "https://www.google.com";
  };

  if (!showGate) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-[100] flex items-center justify-center bg-sky-50 p-6"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="bg-white p-8 rounded-3xl shadow-2xl border border-sky-100 max-w-sm w-full text-center space-y-6"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <h2 className="text-2xl font-serif font-bold text-slate-900">
            {step === 0 ? "Do you reeaaaally wanna see it?" : "Do you really really wanna see it?"}
          </h2>
          
          <div className="flex flex-col gap-3">
            <button 
              onClick={handleYes}
              className="w-full py-3 bg-sky-600 text-white rounded-xl font-bold hover:bg-sky-700 transition-colors"
            >
              Yes!
            </button>
            <button 
              onClick={handleNo}
              className="w-full py-3 bg-slate-100 text-slate-600 rounded-xl font-medium hover:bg-slate-200 transition-colors"
            >
              No, I don't wanna see.
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}