"use client";

import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section 
      id="hero" 
      className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-sky-50 via-white to-sky-50 overflow-hidden"
    >
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-200/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
      
      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full grid md:grid-cols-2 gap-12 items-center py-20 z-10">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          className="space-y-6 text-center md:text-left"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 bg-white border border-sky-100 text-sky-700 text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-sm"
          >
            <span>✨</span> Celebrating You <span>✨</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-serif font-black text-slate-950 leading-[1.1]">
            Happy Birthday, <br />
            <span className="text-sky-600 italic">My Princess</span>
          </h1>
          
          <p className="text-slate-600 text-lg max-w-lg leading-relaxed mx-auto md:mx-0">
            Thank you for being my everything. You make the world brighter just by being you. I hope today brings you as much joy as you’ve brought into my life.
          </p>

          <motion.a 
            href="#reasons"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-slate-950 text-white font-bold text-sm uppercase tracking-widest px-8 py-4 rounded-full shadow-xl hover:bg-sky-600 transition-colors"
          >
            See Our Celebration
          </motion.a>
        </motion.div>

        {/* Right Visual Element */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          className="relative aspect-square max-w-sm mx-auto md:mx-0 flex items-center justify-center"
        >
          {/* Pulsing ring background */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border border-dashed border-sky-300/50 rounded-full"
          />
          
          <motion.div 
            whileHover={{ rotate: [0, -10, 10, 0] }}
            className="relative bg-white p-8 rounded-3xl shadow-2xl border border-sky-100 flex flex-col items-center gap-4 text-center cursor-pointer group"
          >
            <span className="text-7xl">🌸</span>
            <span className="font-serif font-bold text-slate-800 text-xl">My Everything</span>
            <div className="h-1 w-12 bg-sky-500 rounded-full" />
            
            {/* Secret Message Reveal */}
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
              I love you endlessly &lt;3
            </p>
          </motion.div>

          {/* Floating heart decoration */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -top-4 -right-4 bg-red-50 text-red-500 p-4 rounded-2xl shadow-lg"
          >
            <span className="text-2xl">❤</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer Wave */}
      <div className="absolute bottom-0 w-full overflow-hidden leading-[0] z-20">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="block w-full h-[60px] fill-white">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,4.75,55.05,10.3,81.39,15.11,155.73,28.87,233.9,64.21,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
}