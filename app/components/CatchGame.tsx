"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CatchItem {
  id: number;
  x: number;
  y: number;
  emoji: string;
  points: number;
  label: string;
  isRare: boolean;
}

interface ScoreIndicator {
  id: number;
  x: number;
  y: number;
  text: string;
  color: string;
}

export default function CatchGame() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [basketX, setBasketX] = useState(50);
  const [items, setItems] = useState<CatchItem[]>([]);
  const [indicators, setIndicators] = useState<ScoreIndicator[]>([]);
  const gameAreaRef = useRef<HTMLDivElement>(null);

  // Pool configurations mapped by rarity weights
  const standardPool = [
    { emoji: "🌸", points: 1, label: "+1 Cherry Blossom" },
    { emoji: "🍡", points: 1, label: "+1 Mochi" },
    { emoji: "🍰", points: 2, label: "+2 Shortcake" },
    { emoji: "🤍", points: 1, label: "+1 Heart" },
    { emoji: "🍦", points: 2, label: "+2 Soft Serve" },
    { emoji: "🥞", points: 2, label: "+2 Pancakes" },
    { emoji: "🎀", points: 3, label: "+3 Cute Ribbon" },
  ];

  const rarePool = [
    { emoji: "✨", points: 10, label: "✨ CRITICAL SHINE +10! ✨" },
    { emoji: "🦄", points: 15, label: "🦄 MYTHICAL UNICORN +15! 🦄" },
    { emoji: "👑", points: 25, label: "👑 ROYAL CROWN +25! 👑" },
    { emoji: "💎", points: 50, label: "💎 FLAWLESS DIAMOND +50! 💎" },
  ];

  // Hydrate high score safely in client execution context
  useEffect(() => {
    const savedHighScore = localStorage.getItem("ciby_arcade_highscore");
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  // Monitor score increases to evaluate personal records
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("ciby_arcade_highscore", score.toString());
    }
  }, [score, highScore]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!gameAreaRef.current || !isPlaying) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    const newX = ((e.clientX - rect.left) / rect.width) * 100;
    setBasketX(Math.max(6, Math.min(94, newX)));
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!gameAreaRef.current || !e.touches[0] || !isPlaying) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    const newX = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
    setBasketX(Math.max(6, Math.min(94, newX)));
  };

  useEffect(() => {
    if (!isPlaying) return;

    const spawnInterval = setInterval(() => {
      const isRareSpawn = Math.random() < 0.12; // 12% probability parameter for rare drops
      const selectedMeta = isRareSpawn 
        ? rarePool[Math.floor(Math.random() * rarePool.length)]
        : standardPool[Math.floor(Math.random() * standardPool.length)];

      setItems((prev) => [
        ...prev,
        {
          id: Math.random() + Date.now(),
          x: Math.random() * 88 + 6,
          y: -5,
          emoji: selectedMeta.emoji,
          points: selectedMeta.points,
          label: selectedMeta.label,
          isRare: isRareSpawn,
        },
      ]);
    }, 950);

    const physicsInterval = setInterval(() => {
      setItems((prev) =>
        prev
          .map((item) => ({ ...item, y: item.y + (item.isRare ? 5 : 4.2) })) // Rares descend slightly quicker
          .filter((item) => {
            // Collision box intersection validation logic
            if (item.y >= 84 && item.y <= 92 && Math.abs(item.x - basketX) < 11) {
              setScore((s) => s + item.points);
              
              // Push pop-up feedback metadata indicator array
              setIndicators((ind) => [
                ...ind,
                {
                  id: Math.random(),
                  x: item.x,
                  y: item.y - 10,
                  text: item.label,
                  color: item.isRare ? "text-amber-500 font-extrabold" : "text-sky-600 font-bold"
                }
              ]);
              return false;
            }
            return item.y < 102;
          })
      );
    }, 30);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(physicsInterval);
    };
  }, [basketX, isPlaying]);

  // Handle auto-pruning stale dynamic canvas label nodes
  useEffect(() => {
    if (indicators.length > 0) {
      const pruneTimeout = setTimeout(() => {
        setIndicators((prev) => prev.slice(1));
      }, 1000);
      return () => clearTimeout(pruneTimeout);
    }
  }, [indicators]);

  const resetGame = () => {
    setItems([]);
    setScore(0);
    setIsPlaying(true);
  };

  return (
    <section id="catch-game" className="py-24 bg-white relative z-20 border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-xs font-extrabold uppercase tracking-[0.3em] text-sky-600 mb-2">Mini-Game One</h2>
        <h3 className="text-3xl font-serif font-black text-slate-900 mb-4">Catch Ciby's Favorites</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto mb-6">
          Move your cursor or swipe left/right across the field to capture rewards. Gold entries yield extreme points!
        </p>

        {/* Dashboard Display Analytics Grid */}
        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-6">
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 text-center">
            <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Current Run</p>
            <p className="text-xl font-black text-slate-800">{score}</p>
          </div>
          <div className="bg-amber-50/60 border border-amber-200/70 rounded-2xl p-3 text-center">
            <p className="text-[10px] uppercase font-bold tracking-widest text-amber-600/80">Personal Best 🏆</p>
            <p className="text-xl font-black text-amber-700">{highScore}</p>
          </div>
        </div>

        {/* Primary Interactive Viewport Wrapper */}
        <div className="relative">
          <motion.div 
            ref={gameAreaRef}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className={`w-full h-80 bg-sky-50/40 border border-slate-200 rounded-3xl relative overflow-hidden select-none shadow-inner transition-all duration-300 ${
              isPlaying ? "cursor-none" : "cursor-default opacity-85 grayscale-[20%]"
            }`}
          >
            {/* Real-time floating hit notifications rendering engine */}
            <AnimatePresence>
              {indicators.map((ind) => (
                <motion.div
                  key={ind.id}
                  initial={{ opacity: 0, y: ind.y, scale: 0.8 }}
                  animate={{ opacity: 1, y: ind.y - 45, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className={`absolute text-[10px] pointer-events-none whitespace-nowrap drop-shadow-sm ${ind.color}`}
                  style={{ left: `${ind.x}%`, transform: 'translateX(-50%)' }}
                >
                  {ind.text}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Simulated Passive Falling Item Elements */}
            {items.map((item) => (
              <div
                key={item.id}
                className={`absolute text-2xl transition-all duration-75 pointer-events-none ${
                  item.isRare ? "animate-pulse drop-shadow-[0_4px_6px_rgba(245,158,11,0.4)]" : "drop-shadow-sm"
                }`}
                style={{ left: `${item.x}%`, top: `${item.y}%`, transform: 'translateX(-50%)' }}
              >
                {item.emoji}
              </div>
            ))}

            {/* Controlled User Paddle Basket Asset */}
            <div
              className={`absolute bottom-6 h-9 w-24 bg-slate-900 border border-slate-800 rounded-xl text-white font-serif italic text-xs flex items-center justify-center font-bold shadow-md transition-all duration-75 ease-out`}
              style={{ left: `${basketX}%`, transform: 'translateX(-50%)' }}
            >
              🧺 Basket
            </div>

            {/* Suspended Interface Pause Screen Mask Layer */}
            {!isPlaying && (
              <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center flex-col space-y-3">
                <p className="font-serif font-black text-white text-lg tracking-wide">Gameplay Suspended</p>
                <button
                  onClick={() => setIsPlaying(true)}
                  className="bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold uppercase tracking-wider py-2.5 px-6 rounded-full shadow-lg transition-transform active:scale-95"
                >
                  Resume Run ▶
                </button>
              </div>
            )}
          </motion.div>
        </div>

        {/* Sub-Layout System Functional Controls Row */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`text-xs font-extrabold uppercase tracking-widest px-6 py-3 rounded-full border transition-all ${
              isPlaying 
                ? "bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200" 
                : "bg-sky-600 border-sky-600 text-white hover:bg-sky-700 shadow-md"
            }`}
          >
            {isPlaying ? "⏸ Pause Run" : "▶ Resume Run"}
          </button>
          <button
            onClick={resetGame}
            className="text-xs font-extrabold uppercase tracking-widest bg-white border border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-800 px-6 py-3 rounded-full transition-all"
          >
            🔄 Reset Score
          </button>
        </div>
      </div>
    </section>
  );
}