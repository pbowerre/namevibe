import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { VibeResult } from '../types/vibe';
import { ShareButtons } from '../components/ShareButtons';
import { ArrowLeft, Heart, Briefcase, Utensils, Brain, Coffee, Flame } from 'lucide-react';
import { useNameHistory } from '../hooks/useNameHistory';
import namevibe from "../assets/namevibe.png"
interface ResultProps {
  result: VibeResult;
  onReset: () => void;
}

export default function Result({ result, onReset }: ResultProps) {
  const { addName } = useNameHistory();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    addName(result.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.name]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="w-full pb-12 flex flex-col items-center">

      <div 
        ref={cardRef} 
        className="w-full max-w-md bg-card/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
        

        <div className="flex items-center justify-between mb-8 relative z-10">
          <div className="flex items-center gap-2">
            <img src={namevibe} alt="NameVibe Logo" className="w-6 h-6 object-contain" />
            <span className="font-bold text-sm tracking-tight text-white/80">NameVibe</span>
          </div>
          <span className="text-2xl">{result.gender === 'woman' ? '👩' : '👨'}</span>
        </div>


        <div className="text-center mb-8 relative z-10">
          <h2 className="text-4xl font-bold tracking-tight mb-2">{result.name}</h2>
          <p className="text-sm text-white/70 font-medium">✨ {result.traits.slice(0, 3).join(" • ")}</p>
        </div>


        <div className="flex flex-col items-center justify-center mb-10 relative z-10">
          <div className="relative w-32 h-32 flex items-center justify-center">

            <svg className="absolute w-full h-full transform -rotate-90">
              <circle cx="64" cy="64" r="56" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
              <motion.circle 
                cx="64" 
                cy="64" 
                r="56" 
                fill="none" 
                stroke="url(#gradient)" 
                strokeWidth="8" 
                strokeLinecap="round"
                initial={{ strokeDasharray: "0, 400" }}
                animate={{ strokeDasharray: `${(result.overallScore / 100) * 351}, 400` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#9b87f5" />
                  <stop offset="100%" stopColor="#d946ef" />
                </linearGradient>
              </defs>
            </svg>
            <div className="text-center">
              <span className="text-4xl font-bold">{result.overallScore}</span>
              <span className="text-xs block text-white/50 uppercase tracking-widest mt-1">Vibe</span>
            </div>
          </div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-3 relative z-10"
        >
          <div className="grid grid-cols-2 gap-3 w-full">
            <CategoryCard icon={<Heart className="w-4 h-4 text-rose-400" />} title="Relationship" score={result.categories.relationship.score} text={result.categories.relationship.text} />
            <CategoryCard icon={<Briefcase className="w-4 h-4 text-blue-400" />} title="Hardworking" score={result.categories.hardworking.score} text={result.categories.hardworking.text} />
            <CategoryCard icon={<Brain className="w-4 h-4 text-purple-400" />} title="Intelligence" score={result.categories.intelligence.score} text={result.categories.intelligence.text} />
            <CategoryCard icon={<Flame className="w-4 h-4 text-orange-400" />} title="Confidence" score={result.categories.confidence.score} text={result.categories.confidence.text} />
          </div>

          <motion.div variants={itemVariants} className="mt-4 bg-white/5 border border-white/5 rounded-2xl p-4 flex items-start gap-4">
            <div className="p-3 bg-orange-500/20 rounded-xl">
              <Utensils className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-1">Food Personality</p>
              <p className="text-sm font-medium">{result.foodPersonality}</p>
            </div>
          </motion.div>


          <motion.div variants={itemVariants} className="mt-2 bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-4 flex items-start gap-4">
            <div className="p-3 bg-white/10 rounded-xl shadow-inner">
              <Coffee className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-1">☕ The Tea</p>
              <p className="text-sm font-medium italic">"{result.tea}"</p>
            </div>
          </motion.div>
        </motion.div>

        <div className="mt-8 text-center text-[10px] text-white/30 relative z-10">
          Just for fun 😅 — This result is generated based on the name, not actual facts.
        </div>
      </div>

      <div className="w-full max-w-md px-4 mt-6">
        <ShareButtons result={result} />
        
        <button 
          onClick={onReset}
          className="mt-6 w-full py-4 flex items-center justify-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Analyze Another Name 👀
        </button>
      </div>
    </div>
  );
}

const CategoryCard = ({ icon, title, score, text }: { icon: ReactNode, title: string, score: number, text: string }) => {
  return (
    <motion.div 
      variants={{
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
      }}
      className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5"
    >
      <div className="flex flex-col gap-1 w-full">
        <div className="flex items-center justify-between mb-1 gap-1">
          <div className="flex items-center gap-1.5 text-white/80 min-w-0">
            {icon}
            <span className="text-[11px] font-semibold truncate leading-none">{title}</span>
          </div>
          <span className="text-xs font-bold shrink-0">{score}%</span>
        </div>
        <p className="text-[10px] leading-tight text-white/50 h-6 overflow-hidden line-clamp-2" title={text}>{text}</p>
        <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-full bg-white/50 rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
};
