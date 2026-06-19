"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      rafId = requestAnimationFrame(animateRing);
    };

    const onMouseEnterLink = () => {
      dot.style.width = "12px";
      dot.style.height = "12px";
      ring.style.width = "60px";
      ring.style.height = "60px";
      ring.style.borderColor = "rgba(59, 130, 246, 0.8)";
    };

    const onMouseLeaveLink = () => {
      dot.style.width = "8px";
      dot.style.height = "8px";
      ring.style.width = "40px";
      ring.style.height = "40px";
      ring.style.borderColor = "rgba(56, 189, 248, 0.6)";
    };

    window.addEventListener("mousemove", onMouseMove);
    rafId = requestAnimationFrame(animateRing);

    const links = document.querySelectorAll("a, button, [data-cursor='pointer']");
    links.forEach(link => {
      link.addEventListener("mouseenter", onMouseEnterLink);
      link.addEventListener("mouseleave", onMouseLeaveLink);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
