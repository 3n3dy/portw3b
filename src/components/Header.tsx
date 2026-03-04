import { memo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Проєкти", href: "#projects" },
  { label: "Про мене", href: "#about" },
  { label: "Контакт", href: "#contact" },
];

const Header = memo(() => {
  const [visible, setVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  const menuRef = useRef<HTMLDivElement>(null);

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

  // Закриття меню при кліку поза ним
  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Перевірка, чи клік поза меню
      if (menuRef.current && !menuRef.current.contains(target)) {
        // Також перевірка, чи це не кнопка бургера
        if (!target.closest('[aria-label="Меню"]')) {
          setMenuOpen(false);
        }
      }
    };

    // Невелика затримка, щоб не спрацювало одразу після відкриття
    const timer = setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuOpen]);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ 
          behavior: "smooth", 
          block: "start" 
        });
      }
    }, 350);
  };

  return (
    <>
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
                style={{ cursor: "pointer" }}
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
                    style={{ cursor: "pointer" }}
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => scrollTo("#contact")}
                  className="btn-lime text-xs"
                  style={{ cursor: "pointer" }}
                >
                  Зв'язатись →
                </button>
              </nav>

              {/* Mobile burger - КОМПАКТНИЙ */}
              <button
                className="md:hidden w-6 h-6 flex flex-col justify-center gap-1 p-1 relative z-[60]"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setMenuOpen(prev => !prev);
                }}
                style={{ WebkitTapHighlightColor: "transparent", cursor: "pointer" }}
                aria-label="Меню"
              >
                <span className={`block h-px w-4 bg-parchment transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-0.5" : ""}`} />
                <span className={`block h-px w-4 bg-parchment transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
                <span className={`block h-px w-4 bg-parchment transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-0.5" : ""}`} />
              </button>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Mobile Menu - ПОЛОВИНА ШИРИНИ + BACKDROP */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop - затемнений фон */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMenuOpen(false)}
            />

            {/* Меню справа - 50% ширини */}
            <motion.div
              ref={menuRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="fixed top-0 right-0 bottom-0 w-1/2 min-w-[200px] max-w-[280px] bg-ink-2 border-l border-border shadow-2xl z-50 md:hidden overflow-y-auto"
              style={{ pointerEvents: "auto" }}
            >
              <div className="px-6 py-20 flex flex-col gap-6">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollTo(item.href)}
                    className="font-mono text-xs tracking-widest2 uppercase text-parchment-dim hover:text-lime transition-colors text-right"
                    style={{ cursor: "pointer" }}
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => scrollTo("#contact")}
                  className="btn-lime w-full justify-center mt-4"
                  style={{ cursor: "pointer" }}
                >
                  Зв'язатись →
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
});

Header.displayName = "Header";
export default Header;
