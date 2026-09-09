import { useRef } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface NameInputProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
}

export const NameInput: React.FC<NameInputProps> = ({ value, onChange, onSubmit }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && value.trim()) {
      onSubmit();
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div className="relative w-full max-w-md group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-30 group-focus-within:opacity-60 transition duration-500"></div>
        <div className="relative flex items-center bg-card border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter a name..."
            className="w-full bg-transparent text-xl py-5 pl-6 pr-16 outline-none text-white placeholder:text-white/30"
            maxLength={30}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <button
              onClick={onSubmit}
              disabled={!value.trim()}
              className="bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-white/10 text-white p-3 rounded-xl transition-all flex items-center justify-center"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-white/40 flex items-center gap-2">
        <Sparkles className="w-4 h-4" />
        Try a real name or just make one up 👀
      </p>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onSubmit}
        disabled={!value.trim()}
        className="mt-4 bg-white text-black font-semibold py-4 px-12 rounded-full shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-lg"
      >
        <Sparkles className="w-5 h-5" />
        Analyze Name
      </motion.button>
    </div>
  );
};
