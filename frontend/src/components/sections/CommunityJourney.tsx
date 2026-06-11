import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import mascotCat from "@/assets/mascot-cat.png";
import mascotAi from "@/assets/mascot-ai.png";
import mascotShark from "@/assets/mascot-shark.png";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    mascot: mascotCat,
    alt: "Cat — Explorer",
    accent: "#FFB3EC",
    label: "Explore",
    stage: "STAGE 1",
    description:
      "Show up. Pick a track. Attend your first session. Let curiosity be your guide.",
    imageSize: "w-[220px] md:w-[260px]",
    offset: "md:translate-y-8",
  },
  {
    mascot: mascotAi,
    alt: "Robot — Builder",
    accent: "#FFC900",
    label: "Build",
    stage: "STAGE 2",
    description:
      "Start building. Collaborate with teammates. Ship something real by Day 6.",
    imageSize: "w-[300px] md:w-[380px]",
    offset: "",
    featured: true,
  },
  {
    mascot: mascotShark,
    alt: "Shark — Leader",
    accent: "#8DEFFF",
    label: "Lead",
    stage: "STAGE 3",
    description:
      "Return as a mentor. Speak. Inspire. Champion the next generation of hackers.",
    imageSize: "w-[220px] md:w-[260px]",
    offset: "md:translate-y-8",
  },
];

export function CommunityJourney() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".journey-card");

      gsap.from(".journey-header > *", {
        y: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      cards.forEach((card, index) => {
        gsap.from(card as Element, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          delay: index * 0.15,
          ease: "back.out(1.3)",
          scrollTrigger: {
            trigger: card as Element,
            start: "top 85%",
          },
        });
      });

      gsap.utils.toArray(".timeline-segment").forEach((segment: any) => {
        gsap.from(segment, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".journey-grid",
            start: "top 75%",
          },
        });
      });

      gsap.utils.toArray(".mascot").forEach((mascot: any, index) => {
        gsap.to(mascot, {
          y: index === 1 ? -16 : -10,
          duration: index === 1 ? 2.2 : 2.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="bg-[var(--paper)] border-b-4 border-black py-28 overflow-hidden text-black"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="journey-header text-center mb-24">
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 border-[3px] border-black bg-[var(--paper)] px-4 py-2 text-xs font-black tracking-widest uppercase shadow-[3px_3px_0px_#000]">
              YOUR JOURNEY
            </span>
          </div>

          <h2 className="font-display font-black tracking-[-0.06em] leading-[0.9] text-[clamp(3.5rem,8vw,7rem)]">
            <div>Discover.</div>
            <div className="text-[#FFC900]">Build.</div>
            <div>Lead.</div>
          </h2>

          <p className="max-w-xl mx-auto mt-8 text-lg font-medium text-neutral-700 leading-relaxed">
            Start curious. Leave as a builder.
            <br />
            Six days. Three stages. One community.
          </p>
        </div>

        {/* Journey */}
        <div className="journey-grid grid md:grid-cols-3 gap-16 items-start">

          {steps.map((step, index) => (
            <div
              key={step.label}
              className={`journey-card flex flex-col items-center text-center ${step.offset}`}
            >
              {/* Mascot */}
              <img
                src={step.mascot}
                alt={step.alt}
                className={`
                  mascot
                  ${step.imageSize}
                  h-auto
                  object-contain
                  select-none
                  pointer-events-none
                  transition-transform
                  duration-500
                `}
              />

              {/* Timeline Row */}
              <div className="relative w-full flex items-center justify-center my-8">

                {/* Left Line */}
                {index > 0 && (
                  <div className="timeline-segment hidden md:block absolute left-0 right-1/2 h-[4px] bg-black" />
                )}

                {/* Right Line */}
                {index < steps.length - 1 && (
                  <div className="timeline-segment hidden md:block absolute left-1/2 right-0 h-[4px] bg-black" />
                )}

                {/* Node */}
                <div
                  className="relative z-10 w-8 h-8 rounded-full border-4 border-black"
                  style={{ backgroundColor: step.accent }}
                />
              </div>

              {/* Stage */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-3 h-3 rounded-full border-2 border-black"
                  style={{ backgroundColor: step.accent }}
                />

                <span className="text-xs uppercase tracking-[0.3em] font-bold text-neutral-500">
                  {step.stage}
                </span>
              </div>

              {/* Title */}
              <h3
                className={`
                  font-display
                  font-black
                  tracking-[-0.04em]
                  mb-4
                  ${step.featured
                    ? "text-5xl"
                    : "text-4xl"
                  }
                `}
              >
                {step.label}
              </h3>

              {/* Description */}
              <p className="max-w-[280px] text-neutral-700 leading-relaxed font-medium">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-28 flex justify-center">
          <a
            href="#join"
            className="
              bg-[#FFC900]
              border-4
              border-black
              px-10
              py-5
              text-lg
              font-display
              uppercase
              tracking-[0.15em]
              shadow-[6px_6px_0px_#000]
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-[10px_10px_0px_#000]
            "
          >
            Start Your Journey
          </a>
        </div>

      </div>
    </section>
  );
}