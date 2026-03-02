"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useScrollReveal = useScrollReveal;
var react_1 = require("react");
function useScrollReveal() {
    var ref = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        var el = ref.current;
        if (!el)
            return;
        var io = new IntersectionObserver(function (_a) {
            var entry = _a[0];
            if (entry.isIntersecting) {
                el.dataset.visible = "true";
                io.unobserve(el);
            }
        }, { threshold: 0.12 });
        io.observe(el);
        return function () { return io.disconnect(); };
    }, []);
    return ref;
}
