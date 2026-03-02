"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeBreakerGame = void 0;
var react_1 = require("react");
var framer_motion_1 = require("framer-motion");
var lucide_react_1 = require("lucide-react");
var ENCRYPTED_CHARS = "█▓▒░@#$%&*+=?";
var DECRYPTED_TEXT = [
    "DECRYPTING SALARY EXPECTATIONS...",
    "",
    "╔══════════════════════════════════════╗",
    "║  HOURLY RATE: $20-80 USD/hour      ║",
    "║  PROJECT BUDGET: $200-8000+ USD   ║",
    "║  AVAILABILITY: March-April 2026    ║",
    "╚══════════════════════════════════════╝",
    "",
    "STATUS: UNLOCKED ✓",
];
var MatrixRain = (0, react_1.memo)(function () {
    var canvasRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        var canvas = canvasRef.current;
        if (!canvas)
            return;
        var ctx = canvas.getContext("2d");
        if (!ctx)
            return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        var columns = Math.floor(canvas.width / 20);
        var drops = Array(columns).fill(1);
        var chars = "АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ0123456789";
        var draw = function () {
            ctx.fillStyle = "rgba(8, 12, 16, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#C8F135";
            ctx.font = "15px monospace";
            for (var i = 0; i < drops.length; i++) {
                var text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * 20, drops[i] * 20);
                if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };
        var interval = setInterval(draw, 33);
        return function () { return clearInterval(interval); };
    }, []);
    return (<canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-20"/>);
});
MatrixRain.displayName = "MatrixRain";
var TerminalLine = (0, react_1.memo)(function (_a) {
    var text = _a.text, _b = _a.delay, delay = _b === void 0 ? 0 : _b;
    var _c = (0, react_1.useState)(false), visible = _c[0], setVisible = _c[1];
    (0, react_1.useEffect)(function () {
        var timer = setTimeout(function () { return setVisible(true); }, delay);
        return function () { return clearTimeout(timer); };
    }, [delay]);
    if (!visible)
        return null;
    return (<framer_motion_1.motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="font-mono text-sm text-lime leading-relaxed">
        {text}
      </framer_motion_1.motion.div>);
});
TerminalLine.displayName = "TerminalLine";
exports.CodeBreakerGame = (0, react_1.memo)(function (_a) {
    var show = _a.show, onClose = _a.onClose;
    if (!show)
        return null;
    var _b = (0, react_1.useState)("locked"), stage = _b[0], setStage = _b[1];
    var _c = (0, react_1.useState)(""), command = _c[0], setCommand = _c[1];
    var _d = (0, react_1.useState)(""), encryptedText = _d[0], setEncryptedText = _d[1];
    var _e = (0, react_1.useState)(0), progress = _e[0], setProgress = _e[1];
    var inputRef = (0, react_1.useRef)(null);
    // Generate random encrypted text
    (0, react_1.useEffect)(function () {
        if (stage === "cracking") {
            var encrypted = "";
            for (var i = 0; i < 400; i++) {
                encrypted +=
                    ENCRYPTED_CHARS[Math.floor(Math.random() * ENCRYPTED_CHARS.length)];
                if ((i + 1) % 40 === 0)
                    encrypted += "\n";
            }
            setEncryptedText(encrypted);
        }
    }, [stage]);
    // Auto-progress cracking
    (0, react_1.useEffect)(function () {
        if (stage === "cracking") {
            var interval_1 = setInterval(function () {
                setProgress(function (prev) {
                    if (prev >= 100) {
                        clearInterval(interval_1);
                        setTimeout(function () { return setStage("decrypted"); }, 500);
                        return 100;
                    }
                    return prev + 2;
                });
            }, 50);
            return function () { return clearInterval(interval_1); };
        }
    }, [stage]);
    // Focus input when opened
    (0, react_1.useEffect)(function () {
        if (show && stage === "locked") {
            setTimeout(function () { var _a; return (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus(); }, 100);
        }
    }, [show, stage]);
    var handleCommand = function (e) {
        e.preventDefault();
        var cmd = command.toLowerCase().trim();
        if (cmd === "decrypt salary" ||
            cmd === "hack" ||
            cmd === "unlock" ||
            cmd === "decrypt") {
            setStage("cracking");
            setCommand("");
        }
        else if (cmd === "help") {
            alert('Підказка: спробуй команду "decrypt salary" або просто "hack"');
            setCommand("");
        }
        else {
            setCommand("");
            // Easter egg
            if (cmd === "whoami") {
                alert("You are: Future Colleague 😎");
            }
        }
    };
    return (<framer_motion_1.AnimatePresence>
      {/* Backdrop */}
      <framer_motion_1.motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={stage === "locked" ? onClose : undefined}>
            <MatrixRain />

            {/* Terminal Window */}
            <framer_motion_1.motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-3xl bg-ink border-2 border-lime/30 shadow-2xl" onClick={function (e) { return e.stopPropagation(); }} style={{ boxShadow: "0 0 60px rgba(200, 241, 53, 0.2)" }}>
              {/* Terminal Header */}
              <div className="bg-ink-3 border-b border-lime/20 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/60"/>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60"/>
                    <div className="w-3 h-3 rounded-full bg-lime/60"/>
                  </div>
                  <lucide_react_1.Terminal size={16} className="text-lime"/>
                  <span className="font-mono text-xs text-lime">
                    terminal@w3bedy ~ {stage === "decrypted" ? "UNLOCKED" : "LOCKED"}
                  </span>
                </div>
                <button onClick={onClose} className="text-muted hover:text-lime transition-colors" style={{ cursor: "none" }}>
                  ✕
                </button>
              </div>

              {/* Terminal Body */}
              <div className="p-6 min-h-[400px] max-h-[70vh] overflow-y-auto terminal-scroll">
                {/* LOCKED STAGE */}
                {stage === "locked" && (<div className="space-y-4">
                    <div className="flex items-center gap-3 mb-6">
                      <lucide_react_1.Lock size={24} className="text-lime animate-pulse"/>
                      <div className="font-mono text-lime text-lg">
                        SALARY DATA ENCRYPTED
                      </div>
                    </div>

                    <div className="font-mono text-xs text-parchment-dim space-y-1 mb-6">
                      <div>System: Ubuntu 24.04 LTS</div>
                      <div>User: guest@w3bedy</div>
                      <div>Access Level: RESTRICTED</div>
                      <div className="text-lime mt-2">
                        → Type command to decrypt salary information
                      </div>
                    </div>

                    <div className="bg-ink-3 border border-lime/10 p-4 font-mono text-xs text-muted">
                      <div className="text-lime mb-2">Available commands:</div>
                      <div>• decrypt salary - Розшифрувати дані про ставку</div>
                      <div>• hack - Швидкий злом системи</div>
                      <div>• help - Показати підказку</div>
                      <div className="text-parchment-dim mt-2 italic">
                        Або просто клікни по екрану 5 разів...
                      </div>
                    </div>

                    <form onSubmit={handleCommand} className="flex items-center gap-2 mt-6">
                      <span className="font-mono text-lime">guest@w3bedy:~$</span>
                      <input ref={inputRef} type="text" value={command} onChange={function (e) { return setCommand(e.target.value); }} className="flex-1 bg-transparent border-none outline-none font-mono text-parchment caret-lime" placeholder="decrypt salary" autoComplete="off" style={{ cursor: "none" }}/>
                    </form>

                    {/* Alternative: Click to crack */}
                    <button onClick={function () { return setStage("cracking"); }} className="mt-8 btn-outline w-full justify-center" style={{ cursor: "none" }}>
                      🔓 Зламати систему (клік)
                    </button>
                  </div>)}

                {/* CRACKING STAGE */}
                {stage === "cracking" && (<div className="space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-6 h-6 border-2 border-lime border-t-transparent rounded-full animate-spin"/>
                      <div className="font-mono text-lime">
                        CRACKING ENCRYPTION...
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="relative h-6 bg-ink-3 border border-lime/20 overflow-hidden">
                      <framer_motion_1.motion.div className="absolute inset-y-0 left-0 bg-lime/20 border-r-2 border-lime" initial={{ width: 0 }} animate={{ width: "".concat(progress, "%") }}/>
                      <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-lime">
                        {progress}%
                      </div>
                    </div>

                    {/* Encrypted text matrix */}
                    <div className="bg-ink-3 border border-lime/10 p-4 font-mono text-xs text-lime/40 leading-tight overflow-hidden max-h-60">
                      {encryptedText}
                    </div>

                    <div className="font-mono text-xs text-muted space-y-1">
                      <div className="text-lime">→ Brute forcing AES-256...</div>
                      <div>→ Analyzing hash patterns...</div>
                      <div>→ Bypassing firewall...</div>
                      <div className="text-lime animate-pulse">
                        → ACCESS GRANTED
                      </div>
                    </div>
                  </div>)}

                {/* DECRYPTED STAGE */}
                {stage === "decrypted" && (<div className="space-y-4">
                    <div className="flex items-center gap-3 mb-6">
                      <lucide_react_1.Unlock size={24} className="text-lime"/>
                      <div className="font-mono text-lime text-lg">
                        DECRYPTION COMPLETE
                      </div>
                    </div>

                    {/* Decrypted data */}
                    <div className="bg-ink-3 border-2 border-lime p-6 space-y-2">
                      {DECRYPTED_TEXT.map(function (line, i) { return (<TerminalLine key={i} text={line} delay={i * 100}/>); })}
                    </div>

                    {/* Additional info */}
                    <framer_motion_1.motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="bg-lime/5 border border-lime/20 p-4">
                      <div className="flex items-start gap-3">
                        <lucide_react_1.DollarSign size={20} className="text-lime flex-shrink-0 mt-1"/>
                        <div className="text-sm text-parchment-dim">
                          <strong className="text-lime">Що входить:</strong> Весь цикл розробки
                          (дизайн, код, тести, деплой), технічна підтримка 30 днів,
                          адаптив під всі пристрої.
                        </div>
                      </div>
                    </framer_motion_1.motion.div>

                    {/* Action buttons */}
                    <framer_motion_1.motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="flex gap-4 mt-6 flex-wrap">
                      <a href="https://t.me/detguy" target="_blank" rel="noopener noreferrer" className="btn-lime flex-1 inline-flex items-center justify-center gap-2" style={{ cursor: "none", textDecoration: "none" }}>
                        <lucide_react_1.Send size={16}/> {/* або MessageCircle */}
                        Написати в Telegram
                      </a>
                      <button onClick={function () {
                var _a;
                onClose();
                (_a = document
                    .querySelector("#contact")) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
            }} className="btn-outline flex-1" style={{ cursor: "none" }}>
                        Обговорити проєкт →
                      </button>
                    </framer_motion_1.motion.div>

                    {/* Fun fact */}
                    <framer_motion_1.motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="border-t border-border pt-4 mt-4">
                      <div className="font-mono text-xs text-muted mb-2 uppercase">
                        🎮 Achievement Unlocked
                      </div>
                      <div className="text-sm text-parchment-dim">
                        <em>"Code Breaker"</em> — Ти успішно зламав систему і дістав
                        секретну інфу. Respect за цікавість! 🔥
                      </div>
                    </framer_motion_1.motion.div>
                  </div>)}
              </div>
            </framer_motion_1.motion.div>
      </framer_motion_1.motion.div>
    </framer_motion_1.AnimatePresence>);
});
exports.CodeBreakerGame.displayName = "CodeBreakerGame";
