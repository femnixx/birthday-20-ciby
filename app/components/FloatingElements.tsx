"use client";

import { motion } from "framer-motion";

export default function FloatingElements() {
  // Configured high-end floating layout background nodes
  const nodes = [
    { emoji: "🌸", x: "10%", y: "15%", duration: 6, delay: 0 },
    { emoji: "✨", x: "85%", y: "25%", duration: 5, delay: 1 },
    { emoji: "🍡", x: "75%", y: "70%", duration: 7, delay: 0.5 },
    { emoji: "🤍", x: "15%", y: "80%", duration: 6, delay: 1.5 },
    { emoji: "🍰", x: "90%", y: "55%", duration: 8, delay: 2 }
  ];

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-10 opacity-60">
      {nodes.map((node, i) => (
        <motion.div
          key={i}
          className="absolute text-xl md:text-2xl filter drop-shadow-sm select-none"
          style={{ left: node.x, top: node.y }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 8, -8, 0],
            scale: [1, 1.05, 0.98, 1]
          }}
          transition={{
            duration: node.duration,
            delay: node.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {node.emoji}
        </motion.div>
      ))}
    </div>
  );
}