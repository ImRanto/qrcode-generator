import React, { useState, useEffect } from 'react';
import type { Language, TranslationKeys } from './translations';
import { translations } from './translations';
import { LanguageContext } from './useTranslation';

const STORAGE_KEY = 'qr_generator_language_v1';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'en' || saved === 'fr') {
        return saved;
      }
      // Auto-detect browser language
      const browserLang = navigator.language || (navigator as { userLanguage?: string }).userLanguage || '';
      if (browserLang.toLowerCase().startsWith('fr')) {
        return 'fr';
      }
    } catch (err) {
      console.error('Failed to read language preference from localStorage:', err);
    }
    return 'en';
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language);
      document.documentElement.lang = language;
    } catch (err) {
      console.error('Failed to save language preference to localStorage:', err);
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: TranslationKeys): string => {
    const dict = translations[language] || translations.en;
    return dict[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

