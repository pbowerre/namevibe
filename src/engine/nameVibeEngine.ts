import type { VibeResult } from "../types/vibe";
import { hashString, seededRandom } from "./hash";
import { curatedNames } from "../data/curatedNames";
import { positiveTraits, playfulTraits } from "../data/traits";
import { foodPersonalities } from "../data/foodPersonalities";
import { funnyTeas } from "../data/funnyTeas";

export function analyzeName(name: string, gender: 'man' | 'woman'): VibeResult {
  const normalizedName = name.trim().toLowerCase();
  const displayName = name.trim().charAt(0).toUpperCase() + name.trim().slice(1).toLowerCase();
  
  if (curatedNames[normalizedName]) {
    const curated = curatedNames[normalizedName];
    const seed = hashString(normalizedName + gender);
    const prng = seededRandom(seed);
    
    return {
      name: displayName,
      gender,
      overallScore: Math.floor(prng() * 15) + 85, // 85 - 99
      traits: curated.traits,
      summary: curated.summary,
      categories: generateCategories(prng),
      foodPersonality: curated.foodPersonality,
      tea: curated.tea.replace(/\{name\}/g, displayName)
    };
  }

  const seed = hashString(normalizedName + gender);
  const prng = seededRandom(seed);

  const selectedTraits = [
    ...selectRandom(positiveTraits, 4, prng),
    ...selectRandom(playfulTraits, 2, prng)
  ];

  for (let i = selectedTraits.length - 1; i > 0; i--) {
    const j = Math.floor(prng() * (i + 1));
    [selectedTraits[i], selectedTraits[j]] = [selectedTraits[j], selectedTraits[i]];
  }

  const overallScore = Math.floor(prng() * 20) + 80;
  
  const summary = `Based purely on the vibe of the name, ${displayName} gives off strong ${selectedTraits[0].toLowerCase().replace(/[^a-z -]/g, '')} and ${selectedTraits[1].toLowerCase().replace(/[^a-z -]/g, '')} energy. ✨`;

  return {
    name: displayName,
    gender,
    overallScore,
    traits: selectedTraits,
    summary,
    categories: generateCategories(prng),
    foodPersonality: selectRandom(foodPersonalities, 1, prng)[0],
    tea: selectRandom(funnyTeas, 1, prng)[0].replace(/they/gi, gender === 'woman' ? 'she' : 'he')
                                           .replace(/their/gi, gender === 'woman' ? 'her' : 'his')
                                           .replace(/them/gi, gender === 'woman' ? 'her' : 'him')
  };
}

function selectRandom<T>(array: T[], count: number, prng: () => number): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(prng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

function generateCategories(prng: () => number) {
  const r = () => Math.floor(prng() * 30) + 70;
  
  return {
    relationship: { score: r(), text: "Loyal-energy coded 👀" },
    hardworking: { score: r(), text: "Will chase the bag when motivated 💰" },
    drama: { score: Math.floor(prng() * 50) + 40, text: "Peace is nice... but a little drama keeps things interesting 🍿" },
    food: { score: r(), text: "Has strong opinions on where to eat 🍔" },
    intelligence: { score: r(), text: "Quietly notices things other people miss 🧠" },
    confidence: { score: r(), text: "Knows their worth 💅" },
    caring: { score: r(), text: "Acts tough but actually cares deeply 🫂" },
    stubbornness: { score: Math.floor(prng() * 60) + 40, text: "Good luck changing their mind once it's made 🔥" },
    money: { score: r(), text: "Has serious 'let me secure the bag' potential 💼" },
    romance: { score: r(), text: "Soft heart hiding behind a strong personality 💘" }
  };
}
