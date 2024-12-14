"use client";

import { CSSProperties, useEffect, useRef } from "react";
import { themeShades } from "@/lib/constants";
import { random } from "@/lib/utils";

export function BalloonAnimation() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  function getRandomStyles(): CSSProperties {
    const marginTop = random(0, 200);
    const marginLeft = random(0, 50);
    const duration = random(1, 23) + 9;

    const bgShadeIndex: number = random(3, 6);
    const shadowShadeIndex: number = bgShadeIndex + 1;

    return {
      backgroundColor: `var(--primary-${themeShades[bgShadeIndex]})`,
      boxShadow: `inset -7px -3px 10px var(--primary-${themeShades[shadowShadeIndex]})`,
      margin: `${marginTop}px 0 0 ${marginLeft}px`,
      animation: `float ${duration}s ease-in-out infinite`,
    } as CSSProperties;
  }

  useEffect(() => {
    for (let i = 0; i < window.innerWidth / 90; i++) {
      const balloon = document.createElement("div");
      balloon.className = "balloon";
      Object.assign(balloon.style, getRandomStyles());
      containerRef.current?.appendChild(balloon);
    }
  }, []);

  return <div className="flex h-screen flex-wrap overflow-hidden" ref={containerRef} />;
}
