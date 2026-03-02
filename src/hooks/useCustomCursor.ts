import { useEffect, useRef } from "react";

export function useCustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Create elements
    const dot = document.createElement("div");
    dot.id = "cursor-dot";
    dot.style.cssText = `
      position:fixed;pointer-events:none;z-index:9999;
      width:6px;height:6px;border-radius:50%;
      background:#C8F135;transform:translate(-50%,-50%);
      transition:transform 0.1s,background 0.2s;top:0;left:0;
    `;
    const ring = document.createElement("div");
    ring.id = "cursor-ring";
    ring.style.cssText = `
      position:fixed;pointer-events:none;z-index:9998;
      width:36px;height:36px;border-radius:50%;
      border:1px solid rgba(200,241,53,0.4);
      transform:translate(-50%,-50%);top:0;left:0;
      transition:width 0.2s,height 0.2s,border-color 0.2s,transform 0.08s;
    `;
    document.body.appendChild(dot);
    document.body.appendChild(ring);
    dotRef.current = dot;
    ringRef.current = ring;

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      dot.style.left = e.clientX + "px";
      dot.style.top = e.clientY + "px";
    };

    const onEnterLink = () => {
      if (ringRef.current) {
        ringRef.current.style.width = "56px";
        ringRef.current.style.height = "56px";
        ringRef.current.style.borderColor = "rgba(200,241,53,0.7)";
      }
      if (dotRef.current) dotRef.current.style.transform = "translate(-50%,-50%) scale(0)";
    };
    const onEnterDark = () => {
      if (dotRef.current) dotRef.current.style.background = '#000';
      if (ringRef.current) {
        ringRef.current.style.borderColor = "rgba(0,0,0,0.6)";
        ringRef.current.style.width = "44px";
        ringRef.current.style.height = "44px";
      }
    };
    const onLeaveLink = () => {
      if (ringRef.current) {
        ringRef.current.style.width = "36px";
        ringRef.current.style.height = "36px";
        ringRef.current.style.borderColor = "rgba(200,241,53,0.4)";
      }
      if (dotRef.current) dotRef.current.style.transform = "translate(-50%,-50%) scale(1)";
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const animate = () => {
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
    document.querySelectorAll("a,button,[data-cursor-hover]").forEach((el) => {
      el.addEventListener("mouseenter", onEnterLink);
      el.addEventListener("mouseleave", onLeaveLink);
    });

    // Hide default cursor
    document.body.style.cursor = "none";

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
      dot.remove();
      ring.remove();
      document.body.style.cursor = "";
      
    };
  }, []);
}
