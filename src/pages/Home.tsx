import { useState } from 'react';
import { motion } from 'framer-motion';
import { GenderToggle } from '../components/GenderToggle';
import { NameInput } from '../components/NameInput';
import { useNameHistory } from '../hooks/useNameHistory';
import { History, Trash2 } from 'lucide-react';

interface HomeProps {
  onAnalyze: (name: string, gender: 'man' | 'woman') => void;
}

export default function Home({ onAnalyze }: HomeProps) {
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'man' | 'woman'>('woman');
  const { history, clearHistory } = useNameHistory();

  const handleAnalyze = () => {
    if (name.trim()) {
      onAnalyze(name.trim(), gender);
    }
  };

  const handleHistoryClick = (histName: string) => {
    setName(histName);
    onAnalyze(histName, gender);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white/70 mb-8">
        <span>✨</span> AI-style Name Analysis
      </div>

      <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-center mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
        What's their vibe? 👀
      </h1>
      
      <p className="text-lg md:text-xl text-white/50 text-center max-w-md mb-12">
        Drop a name. We'll tell you the kind of energy they bring.
      </p>

      <div className="w-full max-w-md flex flex-col gap-8 mb-16">
        <GenderToggle gender={gender} onChange={setGender} />
        <NameInput value={name} onChange={setName} onSubmit={handleAnalyze} />
      </div>

      {history.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full max-w-md flex flex-col items-center mt-12 pt-8 border-t border-white/10"
        >
          <div className="flex items-center justify-between w-full mb-4 px-2">
            <h3 className="text-sm font-medium text-white/40 flex items-center gap-2">
              <History className="w-4 h-4" />
              Recent Vibes
            </h3>
            <button 
              onClick={clearHistory}
              className="text-xs text-white/30 hover:text-red-400 transition-colors flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" />
              Clear
            </button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2">
            {history.map((histName, i) => (
              <button
                key={i}
                onClick={() => handleHistoryClick(histName)}
                className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all text-sm text-white/70 hover:text-white"
              >
                {histName}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      <div className="mt-24 w-full flex justify-center gap-8 md:gap-16 border-y border-white/5 py-8 opacity-50">
        <div className="text-center">
          <p className="text-3xl font-bold">100%</p>
          <p className="text-xs tracking-widest uppercase mt-1">Curiosity</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold">0%</p>
          <p className="text-xs tracking-widest uppercase mt-1">Judgment</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold">∞ </p>
          <p className="text-xs tracking-widest uppercase mt-1">Just for fun</p>
        </div>
      </div>
    </div>
  );
}
