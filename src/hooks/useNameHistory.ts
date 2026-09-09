import { useState, useEffect } from 'react';

const STORAGE_KEY = 'namevibe_history';

export function useNameHistory() {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse name history");
      }
    }
  }, []);

  const addName = (name: string) => {
    const formattedName = name.trim().charAt(0).toUpperCase() + name.trim().slice(1).toLowerCase();
    setHistory((prev) => {
      const filtered = prev.filter(n => n.toLowerCase() !== formattedName.toLowerCase());
      const newHistory = [formattedName, ...filtered].slice(0, 10);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const clearHistory = () => {
    localStorage.removeItem(STORAGE_KEY);
    setHistory([]);
  };

  return { history, addName, clearHistory };
}
