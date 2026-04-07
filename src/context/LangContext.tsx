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

const getLangFromPath = (): Lang => {
  const path = window.location.pathname;
  if (path.startsWith("/uk")) return "uk";
  if (path.startsWith("/en")) return "en";
  return (localStorage.getItem("lang") as Lang) ?? "en";
};

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(getLangFromPath);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
  }, []);

  useEffect(() => {
    const handler = () => setLangState(getLangFromPath());
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
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
