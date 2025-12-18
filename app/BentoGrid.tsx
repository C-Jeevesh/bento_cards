'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, Music, MapPin, ArrowUpRight, Layers } from 'lucide-react';

type CardData = {
  id: string;
  title: string;
  type: string;
  col_span: number;
  row_span: number;
  bg_color: string;
  content: string;
};

export default function BentoGrid({ cards }: { cards: CardData[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const getGradient = (colorClass: string) => {
    switch (colorClass) {
      case 'bg-purple-600': return 'from-purple-500/20 to-purple-500/0';
      case 'bg-green-600': return 'from-green-500/20 to-green-500/0';
      case 'bg-blue-600': return 'from-blue-500/20 to-blue-500/0';
      case 'bg-red-600': return 'from-red-500/20 to-red-500/0';
      case 'bg-zinc-800': return 'from-zinc-500/20 to-zinc-500/0';
      default: return 'from-white/10 to-white/0';
    }
  };

  // Helper to render content for the SMALL card
  const renderCardContent = (card: CardData) => {
    switch (card.type) {
      case 'spotify':
        return (
          <div className="flex flex-col h-full justify-between z-20 relative">
             <div className="flex justify-between items-start">
               <Music className="bg-green-500/20 p-2 rounded-full w-10 h-10 text-green-400" />
               <div className="flex gap-1">
                 <div className="w-1 h-4 bg-green-400 rounded-full animate-pulse" />
                 <div className="w-1 h-6 bg-green-400 rounded-full animate-pulse delay-75" />
                 <div className="w-1 h-3 bg-green-400 rounded-full animate-pulse delay-150" />
               </div>
             </div>
             <div>
               <h3 className="font-bold text-lg mb-1 text-zinc-100">{card.title}</h3>
               <p className="text-xs text-zinc-400">Logic • No Pressure</p>
             </div>
          </div>
        );
      case 'social':
        return (
           <div className="flex flex-col h-full justify-center items-center text-center z-20 relative">
             <Github className="w-16 h-16 mb-4 text-zinc-200 group-hover:text-white transition-colors" />
             <h3 className="font-bold text-xl text-zinc-100">{card.title}</h3>
             <p className="text-sm text-zinc-500 mt-2">C-Jeevesh</p>
           </div>
        );
      case 'map':
        return (
          <div className="flex flex-col h-full justify-between z-20 relative">
             <MapPin className="text-red-400 w-8 h-8" />
             <div>
                <h3 className="font-bold text-2xl text-zinc-100">Mangalore</h3>
                <p className="text-zinc-500 text-sm">Mangalore</p>
             </div>
          </div>
        );
      case 'stack':
        return (
          <div className="flex flex-col h-full justify-between z-20 relative">
            <div className="p-2 bg-purple-500/20 rounded-lg w-fit">
                <Layers className="text-purple-300 w-6 h-6" />
            </div>
            <div>
                <h3 className="font-bold text-xl text-purple-100">My Stack</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {['Next.js', 'React', 'Supabase'].map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-purple-500/10 border border-purple-500/20 rounded-md text-[10px] text-purple-200 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col h-full justify-between z-20 relative">
            <div className="self-end p-2 bg-white/5 rounded-full border border-white/5 group-hover:bg-white/10 transition-colors">
              <ArrowUpRight className="text-zinc-400 group-hover:text-white w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-2xl mb-2 text-zinc-100">{card.title}</h3>
              <p className="text-zinc-400 text-sm line-clamp-2">{card.content}</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[160px] gap-6 max-w-5xl w-full mx-auto p-4">
      {cards.map((card) => (
        <motion.div
          key={card.id}
          layoutId={`card-${card.id}`}
          onClick={() => setSelectedId(card.id)}
          className={`
            relative overflow-hidden
            rounded-3xl p-6 cursor-pointer 
            bg-zinc-900/40 backdrop-blur-md 
            border border-white/10 hover:border-white/20
            group transform-gpu
          `}
          style={{
            gridColumn: `span ${card.col_span}`,
            gridRow: `span ${card.row_span}`,
          }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
        >
          {/* Background Glow */}
          <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${getGradient(card.bg_color)}`} />
          
          {/* LAG FIX 1: We wrap the small content in a motion.div
             We do NOT give this a layoutId. This means it won't try to morph.
             It will just disappear when the card opens.
          */}
          <motion.div className="h-full">
            {renderCardContent(card)}
          </motion.div>
        </motion.div>
      ))}

      <AnimatePresence>
        {selectedId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedId(null)} 
            />
            
            {cards.filter(c => c.id === selectedId).map(card => (
              <motion.div
                layoutId={`card-${card.id}`} // Only the CONTAINER morphs
                key={card.id}
                className={`
                  bg-zinc-900 border border-white/10
                  w-full max-w-2xl h-[60vh] md:h-[500px]
                  rounded-3xl p-8 
                  flex flex-col relative z-10 
                  overflow-hidden transform-gpu
                `}
                transition={{ type: "spring", stiffness: 280, damping: 24 }}
              >
                <div className={`absolute top-0 left-0 w-full h-32 bg-gradient-to-b ${getGradient(card.bg_color)} opacity-20`} />
                
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                  className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors z-20"
                >
                  <X size={20} />
                </button>

                {/* LAG FIX 2: The expanded content simply fades in.
                   It does NOT try to "reshape" from the small text. 
                */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="mt-8 relative z-10"
                >
                   <h2 className="text-4xl font-bold text-white mb-2">{card.title}</h2>
                   <div className="w-20 h-1 bg-zinc-700 mb-6 rounded-full" />
                   <p className="text-lg text-zinc-300 leading-relaxed">
                     {card.content}
                   </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}