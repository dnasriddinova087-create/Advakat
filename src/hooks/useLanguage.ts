// Multilingual language hook with reactive state
import { useState, useEffect } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../lib/constants';
import { getStoredLanguage, saveStoredLanguage } from '../lib/storage';

export function useLanguage() {
  const [lang, setLang] = useState<Language>('uz');

  useEffect(() => {
    const saved = getStoredLanguage();
    setLang(saved);
  }, []);

  const changeLanguage = (newLang: Language) => {
    setLang(newLang);
    saveStoredLanguage(newLang);
  };

  const t = TRANSLATIONS[lang] || TRANSLATIONS.uz;

  return {
    lang,
    setLanguage: changeLanguage,
    t,
  };
}
