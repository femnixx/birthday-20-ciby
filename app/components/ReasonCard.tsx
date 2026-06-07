"use client";

import { motion } from "framer-motion";

interface ReasonProps {
  icon: string;
  title: string;
  text: string;
}

export default function ReasonCard({ icon, title, text }: ReasonProps) {
  return (
    <motion.div 
      className="bg-white border border-slate-200/80 p-6 md:p-8 rounded-2xl h-full flex flex-col items-start text-left shadow-[0_4px_20px_rgba(15,23,42,0.01)] relative overflow-hidden group"
      whileHover={{ border: "1px solid rgba(14, 165, 233, 0.3)" }}
      transition={{ duration: 0.2 }}
    >
      {/* Background Soft Interactive Visual Anchor Glow */}
      <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-sky-500/5 rounded-full filter blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="w-12 h-12 bg-sky-50 border border-sky-100 rounded-xl flex items-center justify-center text-xl mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      
      <h3 className="font-serif font-bold text-slate-950 text-lg mb-2 tracking-tight group-hover:text-sky-800 transition-colors duration-200">
        {title}
      </h3>
      
      <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-normal">
        {text}
      </p>
    </motion.div>
  );
}