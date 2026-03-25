import { memo, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { Mail, MessageCircle, Send, Check, PhoneCallIcon } from "lucide-react";

// Стиль для contact card — CSS transform замість Framer Motion whileHover
// щоб уникнути артефакту перемальовки браузера
const cardStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 16,
  padding: 20,
  border: "1px solid rgba(238,232,220,0.08)",
  textDecoration: "none",
  transition: "border-color 0.3s ease, transform 0.25s ease",
  willChange: "transform",
  cursor: "none",
};
const cardHoverStyle: React.CSSProperties = {
  ...cardStyle,
  transform: "translateX(6px)",
  borderColor: "rgba(200,241,53,0.3)",
};
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLang } from "@/context/LangContext";

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
  },
];

// Окремий компонент з useState для hover — уникаємо артефакту Framer Motion whileHover
const ContactCard = memo(({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href: string;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={hovered ? cardHoverStyle : cardStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="flex items-center justify-center flex-shrink-0 transition-colors duration-300"
        style={{
          width: 40, height: 40,
          border: `1px solid ${hovered ? "rgba(200,241,53,0.5)" : "rgba(238,232,220,0.08)"}`,
          color: hovered ? "#C8F135" : "#4A5568",
          transition: "border-color 0.3s, color 0.3s",
        }}
      >
        <Icon size={18} />
      </div>
      <div>
        <div className="font-mono text-xs text-muted tracking-wider uppercase mb-0.5">
          {label}
        </div>
        <div
          className="font-medium transition-colors duration-300"
          style={{ color: hovered ? "#C8F135" : "#EEE8DC" }}
        >
          {value}
        </div>
      </div>
      <div
        className="ml-auto transition-colors duration-300"
        style={{ color: hovered ? "#C8F135" : "#4A5568" }}
      >
        →
      </div>
    </a>
  );
});
ContactCard.displayName = "ContactCard";

const ContactSection = memo(() => {
  const { t } = useLang();
  const { contact } = t;

  const headRef = useScrollReveal<HTMLDivElement>();
  const formRef = useScrollReveal<HTMLDivElement>();

  const [formData, setFormData] = useState({ name: "", contact: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    emailjs.init("UaH2NxSvmgacE20AS");
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
          to_email: "w3bedy@proton.me",
        },
        "gWsWJHXt6sboKCdZ5"
      );
      setStatus("success");
      setFormData({ name: "", contact: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const { form } = contact;

  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      <div className="grid-line-v" style={{ left: "50%" }} />
      <div
        className="absolute right-16 top-0 font-display font-black text-parchment select-none pointer-events-none"
        style={{ fontSize: "30vw", opacity: 0.015, lineHeight: 1 }}
      >
        📩
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div ref={headRef} className="reveal mb-16">
          <div className="section-label mb-4">{contact.label}</div>
          <h2
            className="font-display font-black leading-none"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
          >
            {contact.title1}<br />
            <span className="italic text-parchment-dim">{contact.title2}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left */}
          <div>
            <span className="text-parchment-dim text-lg leading-relaxed mb-12 font-light">
              {contact.sub}
            </span>

            <div className="space-y-4 mt-8">
              {CONTACTS.map(({ icon: Icon, label, value, href }) => (
                <ContactCard
                  key={label}
                  icon={Icon}
                  label={label}
                  value={value}
                  href={href}
                />
              ))}
            </div>

            <div className="mt-10 p-5 border border-lime/20 bg-lime/5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-lime animate-pulse" />
                <span className="font-mono text-xs text-lime tracking-wider uppercase">
                  {contact.avail}
                </span>
              </div>
              <span className="text-parchment-dim text-sm">{contact.availSub}</span>
            </div>
          </div>

          {/* Form */}
          <div ref={formRef} className="reveal reveal-delay-2">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="font-mono text-xs text-muted tracking-widest uppercase block mb-2">
                  {form.name}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-ink-2 border border-border text-parchment px-4 py-3 font-body text-base focus:outline-none focus:border-lime/50 transition-colors placeholder:text-muted"
                  placeholder={form.namePlaceholder}
                  style={{ cursor: "none" }}
                />
              </div>

              <div>
                <label className="font-mono text-xs text-muted tracking-widest uppercase block mb-2">
                  {form.contact}
                </label>
                <input
                  type="text"
                  required
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full bg-ink-2 border border-border text-parchment px-4 py-3 font-body text-base focus:outline-none focus:border-lime/50 transition-colors placeholder:text-muted"
                  placeholder={form.contactPlaceholder}
                  style={{ cursor: "none" }}
                />
              </div>

              <div>
                <label className="font-mono text-xs text-muted tracking-widest uppercase block mb-4 space-y-1">
                  {form.messageLabels.map((l, i) => <span key={i} className="block">{l}</span>)}
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-ink-2 border border-border text-parchment px-4 py-3 font-body text-base focus:outline-none focus:border-lime/50 transition-colors resize-none placeholder:text-muted"
                  placeholder={form.messagePlaceholder}
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
                  <><div className="w-4 h-4 border-2 border-ink/30 border-t-ink rounded-full animate-spin" />{form.sending}</>
                ) : status === "success" ? (
                  <><Check size={16} /> {form.success}</>
                ) : (
                  <><Send size={16} /> {form.send}</>
                )}
              </button>

              {status === "error" && (
                <span className="font-mono text-xs text-red-400 text-center block">
                  {form.error}
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
