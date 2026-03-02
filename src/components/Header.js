"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var framer_motion_1 = require("framer-motion");
var navItems = [
    { label: "Проекти", href: "#projects" },
    { label: "Про мене", href: "#about" },
    { label: "Контакт", href: "#contact" },
];
var Header = (0, react_1.memo)(function () {
    var _a = (0, react_1.useState)(true), visible = _a[0], setVisible = _a[1];
    var _b = (0, react_1.useState)(true), atTop = _b[0], setAtTop = _b[1];
    var _c = (0, react_1.useState)(false), menuOpen = _c[0], setMenuOpen = _c[1];
    var lastY = (0, react_1.useRef)(0);
    (0, react_1.useEffect)(function () {
        var handler = function () {
            var y = window.scrollY;
            setAtTop(y < 30);
            if (y < 10) {
                setVisible(true);
            }
            else if (y > lastY.current + 4) {
                setVisible(false);
                setMenuOpen(false);
            }
            else if (y < lastY.current - 4) {
                setVisible(true);
            }
            lastY.current = y;
        };
        window.addEventListener("scroll", handler, { passive: true });
        return function () { return window.removeEventListener("scroll", handler); };
    }, []);
    var scrollTo = function (href) {
        var _a;
        setMenuOpen(false);
        (_a = document.querySelector(href)) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
    };
    return (<framer_motion_1.AnimatePresence>
      {visible && (<framer_motion_1.motion.header initial={{ y: -80 }} animate={{ y: 0 }} exit={{ y: -80 }} transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }} className={"fixed top-0 left-0 right-0 z-50 transition-all duration-300 ".concat(atTop ? "bg-transparent" : "bg-ink/90 backdrop-blur-md border-b border-border")}>
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            {/* Logo */}
            <button onClick={function () { return window.scrollTo({ top: 0, behavior: "smooth" }); }} className="font-display font-800 text-xl tracking-widest text-parchment hover:text-lime transition-colors duration-200" style={{ cursor: "none" }}>
              w3bedy<span className="text-lime">.</span>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map(function (item) { return (<button key={item.href} onClick={function () { return scrollTo(item.href); }} className="font-mono text-xs tracking-widest2 uppercase text-parchment-dim hover:text-lime transition-colors duration-200" style={{ cursor: "none" }}>
                  {item.label}
                </button>); })}
              <button onClick={function () { return scrollTo("#contact"); }} className="btn-lime text-xs" style={{ cursor: "none" }}>
                Зв'язатись →
              </button>
            </nav>

            {/* Mobile burger */}
            <button className="md:hidden w-8 h-8 flex flex-col justify-center gap-1.5" onClick={function () { return setMenuOpen(!menuOpen); }} style={{ cursor: "none" }} aria-label="Меню">
              <span className={"block h-px bg-parchment transition-all duration-300 ".concat(menuOpen ? "rotate-45 translate-y-2" : "")}/>
              <span className={"block h-px bg-parchment transition-all duration-300 ".concat(menuOpen ? "opacity-0" : "")}/>
              <span className={"block h-px bg-parchment transition-all duration-300 ".concat(menuOpen ? "-rotate-45 -translate-y-2" : "")}/>
            </button>
          </div>

          {/* Mobile Menu */}
          <framer_motion_1.AnimatePresence>
            {menuOpen && (<framer_motion_1.motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-ink-2 border-t border-border overflow-hidden">
                <div className="px-6 py-6 flex flex-col gap-6">
                  {navItems.map(function (item) { return (<button key={item.href} onClick={function () { return scrollTo(item.href); }} className="font-mono text-xs tracking-widest2 uppercase text-parchment-dim hover:text-lime transition-colors text-left" style={{ cursor: "none" }}>
                      {item.label}
                    </button>); })}
                  <button onClick={function () { return scrollTo("#contact"); }} className="btn-lime w-fit" style={{ cursor: "none" }}>
                    Зв'язатись →
                  </button>
                </div>
              </framer_motion_1.motion.div>)}
          </framer_motion_1.AnimatePresence>
        </framer_motion_1.motion.header>)}
    </framer_motion_1.AnimatePresence>);
});
Header.displayName = "Header";
exports.default = Header;
