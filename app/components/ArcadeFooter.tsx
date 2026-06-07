export default function ArcadeFooter() {
  return (
    <footer className="text-center py-12 text-[10px] font-bold uppercase tracking-widest text-slate-400 z-20 relative bg-white border-t border-slate-200/50">
      Engineered with care for Ciby Arcade &copy; {new Date().getFullYear()}
    </footer>
  );
}