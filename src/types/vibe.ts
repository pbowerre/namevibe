export interface VibeResult {
  name: string;
  gender: 'man' | 'woman';
  overallScore: number;
  traits: string[];
  summary: string;
  categories: {
    relationship: { score: number; text: string };
    hardworking: { score: number; text: string };
    drama: { score: number; text: string };
    food: { score: number; text: string };
    intelligence: { score: number; text: string };
    confidence: { score: number; text: string };
    caring: { score: number; text: string };
    stubbornness: { score: number; text: string };
    money: { score: number; text: string };
    romance: { score: number; text: string };
  };
  foodPersonality: string;
  tea: string;
}
