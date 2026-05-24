import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import mascot from "@/assets/mascot.png";
import logoLHW from "@/assets/logo-lhw.png";
import heroBg from "@/assets/hero-bg.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const days = [
  { day: "MON", title: "Opening Ceremony", theme: "Kickoff & Intro to Hacks", color: "bg-peach" },
  { day: "TUE", title: "Web Dev Day", theme: "Build with React & friends", color: "bg-sky" },
  { day: "WED", title: "AI / ML Day", theme: "Prompt, train, ship", color: "bg-mint" },
  { day: "THU", title: "Design Day", theme: "UI, UX & pixel love", color: "bg-rose" },
  { day: "FRI", title: "Game Dev Night", theme: "Tiny games, big vibes", color: "bg-mustard" },
  { day: "SAT", title: "Hack Sprint", theme: "Build your project all day", color: "bg-peach" },
  { day: "SUN", title: "Demos & Closing", theme: "Showcase + prizes", color: "bg-sky" },
];

function Index() {
  const heroRef = useRef<HTMLDivElement>(null);
  const mascotRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    const runAnimations = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);

      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.from(".hero-line", {
          y: 80,
          opacity: 0,
          rotateZ: -2,
          stagger: 0.12,
          duration: 1,
          ease: "power4.out",
        });
        gsap.from(".hero-chip", { y: 30, opacity: 0, stagger: 0.08, delay: 0.4, duration: 0.7, ease: "back.out(2)" });
        gsap.from(mascotRef.current, {
          scale: 0.6,
          rotate: -8,
          opacity: 0,
          duration: 1.2,
          delay: 0.3,
          ease: "elastic.out(1, 0.6)",
        });
        gsap.to(mascotRef.current, {
          y: -14,
          rotate: 2,
          duration: 3.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
          gsap.from(el, {
            y: 50,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          });
        });

        // Day cards stagger
        gsap.from(".day-card", {
          y: 60,
          opacity: 0,
          rotate: -1,
          stagger: 0.06,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: ".day-grid", start: "top 80%" },
        });
      }, heroRef);

      ScrollTrigger.refresh();
    };

    runAnimations();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <div ref={heroRef} className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* NAV */}
      <header className="sticky top-0 z-40 border-b-2 border-ink bg-cream/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
          <a href="#top" className="flex items-center gap-2">
            <img src={logoLHW} alt="LHW" className="h-8 w-auto blend-ink" />
            <span className="font-display text-lg tracking-wide">LOCAL · HACK · WEEK</span>
          </a>
          <nav className="hidden gap-6 text-sm font-medium uppercase tracking-widest md:flex">
            <a href="#about" className="story-link hover:text-rose">About</a>
            <a href="#schedule" className="story-link hover:text-rose">Schedule</a>
            <a href="#streams" className="story-link hover:text-rose">Streams</a>
            <a href="#join" className="story-link hover:text-rose">Join</a>
          </nav>
          <a
            href="#join"
            className="brut bg-rose px-3 py-1.5 text-sm font-bold uppercase text-cream brut-hover hover-scale"
          >
            Register
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative grain overflow-hidden">
        {/* Soft Vectorheart background image */}
        <div className="pointer-events-none absolute inset-0">
          <img
            src={heroBg}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cream/60" />
          <div className="scan-roll absolute inset-0 opacity-40" />
          <span className="twinkle absolute left-[10%] top-[12%] text-2xl text-cream mix-blend-screen">✦</span>
          <span className="twinkle absolute right-[14%] top-[8%] text-xl text-cream mix-blend-screen" style={{ animationDelay: "-1s" }}>★</span>
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
          <div className="text-cream drop-shadow-[3px_3px_0_oklch(0.22_0.04_30)]">
            <div className="mb-5 flex flex-wrap gap-2">
              <span className="hero-chip brut bg-mint px-3 py-1 text-xs font-bold uppercase text-ink">Free + Open</span>
              <span className="hero-chip brut bg-mustard px-3 py-1 text-xs font-bold uppercase text-ink">6 Days</span>
              <span className="hero-chip brut bg-sky px-3 py-1 text-xs font-bold uppercase text-ink">Worldwide</span>
            </div>

            <h1 className="font-display text-5xl leading-[0.95] sm:text-6xl md:text-7xl">
              <span className="hero-line block flicker">LOCAL</span>
              <span className="hero-line block text-mustard">HACK</span>
              <span className="hero-line block">WEEK</span>
            </h1>

            <p className="reveal mt-6 max-w-md font-mono text-xl text-cream/95">
              A week of coding, creativity & collaboration. Inspired by MLH Global Hack Week — for devs, designers and
              dreamers everywhere.
            </p>

            <div className="reveal mt-8 flex flex-wrap gap-3">
              <a href="#join" className="brut-lg brut-hover hover-scale bg-ink px-6 py-3 font-display text-lg text-cream">
                ► JOIN THE HACK
              </a>
              <a href="#schedule" className="brut brut-hover hover-scale bg-cream px-6 py-3 font-display text-lg text-ink">
                See Schedule
              </a>
            </div>
          </div>

          <div className="relative float-y">
            <div className="absolute -inset-6 rotate-3 bg-peach brut" />
            <div className="relative brut-lg bg-cream p-4">
              <div className="halftone absolute inset-0 opacity-20" />
              <img
                ref={mascotRef}
                src={mascot}
                alt="LHW mascot — cat, robot and shark playing chess"
                className="relative z-10 mx-auto block w-full max-w-md neon-glow"
              />
              <div className="relative z-10 mt-3 flex items-center justify-between font-mono text-xs uppercase">
                <span>// EP.01</span>
                <span className="px-2 py-0.5 bg-ink text-cream flicker">REC ●</span>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="relative border-y-2 border-ink bg-rose text-cream">
          <div className="marquee-track flex whitespace-nowrap py-3 font-display text-2xl uppercase">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex shrink-0 items-center gap-8 pr-8">
                <span>★ Local Hack Week</span>
                <span>✦ Code · Create · Collab</span>
                <span>★ Free + Open to All</span>
                <span>✦ A Week of Hacks</span>
                <span>★ Hackerabad X AIC X ECA Presents</span>
                <span>✦ Tune in Live</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TICKER STRIP */}
      <section className="relative overflow-hidden border-b-2 border-ink bg-mustard py-6">
        <div className="absolute inset-0 halftone opacity-20" />
        <div className="relative marquee-track flex whitespace-nowrap font-display text-5xl uppercase md:text-6xl">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex shrink-0 items-center gap-10 pr-10">
              <span className="chroma">LOCAL HACK WEEK</span>
              <span className="text-rose">✦</span>
              <span>HACKERABAD X AIC X ECA PRESENTS</span>
              <span className="text-rose">★</span>
              <span className="chroma">LHW-S2</span>
              <span className="text-rose">✦</span>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative border-b-2 border-ink py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-12">
          <div className="md:col-span-5">
            <span className="reveal font-mono text-sm uppercase text-rose">// CH.01 — About</span>
            <h2 className="reveal mt-2 font-display text-5xl md:text-6xl">
              A week-long <span className="text-rose">love letter</span> to building.
            </h2>
          </div>
          <div className="md:col-span-7">
            <div className="reveal brut bg-card p-8 relative">
              <div className="halftone absolute -top-3 -right-3 h-16 w-16" />
              <p className="font-mono text-xl leading-relaxed">
                Inspired by MLH Global Hack Week, <b>Local Hack Week</b> is a week-long event that brings together
                developers, designers, and innovators.
              </p>
              <p className="mt-4 text-lg leading-relaxed">
                It's an opportunity to learn new skills, build amazing projects, and connect with like-minded
                individuals passionate about technology. Completely <b className="bg-mustard px-1">free and open</b> to
                anyone, anywhere — join us for an exciting week of coding, creativity, and collaboration.
              </p>
            </div>

            <div className="reveal mt-6 grid grid-cols-3 gap-4">
              {[
                { k: "6", v: "Days" },
                { k: "∞", v: "Projects" },
                { k: "0$", v: "Cost" },
              ].map((s) => (
                <div key={s.v} className="brut bg-mint p-4 text-center">
                  <div className="font-display text-4xl">{s.k}</div>
                  <div className="font-mono text-xs uppercase">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STREAMS */}
      <section id="streams" className="border-b-2 border-ink bg-sky/40 py-20">
        <div className="mx-auto max-w-7xl px-5">
          <span className="reveal font-mono text-sm uppercase text-rose">// CH.02 — Streams</span>
          <h2 className="reveal mt-2 font-display text-5xl md:text-6xl">Watch our streams.</h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <a
              href="#"
              className="reveal brut-lg brut-hover group block bg-cream p-8"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase">Live · Channel 01</span>
                <span className="brut bg-rose px-2 py-0.5 text-xs font-bold uppercase text-cream">YT</span>
              </div>
              <div className="mt-6 font-display text-4xl md:text-5xl">Hackerabad's YT →</div>
              <p className="mt-3 font-mono text-base text-ink/70">
                Tune in daily for talks, workshops and live demos straight from the community.
              </p>
            </a>

            <div className="reveal brut-lg relative overflow-hidden bg-ink p-8 text-cream">
              <div className="scanlines absolute inset-0" />
              <div className="relative">
                <span className="font-mono text-xs uppercase text-mustard">SIGNAL</span>
                <div className="mt-6 font-display text-4xl">TUNE IN.</div>
                <div className="mt-1 font-display text-4xl text-mustard">LEVEL UP.</div>
                <p className="mt-4 max-w-sm font-mono text-base text-cream/80">
                  Grab a drink, dim the lights and join hundreds of hackers building in real time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCHEDULE */}
      <section id="schedule" className="border-b-2 border-ink py-20">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="reveal font-mono text-sm uppercase text-rose">// LHW-S2 — Schedule</span>
              <h2 className="reveal mt-2 font-display text-5xl md:text-6xl">Six days, Six vibes.</h2>
            </div>
            <p className="reveal max-w-sm font-mono text-sm text-ink/70">
              Schedules & timings may change and will be updated on the website. Click a day for details.
            </p>
          </div>

          <div className="day-grid mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {days.map((d, i) => (
              <button
                key={d.day}
                className={`day-card brut brut-hover group relative overflow-hidden ${d.color} p-6 text-left`}
              >
                <div className="halftone absolute -right-4 -top-4 h-20 w-20 opacity-50" />
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-3xl">{d.day}</span>
                  <span className="font-mono text-xs uppercase">Day 0{i + 1}</span>
                </div>
                <h3 className="mt-4 font-display text-2xl leading-tight">{d.title}</h3>
                <p className="mt-2 font-mono text-sm text-ink/80">{d.theme}</p>
                <div className="mt-6 inline-flex items-center gap-2 border-b-2 border-ink pb-0.5 font-mono text-xs uppercase">
                  View schedule →
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* JOIN / CTA */}
      <section id="join" className="relative overflow-hidden border-b-2 border-ink bg-rose py-24 text-cream">
        <div className="scanlines absolute inset-0" />
        <div className="rays absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-4xl px-5 text-center">
          <span className="font-mono text-sm uppercase text-cream/80">// FINAL EPISODE</span>
          <h2 className="reveal mt-3 font-display text-6xl leading-none md:text-8xl chroma">
            SEE YOU
            <br /> ONLINE.
          </h2>
          <p className="reveal mx-auto mt-6 max-w-xl font-mono text-lg text-cream/90">
            Free. Open. Worldwide. Press start and join the Local Hack Week crew this season.
          </p>
          <div className="reveal mt-8 flex flex-wrap justify-center gap-3">
            <a href="#" className="brut-lg brut-hover bg-cream px-7 py-3 font-display text-lg text-ink">
              ► REGISTER NOW
            </a>
            <a href="#" className="brut-lg brut-hover bg-ink px-7 py-3 font-display text-lg text-cream">
              JOIN DISCORD
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-cream py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 md:flex-row">
          <div className="flex items-center gap-3">
            <img src={logoLHW} alt="LHW" className="h-8 w-auto blend-ink" />
            <span className="font-mono text-sm uppercase">© {new Date().getFullYear()} Local Hack Week · Hackerabad</span>
          </div>
          <span className="font-mono text-xs uppercase text-ink/60">Built with caffeine ☕ + GSAP</span>
        </div>
      </footer>
    </div>
  );
}
