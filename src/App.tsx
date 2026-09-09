import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './pages/Home';
import Loading from './pages/Loading';
import Result from './pages/Result';
import type { VibeResult } from './types/vibe';
import { analyzeName } from './engine/nameVibeEngine';
import namevibe from "../src/assets/namevibe.png"

function App() {
  const [view, setView] = useState<'home' | 'loading' | 'result'>('home');
  const [currentName, setCurrentName] = useState('');
  const [result, setResult] = useState<VibeResult | null>(null);

  const handleAnalyze = (name: string, selectedGender: 'man' | 'woman') => {
    setCurrentName(name);
    setView('loading');
    
    setTimeout(() => {
      const generatedResult = analyzeName(name, selectedGender);
      setResult(generatedResult);
      setView('result');
    }, 4000);
  };

  const handleReset = () => {
    setView('home');
    setResult(null);
    setCurrentName('');
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary-foreground font-sans overflow-x-hidden flex flex-col">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-background/50 border-b border-white/5">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={handleReset}
        >
          <img src={namevibe} alt="NameVibe Logo" className="w-6 h-6 object-contain transition-transform group-hover:scale-110" />
          <span className="font-bold text-lg tracking-tight">NameVibe</span>
        </div>

        <button 
          onClick={handleReset}
          className="text-sm font-medium text-white/80 hover:text-white transition-colors"
        >
          Try It &rarr;
        </button>
      </nav>

      <main className="pt-12 pb-16 flex-1 flex flex-col items-center">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-xl px-4 flex flex-col items-center mt-6 md:mt-10"
            >
              <Home onAnalyze={handleAnalyze} />
            </motion.div>
          )}

          {view === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-md px-4 flex flex-col items-center justify-center mt-32"
            >
              <Loading name={currentName} />
            </motion.div>
          )}

          {view === 'result' && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="w-full max-w-2xl px-4 flex flex-col items-center"
            >
              <Result result={result} onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="w-full py-6 flex justify-center items-center border-t border-white/5 bg-background/50 backdrop-blur-sm relative z-10">
        <p className="text-white/40 text-sm">
          developed by{' '}
          <a 
            href="https://devpb.vercel.app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/70 hover:text-primary transition-colors font-medium"
          >
            Dev. P
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
