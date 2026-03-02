"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var framer_motion_1 = require("framer-motion");
var useScrollReveal_1 = require("@/hooks/useScrollReveal");
var CodeBreakerGame_1 = require("@/components/CodeBreakerGame");
var lucide_react_1 = require("lucide-react");
var SKILLS = [
    { category: "Frontend", items: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"] },
    { category: "Деплой", items: ["Cloudflare Pages", "GitHub Actions", "Інше"] },
    { category: "Інструменти", items: ["Figma", "VS Code", "Git", "Notion", "AI"] },
];
var AboutSection = (0, react_1.memo)(function () {
    var leftRef = (0, useScrollReveal_1.useScrollReveal)();
    var rightRef = (0, useScrollReveal_1.useScrollReveal)();
    var _a = (0, react_1.useState)(false), showCodeBreaker = _a[0], setShowCodeBreaker = _a[1];
    return (<>
    <section id="about" className="py-28 bg-ink-2 relative overflow-hidden">
      {/* BG decoration */}
      <div className="absolute pointer-events-none" style={{
            width: "500px", height: "500px",
            background: "radial-gradient(circle, rgba(200,241,53,0.04) 0%, transparent 70%)",
            bottom: "-150px", left: "-100px",
        }}/>
      <div className="grid-line-v" style={{ left: "33.33%" }}/>
      <div className="grid-line-v" style={{ left: "66.66%" }}/>

      <div className="max-w-7xl mx-auto px-6">
        <div className="section-label mb-16 reveal" ref={(0, useScrollReveal_1.useScrollReveal)()}>
          Про мене
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — Photo + name */}
          <div ref={leftRef} className="reveal">
            {/* Photo block */}
            <div className="relative mb-8">

              <div className="w-full aspect-[4/5] bg-ink-3 border border-border overflow-hidden relative" style={{ maxWidth: 440 }}>
                
                <img src="./photo/chyvot.jpg" alt="Фото" className="w-full h-full object-cover"/> 

                {/* Placeholder */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div className="font-display font-black italic text-lime/10 select-none" style={{ fontSize: "clamp(6rem, 15vw, 10rem)", lineHeight: 1 }}>
                    Я
                  </div>
                  <div className="font-mono text-xs text-muted tracking-widest uppercase">
                  
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-lime"/>
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-lime"/>
              </div>

              {/* Status badge */}
              <div className="absolute -bottom-4 -right-4 md:right-0 bg-lime px-4 py-2 font-mono text-xs uppercase tracking-wider text-ink font-medium" style={{ maxWidth: 440 }}>
                <span className="inline-block w-2 h-2 rounded-full bg-ink mr-2 animate-pulse"/>
                Відкритий до проєктів
              </div>
            </div>
          </div>

          {/* Right — Bio + skills */}
          <div ref={rightRef} className="reveal reveal-delay-2">
            <h2 className="font-display font-black leading-tight mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Andrii Chyvotiov
            </h2>
            <div className="space-y-4 text-parchment-dim leading-relaxed mb-10">
              <p>
                Веб-розробник із пристрастю до чистого коду і сильного дизайну.
                Спеціалізуюсь на створенні швидких, сучасних сайтів для бізнесу —
                від лендінгів до багатосторінкових сайтів з інтеграціями. Можливо, бізнес-екосистему хочеш ?
              </p>
              <p>
                Будую на <span className="text-parchment">React + TypeScript + Vite</span>,
                деплою на <span className="text-parchment">Cloudflare</span>.
                Слідкую за деталями — анімації, UX, продуктивність.
              </p>
            </div>

            {/* Skills */}
            <div className="space-y-6">
              {SKILLS.map(function (_a) {
            var category = _a.category, items = _a.items;
            return (<div key={category}>
                  <div className="font-mono text-xs text-muted tracking-widest uppercase mb-3">
                    {category}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {items.map(function (skill) { return (<framer_motion_1.motion.span key={skill} whileHover={{ borderColor: "rgba(200,241,53,0.6)", color: "#C8F135" }} className="tech-pill">
                        {skill}
                      </framer_motion_1.motion.span>); })}
                  </div>
                </div>);
        })}
            </div>

            {/* CTA */}
            <div className="mt-10 flex gap-4 flex-wrap">
              {/* CODE BREAKER BUTTON */}
              <button onClick={function () { return setShowCodeBreaker(true); }} className="btn-lime group relative overflow-hidden" style={{ cursor: "none" }}>
                <lucide_react_1.Terminal size={16} className="relative z-10"/>
                <span className="relative z-10">Розшифрувати витрати</span>
                <framer_motion_1.motion.div className="absolute inset-0 bg-lime-dim" initial={{ x: "-100%" }} whileHover={{ x: 0 }} transition={{ duration: 0.3 }}/>
              </button>

              <button onClick={function () { var _a; return (_a = document.querySelector("#contact")) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: "smooth" }); }} className="btn-outline" style={{ cursor: "none" }}>
                Написати
              </button>
            </div>

            {/* Hint */}
            <framer_motion_1.motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-6 flex items-start gap-3 bg-lime/5 border border-lime/20 p-4">
              <div className="text-lime text-xl">💡</div>
              <div className="text-xs text-parchment-dim">
                <strong className="text-lime">Цікавинка:</strong> Натисни кнопку вище, щоб 
                зламати систему і дізнатись мої зарплатні очікування через термінал-гру 🔓
              </div>
            </framer_motion_1.motion.div>
          </div>
        </div>
      </div>
    </section>
     {/* Code Breaker Game Modal */}
      <CodeBreakerGame_1.CodeBreakerGame show={showCodeBreaker} onClose={function () { return setShowCodeBreaker(false); }}/>
      </>);
});
AboutSection.displayName = "AboutSection";
exports.default = AboutSection;
