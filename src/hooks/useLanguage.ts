// Global Multilingual Language Context and Hook with instant synchronization across the app
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../lib/constants';
import { getStoredLanguage, saveStoredLanguage } from '../lib/storage';

interface LanguageContextType {
  lang: Language;
  setLanguage: (newLang: Language) => void;
  t: typeof TRANSLATIONS.uz;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('uz');

  useEffect(() => {
    const saved = getStoredLanguage();
    if (saved) {
      setLang(saved);
    }
  }, []);

  const changeLanguage = (newLang: Language) => {
    setLang(newLang);
    saveStoredLanguage(newLang);
  };

  const t = TRANSLATIONS[lang] || TRANSLATIONS.uz;

  return React.createElement(
    LanguageContext.Provider,
    { value: { lang, setLanguage: changeLanguage, t } },
    children
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    // Graceful fallback if rendered outside provider
    const saved = getStoredLanguage();
    return {
      lang: saved,
      setLanguage: saveStoredLanguage,
      t: TRANSLATIONS[saved] || TRANSLATIONS.uz,
    };
  }
  return context;
}
