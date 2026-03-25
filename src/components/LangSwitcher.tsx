import { memo } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";
import type { Lang } from "@/context/LangContext";

interface LangSwitcherProps {
  /** "header" — компактний в десктоп-хедері, "mobile" — великий у мобільному меню */
  variant?: "header" | "mobile";
}

const LangSwitcher = memo(({ variant = "header" }: LangSwitcherProps) => {
  const { lang, setLang } = useLang();

  const langs: { code: Lang; label: string }[] = [
    { code: "uk", label: "UA" },
    { code: "en", label: "EN" },
  ];

  if (variant === "mobile") {
    return (
      <div className="flex items-center gap-2 mt-2">
        {langs.map(({ code, label }) => (
          <button
            key={code}
            onClick={() => setLang(code)}
            style={{ cursor: "pointer" }}
            className={`
              relative font-mono text-xs tracking-widest2 uppercase px-4 py-2
              border transition-colors duration-200
              ${lang === code
                ? "border-lime text-lime bg-lime/10"
                : "border-border text-parchment-dim hover:text-parchment hover:border-parchment/30"
              }
            `}
          >
            {label}
            {lang === code && (
              <motion.span
                layoutId="mob-lang-indicator"
                className="absolute bottom-0 left-0 right-0 h-px bg-lime"
              />
            )}
          </button>
        ))}
      </div>
    );
  }

  // variant === "header" — таблетка з підкресленням активної
  return (
    <div className="hidden md:flex items-center gap-1 ml-2 border border-border rounded-none p-0.5">
      {langs.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          style={{ cursor: "pointer" }}
          className={`
            relative font-mono text-xs tracking-widest uppercase px-3 py-1.5
            transition-all duration-200
            ${lang === code
              ? "text-ink bg-lime"
              : "text-parchment-dim hover:text-parchment"
            }
          `}
        >
          {label}
        </button>
      ))}
    </div>
  );
});

LangSwitcher.displayName = "LangSwitcher";
export default LangSwitcher;
