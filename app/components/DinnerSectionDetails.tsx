// ./components/DinnerSectionDetails.tsx
import { motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import { DinnerSpotItem } from '../data/dinnerData';

interface HeaderProps {
  subtitle: string;
  title: string;
  caption: string;
}

export function CurationHeader({ subtitle, title, caption }: HeaderProps) {
  return (
    <div className="text-center mb-16 space-y-2">
      <h2 className="text-xs font-extrabold uppercase tracking-[0.3em] text-sky-600">{subtitle}</h2>
      <h3 className="text-3xl md:text-5xl font-serif font-black text-slate-950">{title}</h3>
      <p className="text-xs font-medium text-slate-400 uppercase tracking-widest !mt-3">{caption}</p>
    </div>
  );
}

interface DetailCardProps {
  spot: DinnerSpotItem;
  mapImg: StaticImageData;
}

export function DinnerSpotDetailCard({ spot, mapImg }: DetailCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0, y: 15 }}
      animate={{ opacity: 1, height: "auto", y: 0 }}
      exit={{ opacity: 0, height: 0, y: 15 }}
      transition={{ type: "spring", stiffness: 140, damping: 22 }}
      className="relative z-10 backdrop-blur-md bg-white/80 border border-sky-100/70 rounded-3xl p-6 md:p-8 overflow-hidden shadow-lg grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
    >
      {/* Left Side Info Panel */}
      <div className="text-center md:text-left space-y-5 relative p-2 overflow-hidden rounded-2xl min-h-[220px] flex flex-col justify-center md:justify-start">
        
        {/* Large Crisp Watermark Backdrop view */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 opacity-[0.06] pointer-events-none z-0 select-none flex items-center justify-center">
          <div className={`w-full h-full relative rounded-2xl overflow-hidden ${spot.hasWhiteBg ? 'bg-slate-950/10 p-4 shadow-inner' : ''}`}>
            <Image 
              src={spot.logo} 
              alt="Card Center Watermark" 
              className="w-full h-full object-contain rounded-xl"
            />
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center md:items-start gap-3">
          <motion.div 
            className="w-16 h-16 relative rounded-2xl overflow-hidden shadow-md border border-slate-200/60 bg-white p-1 -rotate-3"
            whileHover={{ scale: 1.08, rotate: 2 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <Image 
              src={spot.logo} 
              alt={spot.name} 
              className="w-full h-full object-cover rounded-xl"
            />
          </motion.div>
          <div>
            <h5 className="font-serif font-black text-slate-900 text-2xl mb-1">{spot.name}</h5>
            <p className="text-xs font-bold uppercase tracking-wider text-sky-700">{spot.type}</p>
          </div>
        </div>

        <p className="relative z-10 text-slate-600 text-sm max-w-md leading-relaxed">{spot.desc}</p>
        
        <div className="relative z-10 pt-2">
          <a 
            href={spot.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-white bg-sky-600 hover:bg-sky-700 px-5 py-3 rounded-xl shadow-md transition-all duration-200 hover:-translate-y-0.5"
          >
            ✨ Open Menu & Socials
          </a>
        </div>
      </div>

      {/* Right Side Link Preview Area */}
      <a 
        href={spot.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block group relative w-full aspect-[16/10] md:aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-slate-200/60 cursor-pointer bg-slate-100 z-10"
      >
        <Image 
          src={mapImg} 
          alt="Social Media Link Preview"
          placeholder="blur"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[1px] transition-colors duration-300 group-hover:bg-slate-900/5" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative flex items-center justify-center">
            <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-sky-500 opacity-60" />
            <span className="animate-pulse absolute inline-flex h-8 w-8 rounded-full bg-sky-400 opacity-40" />
            
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="relative z-10 text-4xl filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)] select-none"
            >
              ✨
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-3 right-3 bg-slate-950/70 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-white uppercase tracking-wider opacity-80 group-hover:opacity-100 transition-opacity">
          Open Socials ↗
        </div>
      </a>
    </motion.div>
  );
}