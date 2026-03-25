import { memo, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { CodeBreakerGame } from "@/components/CodeBreakerGame";
import { Terminal } from "lucide-react";
import { useLang } from "@/context/LangContext";

const AboutSection = memo(() => {
  const { t } = useLang();
  const { about } = t;

  const leftRef = useScrollReveal<HTMLDivElement>();
  const rightRef = useScrollReveal<HTMLDivElement>();
  const [showCodeBreaker, setShowCodeBreaker] = useState(false);

  return (
    <>
      <section id="about" className="py-28 bg-ink-2 relative overflow-hidden">
        <div
          className="absolute pointer-events-none"
          style={{
            width: "500px", height: "500px",
            background: "radial-gradient(circle, rgba(200,241,53,0.04) 0%, transparent 70%)",
            bottom: "-150px", left: "-100px",
          }}
        />
        <div className="grid-line-v" style={{ left: "33.33%" }} />
        <div className="grid-line-v" style={{ left: "66.66%" }} />

        <div className="max-w-7xl mx-auto px-6">
          <div className="section-label mb-16 reveal" ref={useScrollReveal<HTMLDivElement>()}>
            {about.label}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Photo */}
            <div ref={leftRef} className="reveal">
              <div className="relative mb-8">
                <div
                  className="w-full aspect-[4/5] bg-ink-3 border border-border overflow-hidden relative"
                  style={{ maxWidth: 440 }}
                >
                  <img src="./photo/chyvot.jpg" alt="Photo" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <div
                      className="font-display font-black italic text-lime/10 select-none"
                      style={{ fontSize: "clamp(6rem, 15vw, 10rem)", lineHeight: 1 }}
                    >
                      Я
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-lime" />
                  <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-lime" />
                </div>
                <div
                  className="absolute -bottom-4 -right-4 md:right-0 bg-lime px-4 py-2 font-mono text-xs uppercase tracking-wider text-ink font-medium"
                  style={{ maxWidth: 440 }}
                >
                  <span className="inline-block w-2 h-2 rounded-full bg-ink mr-2 animate-pulse" />
                  {about.status}
                </div>
              </div>
            </div>

            {/* Bio */}
            <div ref={rightRef} className="reveal reveal-delay-2">
              <h2
                className="font-display font-black leading-tight mb-6"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
              >
                {about.name}
              </h2>

              <div className="space-y-4 text-parchment-dim leading-relaxed mb-10">
                <p>{about.bio1}</p>
                <p>
                  {about.bio2
                    .split("{stack}")[0]}
                  <span className="text-parchment">{about.bio2stack}</span>
                  {about.bio2.split("{stack}")[1]?.split("{deploy}")[0]}
                  <span className="text-parchment">{about.bio2deploy}</span>
                  {about.bio2.split("{deploy}")[1]}
                </p>
              </div>

              {/* Skills */}
              <div className="space-y-6">
                {about.skills.map(({ category, items }) => (
                  <div key={category}>
                    <div className="font-mono text-xs text-muted tracking-widest uppercase mb-3">
                      {category}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {items.map((skill) => (
                        // CSS transition вже в .tech-pill в index.css
                        <span key={skill} className="tech-pill">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-10 flex gap-4 flex-wrap">
                <button
                  onClick={() => setShowCodeBreaker(true)}
                  className="btn-lime btn-lime-shine"
                  style={{ cursor: "none" }}
                >
                  <Terminal size={16} />
                  {about.codeBreaker}
                </button>
                <button
                  onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="btn-outline"
                  style={{ cursor: "none" }}
                >
                  {about.write}
                </button>
              </div>

              <div className="reveal reveal-d3 mt-6 flex items-start gap-3 bg-lime/5 border border-lime/20 p-4">
                <div className="text-lime text-xl">💡</div>
                <div className="text-xs text-parchment-dim">
                  <strong className="text-lime">{about.hint}</strong>{" "}
                  {about.hintText}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CodeBreakerGame show={showCodeBreaker} onClose={() => setShowCodeBreaker(false)} />
    </>
  );
});

AboutSection.displayName = "AboutSection";
export default AboutSection;
