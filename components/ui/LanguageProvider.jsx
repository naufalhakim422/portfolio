'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { TRANSLATIONS } from '@/lib/i18n/translations';

export const LanguageContext = createContext({
  lang: 'en',
  setLang: () => {},
  toggleLang: () => {},
  t: TRANSLATIONS.en,
});

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState('en');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('nh_portfolio_lang');
      if (savedLang === 'id' || savedLang === 'en') {
        setLangState(savedLang);
      }
    }
  }, []);

  const setLang = (newLang) => {
    if (newLang === 'en' || newLang === 'id') {
      setLangState(newLang);
      if (typeof window !== 'undefined') {
        localStorage.setItem('nh_portfolio_lang', newLang);
      }
    }
  };

  const toggleLang = () => {
    const nextLang = lang === 'en' ? 'id' : 'en';
    setLang(nextLang);
  };

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
