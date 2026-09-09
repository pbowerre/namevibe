
import { motion } from 'framer-motion';

interface GenderToggleProps {
  gender: 'man' | 'woman';
  onChange: (gender: 'man' | 'woman') => void;
}

export const GenderToggle: React.FC<GenderToggleProps> = ({ gender, onChange }) => {
  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <p className="text-sm text-white/50 font-medium">Who are we analyzing?</p>
      <div className="relative flex items-center bg-white/5 p-1 rounded-full border border-white/10 w-full max-w-[240px]">
        {/* Animated background slider */}
        <motion.div
          className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white/10 rounded-full shadow-sm"
          animate={{
            left: gender === 'woman' ? '4px' : 'calc(50%)',
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
        
        <button
          type="button"
          onClick={() => onChange('woman')}
          className={`relative z-10 w-1/2 py-2 text-sm font-medium transition-colors flex justify-center items-center gap-2 ${
            gender === 'woman' ? 'text-white' : 'text-white/40 hover:text-white/70'
          }`}
        >
          <span>👩</span> Woman
        </button>
        <button
          type="button"
          onClick={() => onChange('man')}
          className={`relative z-10 w-1/2 py-2 text-sm font-medium transition-colors flex justify-center items-center gap-2 ${
            gender === 'man' ? 'text-white' : 'text-white/40 hover:text-white/70'
          }`}
        >
          <span>👨</span> Man
        </button>
      </div>
    </div>
  );
};
