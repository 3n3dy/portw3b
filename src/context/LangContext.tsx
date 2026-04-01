import { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { ReactNode } from "react";
import { uk } from "@/locales/uk";
import { en } from "@/locales/en";

const META_DESCRIPTION: Record<string, string> = {
  uk: "Портфоліо веб-розробника — лендінги, корпоративні сайти, UI/UX",
  en: "Web developer portfolio — landing pages, corporate sites, UI/UX",
};

export type Lang = "uk" | "en";
export type Translations = typeof uk;

interface LangContextType {
  lang: Lang;
  t: Translations;
  setLang: (l: Lang) => void;
}

const LangContext = createContext<LangContextType | null>(null);

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    return (localStorage.getItem("lang") as Lang) ?? "uk";
  });

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", META_DESCRIPTION[lang]);
  }, [lang]);

  const t = lang === "uk" ? uk : en;

  return (
    <LangContext.Provider value={{ lang, t, setLang }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
};
