import { memo } from "react";
import { useLang } from "@/context/LangContext";

const Footer = memo(() => {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-display font-black text-xl tracking-widest">
          w3bedy<span className="text-lime">.</span>
        </div>
        <div className="font-mono text-xs text-muted tracking-wider text-center">
          © {year} · {t.footer.copy}
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
export default Footer;
