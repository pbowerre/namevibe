import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const loadingSteps = [
  "Connecting to the NameVibe engine...",
  "Reading name patterns...",
  "Calculating personality energy...",
  "Checking relationship vibes...",
  "Analyzing food personality...",
  "Preparing the tea... 👀",
  "Analysis complete."
];

interface LoadingProps {
  name: string;
}

export default function Loading({ name }: LoadingProps) {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-20 w-full">
      <div className="relative mb-12 flex items-center justify-center">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute w-32 h-32 bg-primary/30 rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 90, 180, 270, 360]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute w-24 h-24 bg-accent/20 rounded-full blur-lg"
        />
        <div className="relative w-16 h-16 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.1)]">
          <span className="text-2xl">✨</span>
        </div>
      </div>

      <div className="text-center w-full max-w-sm">
        <p className="text-sm font-medium text-white/50 mb-4 uppercase tracking-widest">
          Analyzing {name}
        </p>
        
        <div className="h-8 relative flex justify-center items-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={stepIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute text-lg font-medium text-white text-center w-full"
            >
              {loadingSteps[stepIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="w-full h-1 bg-white/10 rounded-full mt-8 overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-primary to-accent"
            initial={{ width: "0%" }}
            animate={{ width: `${((stepIndex + 1) / loadingSteps.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
}
