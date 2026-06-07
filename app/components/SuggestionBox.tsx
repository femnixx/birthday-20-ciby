"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

const WA_NUMBER = "6282248969863";

const sectionFadeReveal: Variants = {
  offscreen: { opacity: 0, scale: 0.98, y: 40 },
  onscreen: {
    opacity: 1, scale: 1, y: 0,
    transition: { type: "spring", bounce: 0.2, duration: 0.8 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 18 } },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export default function SuggestionBox() {
  const [form, setForm] = useState({ name: "", place: "", type: "", reason: "" });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const isValid = form.place.trim().length > 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSend = () => {
    if (!isValid) return;
    const lines = [`✨ *New Dinner Suggestion*`, `🍽️ Place: ${form.place}`].filter(Boolean).join("\n");
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines)}`, "_blank");
    setSubmitted(true);
  };

  const inputBase = "w-full bg-sky-50 border rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none font-medium";
  const fieldClass = (name: string) => `${inputBase} ${focused === name ? "border-sky-400 ring-2 ring-sky-100 bg-white" : "border-slate-200"}`;

  return (
    <motion.section
      initial="offscreen" whileInView="onscreen" viewport={{ once: false, amount: 0.2 }}
      variants={sectionFadeReveal}
      className="py-28 bg-sky-50 border-t border-slate-200/50"
    >
      <div className="max-w-2xl mx-auto px-6">
        
        {/* ADDED HEADER BACK HERE */}
        <div className="text-center mb-14 space-y-2">
          <p className="text-xs font-semibold text-slate-400 tracking-widest uppercase">Your Turn</p>
          <h2 className="text-3xl md:text-5xl font-serif font-black tracking-tight text-slate-950">
            Got any other <span className="text-sky-600 italic font-bold">recommendations?</span>
          </h2>
          <p className="text-xs font-semibold text-slate-400 tracking-widest uppercase">List them here</p>
          <div className="w-16 h-1 bg-sky-600 mx-auto !mt-6 rounded-full" />
        </div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div key="form" variants={containerVariants} initial="hidden" animate="show" exit={{ opacity: 0 }} className="space-y-4">
              {["name", "place", "type", "reason"].map((field) => (
                <motion.div key={field} variants={itemVariants}>
                  <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-1.5 capitalize">
                    {field === "place" ? "Restaurant / Place *" : field}
                  </label>
                  <motion.div whileHover={{ y: -2, boxShadow: "0px 8px 16px rgba(14, 165, 233, 0.1)" }}>
                    {field === "reason" ? (
                      <textarea name="reason" value={form.reason} onChange={handleChange} onFocus={() => setFocused("reason")} onBlur={() => setFocused(null)} rows={3} className={fieldClass("reason")} placeholder="Tell us what makes it special..." />
                    ) : (
                      <input name={field} value={form[field as keyof typeof form]} onChange={handleChange} onFocus={() => setFocused(field)} onBlur={() => setFocused(null)} className={fieldClass(field)} placeholder="Enter details..." />
                    )}
                  </motion.div>
                </motion.div>
              ))}
              <motion.button 
                onClick={handleSend} 
                className="w-full py-3.5 rounded-xl bg-sky-600 text-white font-extrabold uppercase tracking-widest text-sm hover:bg-sky-700 transition-colors"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                Send via WhatsApp
              </motion.button>
            </motion.div>
          ) : (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white border border-slate-200/70 rounded-2xl p-10 text-center">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="font-serif font-black text-2xl text-slate-950">Suggestion Sent!</h3>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}