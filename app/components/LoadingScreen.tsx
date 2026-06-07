"use client";

import { motion } from 'framer-motion';
import usagiGif from '../assets/chiikawa-usagi.gif'; // Import the file

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-sky-50"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Use the imported variable */}
        <img 
          src={usagiGif.src} 
          alt="Loading..." 
          className="w-48 h-48 object-contain drop-shadow-lg"
        />
      </motion.div>
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 text-sky-800 font-serif font-medium tracking-wide"
      >
        Getting things ready...
      </motion.p>
    </motion.div>
  );
}