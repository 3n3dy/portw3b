import { memo, useState, useEffect } from "react";
import emailjs from '@emailjs/browser';
import { motion } from "framer-motion";
import { Mail, MessageCircle, Send, Check, PhoneCallIcon } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const CONTACTS = [
  {
    icon: Mail,
    label: "Email",
    value: "w3bedy@proton.me",
    href: "mailto:w3bedy@proton.me?subject=Щодо%20створення%20сайту&body=Привіт,%20Андрій,%0A%0A",
  },
  {
    icon: MessageCircle,
    label: "Telegram",
    value: "@detguy",
    href: "https://t.me/detguy",
  },
  {
    icon: PhoneCallIcon,
    label: "Phone",
    value: "+38097094209",
    href: "tel:+38097094209",
  }
];

const ContactSection = memo(() => {
  const headRef = useScrollReveal<HTMLDivElement>();
  const formRef = useScrollReveal<HTMLDivElement>();

  const [formData, setFormData] = useState({ name: "", contact: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  useEffect(() => {
    emailjs.init("UaH2NxSvmgacE20AS");  // ТВІЙ Public Key
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");

    try {
      await emailjs.send(
        "service_n4ne0up",
        "template_tmzr5fc",
        {
          from_name: formData.name,
          from_email: formData.contact,
          message: formData.message,
          to_email: "w3bedy@proton.me"
        },
        "gWsWJHXt6sboKCdZ5"        // ← ЗАМІНИ
      );
      setStatus("success");
      setFormData({ name: "", contact: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };


  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      <div className="grid-line-v" style={{ left: "50%" }} />

      {/* BG number */}
       <div
        className="absolute right-16 top-0 font-display font-black text-parchment select-none pointer-events-none"
        style={{ fontSize: "30vw", opacity: 0.015, lineHeight: 1, transform: "translateX(20%), " }}
      >
        📩
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={headRef} className="reveal mb-16">
          <div className="section-label mb-4">Контакт</div>
          <h2 className="font-display font-black leading-none"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}>
            Маєш<br />
            <span className="italic text-parchment-dim">проЄкт?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left — links + text */}
          <div>
            <span className="text-parchment-dim text-lg leading-relaxed mb-12 font-light">
              Напиши мені — обговоримо задачу, терміни і бюджет.
              Відповідаю швидко (протягом доби).
            </span>

            <div className="space-y-4">
              {CONTACTS.map(({ icon: Icon, label, value, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 6 }}
                  className="flex items-center gap-4 p-5 border border-border hover:border-lime/30 transition-colors duration-300 group"
                  style={{ cursor: "none", textDecoration: "none" }}
                >
                  <div className="w-10 h-10 border border-border flex items-center justify-center flex-shrink-0 group-hover:border-lime/50 group-hover:text-lime transition-colors">
                    <Icon size={18} className="text-muted group-hover:text-lime transition-colors" />
                  </div>
                  <div>
                    <div className="font-mono text-xs text-muted tracking-wider uppercase mb-0.5">
                      {label}
                    </div>
                    <div className="text-parchment group-hover:text-lime transition-colors font-medium">
                      {value}
                    </div>
                  </div>
                  <div className="ml-auto text-muted group-hover:text-lime transition-colors">
                    →
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Availability */}
            <div className="mt-10 p-5 border border-lime/20 bg-lime/5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-lime animate-pulse" />
                <span className="font-mono text-xs text-lime tracking-wider uppercase">
                  Доступний для нових ідей
                </span>
              </div>
              <span className="text-parchment-dim text-sm">
                Приймаю замовлення на березень — квітень 2026 р.
              </span>
            </div>
          </div>

          {/* Right — Contact Form */}
          <div ref={formRef} className="reveal reveal-delay-2">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="font-mono text-xs text-muted tracking-widest uppercase block mb-2">
                  Як вас звати *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-ink-2 border border-border text-parchment px-4 py-3 font-body text-base focus:outline-none focus:border-lime/50 transition-colors placeholder:text-muted"
                  placeholder="Колега Браткович"
                  style={{ cursor: "none" }}
                />
              </div>

              <div>
                <label className="font-mono text-xs text-muted tracking-widest uppercase block mb-2">
                  Email або Telegram *
                </label>
                <input
                  type="text"
                  required
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full bg-ink-2 border border-border text-parchment px-4 py-3 font-body text-base focus:outline-none focus:border-lime/50 transition-colors placeholder:text-muted"
                  placeholder="hello@company.com або @telegram"
                  style={{ cursor: "none" }}
                />
              </div>

              <div>
                <label className="font-mono text-xs text-muted tracking-widest uppercase block mb-4 space-y-1">
                  <span>Розкажіть про проєкт *</span>
                  <span>Чи опишіть свою ідею *</span>
                  <span>Або просто щось, що подумали *</span>
                  <span>Чи знаєте конкретно, що потрібно ? *</span>
                  <span>Напишіть хоч щось, мені буде приємно *</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className=" w-full bg-ink-2 border border-border text-parchment px-4 py-3 font-body text-base focus:outline-none focus:border-lime/50 transition-colors resize-none placeholder:text-muted"
                  placeholder="Опишіть що потрібно, строки, бюджет..."
                  style={{ cursor: "none" }}
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-lime w-full justify-center disabled:opacity-60"
                style={{ cursor: "none" }}
              >
                {status === "sending" ? (
                  <>
                    <div className="w-4 h-4 border-2 border-ink/30 border-t-ink rounded-full animate-spin" />
                    Відправка...
                  </>
                ) : status === "success" ? (
                  <>
                    <Check size={16} /> Відправлено!
                  </>
                ) : (
                  <>
                    <Send size={16} /> Надіслати
                  </>
                )}
              </button>

              {status === "error" && (
                <span className="font-mono text-xs text-red-400 text-center">
                  Помилка відправки. Напишіть напряму на email.
                </span>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
});

ContactSection.displayName = "ContactSection";
export default ContactSection;
