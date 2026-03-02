import { memo } from "react";

const Footer = memo(() => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-display font-black text-xl tracking-widest">
          w3bedy<span className="text-lime">.</span>
        </div>

        <div className="font-mono text-xs text-muted tracking-wider text-center">
          © {year} · Всі права захищені · Зроблено мною для вас
        </div>

        {/* <a
          href="https://github.com/3n3dy"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-muted hover:text-lime transition-colors tracking-wider"
          style={{ cursor: "none" 
        > 
          GitHub →
        </a>*/}
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
export default Footer;
