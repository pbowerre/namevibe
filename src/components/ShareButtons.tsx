import React, { useState } from 'react';
import { Copy, Share2, Check } from 'lucide-react';
import type { VibeResult } from '../types/vibe';

interface ShareButtonsProps {
  result: VibeResult;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ result }) => {
  const [copied, setCopied] = useState(false);

  const generateShareText = () => {
    return `I put ${result.name}'s name into NameVibe 😂\n\nApparently ${result.gender === 'woman' ? 'she\'s' : 'he\'s'}:\n❤️ ${result.categories.relationship.score}% loyal-energy\n💼 ${result.categories.hardworking.score}% hardworking\n😂 ${result.categories.drama.score}% drama\n🍔 ${result.categories.food.score}% foodie\n\nCheck yours 👀`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateShareText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    const text = generateShareText();
    if (navigator.share) {
      try {
        await navigator.share({
          title: "NameVibe Result",
          text: text,
        });
      } catch (e) {
        console.log("Error sharing", e);
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="flex items-center gap-3 w-full justify-center mt-6">
      <button 
        onClick={handleCopy}
        className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-xl transition-colors text-sm font-medium"
      >
        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
        {copied ? 'Copied!' : 'Copy Text'}
      </button>
      
      <button 
        onClick={handleShare}
        className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-xl transition-colors text-sm font-medium shadow-[0_0_20px_rgba(150,100,255,0.3)]"
      >
        <Share2 className="w-4 h-4" />
        Share
      </button>
    </div>
  );
};
