import { memo } from "react";
import { useLang } from "@/context/LangContext";

const HeroSection = memo(() => {
  const { t } = useLang();
  const { hero } = t;

  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background grid lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="grid-line-v" style={{ left: "25%" }} />
        <div className="grid-line-v" style={{ left: "50%" }} />
        <div className="grid-line-v" style={{ left: "75%" }} />
      </div>

      {/* Lime glow blob */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "600px", height: "600px",
          background: "radial-gradient(circle, rgba(200,241,53,0.06) 0%, transparent 70%)",
          top: "-100px", right: "-150px",
        }}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-6 pt-24 pb-16">
        {/* Eyebrow */}
        <div className="section-label mb-10 hero-fade hero-fade-1 opacity-0">
          {hero.eyebrow}
        </div>

        {/* Headline */}
        <h1
          className="font-display font-black leading-none tracking-tight mb-10"
          style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)" }}
        >
          <span className="hero-line">
            <span className="hero-line-inner text-parchment">{hero.line1}</span>
          </span>
          <span className="hero-line">
            <span className="hero-line-inner italic text-parchment">{hero.line2}</span>
          </span>
          <span className="hero-line">
            <span className="hero-line-inner text-lime">{hero.line3}</span>
          </span>
        </h1>

        <span
          className="font-display font-black italic shimmer-text block -mt-6 mb-10"
          style={{ fontSize: "clamp(0.875rem, 2.25vw, 2.25rem)" }}
        >
          {hero.shimmer}{" "}
          <span className="not-italic font-sans font-normal">©</span>
          <span className="not-italic"> AI</span>
          )
        </span>

        {/* Sub */}
        <div className="flex flex-col md:flex-row gap-8 md:items-end justify-between">
          <span
            className="text-parchment-dim font-body font-light max-w-md leading-relaxed hero-fade hero-fade-2 opacity-0"
            style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)" }}
          >
            {hero.sub}
            <span> {hero.sub2}</span>
          </span>

          <div className="flex gap-4 hero-fade hero-fade-3 opacity-0 flex-wrap">
            <button className="btn-lime" onClick={scrollToProjects} style={{ cursor: "none" }}>
              {hero.cta}
            </button>
            <a
              href="#contact"
              className="btn-outline"
              style={{ cursor: "none" }}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {hero.ctaContact}
            </a>
          </div>
        </div>

        {/* Stats — CSS animation замість motion.div */}
        <div className="mt-16 pt-8 border-t border-border grid grid-cols-3 gap-6 max-w-2xl hero-fade hero-fade-4 opacity-0">
          {hero.stats.map(({ n, label }) => (
            <div key={label}>
              <div className="font-display font-black text-lime text-3xl md:text-4xl leading-none mb-1">
                {n}
              </div>
              <div className="font-mono text-xs text-white font-bold tracking-wider uppercase">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee */}
      <div className="border-t border-border py-4 overflow-hidden">
        <div className="marquee-track">
          {Array(4).fill(0).flatMap(() => hero.marquee).map((item, i) => (
            <span
              key={i}
              className={`font-mono text-xs tracking-widest uppercase px-4 whitespace-nowrap ${
                item === "·" ? "text-lime" : "text-muted"
              }`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";
export default HeroSection;
