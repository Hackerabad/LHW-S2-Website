import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ExternalLink } from "lucide-react";
import mascotShark from "@/assets/mascot-shark.png";

gsap.registerPlugin(ScrollTrigger);


export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (!prefersReduced) {
        gsap.from(".cta-eyebrow", {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        });

        gsap.from(".cta-title", {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        });

        gsap.from(".cta-actions", {
          y: 30,
          opacity: 0,
          delay: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        });

        gsap.from(".cta-shark", {
          scale: 0.8,
          opacity: 0,
          rotate: -8,
          duration: 1,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        });

        gsap.from(".cta-stat", {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.6,
          scrollTrigger: {
            trigger: ".cta-stats",
            start: "top 90%",
          },
        });
      }

      // Infinite float — pause when section is off-screen to save CPU
      if (!prefersReduced) {
        const floatTween = gsap.to(".cta-shark", {
          y: -15,
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          paused: true,
        });

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) floatTween.play();
            else floatTween.pause();
          },
          { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);

        return () => {
          observer.disconnect();
          floatTween.kill();
        };
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="join"
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        bg-[var(--ink)]
        text-[var(--paper)]
        border-b-[3px]
        border-[var(--ink)]
      "
    >
      <div className="max-w-7xl mx-auto px-6 py-28 md:py-36">

        <div className="grid md:grid-cols-12 gap-10 items-center">

          {/* Content */}
          <div className="md:col-span-7">

            <div className="cta-eyebrow mb-8">
              <span
                className="
                  font-mono
                  text-xs
                  uppercase
                  tracking-[0.35em]
                  text-[var(--sun)]
                "
              >
                SEASON 2 IS LIVE
              </span>
            </div>

            <h2
              className="
                cta-title
                font-display
                text-[clamp(4rem,10vw,9rem)]
                leading-[0.85]
                tracking-[-0.06em]
                mb-8
              "
            >
              READY
              <br />
              TO BUILD?
            </h2>

            <p className="max-w-lg text-lg md:text-xl opacity-75 mb-10">
              Six days of workshops, projects, collaboration,
              and late-night ideas becoming real things.
            </p>

            <div className="cta-actions flex flex-wrap gap-4">

              <a
                href="#"
                className="
                  bg-[var(--sun)]
                  text-black
                  border-[3px]
                  border-[var(--sun)]
                  px-8
                  py-4
                  font-display
                  uppercase
                  flex
                  items-center
                  gap-2
                  transition-all
                  hover:-translate-y-1
                "
              >
                Register Free
                <ArrowRight size={18} />
              </a>

              <a
                href="#schedule"
                className="
                  border-[3px]
                  border-[var(--paper)]
                  px-8
                  py-4
                  font-display
                  uppercase
                  flex
                  items-center
                  gap-2
                  transition-all
                  hover:bg-[var(--paper)]
                  hover:text-black
                "
              >
                View Schedule
                <ExternalLink size={16} />
              </a>

            </div>

          </div>

          {/* Shark */}
          <div className="md:col-span-5 flex justify-center md:justify-end">

            <img
              src={mascotShark}
              alt="Shark mascot"
              className="
                cta-shark
                w-[320px]
                md:w-[480px]
                lg:w-[560px]
                h-auto
                object-contain
                select-none
                pointer-events-none
                translate-x-4
              "
              loading="lazy"
              decoding="async"
            />

          </div>

        </div>

        {/* Stats */}
        <div
          className="
            cta-stats
            mt-20
            pt-10
            border-t-2
            border-white/15
            flex
            flex-wrap
            gap-12
          "
        >
          {[
            ["FREE", "100%"],
            ["6", "DAYS"],
            ["4", "TRACKS"],
          ].map(([value, label]) => (
            <div key={label} className="cta-stat">
              <div className="font-display text-5xl text-[var(--sun)]">
                {value}
              </div>

              <div
                className="
                  mt-2
                  text-xs
                  uppercase
                  tracking-[0.3em]
                  opacity-50
                "
              >
                {label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}