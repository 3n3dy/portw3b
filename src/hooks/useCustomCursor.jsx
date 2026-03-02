"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCustomCursor = useCustomCursor;
var react_1 = require("react");
function useCustomCursor() {
    var dotRef = (0, react_1.useRef)(null);
    var ringRef = (0, react_1.useRef)(null);
    var posRef = (0, react_1.useRef)({ x: 0, y: 0 });
    var ringPos = (0, react_1.useRef)({ x: 0, y: 0 });
    var rafRef = (0, react_1.useRef)(0);
    (0, react_1.useEffect)(function () {
        // Create elements
        var dot = document.createElement("div");
        dot.id = "cursor-dot";
        dot.style.cssText = "\n      position:fixed;pointer-events:none;z-index:9999;\n      width:6px;height:6px;border-radius:50%;\n      background:#C8F135;transform:translate(-50%,-50%);\n      transition:transform 0.1s,background 0.2s;top:0;left:0;\n    ";
        var ring = document.createElement("div");
        ring.id = "cursor-ring";
        ring.style.cssText = "\n      position:fixed;pointer-events:none;z-index:9998;\n      width:36px;height:36px;border-radius:50%;\n      border:1px solid rgba(200,241,53,0.4);\n      transform:translate(-50%,-50%);top:0;left:0;\n      transition:width 0.2s,height 0.2s,border-color 0.2s,transform 0.08s;\n    ";
        document.body.appendChild(dot);
        document.body.appendChild(ring);
        dotRef.current = dot;
        ringRef.current = ring;
        var onMove = function (e) {
            posRef.current = { x: e.clientX, y: e.clientY };
            dot.style.left = e.clientX + "px";
            dot.style.top = e.clientY + "px";
        };
        var onEnterLink = function () {
            if (ringRef.current) {
                ringRef.current.style.width = "56px";
                ringRef.current.style.height = "56px";
                ringRef.current.style.borderColor = "rgba(200,241,53,0.7)";
            }
            if (dotRef.current)
                dotRef.current.style.transform = "translate(-50%,-50%) scale(0)";
        };
        var onLeaveLink = function () {
            if (ringRef.current) {
                ringRef.current.style.width = "36px";
                ringRef.current.style.height = "36px";
                ringRef.current.style.borderColor = "rgba(200,241,53,0.4)";
            }
            if (dotRef.current)
                dotRef.current.style.transform = "translate(-50%,-50%) scale(1)";
        };
        var lerp = function (a, b, t) { return a + (b - a) * t; };
        var animate = function () {
            ringPos.current.x = lerp(ringPos.current.x, posRef.current.x, 0.12);
            ringPos.current.y = lerp(ringPos.current.y, posRef.current.y, 0.12);
            if (ringRef.current) {
                ringRef.current.style.left = ringPos.current.x + "px";
                ringRef.current.style.top = ringPos.current.y + "px";
            }
            rafRef.current = requestAnimationFrame(animate);
        };
        rafRef.current = requestAnimationFrame(animate);
        document.addEventListener("mousemove", onMove);
        document.querySelectorAll("a,button,[data-cursor-hover]").forEach(function (el) {
            el.addEventListener("mouseenter", onEnterLink);
            el.addEventListener("mouseleave", onLeaveLink);
        });
        // Hide default cursor
        document.body.style.cursor = "none";
        return function () {
            document.removeEventListener("mousemove", onMove);
            cancelAnimationFrame(rafRef.current);
            dot.remove();
            ring.remove();
            document.body.style.cursor = "";
        };
    }, []);
}
