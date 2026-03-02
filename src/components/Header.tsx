import { memo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Проекти", href: "#projects" },
  { label: "Про мене", href: "#about" },
  { label: "Контакт", href: "#contact" },
];

const Header = memo(() => {
  const [visible, setVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY;
      setAtTop(y < 30);
      if (y < 10) { setVisible(true); }
      else if (y > lastY.current + 4) { setVisible(false); setMenuOpen(false); }
      else if (y < lastY.current - 4) { setVisible(true); }
      lastY.current = y;
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ y: -80 }}
          animate={{ y: 0 }}
          exit={{ y: -80 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            atTop ? "bg-transparent" : "bg-ink/90 backdrop-blur-md border-b border-border"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="font-display font-800 text-xl tracking-widest text-parchment hover:text-lime transition-colors duration-200"
              style={{ cursor: "none" }}
            >
              w3bedy<span className="text-lime">.</span>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className="font-mono text-xs tracking-widest2 uppercase text-parchment-dim hover:text-lime transition-colors duration-200"
                  style={{ cursor: "none" }}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("#contact")}
                className="btn-lime text-xs"
                style={{ cursor: "none" }}
              >
                Зв'язатись →
              </button>
            </nav>

            {/* Mobile burger */}
            <button
              className="md:hidden w-8 h-8 flex flex-col justify-center gap-1.5"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ cursor: "none" }}
              aria-label="Меню"
            >
              <span className={`block h-px bg-parchment transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-px bg-parchment transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-px bg-parchment transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-ink-2 border-t border-border overflow-hidden"
              >
                <div className="px-6 py-6 flex flex-col gap-6">
                  {navItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => scrollTo(item.href)}
                      className="font-mono text-xs tracking-widest2 uppercase text-parchment-dim hover:text-lime transition-colors text-left"
                      style={{ cursor: "none" }}
                    >
                      {item.label}
                    </button>
                  ))}
                  <button
                    onClick={() => scrollTo("#contact")}
                    className="btn-lime w-fit"
                    style={{ cursor: "none" }}
                  >
                    Зв'язатись →
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
});

Header.displayName = "Header";
export default Header;
