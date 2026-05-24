import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import mascotCat from "@/assets/mascot-cat.png";
import mascotAi from "@/assets/mascot-ai.png";
import mascotShark from "@/assets/mascot-shark.png";
import logoLHW from "@/assets/logo-lhw.png";
import heroBg from "@/assets/hero-bg.jpg";
import {
  FloatingShapes, Sparkles, PetalRain, AmbientBlobs,
  RippleRings, SpeedLinesOverlay, LightBurstEffect, PortalSwirl,
} from "./-components/scene-effects";

export const Route = createFileRoute("/")({"component": Index});

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
  const rootRef = useRef<HTMLDivElement>(null);
  const catRef = useRef<HTMLImageElement>(null);
  const robotRef = useRef<HTMLImageElement>(null);
  const sharkRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    let onMouseMove: ((e: MouseEvent) => void) | undefined;

    const run = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"), import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // --- HERO: Cat bouncy entrance ---
        gsap.from(".hero-line", { y: 80, opacity: 0, rotateZ: -2, stagger: 0.12, duration: 1, ease: "power4.out" });
        gsap.from(".hero-chip", { y: 30, opacity: 0, stagger: 0.08, delay: 0.4, duration: 0.7, ease: "back.out(2)" });

        // --- HERO: All three mascots staggered entrance ---
        if (catRef.current) {
          gsap.from(catRef.current, { x: -80, scale: 0.3, rotate: -15, opacity: 0, duration: 1.2, delay: 0.3, ease: "elastic.out(1, 0.5)" });
          gsap.to(catRef.current, { y: -10, rotate: 2, duration: 3.4, ease: "sine.inOut", yoyo: true, repeat: -1 });
        }
        if (robotRef.current) {
          gsap.from(robotRef.current, { y: -60, scale: 0.4, opacity: 0, duration: 1.3, delay: 0.6, ease: "elastic.out(1, 0.6)" });
          gsap.to(robotRef.current, { y: -12, rotate: -1.5, duration: 3.8, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 0.5 });
        }
        if (sharkRef.current) {
          gsap.from(sharkRef.current, { x: 80, scale: 0.3, rotate: 15, opacity: 0, duration: 1.2, delay: 0.9, ease: "elastic.out(1, 0.5)" });
          gsap.to(sharkRef.current, { y: -10, rotate: 1.5, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1 });
        }
        gsap.from(".ripple-ring", { scale: 0, opacity: 0, stagger: 0.3, duration: 1, delay: 0.5, ease: "power2.out" });

        // --- Scroll reveals ---
        gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
          gsap.from(el, { y: 50, opacity: 0, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          });
        });

        // --- Day cards ---
        gsap.from(".day-card", {
          y: 60, opacity: 0, rotate: -1, stagger: 0.06, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: ".day-grid", start: "top 80%" },
        });

        // --- ABOUT: Cat interacts with floating UI ---
        gsap.from(".about-cat", {
          x: -100, opacity: 0, rotate: -10, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: "#about", start: "top 70%" },
        });
        gsap.from(".float-ui-card", {
          y: 40, opacity: 0, stagger: 0.15, duration: 0.8, ease: "back.out(1.5)",
          scrollTrigger: { trigger: "#about", start: "top 75%" },
        });

        // --- STREAMS: Holo panels entrance ---
        gsap.from(".holo-border", {
          scale: 0.8, opacity: 0, stagger: 0.2, duration: 1, ease: "power2.out",
          scrollTrigger: { trigger: "#streams", start: "top 70%" },
        });
        gsap.from(".streams-shark", {
          x: 120, opacity: 0, scale: 0.7, duration: 1.5, ease: "power4.out",
          scrollTrigger: { trigger: "#streams", start: "top 65%" },
        });

        // --- FUSION: Cinematic Redesign ---
        const fusionTl = gsap.timeline({
          scrollTrigger: { trigger: "#fusion", start: "top 60%", end: "bottom 20%", toggleActions: "play none none reverse" },
        });
        fusionTl.from(".fusion-title h2", { yPercent: 120, opacity: 0, duration: 1.2, ease: "power4.out" });
        fusionTl.from(".fusion-desc", { x: -30, opacity: 0, duration: 1 }, "-=0.8");
        fusionTl.from(".portal-ring", { scale: 0, opacity: 0, stagger: 0.2, duration: 1.5, ease: "back.out(1.5)" }, "-=0.8");
        fusionTl.from(".fusion-cat", { x: -100, y: 100, opacity: 0, scale: 0.5, duration: 1.2, ease: "elastic.out(1, 0.7)" }, "-=1");
        fusionTl.from(".fusion-robot", { x: 100, y: -100, opacity: 0, scale: 0.5, duration: 1.2, ease: "elastic.out(1, 0.7)" }, "-=0.9");

        // --- EMOTIONAL PAUSE: Visual Novel Sequence ---
        const emotionTl = gsap.timeline({
          scrollTrigger: { trigger: "#emotional", start: "top 60%", toggleActions: "play none none reverse" }
        });
        emotionTl.from(".emotional-box", { y: 50, opacity: 0, scale: 0.95, duration: 1.5, ease: "power3.out" });
        emotionTl.from(".emotional-text", { opacity: 0, letterSpacing: "1em", duration: 1.2, ease: "power2.out" }, "-=1");
        emotionTl.from(".emotional-word", { y: 20, opacity: 0, stagger: 0.1, duration: 0.8, ease: "back.out(2)" }, "-=0.8");
        emotionTl.from(".emotional-line", { scaleX: 0, duration: 0.8, ease: "power3.inOut" }, "-=0.4");
        emotionTl.from(".emotional-desc", { y: 20, opacity: 0, duration: 1 }, "-=0.4");

        // --- SCHEDULE: Robot cinematic entrance ---
        const sharkTl = gsap.timeline({
          scrollTrigger: { trigger: "#schedule", start: "top 60%" },
        });
        sharkTl.to(".speed-lines", { opacity: 0.6, duration: 0.3, ease: "power2.in" });
        sharkTl.from(".schedule-robot", { y: 200, scale: 1.5, opacity: 0, duration: 0.8, ease: "power4.out" }, 0.1);
        sharkTl.to(".light-burst", { scale: 6, opacity: 0.8, duration: 0.6, ease: "power2.out" }, 0.2);
        sharkTl.to(".speed-lines", { opacity: 0, duration: 0.8 }, 0.5);
        sharkTl.to(".light-burst", { opacity: 0, duration: 0.6 }, 0.6);

        // --- FINALE: All three mascots ---
        gsap.from(".finale-mascot", {
          y: 80, opacity: 0, scale: 0.6, stagger: 0.2, duration: 1.2, ease: "elastic.out(1, 0.6)",
          scrollTrigger: { trigger: "#join", start: "top 65%" },
        });

      }, rootRef);

      // Tilts parent containers subtly toward cursor
      onMouseMove = (e: MouseEvent) => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const dx = (e.clientX - cx) / cx;
        const dy = (e.clientY - cy) / cy;

        gsap.to(".interactive-tilt", {
          rotateY: dx * 16,
          rotateX: -dy * 16,
          transformPerspective: 800,
          duration: 0.6,
          ease: "power2.out",
          overwrite: "auto",
        });
      };
      window.addEventListener("mousemove", onMouseMove);

      ScrollTrigger.refresh();
    };

    run();
    return () => {
      cancelled = true;
      ctx?.revert();
      if (onMouseMove) {
        window.removeEventListener("mousemove", onMouseMove);
      }
    };
  }, []);

  return (
    <div ref={rootRef} className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* NAV */}
      <header className="sticky top-0 z-40 border-b-2 border-ink bg-cream/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
          <a href="#top" className="flex items-center gap-2">
            <img src={logoLHW} alt="LHW" className="h-8 w-auto blend-ink" />
            <span className="font-display text-lg tracking-wide">LOCAL · HACK · WEEK</span>
          </a>
          <nav className="hidden gap-6 text-sm font-medium uppercase tracking-widest md:flex">
            <a href="#about" className="story-link hover:text-rose">About</a>
            <a href="#streams" className="story-link hover:text-rose">Streams</a>
            <a href="#schedule" className="story-link hover:text-rose">Schedule</a>
            <a href="#join" className="story-link hover:text-rose">Join</a>
          </nav>
          <a href="#join" className="brut bg-rose px-3 py-1.5 text-sm font-bold uppercase text-cream brut-hover hover-scale">Register</a>
        </div>
      </header>

      {/* ═══ ACT 1: HERO — Cat enters ═══ */}
      <section id="top" className="scene-section relative grain overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <img src={heroBg} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cream/60" />
          <div className="scan-roll absolute inset-0 opacity-40" />
          <span className="twinkle absolute left-[10%] top-[12%] text-2xl text-cream mix-blend-screen">✦</span>
          <span className="twinkle absolute right-[14%] top-[8%] text-xl text-cream mix-blend-screen" style={{ animationDelay: "-1s" }}>★</span>
        </div>
        <FloatingShapes />
        <AmbientBlobs scene="hero" />

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
              A week of coding, creativity & collaboration. Inspired by MLH Global Hack Week — for devs, designers and dreamers everywhere.
            </p>
            <div className="reveal mt-8 flex flex-wrap gap-3">
              <a href="#join" className="brut-lg brut-hover hover-scale bg-ink px-6 py-3 font-display text-lg text-cream">► JOIN THE HACK</a>
              <a href="#schedule" className="brut brut-hover hover-scale bg-cream px-6 py-3 font-display text-lg text-ink">See Schedule</a>
            </div>
          </div>

          {/* ALL THREE MASCOTS — hero entrance */}
          <div className="relative flex flex-col items-center justify-center gap-6">
            <RippleRings />
            <div className="absolute -inset-6 rotate-2 bg-peach brut opacity-60" />
            <div className="relative brut-lg bg-cream p-5 w-full">
              <div className="halftone absolute inset-0 opacity-15" />
              <Sparkles count={14} color="cyan" />

              <div className="relative z-10 flex items-end justify-center interactive-tilt mt-6">
                {/* Cat — left, slightly behind */}
                <div className="hero-mascot text-center relative z-0 translate-x-8 md:translate-x-12 translate-y-2">
                  <img ref={catRef} src={mascotCat} alt="Cat mascot" className="w-24 md:w-32 glow-cat mx-auto drop-shadow-xl" />
                  <span className="mt-2 block font-mono text-[10px] uppercase text-ink/70">Hack</span>
                </div>

                {/* Robot — center, upfront, largest */}
                <div className="hero-mascot text-center relative z-10">
                  <img ref={robotRef} src={mascotAi} alt="AI Robot mascot" className="w-28 md:w-40 glow-robot mx-auto drop-shadow-2xl" />
                  <span className="mt-2 block font-mono text-[10px] uppercase text-ink/70">Build</span>
                </div>

                {/* Shark — right, slightly behind */}
                <div className="hero-mascot text-center relative z-0 -translate-x-8 md:-translate-x-12 translate-y-2">
                  <img ref={sharkRef} src={mascotShark} alt="Shark mascot" className="w-24 md:w-32 glow-shark mx-auto drop-shadow-xl" />
                  <span className="mt-2 block font-mono text-[10px] uppercase text-ink/70">Ship</span>
                </div>
              </div>

              <div className="relative z-10 mt-4 flex items-center justify-between font-mono text-xs uppercase">
                <span>// YOUR CREW</span>
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
                <span>★ Local Hack Week</span><span>✦ Code · Create · Collab</span>
                <span>★ Free + Open to All</span><span>✦ A Week of Hacks</span>
                <span>★ Hackerabad X AIC X ECA Presents</span><span>✦ Tune in Live</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TICKER */}
      <section className="relative overflow-hidden border-b-2 border-ink bg-mustard py-6">
        <div className="absolute inset-0 halftone opacity-20" />
        <div className="relative marquee-track flex whitespace-nowrap font-display text-5xl uppercase md:text-6xl">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex shrink-0 items-center gap-10 pr-10">
              <span className="chroma">LOCAL HACK WEEK</span><span className="text-rose">✦</span>
              <span>HACKERABAD X AIC X ECA PRESENTS</span><span className="text-rose">★</span>
              <span className="chroma">LHW-S2</span><span className="text-rose">✦</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ ACT 2: ABOUT — Cat interacts ═══ */}
      <section id="about" className="scene-section relative border-b-2 border-ink py-20">
        <FloatingShapes />
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-12">
          <div className="md:col-span-5">
            <span className="reveal font-mono text-sm uppercase text-rose">// CH.01 — About</span>
            <h2 className="reveal mt-2 font-display text-5xl md:text-6xl">
              A week-long <span className="text-rose">love letter</span> to building.
            </h2>
            <img src={mascotCat} alt="" className="about-cat mt-6 w-32 glow-cat mascot-idle hidden md:block interactive-tilt" />
          </div>
          <div className="md:col-span-7">
            <div className="reveal brut bg-card p-8 relative float-ui-card" style={{ "--ui-rot": "-1deg", "--ui-rot-end": "1deg", "--ui-dur": "6s" } as React.CSSProperties}>
              <div className="halftone absolute -top-3 -right-3 h-16 w-16" />
              <p className="font-mono text-xl leading-relaxed">
                Inspired by MLH Global Hack Week, <b>Local Hack Week</b> is a week-long event that brings together developers, designers, and innovators.
              </p>
              <p className="mt-4 text-lg leading-relaxed">
                It's an opportunity to learn new skills, build amazing projects, and connect with like-minded individuals passionate about technology. Completely <b className="bg-mustard px-1">free and open</b> to anyone, anywhere.
              </p>
            </div>
            <div className="reveal mt-6 grid grid-cols-3 gap-4">
              {[{ k: "6", v: "Days" }, { k: "∞", v: "Projects" }, { k: "0$", v: "Cost" }].map((s, i) => (
                <div key={s.v} className="brut bg-mint p-4 text-center float-ui-card" style={{ "--ui-delay": `${i * 0.5}s`, "--ui-dur": `${5 + i}s` } as React.CSSProperties}>
                  <div className="font-display text-4xl">{s.k}</div>
                  <div className="font-mono text-xs uppercase">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ACT 3: STREAMS — Robot enters ═══ */}
      <section id="streams" className="scene-section border-b-2 border-ink bg-sky/40 py-20 relative">
        <AmbientBlobs scene="hero" />
        <Sparkles count={10} color="gold" />
        <div className="mx-auto max-w-7xl px-5">
          <span className="reveal font-mono text-sm uppercase text-rose">// CH.02 — Streams</span>
          <h2 className="reveal mt-2 font-display text-5xl md:text-6xl">Watch our streams.</h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <a href="#" className="reveal brut-lg brut-hover group block bg-cream p-8 holo-border">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase">Live · Channel 01</span>
                <span className="brut bg-rose px-2 py-0.5 text-xs font-bold uppercase text-cream">YT</span>
              </div>
              <div className="mt-6 font-display text-4xl md:text-5xl">Hackerabad's YT →</div>
              <p className="mt-3 font-mono text-base text-ink/70">Tune in daily for talks, workshops and live demos straight from the community.</p>
            </a>
            <div className="reveal brut-lg relative overflow-hidden bg-ink p-8 text-cream holo-border">
              <div className="scanlines absolute inset-0" />
              <div className="relative">
                <span className="font-mono text-xs uppercase text-mustard">SIGNAL</span>
                <div className="mt-6 font-display text-4xl">TUNE IN.</div>
                <div className="mt-1 font-display text-4xl text-mustard">LEVEL UP.</div>
                <p className="mt-4 max-w-sm font-mono text-base text-cream/80">Grab a drink, dim the lights and join hundreds of hackers building in real time.</p>
              </div>
            </div>
          </div>

          {/* Shark mascot floating beside */}
          <div className="mt-10 flex justify-center">
            <div className="relative interactive-tilt">
              <Sparkles count={6} color="gold" />
              <img src={mascotShark} alt="Shark mascot" className="w-48 glow-shark mascot-idle streams-shark" />
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 font-mono text-xs uppercase text-sky text-glow-cyan">// EP.02 — THE SHARK</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ACT 4: FUSION — Cat + Robot combine ═══ */}
      <section id="fusion" className="scene-section bg-ink text-cream relative border-b-2 border-ink py-32 overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-12 opacity-10 pointer-events-none">
          {Array.from({length: 12}).map((_, i) => <div key={i} className="border-r border-sky/30 h-full" />)}
        </div>
        <AmbientBlobs scene="fusion" />
        <Sparkles count={25} color="cyan" />
        
        <div className="mx-auto max-w-7xl px-5 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          
          <div className="md:w-1/2 relative z-20">
            <span className="reveal font-mono text-xs tracking-widest uppercase text-sky border border-sky/30 px-3 py-1 rounded-full bg-sky/5 backdrop-blur-sm shadow-[0_0_15px_rgba(0,255,255,0.2)]">
              // INTERLUDE — SYSTEM OVERRIDE
            </span>
            <div className="fusion-title overflow-hidden mt-8">
              <h2 className="font-display text-7xl md:text-9xl leading-[0.8] text-cream drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                LEVEL<br/><span className="text-mustard">UP.</span>
              </h2>
            </div>
            <p className="fusion-desc mt-6 max-w-md font-mono text-lg text-cream/70 border-l-2 border-mustard pl-4">
              When creativity meets raw technology, incredible things happen. Two elements, one massive breakthrough. Initiate the build sequence.
            </p>
          </div>

          <div className="md:w-1/2 relative h-[400px] md:h-[500px] w-full flex items-center justify-center">
            {/* Holographic background rings */}
            <div className="portal-ring absolute w-full h-full max-w-[400px] max-h-[400px] rounded-full border border-sky/30 shadow-[0_0_50px_rgba(0,255,255,0.1)] animate-[spin_10s_linear_infinite]" />
            <div className="portal-ring absolute w-3/4 h-3/4 rounded-full border-2 border-dashed border-mustard/40 animate-[spin_15s_linear_infinite_reverse]" />
            
            <img src={mascotCat} alt="" className="fusion-cat absolute left-[10%] top-[20%] w-32 md:w-44 glow-cat interactive-tilt z-10 drop-shadow-[0_0_30px_rgba(0,255,255,0.4)]" />
            <img src={mascotAi} alt="" className="fusion-robot absolute right-[10%] bottom-[15%] w-36 md:w-52 glow-robot interactive-tilt z-20 drop-shadow-[0_0_40px_rgba(255,215,0,0.4)]" />
          </div>
        </div>
      </section>

      {/* ═══ ACT 5: EMOTIONAL PAUSE — Cinematic Visual Novel Style ═══ */}
      <section id="emotional" className="scene-section bg-ink relative border-b-2 border-ink py-40 overflow-hidden flex items-center justify-center">
        {/* Deep atmospheric gradient overlay instead of full background */}
        <div className="absolute inset-0 bg-gradient-to-t from-rose/20 via-transparent to-transparent pointer-events-none" />
        <div className="scanlines absolute inset-0 opacity-30" />
        <PetalRain count={35} />
        
        <div className="relative mx-auto max-w-4xl px-5 text-center z-10">
          <div className="emotional-box inline-block border border-rose/30 bg-ink/80 backdrop-blur-md p-10 md:p-16 shadow-[0_0_50px_rgba(255,0,128,0.15)]">
            <span className="emotional-text block font-mono text-xs tracking-[0.3em] uppercase text-rose/80 mb-6">
              [ System Check: Optimal ]
            </span>
            <h2 className="font-display text-4xl md:text-6xl text-cream leading-tight">
              <span className="emotional-word inline-block mr-3">Take</span>
              <span className="emotional-word inline-block mr-3">a</span>
              <span className="emotional-word inline-block mr-3">moment.</span>
              <br/>
              <span className="text-rose emotional-word inline-block mr-3 drop-shadow-[0_0_15px_rgba(255,0,128,0.5)] mt-2">Feel</span>
              <span className="text-rose emotional-word inline-block mr-3 drop-shadow-[0_0_15px_rgba(255,0,128,0.5)]">the</span>
              <span className="text-rose emotional-word inline-block drop-shadow-[0_0_15px_rgba(255,0,128,0.5)]">magic.</span>
            </h2>
            <div className="w-12 h-1 bg-rose mx-auto mt-8 mb-6 emotional-line origin-left" />
            <p className="mx-auto max-w-lg font-mono text-sm md:text-base text-cream/60 emotional-desc">
              Every great build starts with a spark of raw inspiration. Let the petals fall, gather your thoughts, and prepare for what comes next.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ ACT 6: SCHEDULE — Shark cinematic entrance ═══ */}
      <section id="schedule" className="scene-section border-b-2 border-ink py-20 relative overflow-hidden">
        <SpeedLinesOverlay />
        <LightBurstEffect />
        <div className="mx-auto max-w-7xl px-5 relative z-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="reveal font-mono text-sm uppercase text-rose">// LHW-S2 — Schedule</span>
              <h2 className="reveal mt-2 font-display text-5xl md:text-6xl">Six days, Six vibes.</h2>
            </div>
            <div className="flex items-center gap-4 interactive-tilt">
              <img src={mascotAi} alt="AI Robot mascot" className="w-24 glow-robot schedule-robot" />
              <span className="font-mono text-xs uppercase text-mustard text-glow-gold">// EP.03 — THE ROBOT</span>
            </div>
          </div>

          <div className="day-grid mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {days.map((d, i) => (
              <button key={d.day} className={`day-card brut brut-hover group relative overflow-hidden ${d.color} p-6 text-left`}>
                <div className="halftone absolute -right-4 -top-4 h-20 w-20 opacity-50" />
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-3xl">{d.day}</span>
                  <span className="font-mono text-xs uppercase">Day 0{i + 1}</span>
                </div>
                <h3 className="mt-4 font-display text-2xl leading-tight">{d.title}</h3>
                <p className="mt-2 font-mono text-sm text-ink/80">{d.theme}</p>
                <div className="mt-6 inline-flex items-center gap-2 border-b-2 border-ink pb-0.5 font-mono text-xs uppercase">View schedule →</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ACT 7: FINALE — All three unite ═══ */}
      <section id="join" className="scene-section scene-finale relative overflow-hidden border-b-2 border-ink py-24 text-cream">
        <div className="scanlines absolute inset-0" />
        <div className="rays absolute inset-0 opacity-30" />
        <AmbientBlobs scene="finale" />
        <Sparkles count={20} color="gold" />
        <PetalRain count={12} />

        <div className="relative mx-auto max-w-5xl px-5">
          {/* Three mascots united */}
          <div className="flex justify-center gap-6 md:gap-12 mb-12">
            <div className="finale-mascot text-center interactive-tilt">
              <img src={mascotCat} alt="Cat" className="w-24 md:w-32 glow-cat mascot-idle" />
              <span className="mt-2 block font-mono text-xs uppercase text-glow-cyan">Hack</span>
            </div>
            <div className="finale-mascot text-center interactive-tilt" style={{ animationDelay: "0.5s" }}>
              <img src={mascotAi} alt="Robot" className="w-24 md:w-32 glow-robot mascot-idle" style={{ animationDelay: "1s" }} />
              <span className="mt-2 block font-mono text-xs uppercase text-glow-gold">Build</span>
            </div>
            <div className="finale-mascot text-center interactive-tilt" style={{ animationDelay: "1s" }}>
              <img src={mascotShark} alt="Shark" className="w-24 md:w-32 glow-shark mascot-idle" style={{ animationDelay: "2s" }} />
              <span className="mt-2 block font-mono text-xs uppercase text-glow-rose">Ship</span>
            </div>
          </div>

          <div className="text-center">
            <span className="font-mono text-sm uppercase text-cream/80">// FINAL EPISODE</span>
            <h2 className="reveal mt-3 font-display text-6xl leading-none md:text-8xl chroma">
              SEE YOU<br />ONLINE.
            </h2>
            <p className="reveal mx-auto mt-6 max-w-xl font-mono text-lg text-cream/90">
              Free. Open. Worldwide. Press start and join the Local Hack Week crew this season.
            </p>
            <div className="reveal mt-8 flex flex-wrap justify-center gap-3">
              <a href="#" className="brut-lg brut-hover bg-cream px-7 py-3 font-display text-lg text-ink">► REGISTER NOW</a>
              <a href="#" className="brut-lg brut-hover bg-ink px-7 py-3 font-display text-lg text-cream">JOIN DISCORD</a>
            </div>
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
