'use client'; // This must be a Client Component for animations

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type CardProps = {
  title: string;
  colSpan: number;
  rowSpan: number;
  color: string;
  children?: ReactNode;
};

export default function Card({ title, colSpan, rowSpan, color, children }: CardProps) {
  return (
    <motion.div
      // 1. The Animation Settings
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      
      // 2. The Styling (Tailwind + Dynamic Spans)
      className={`
        ${color} 
        relative overflow-hidden
        rounded-3xl p-6 
        border border-white/10 
        backdrop-blur-md 
        flex flex-col justify-between
        shadow-lg
        cursor-pointer
      `}
      style={{
        gridColumn: `span ${colSpan}`,
        gridRow: `span ${rowSpan}`,
      }}
    >
      {/* 3. Card Content */}
      <div className="z-10">
        <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
        {children}
      </div>

      {/* 4. Decorative Background Glow (Optional) */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
    </motion.div>
  );
}