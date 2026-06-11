import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import mascotCat from "@/assets/mascot-cat.png";
import aic from "@/assets/aic.png";
import eca from "@/assets/ECA.png";
import hackerabad from "@/assets/Hackerabad.png";

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Skip animations on low-end / reduced-motion devices
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Headline lines stagger in from below
      gsap.from(".hero-line", {
        yPercent: 105,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
      });

      // Meta pills fade in
      gsap.from(".hero-meta", {
        opacity: 0,
        y: 16,
        duration: 0.7,
        stagger: 0.1,
        delay: 0.7,
        ease: "power2.out",
      });

      // Left content block
      gsap.from(".hero-content > *", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.9,
        ease: "power2.out",
      });

      // Right constellation fades in as a whole
      gsap.from(".hero-constellation", {
        opacity: 0,
        scale: 0.97,
        duration: 1.2,
        delay: 0.5,
        ease: "power3.out",
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={heroRef}
      className="min-h-[100dvh] pt-28 pb-16 px-6 md:px-12 lg:px-20 flex flex-col justify-center max-w-[1800px] mx-auto bg-[var(--paper)]"
    >
      {/* ── Main 2-column grid ── */}
      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-center w-full">

        {/* ══ LEFT COLUMN ══ */}
        <div className="flex flex-col">

          {/* Giant headline */}
          <h1 className="font-display font-black text-[var(--ink)] text-[clamp(72px,10vw,180px)] leading-[0.88] tracking-[-0.03em] uppercase mb-6">
            <div className="overflow-hidden"><span className="block hero-line">Local</span></div>
            <div className="overflow-hidden"><span className="block hero-line">Hack</span></div>
            <div className="overflow-hidden"><span className="block hero-line">Week</span></div>
          </h1>



          {/* Mascot + description row */}
          <div className="hero-content flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-center">
            {/* Mascot card */}
            <div className="flex-shrink-0 w-[160px] md:w-[200px] aspect-[3/4] rounded-[16px] bg-[var(--mint)] overflow-hidden relative border-2 border-[var(--ink)]">
              <img
                src={mascotCat}
                alt="Mascot"
                className="absolute bottom-0 w-full h-[105%] object-contain object-bottom p-4"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Description + CTA */}
            <div className="flex flex-col justify-center mt-6 md:mt-4 pt-2">
              <p className="text-[var(--ink)] text-base md:text-xl font-medium leading-relaxed mb-6 max-w-sm">
                A free, week-long creative sprint for developers, designers &amp; builders. Learn, ship, and connect.
              </p>
              <a
                href="#join"
                className="inline-flex items-center gap-2 bg-[var(--ink)] text-[var(--paper)] rounded-full px-7 h-12 font-bold text-sm uppercase tracking-wider hover:bg-[var(--sun)] hover:text-[var(--ink)] transition-colors w-fit shadow-md"
              >
                Count Me In <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* ══ RIGHT COLUMN — Partner Constellation ══ */}
        <div className="hero-constellation hidden lg:block relative h-[600px]">



          {/* AIC logo — top center */}
          <img
            src={aic}
            alt="AI Club"
            className="absolute -top-40 left-1/2 -translate-x-1/2 w-[300px] md:w-[500px] h-auto object-contain"
            style={{ opacity: 0.09, filter: "grayscale(1)" }}
            loading="lazy"
            decoding="async"
          />

          {/* ECA logo — bottom left */}
          <img
            src={eca}
            alt="ECA"
            className="absolute bottom-16 left-20 w-56 object-contain"
            style={{ opacity: 0.09, filter: "grayscale(1)" }}
            loading="lazy"
            decoding="async"
          />

          {/* Hackerabad logo — top right */}
          <img
            src={hackerabad}
            alt="Hackerabad"
            className="absolute top-32 right-8 w-40 object-contain"
            style={{ opacity: 0.09, filter: "grayscale(1)" }}
            loading="lazy"
            decoding="async"
          />

          {/* Central date composition */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center select-none">
              <p className="font-display font-black text-[var(--ink)] text-[clamp(80px,10vw,130px)] leading-none tracking-[-0.04em]">
                21–28
              </p>
              <p className="font-mono uppercase tracking-[0.28em] text-[var(--ink)] text-base md:text-lg opacity-60 mt-2">
                July 2026
              </p>
              <div className="mt-4 w-16 h-[3px] bg-[var(--ink)] mx-auto opacity-20" />
              <p className="font-mono uppercase tracking-[0.2em] text-[var(--ink)] text-xs mt-3 opacity-40">
                SNIST,Hyderabad, India
              </p>
            </div>
          </div>


        </div>

      </div>
    </section>
  );
}
