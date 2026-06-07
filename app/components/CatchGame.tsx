"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function CatchGame() {
  const [score, setScore] = useState(0);
  const [basketX, setBasketX] = useState(50); // percentage based
  const [items, setItems] = useState<{ id: number; x: number; y: number; emoji: string }[]>([]);
  const gameAreaRef = useRef<HTMLDivElement>(null);

  const emojis = ["🌸", "🍡", "✨", "🍰", "🤍"];

  // Handle basket mouse movement
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!gameAreaRef.current) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    const newX = ((e.clientX - rect.left) / rect.width) * 100;
    setBasketX(Math.max(5, Math.min(95, newX)));
  };

  // Touch controls for mobile support
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!gameAreaRef.current || !e.touches[0]) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    const newX = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
    setBasketX(Math.max(5, Math.min(95, newX)));
  };

  // Game loop engine running physics
  useEffect(() => {
    const spawnInterval = setInterval(() => {
      setItems((prev) => [
        ...prev,
        {
          id: Math.random(),
          x: Math.random() * 90 + 5,
          y: 0,
          emoji: emojis[Math.floor(Math.random() * emojis.length)],
        },
      ]);
    }, 1200);

    const physicsInterval = setInterval(() => {
      setItems((prev) =>
        prev
          .map((item) => ({ ...item, y: item.y + 4 }))
          .filter((item) => {
            // Check collision with basket at y threshold near bottom
            if (item.y >= 85 && item.y <= 92 && Math.abs(item.x - basketX) < 12) {
              setScore((s) => s + 1);
              return false; // caught!
            }
            return item.y < 100; // Drop if missed
          })
      );
    }, 30);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(physicsInterval);
    };
  }, [basketX]);

  return (
    <section id="catch-game" className="py-24 bg-white relative z-20 border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-xs font-extrabold uppercase tracking-[0.3em] text-sky-600 mb-2">Mini-Game One</h2>
        <h3 className="text-3xl font-serif font-black text-slate-900 mb-4">Catch Ciby's Favorites</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto mb-8">
          Move your cursor or swipe your finger left and right across the field to catch the falling items! Score: <span className="text-sky-600 font-bold text-sm">{score}</span>
        </p>

        {/* Dynamic Interactive Stage area */}
        <div 
          ref={gameAreaRef}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="w-full h-80 bg-sky-50/50 border border-slate-200 rounded-3xl relative overflow-hidden cursor-none select-none"
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="absolute text-2xl transition-all duration-75 pointer-events-none"
              style={{ left: `${item.x}%`, top: `${item.y}%`, transform: 'translateX(-50%)' }}
            >
              {item.emoji}
            </div>
          ))}

          {/* Interactive Basket container */}
          <div
            className="absolute bottom-6 h-8 w-20 bg-slate-900 border border-slate-800 rounded-xl text-white font-serif italic text-xs flex items-center justify-center font-bold shadow-md transition-all duration-75 ease-out"
            style={{ left: `${basketX}%`, transform: 'translateX(-50%)' }}
          >
            🧺 Basket
          </div>
        </div>
      </div>
    </section>
  );
}