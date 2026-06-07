export default function ReasonCard({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div className="bg-white border border-slate-200 p-8 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:border-slate-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 h-full flex flex-col justify-between">
      <div>
        <div className="w-12 h-12 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-2xl mb-6 shadow-sm">
          {icon}
        </div>
        <h3 className="text-lg font-serif font-bold text-slate-950 mb-3 tracking-tight">
          {title}
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed tracking-wide font-normal">
          {text}
        </p>
      </div>
    </div>
  );
}