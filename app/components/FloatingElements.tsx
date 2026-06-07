"use client";
import { motion } from 'framer-motion';

export default function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl opacity-20"
          initial={{ y: "110vh", x: Math.random() * 100 + "vw" }}
          animate={{ y: "-10vh" }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: i * 3,
            ease: "linear"
          }}
        >
          {["☁️", "✨", "🎈"][i % 3]}
        </motion.div>
      ))}
    </div>
  );
}