"use client";

import { motion } from "framer-motion";

export default function ArcadeFooter() {
  return (
    <footer className="text-center py-12 text-[10px] font-bold uppercase tracking-widest text-slate-400 z-20 relative bg-white border-t border-slate-200/50 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-2"
      >
        <p className="hover:text-sky-600 transition-colors duration-300 cursor-default">
          Engineered with care alongside Surya&copy; {new Date().getFullYear()}
        </p>
        <div className="w-1 h-1 bg-sky-400 mx-auto rounded-full animate-ping" />
      </motion.div>
    </footer>
  );
}