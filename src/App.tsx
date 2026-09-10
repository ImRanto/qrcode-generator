import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { QRGenerator } from './components/QRGenerator';
import { Features } from './components/Features';
import { Footer } from './components/Footer';

export function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    if (saved) {
      return saved === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="flex-1 max-w-5xl w-full mx-auto py-6">
        <Hero />
        <QRGenerator />
        <Features />
      </main>

      <Footer />
    </div>
  );
}

export default App;
