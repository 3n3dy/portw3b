"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var framer_motion_1 = require("framer-motion");
var MARQUEE_ITEMS = [
    "React", "·", "TypeScript", "·", "Vite", "·",
    "Tailwind CSS", "·", "Framer Motion", "·", "Cloudflare", "·",
    "Node.js", "·", "UI/UX", "·", "Лендінги", "·", "Портфоліо", "·",
];
var HeroSection = (0, react_1.memo)(function () {
    var scrollToProjects = function () {
        var _a;
        (_a = document.querySelector("#projects")) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
    };
    return (<section id="hero" className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background grid lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="grid-line-v" style={{ left: "25%" }}/>
        <div className="grid-line-v" style={{ left: "50%" }}/>
        <div className="grid-line-v" style={{ left: "75%" }}/>
      </div>

      {/* Lime glow blob */}
      <div className="absolute pointer-events-none" style={{
            width: "600px", height: "600px",
            background: "radial-gradient(circle, rgba(200,241,53,0.06) 0%, transparent 70%)",
            top: "-100px", right: "-150px",
        }}/>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-6 pt-24 pb-16">
        {/* Eyebrow */}
        <div className="section-label mb-10 hero-fade hero-fade-1 opacity-0">
          Веб-розробник · І багато інших професій
        </div>

        {/* Headline */}
        <h1 className="font-display font-black leading-none tracking-tight mb-10" style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)" }}>
          <span className="hero-line">
            <span className="hero-line-inner text-parchment">Будую</span>
          </span>
          <span className="hero-line">
            <span className="hero-line-inner italic text-parchment">сайти,</span>
          </span>
          <span className="hero-line">
            <span className="hero-line-inner text-lime">що продають.</span>
          </span>
        </h1>
        <span className="font-display font-black italic shimmer-text block -mt-6 mb-10" style={{ fontSize: "clamp(0.875rem, 2.25vw, 2.25rem)" }}>
          (ідеї його — код наш{" "}
          <span className="not-italic font-sans font-normal">©</span>
          <span className="not-italic"> AI</span>
          )
        </span>


        {/* Sub */}
        <div className="flex flex-col md:flex-row gap-8 md:items-end justify-between">
          <span className="text-parchment-dim font-body font-light max-w-md leading-relaxed hero-fade hero-fade-2 opacity-0" style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)" }}>
            Лендінги, корпоративні сайти та веб-додатки на React + TypeScript + Vite.
            <span>Від дизайну до деплою на Cloudflare.</span>
          </span>

          <div className="flex gap-4 hero-fade hero-fade-3 opacity-0 flex-wrap">
            <button className="btn-lime" onClick={scrollToProjects} style={{ cursor: "none" }}>
              Дивитись проекти ↓
            </button>
            <a href="#contact" className="btn-outline" style={{ cursor: "none" }} onClick={function (e) { var _a; e.preventDefault(); (_a = document.querySelector("#contact")) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: "smooth" }); }}>
              Контакт
            </a>
          </div>
        </div>

        {/* Stats row */}
        <framer_motion_1.motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.6 }} className="mt-16 pt-8 border-t border-border grid grid-cols-3 md:grid-cols-4 gap-6 max-w-2xl">
          {[
            { n: "10%", label: "Luck" },
            { n: "20%", label: "Skill" },
            { n: "15%", label: "Power of will" },
            { n: "100%", label: "TypeScript" },
        ].map(function (_a) {
            var n = _a.n, label = _a.label;
            return (<div key={label}>
              <div className="font-display font-black text-lime text-3xl md:text-4xl leading-none mb-1">
                {n}
              </div>
              <div className="font-mono text-xs text-white font-bold tracking-wider uppercase">
                {label}
              </div>
            </div>);
        })}
        </framer_motion_1.motion.div>
      </div>

      {/* Marquee */}
      <div className="border-t border-border py-4 overflow-hidden">
        <div className="marquee-track">
          {__spreadArray(__spreadArray([], MARQUEE_ITEMS, true), MARQUEE_ITEMS, true).map(function (item, i) { return (<span key={i} className={"font-mono text-xs tracking-widest uppercase px-4 whitespace-nowrap ".concat(item === "·" ? "text-lime" : "text-muted")}>
              {item}
            </span>); })}
        </div>
      </div>
    </section>);
});
HeroSection.displayName = "HeroSection";
exports.default = HeroSection;
