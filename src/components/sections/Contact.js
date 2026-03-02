"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var browser_1 = require("@emailjs/browser");
var framer_motion_1 = require("framer-motion");
var lucide_react_1 = require("lucide-react");
var useScrollReveal_1 = require("@/hooks/useScrollReveal");
var CONTACTS = [
    {
        icon: lucide_react_1.Mail,
        label: "Email",
        value: "w3bedy@proton.me",
        href: "mailto:w3bedy@proton.me?subject=Щодо%20створення%20сайту&body=Привіт,%20Андрій,%0A%0A",
    },
    {
        icon: lucide_react_1.MessageCircle,
        label: "Telegram",
        value: "@detguy",
        href: "https://t.me/detguy",
    },
    {
        icon: lucide_react_1.PhoneCallIcon,
        label: "Phone",
        value: "+38097094209",
        href: "tel:+38097094209",
    }
];
var ContactSection = (0, react_1.memo)(function () {
    var headRef = (0, useScrollReveal_1.useScrollReveal)();
    var formRef = (0, useScrollReveal_1.useScrollReveal)();
    var _a = (0, react_1.useState)({ name: "", contact: "", message: "" }), formData = _a[0], setFormData = _a[1];
    var _b = (0, react_1.useState)("idle"), status = _b[0], setStatus = _b[1];
    (0, react_1.useEffect)(function () {
        browser_1.default.init("UaH2NxSvmgacE20AS"); // ТВІЙ Public Key
    }, []);
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    e.preventDefault();
                    if (status === "sending")
                        return [2 /*return*/];
                    setStatus("sending");
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, browser_1.default.send("service_n4ne0up", "template_tmzr5fc", {
                            from_name: formData.name,
                            from_email: formData.contact,
                            message: formData.message,
                            to_email: "w3bedy@proton.me"
                        }, "gWsWJHXt6sboKCdZ5" // ← ЗАМІНИ
                        )];
                case 2:
                    _b.sent();
                    setStatus("success");
                    setFormData({ name: "", contact: "", message: "" });
                    setTimeout(function () { return setStatus("idle"); }, 5000);
                    return [3 /*break*/, 4];
                case 3:
                    _a = _b.sent();
                    setStatus("error");
                    setTimeout(function () { return setStatus("idle"); }, 4000);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (<section id="contact" className="py-28 relative overflow-hidden">
      <div className="grid-line-v" style={{ left: "50%" }}/>

      {/* BG number */}
       <div className="absolute right-16 top-0 font-display font-black text-parchment select-none pointer-events-none" style={{ fontSize: "30vw", opacity: 0.015, lineHeight: 1, transform: "translateX(20%), " }}>
        📩
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={headRef} className="reveal mb-16">
          <div className="section-label mb-4">Контакт</div>
          <h2 className="font-display font-black leading-none" style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}>
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
              {CONTACTS.map(function (_a) {
            var Icon = _a.icon, label = _a.label, value = _a.value, href = _a.href;
            return (<framer_motion_1.motion.a key={label} href={href} target="_blank" rel="noopener noreferrer" whileHover={{ x: 6 }} className="flex items-center gap-4 p-5 border border-border hover:border-lime/30 transition-colors duration-300 group" style={{ cursor: "none", textDecoration: "none" }}>
                  <div className="w-10 h-10 border border-border flex items-center justify-center flex-shrink-0 group-hover:border-lime/50 group-hover:text-lime transition-colors">
                    <Icon size={18} className="text-muted group-hover:text-lime transition-colors"/>
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
                </framer_motion_1.motion.a>);
        })}
            </div>

            {/* Availability */}
            <div className="mt-10 p-5 border border-lime/20 bg-lime/5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-lime animate-pulse"/>
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
                <input type="text" required value={formData.name} onChange={function (e) { return setFormData(__assign(__assign({}, formData), { name: e.target.value })); }} className="w-full bg-ink-2 border border-border text-parchment px-4 py-3 font-body text-base focus:outline-none focus:border-lime/50 transition-colors placeholder:text-muted" placeholder="Колега Браткович" style={{ cursor: "none" }}/>
              </div>

              <div>
                <label className="font-mono text-xs text-muted tracking-widest uppercase block mb-2">
                  Email або Telegram *
                </label>
                <input type="text" required value={formData.contact} onChange={function (e) { return setFormData(__assign(__assign({}, formData), { contact: e.target.value })); }} className="w-full bg-ink-2 border border-border text-parchment px-4 py-3 font-body text-base focus:outline-none focus:border-lime/50 transition-colors placeholder:text-muted" placeholder="hello@company.com або @telegram" style={{ cursor: "none" }}/>
              </div>

              <div>
                <label className="font-mono text-xs text-muted tracking-widest uppercase block mb-4 space-y-1">
                  <span>Розкажіть про проєкт *</span>
                  <span>Чи опишіть свою ідею *</span>
                  <span>Або просто щось, що подумали *</span>
                  <span>Чи знаєте конкретно, що потрібно ? *</span>
                  <span>Напишіть хоч щось, мені буде приємно *</span>
                </label>
                <textarea required rows={5} value={formData.message} onChange={function (e) { return setFormData(__assign(__assign({}, formData), { message: e.target.value })); }} className=" w-full bg-ink-2 border border-border text-parchment px-4 py-3 font-body text-base focus:outline-none focus:border-lime/50 transition-colors resize-none placeholder:text-muted" placeholder="Опишіть що потрібно, строки, бюджет..." style={{ cursor: "none" }}/>
              </div>

              <button type="submit" disabled={status === "sending"} className="btn-lime w-full justify-center disabled:opacity-60" style={{ cursor: "none" }}>
                {status === "sending" ? (<>
                    <div className="w-4 h-4 border-2 border-ink/30 border-t-ink rounded-full animate-spin"/>
                    Відправка...
                  </>) : status === "success" ? (<>
                    <lucide_react_1.Check size={16}/> Відправлено!
                  </>) : (<>
                    <lucide_react_1.Send size={16}/> Надіслати
                  </>)}
              </button>

              {status === "error" && (<span className="font-mono text-xs text-red-400 text-center">
                  Помилка відправки. Напишіть напряму на email.
                </span>)}
            </form>
          </div>
        </div>
      </div>
    </section>);
});
ContactSection.displayName = "ContactSection";
exports.default = ContactSection;
