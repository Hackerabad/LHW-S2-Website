import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import catgithub from "@/assets/catgithub.png";
import hackerabadLogo from "@/assets/Hackerabad.png";

gsap.registerPlugin(ScrollTrigger);

const sponsors = [
  {
    name: "GitHub",
    wordmark: "GITHUB",
    role: "SPONSOR",
    description:
      "GitHub is a key part of the Local Hack Week experience, giving participants a place to collaborate, manage code, and build projects together while learning industry-standard development workflows.",
    url: "https://github.com",
    accent: "#24292F",
    logo: (
      // GitHub Octocat SVG inline — no external dependency
      <svg viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
          fill="currentColor"
        />
      </svg>
    ),
    // Which side to place the sponsor logo column (for alternating)
    flip: false,
  },
  // Future sponsors: copy a block below and set flip: true for every other one.
  // {
  //   name: "Acme Corp",
  //   wordmark: "ACME",
  //   role: "COMMUNITY SPONSOR",
  //   description: "...",
  //   url: "https://acme.com",
  //   accent: "#FF5733",
  //   logo: null,
  //   flip: true,
  // },
];

export function SponsorsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from(".sponsors-header > *", {
        y: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".sponsors-header",
          start: "top 80%",
        },
      });

      // Each sponsor row
      gsap.from(".sponsor-row", {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".sponsors-list",
          start: "top 80%",
        },
      });

      // Faded wordmark parallax
      gsap.utils.toArray(".sponsor-wordmark").forEach((el: any) => {
        gsap.to(el, {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: el.closest(".sponsor-row"),
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // Mascot float
      gsap.from(".sponsor-mascot", {
        x: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".sponsor-mascot",
          start: "top 85%",
        },
      });
      gsap.to(".sponsor-mascot", {
        y: -14,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="sponsors"
      ref={sectionRef}
      className="bg-[var(--paper)] border-b-4 border-black overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 py-28">

        {/* ── Header ── */}
        <div className="sponsors-header mb-20">
          <div className="font-mono text-xs tracking-[0.35em] uppercase mb-6 text-neutral-500">
            POWERING THE BUILD
          </div>

          <h2 className="font-display text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] tracking-[-0.06em] max-w-4xl">
            FUELING
            <br />
            <span className="text-[#FFC900]">FUTURE</span> Hackers.
          </h2>

          <p className="max-w-xl mt-8 text-lg text-neutral-700 leading-relaxed">
            Local Hack Week is made possible by partners and sponsors who believe in investing in the next generation of builders, innovators, and community leaders.
          </p>
        </div>

        {/* ── Sponsors list ── */}
        <div className="sponsors-list">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="sponsor-row border-t-4 border-black py-16 relative overflow-hidden"
            >
              {/* Faded wordmark watermark */}
              <div
                aria-hidden="true"
                className="sponsor-wordmark absolute inset-y-0 right-0 flex items-center pointer-events-none select-none"
              >
                <span
                  className="font-display font-black text-[clamp(6rem,18vw,16rem)] leading-none tracking-[-0.06em] whitespace-nowrap"
                  style={{ color: "rgba(0,0,0,0.04)" }}
                >
                  {sponsor.wordmark}
                </span>
              </div>

              <div
                className={`relative z-10 grid md:grid-cols-12 gap-10 items-start ${sponsor.flip ? "md:[direction:rtl]" : ""
                  }`}
              >
                {/* ── Left: name + role ── */}
                <div className={`md:col-span-4 ${sponsor.flip ? "[direction:ltr]" : ""}`}>
                  <div className="inline-block px-3 py-1 border-2 border-black text-xs font-bold uppercase tracking-[0.2em] mb-6">
                    {sponsor.role}
                  </div>

                  {/* Oversized logo + name stacked */}
                  <div className="flex flex-col gap-4">
                    {/* Oversized icon — partially cropped */}
                    <div
                      className="w-20 h-20 overflow-hidden"
                      style={{ color: sponsor.accent }}
                    >
                      {sponsor.logo}
                    </div>

                    <h3 className="font-display text-5xl md:text-6xl tracking-[-0.05em] leading-none">
                      {sponsor.name}
                    </h3>
                  </div>
                </div>

                {/* ── Right: description + CTA + mascot ── */}
                <div className={`md:col-span-8 ${sponsor.flip ? "[direction:ltr]" : ""}`}>
                  <div className="grid md:grid-cols-[1fr_auto] gap-8 items-start">
                    {/* Text + button */}
                    <div>
                      <p className="text-lg leading-relaxed text-neutral-700 max-w-2xl mb-8">
                        {sponsor.description}
                      </p>

                      <a
                        href={sponsor.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          inline-flex items-center gap-2
                          border-4 border-black
                          px-6 py-3
                          font-display uppercase tracking-wide text-sm
                          shadow-[4px_4px_0px_#000]
                          transition-all duration-200
                          hover:-translate-y-[2px] hover:shadow-[6px_6px_0px_#000]
                          active:translate-y-0 active:shadow-[2px_2px_0px_#000]
                        "
                        style={{ background: sponsor.accent === "#24292F" ? "#24292F" : "#FFC900", color: sponsor.accent === "#24292F" ? "#fff" : "#000" }}
                      >
                        Visit {sponsor.name}
                        <ArrowUpRight size={18} />
                      </a>
                    </div>

                    {/* Mascot with sticker — first sponsor only */}
                    {!sponsor.flip && (
                      <div className="hidden md:block relative">
                        <img
                          src={catgithub}
                          alt="Cat holding a GitHub sticker"
                          className="sponsor-mascot w-[220px] lg:w-[280px] h-auto object-contain select-none pointer-events-none"
                        />
                        {/* Sticker badge */}
                        <div
                          className="
                            absolute -top-3 -left-6
                            w-14 h-14
                            rounded-full
                            border-[3px] border-black
                            bg-[#24292F]
                            flex items-center justify-center
                            text-white
                            shadow-[3px_3px_0px_#000]
                            rotate-[-12deg]
                          "
                          style={{ color: "white" }}
                          aria-hidden="true"
                        >
                          <svg viewBox="0 0 98 96" width="26" height="26" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Recruitment Poster */}
          <div className="relative border-t-4 border-black py-24 overflow-hidden">
            <div
              aria-hidden
              className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
            >
              <span className="font-display font-black text-[clamp(8rem,22vw,22rem)] tracking-[-0.08em] leading-none text-black/5">
                NEXT?
              </span>
            </div>

            <div className="relative z-10 max-w-5xl">
              <div className="inline-block mb-6 px-4 py-2 border-2 border-black bg-[#FFC900] text-xs font-bold uppercase tracking-[0.25em]">
                Sponsor Local Hack Week
              </div>

              <h3 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.9] tracking-[-0.06em]">
                Put Your Tools
                <br />
                In Hackers'
                <br />
                Hands.
              </h3>

              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-700">
                Hundreds of developers, designers, and makers will spend a full week
                building projects, exploring new tools, and sharing their work.
                If your product helps people create, learn, or ship faster,
                we'd love to talk.
              </p>

              <div className="flex flex-wrap gap-4 mt-10">
                <div className="border-2 border-black px-5 py-3">
                  <div className="font-display text-3xl">7</div>
                  <div className="text-xs uppercase">Days</div>
                </div>

                <div className="border-2 border-black px-5 py-3">
                  <div className="font-display text-3xl">250+</div>
                  <div className="text-xs uppercase">Hackers</div>
                </div>

                <div className="border-2 border-black px-5 py-3">
                  <div className="font-display text-3xl">2026</div>
                  <div className="text-xs uppercase">Edition</div>
                </div>
              </div>
              <div className="mt-12 flex flex-wrap gap-4">
                <a
                  href="mailto:hackclubhackerabad@gmail.com"
                  className="
                    inline-flex
                    items-center
                    gap-3
                    border-4
                    border-black
                    bg-[#FFC900]
                    px-8
                    py-4
                    font-display
                    uppercase
                    tracking-wide
                    shadow-[6px_6px_0px_#000]
                    transition-all
                    hover:-translate-y-1
                    hover:shadow-[8px_8px_0px_#000]
                  "
                >
                  Sponsor Us
                  <ArrowUpRight size={18} />
                </a>

                <a
                  href="#"
                  className="
                    inline-flex
                    items-center
                    gap-3
                    border-4
                    border-black
                    bg-[var(--paper)]
                    px-8
                    py-4
                    font-display
                    uppercase
                    tracking-wide
                    shadow-[6px_6px_0px_#000]
                    transition-all
                    hover:-translate-y-1
                    hover:shadow-[8px_8px_0px_#000]
                  "
                >
                  View Sponsor Deck
                </a>
              </div>
            </div>

            <img
              src={hackerabadLogo}
              alt=""
              aria-hidden
              className="absolute right-0 bottom-0 w-[300px] opacity-[0.04] pointer-events-none select-none"
            />
          </div>
          <div className="border-t-4 border-black" />
        </div>

      </div>
    </section>
  );
}
