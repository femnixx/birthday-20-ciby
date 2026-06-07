"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Trophy, Target } from "lucide-react";

interface CatchItem {
  id: number;
  x: number;
  y: number;
  emoji: string;
  points: number;
  label: string;
  isRare: boolean;
}

// Single object interface
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
  
  // CHANGED: State is now a single object or null, not an array
  const [indicator, setIndicator] = useState<ScoreIndicator | null>(null);
  
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);
  const lastSpawnTimeRef = useRef<number>(0);
  
  const basketXRef = useRef(50);
  const isPlayingRef = useRef(true);

  useEffect(() => {
    basketXRef.current = basketX;
  }, [basketX]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

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

  useEffect(() => {
    const savedHighScore = localStorage.getItem("ciby_arcade_highscore");
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("ciby_arcade_highscore", score.toString());
    }
  }, [score, highScore]);

  const handleMoveInput = (clientX: number) => {
    if (!gameAreaRef.current || !isPlaying) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    const newX = ((clientX - rect.left) / rect.width) * 100;
    setBasketX(Math.max(4, Math.min(96, newX)));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMoveInput(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMoveInput(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const gameLoop = (timestamp: number) => {
      if (!previousTimeRef.current) previousTimeRef.current = timestamp;
      const deltaTime = timestamp - previousTimeRef.current;
      previousTimeRef.current = timestamp;

      if (isPlayingRef.current) {
        if (timestamp - lastSpawnTimeRef.current > 600) {
          const isRareSpawn = Math.random() < 0.12;
          const selectedMeta = isRareSpawn 
            ? rarePool[Math.floor(Math.random() * rarePool.length)]
            : standardPool[Math.floor(Math.random() * standardPool.length)];

          setItems((prev) => [
            ...prev,
            {
              id: Math.random() + timestamp,
              x: Math.random() * 90 + 5,
              y: -5,
              emoji: selectedMeta.emoji,
              points: selectedMeta.points,
              label: selectedMeta.label,
              isRare: isRareSpawn,
            },
          ]);
          lastSpawnTimeRef.current = timestamp;
        }

        const speedModifier = deltaTime * 0.05;
        
        setItems((prev) =>
          prev
            .map((item) => ({ ...item, y: item.y + (item.isRare ? 1.3 : 0.9) * speedModifier }))
            .filter((item) => {
              if (item.y >= 86 && item.y <= 93 && Math.abs(item.x - basketXRef.current) < 8) {
                setScore((s) => s + item.points);
                
                const randomXOffset = (Math.random() - 0.5) * 40; 
                const randomYOffset = (Math.random() - 0.5) * 30; 
                
                // CHANGED: Set single object
                setIndicator({
                    id: Math.random() + timestamp,
                    x: Math.max(10, Math.min(90, item.x + randomXOffset)),
                    y: item.y - 15 + randomYOffset,
                    text: item.label,
                    color: item.isRare 
                      ? "text-amber-500 font-extrabold drop-shadow-[0_2px_4px_rgba(245,158,11,0.3)] text-xs" 
                      : "text-sky-600 font-bold text-[11px]",
                });
                return false;
              }
              return item.y < 102;
            })
        );
      }
      requestRef.current = requestAnimationFrame(gameLoop);
    };

    requestRef.current = requestAnimationFrame(gameLoop);
    return () => { if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, []);

  // Simplified timeout to clear the single object
  useEffect(() => {
    if (indicator) {
      const pruneTimeout = setTimeout(() => {
        setIndicator(null);
      }, 1000); 
      return () => clearTimeout(pruneTimeout);
    }
  }, [indicator]);

  const resetGame = () => {
    setItems([]);
    setScore(0);
    setIsPlaying(true);
    setIndicator(null); // Clear indicator on reset
  };

  return (
    <section id="catch-game" className="py-12 bg-slate-50 relative z-20 w-full min-h-screen flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto px-6 flex flex-col">
        <div className="text-center mb-6">
          <h2 className="text-[10px] font-black uppercase tracking-[0.35em] text-sky-600 mb-1">Mini-Game One</h2>
          <h3 className="text-3xl font-serif font-black text-slate-800 tracking-tight">Catch Ciby's Favorites</h3>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto w-full mb-6">
          <div className="bg-white/70 backdrop-blur-md border border-white/60 rounded-2xl p-3.5 flex items-center justify-between shadow-[0_4px_20px_rgba(15,23,42,0.03)]">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-sky-500" />
              <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">Run Score</span>
            </div>
            <p className="text-2xl font-black text-slate-800 tracking-tight">{score}</p>
          </div>
          <div className="bg-white/70 backdrop-blur-md border border-white/60 rounded-2xl p-3.5 flex items-center justify-between shadow-[0_4px_20px_rgba(15,23,42,0.03)]">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span className="text-[11px] font-bold tracking-wider text-amber-600/80 uppercase">Best Record</span>
            </div>
            <p className="text-2xl font-black text-amber-700 tracking-tight">{highScore}</p>
          </div>
        </div>

        <div className="relative p-3 bg-sky-200/40 rounded-[2.5rem] border border-sky-100 shadow-[0_20px_50px_rgba(14,165,233,0.1)]">
          <motion.div 
            ref={gameAreaRef}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className={`w-full h-[500px] bg-white/40 backdrop-blur-xl border-2 border-white rounded-[2rem] relative overflow-hidden select-none shadow-[inset_0_4px_30px_rgba(14,165,233,0.04)] touch-none transition-all duration-300 ${
              isPlaying ? "cursor-none" : "cursor-default opacity-90"
            }`}
          >
            {/* UPDATED: Only render the single object if it exists */}
            <AnimatePresence mode="wait">
              {indicator && (
                <motion.div
                  key={indicator.id}
                  initial={{ opacity: 0, y: indicator.y, scale: 0.8 }}
                  animate={{ opacity: 1, y: indicator.y - 60, scale: 1.05 }}
                  exit={{ opacity: 0 }}
                  className={`absolute pointer-events-none whitespace-nowrap drop-shadow-sm font-sans select-none tracking-wide text-center ${indicator.color}`}
                  style={{ left: `${indicator.x}%`, transform: 'translateX(-50%)' }}
                >
                  {indicator.text}
                </motion.div>
              )}
            </AnimatePresence>

            {items.map((item) => (
              <div
                key={item.id}
                className={`absolute text-3xl pointer-events-none transition-transform duration-75 select-none ${
                  item.isRare ? "animate-bounce drop-shadow-[0_6px_12px_rgba(245,158,11,0.45)]" : "drop-shadow-sm"
                }`}
                style={{ left: `${item.x}%`, top: `${item.y}%`, transform: 'translateX(-50%)' }}
              >
                {item.emoji}
              </div>
            ))}

            <div
              className="absolute bottom-8 h-11 px-5 bg-white/90 backdrop-blur-md border border-white rounded-xl text-sky-700 text-xs flex items-center justify-center font-black shadow-[0_10px_25px_rgba(14,165,233,0.16)] select-none pointer-events-none transition-all duration-75 ease-out"
              style={{ left: `${basketX}%`, transform: 'translateX(-50%)' }}
            >
              <span className="mr-1.5 text-base not-italic">🧺</span> Basket
            </div>

            {!isPlaying && (
              <div className="absolute inset-0 bg-sky-950/10 backdrop-blur-[4px] flex items-center justify-center flex-col space-y-3">
                <p className="font-sans font-black text-slate-800 text-sm uppercase tracking-widest drop-shadow-sm">Gameplay Suspended</p>
                <button
                  onClick={() => setIsPlaying(true)}
                  className="bg-white hover:bg-slate-50 text-sky-600 text-[11px] font-black uppercase tracking-wider py-3 px-7 rounded-full shadow-[0_6px_20px_rgba(14,165,233,0.25)] transition-transform active:scale-95 flex items-center gap-2"
                >
                  <Play className="w-3.5 h-3.5 fill-current" /> Resume Run
                </button>
              </div>
            )}
          </motion.div>
        </div>

        <div className="flex items-center gap-4 max-w-md mx-auto w-full mt-6">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex-1 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest py-3.5 rounded-2xl border transition-all active:scale-95 ${
              isPlaying 
                ? "bg-white/80 backdrop-blur-md border-sky-100 text-sky-600 shadow-[0_4px_12px_rgba(14,165,233,0.04)] hover:bg-sky-50/50" 
                : "bg-sky-600 border-sky-600 text-white shadow-[0_4px_16px_rgba(14,165,233,0.24)] hover:bg-sky-700"
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" /> Pause Run
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" /> Resume Run
              </>
            )}
          </button>
          <button
            onClick={resetGame}
            className="flex-1 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest bg-white/80 backdrop-blur-md border border-slate-200 text-slate-500 hover:text-slate-800 py-3.5 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.02)] transition-all active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Score
          </button>
        </div>
      </div>
    </section>
  );
}