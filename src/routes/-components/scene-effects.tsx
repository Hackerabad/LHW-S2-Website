/* Reusable animated scene elements for the VectorHeart mascot experience */

export function FloatingShapes() {
  const shapes = [
    { emoji: "💜", x: "10%", y: "20%", dx: "30px", dy: "-80px", r: "25deg", dur: "7s", delay: "0s", size: "1.8rem" },
    { emoji: "✦", x: "80%", y: "30%", dx: "-40px", dy: "-100px", r: "-20deg", dur: "8s", delay: "1s", size: "1.4rem" },
    { emoji: "☁️", x: "25%", y: "60%", dx: "50px", dy: "-60px", r: "15deg", dur: "9s", delay: "2s", size: "2rem" },
    { emoji: "💛", x: "70%", y: "70%", dx: "-30px", dy: "-90px", r: "-30deg", dur: "6s", delay: "0.5s", size: "1.6rem" },
    { emoji: "★", x: "50%", y: "15%", dx: "20px", dy: "-110px", r: "40deg", dur: "7.5s", delay: "3s", size: "1.2rem" },
    { emoji: "♡", x: "90%", y: "50%", dx: "-60px", dy: "-70px", r: "20deg", dur: "8.5s", delay: "1.5s", size: "1.5rem" },
    { emoji: "✧", x: "15%", y: "80%", dx: "35px", dy: "-95px", r: "-15deg", dur: "6.5s", delay: "2.5s", size: "1.3rem" },
    { emoji: "☆", x: "60%", y: "45%", dx: "-25px", dy: "-85px", r: "35deg", dur: "7.2s", delay: "0.8s", size: "1.7rem" },
  ];
  return (
    <>
      {shapes.map((s, i) => (
        <span
          key={i}
          className="floating-shape"
          style={{
            left: s.x, top: s.y,
            "--drift-x": s.dx, "--drift-y": s.dy, "--drift-r": s.r,
            "--dur": s.dur, "--delay": s.delay, "--size": s.size,
          } as React.CSSProperties}
        >
          {s.emoji}
        </span>
      ))}
    </>
  );
}

export function Sparkles({ count = 12, color = "gold" }: { count?: number; color?: string }) {
  const bg = color === "cyan" ? "oklch(0.85 0.18 210)" : color === "rose" ? "oklch(0.80 0.16 320)" : "oklch(0.95 0.10 90)";
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="sparkle"
          style={{
            left: `${8 + Math.random() * 84}%`,
            top: `${8 + Math.random() * 84}%`,
            "--sparkle-dur": `${1.5 + Math.random() * 2}s`,
            "--sparkle-delay": `${Math.random() * 3}s`,
            background: bg,
            width: `${4 + Math.random() * 6}px`,
            height: `${4 + Math.random() * 6}px`,
          } as React.CSSProperties}
        />
      ))}
    </>
  );
}

export function PetalRain({ count = 20 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="petal-dense"
          style={{
            left: `${Math.random() * 100}%`,
            "--petal-dx": `${-30 + Math.random() * 60}px`,
            "--petal-r": `${180 + Math.random() * 360}deg`,
            "--petal-dur": `${6 + Math.random() * 6}s`,
            "--petal-delay": `${Math.random() * 8}s`,
          } as React.CSSProperties}
        />
      ))}
    </>
  );
}

export function AmbientBlobs({ scene }: { scene: "hero" | "fusion" | "emotional" | "finale" }) {
  const configs = {
    hero: [
      { bg: "oklch(0.78 0.20 210 / 0.3)", w: 300, h: 300, x: "10%", y: "20%", dur: "7s" },
      { bg: "oklch(0.82 0.16 90 / 0.25)", w: 250, h: 250, x: "70%", y: "60%", dur: "9s" },
    ],
    fusion: [
      { bg: "oklch(0.78 0.20 210 / 0.4)", w: 400, h: 400, x: "30%", y: "30%", dur: "5s" },
      { bg: "oklch(0.82 0.16 90 / 0.35)", w: 350, h: 350, x: "60%", y: "50%", dur: "6s" },
      { bg: "oklch(0.72 0.22 320 / 0.3)", w: 280, h: 280, x: "50%", y: "20%", dur: "7s" },
    ],
    emotional: [
      { bg: "oklch(0.82 0.14 350 / 0.25)", w: 350, h: 350, x: "20%", y: "40%", dur: "8s" },
      { bg: "oklch(0.88 0.10 30 / 0.2)", w: 300, h: 300, x: "75%", y: "30%", dur: "10s" },
    ],
    finale: [
      { bg: "oklch(0.78 0.20 210 / 0.35)", w: 400, h: 400, x: "15%", y: "25%", dur: "6s" },
      { bg: "oklch(0.82 0.16 90 / 0.3)", w: 350, h: 350, x: "75%", y: "45%", dur: "8s" },
      { bg: "oklch(0.72 0.22 320 / 0.3)", w: 300, h: 300, x: "45%", y: "70%", dur: "7s" },
    ],
  };
  return (
    <>
      {configs[scene].map((b, i) => (
        <div
          key={i}
          className="ambient-blob"
          style={{
            background: b.bg, width: b.w, height: b.h,
            left: b.x, top: b.y,
            "--pulse-dur": b.dur, "--pulse-delay": `${i * 1.5}s`,
          } as React.CSSProperties}
        />
      ))}
    </>
  );
}

export function RippleRings() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="ripple-ring" />
      <div className="ripple-ring" />
      <div className="ripple-ring" />
    </div>
  );
}

export function SpeedLinesOverlay({ className = "" }: { className?: string }) {
  return <div className={`speed-lines ${className}`} />;
}

export function LightBurstEffect({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 flex items-center justify-center pointer-events-none ${className}`}>
      <div className="light-burst" />
    </div>
  );
}

export function PortalSwirl() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="portal-ring" />
      <div className="portal-ring inner" />
    </div>
  );
}
