"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var framer_motion_1 = require("framer-motion");
var lucide_react_1 = require("lucide-react");
var projects_1 = require("@/data/projects");
var useScrollReveal_1 = require("@/hooks/useScrollReveal");
var ProjectLine = (0, react_1.memo)(function (_a) {
    var _b;
    var project = _a.project, index = _a.index;
    var _c = (0, react_1.useState)(false), hovered = _c[0], setHovered = _c[1];
    var _d = (0, react_1.useState)(false), previewOpen = _d[0], setPreviewOpen = _d[1];
    var _e = (0, react_1.useState)({ x: 0, y: 0 }), mousePos = _e[0], setMousePos = _e[1];
    var lineRef = (0, react_1.useRef)(null);
    var handleMouseMove = function (e) {
        var _a;
        var rect = (_a = lineRef.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
        if (!rect)
            return;
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    return (<div ref={lineRef} className="project-line group relative" onMouseEnter={function () { return setHovered(true); }} onMouseLeave={function () { return setHovered(false); }} onMouseMove={handleMouseMove} onTouchStart={function () { return setPreviewOpen(true); }} // ← ДОДАЙ
     onTouchEnd={function () { return setTimeout(function () { return setPreviewOpen(false); }, 5000); }} // ← ДОДАЙ
    >
        <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 md:gap-8 py-6 md:py-8 px-1 group-hover:px-3 transition-all duration-400" style={{ cursor: "none", textDecoration: "none" }}>
          {/* Number */}
          <span className="font-mono text-xs text-muted flex-shrink-0 w-8 text-right">
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Title */}
          <h3 className="font-display font-bold flex-1 text-parchment group-hover:text-lime transition-colors duration-300" style={{ fontSize: "clamp(1.2rem, 3vw, 2rem)" }}>
            {project.title}
          </h3>

          {/* Category — hidden on mobile */}
          <span className="hidden md:block font-mono text-xs text-muted tracking-wider uppercase w-48 text-right flex-shrink-0">
            {project.category}
          </span>

          {/* Year */}
          <span className="font-mono text-xs text-muted flex-shrink-0 hidden sm:block">
            {project.year}
          </span>

          {/* Arrow */}
          <lucide_react_1.ExternalLink size={16} className="flex-shrink-0 text-muted group-hover:text-lime transition-colors duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"/>
        </a>


        <framer_motion_1.AnimatePresence>
          
          {(hovered || previewOpen) && (project.previewGif || project.screenshot) && (<framer_motion_1.motion.div initial={{ opacity: 0, scale: 0.92, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92, y: 8 }} transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }} className="absolute z-20 pointer-events-none block w-full h-full" style={{
                left: Math.min(mousePos.x + 20, 600),
                top: mousePos.y - 120,
                width: 320,
            }}>
              <div className="border border-border overflow-hidden shadow-2xl" style={{ boxShadow: "0 25px 60px rgba(0,0,0,0.8)" }}>
                <div className="bg-ink-3 px-3 py-2 flex items-center gap-2 border-b border-border">
                  <div className="w-2 h-2 rounded-full bg-red-500/60"/>
                  <div className="w-2 h-2 rounded-full bg-yellow-500/60"/>
                  <div className="w-2 h-2 rounded-full bg-lime/60"/>
                  <span className="font-mono text-xs text-muted ml-2 truncate">{project.url}</span>
                </div>
                <img src={(_b = project.screenshot) !== null && _b !== void 0 ? _b : project.previewGif} alt={project.title} loading="lazy" decoding="async" className="w-full h-44 object-cover object-top" onError={function (e) {
                var _a;
                var target = e.currentTarget;
                target.style.display = "none";
                (_a = target.nextElementSibling) === null || _a === void 0 ? void 0 : _a.classList.remove("hidden");
            }}/>
                <div className="hidden w-full h-44 bg-ink-3 flex items-center justify-center">
                  <div className="text-center">
                    <div className="font-display font-black text-4xl text-lime/20 mb-2">
                      {project.title[0]}
                    </div>
                    <div className="font-mono text-xs text-muted">Скріншот відсутній</div>
                  </div>
                </div>
              </div>
            </framer_motion_1.motion.div>)}
        </framer_motion_1.AnimatePresence>
        

        {/* No screenshot — color indicator */}
        {hovered && !project.screenshot && (<div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(90deg, rgba(200,241,53,0.02) 0%, transparent 100%)" }}/>)}
      </div>);
});
ProjectLine.displayName = "ProjectLine";
var ProjectsSection = (0, react_1.memo)(function () {
    var headRef = (0, useScrollReveal_1.useScrollReveal)();
    return (<section id="projects" className="py-28 relative">
      {/* Grid line */}
      <div className="grid-line-v" style={{ left: "50%" }}/>

      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div ref={headRef} className="reveal mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="section-label mb-4">Роботи</div>
            <h2 className="font-display font-black leading-none" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
              Певні<br />
              <span className="italic text-parchment-dim">проєкти</span>
            </h2>
          </div>
          <span className="text-parchment-dim font-light max-w-xs leading-relaxed text-sm md:text-base">
            Кожен проєкт — живий сайт. 
            <p>☝️ Не забувайте оплачувати домен.</p>
          </span>
        </div>

        {/* Project Index */}
        <div className="border-t border-border">
          {projects_1.projects.map(function (project, i) { return (<ProjectLine key={project.id} project={project} index={i}/>); })}
        </div>

        {/* Bottom note */}
        <framer_motion_1.motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="mt-12 flex items-center gap-4">
          <span className="font-mono text-xs text-muted tracking-wider">
            Ще більше проєктів буде...
          </span>
          <div className="h-px flex-1 bg-border"/>
          <a href="https://linkedin.com/in/enedy" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-lime hover:text-lime-dim transition-colors" style={{ cursor: "none" }}>
            LinkedIn →
          </a>
        </framer_motion_1.motion.div>
      </div>
    </section>);
});
ProjectsSection.displayName = "ProjectsSection";
exports.default = ProjectsSection;
