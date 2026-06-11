import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Youtube,
  Instagram,
  Github,
  ArrowRight,
  Menu,
  X,
  Zap,
  ArrowUp,
} from "lucide-react";

// Assets
import mascotAi from "@/assets/mascot-ai.png";
import mascotShark from "@/assets/mascot-shark.png";
import logoLhw from "@/assets/logo-lhw.png";
import logoWordmark from "@/assets/logo-wordmark.png";
import aic from "@/assets/aic.png";
import eca from "@/assets/ECA.png";
import hackerabad from "@/assets/Hackerabad.png";

// Section components
import { HeroSection } from "@/components/sections/HeroSection";
import { CharacterIntro } from "@/components/sections/CharacterIntro";
import { CommunityJourney } from "@/components/sections/CommunityJourney";
import { CTASection } from "@/components/sections/CTASection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { SponsorsSection } from "@/components/sections/SponsorsSection";

export const Route = createFileRoute("/")({
  component: Index,
});

gsap.registerPlugin(ScrollTrigger);

const navLeft = [
  { href: "#characters", label: "About" },
  { href: "#feature-explore", label: "Explore" },
];
const navRight = [
  { href: "#resources", label: "Resources" },
  { href: "#journey", label: "Journey" },
];

function Index() {
  const navRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Sticky nav background & Back to Top logic
  useEffect(() => {
    const onScroll = () => {
      const nav = navRef.current;
      if (nav) {
        if (window.scrollY > 60) {
          nav.classList.add("nav-solid");
        } else {
          nav.classList.remove("nav-solid");
        }
      }
      setShowBackToTop(window.scrollY > 400);
    };
    
    // Initial check
    onScroll();
    
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Marquee pause when off-screen
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced && marqueeRef.current) {
      marqueeRef.current.style.animationPlayState = "paused";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (marqueeRef.current) {
          marqueeRef.current.style.animationPlayState = entry.isIntersecting ? "running" : "paused";
        }
      },
      { threshold: 0 }
    );

    if (marqueeRef.current) {
      observer.observe(marqueeRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Navigation entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".nav-anim", {
        opacity: 0,
        y: -20,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "all",
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)] overflow-x-hidden relative">

      {/* ═══ HEADER / NAV ═══ */}
      {/* Desktop Navigation */}
      <div className="hidden md:flex fixed top-8 left-1/2 -translate-x-1/2 z-50">
        <a href="#top" className="nav-anim flex items-center justify-center bg-[var(--ink)] text-[var(--paper)] rounded-full px-6 py-2.5 font-display text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-sm">
          LHW / S2
        </a>
      </div>

      <nav className="hidden md:flex fixed top-[82px] right-8 z-50 flex-col items-end gap-2.5">
        {[
          { href: "#characters", label: "About" },
          { href: "#journey", label: "Explore" },
          { href: "#join", label: "Register" },
          { href: "#newsletter", label: "Contact Us" },
        ].map((item, i) => (
          <a
            key={item.href}
            href={item.href}
            className="nav-anim flex items-center justify-center bg-[var(--ink)] text-[var(--paper)] rounded-full px-6 py-2.5 font-display text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-sm"
          >
            {item.label}
          </a>
        ))}
        <Link
          to="/faq"
          className="nav-anim flex items-center justify-center bg-[var(--ink)] text-[var(--paper)] rounded-full px-6 py-2.5 font-display text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-sm"
        >
          FAQs
        </Link>
      </nav>

      {/* Mobile Navigation */}
      <header className="md:hidden fixed top-0 w-full z-50 flex justify-between items-center p-4 bg-[var(--paper)]/95 backdrop-blur-sm border-b border-[var(--ink)]/10">
        <a href="#top" className="flex items-center justify-center bg-[var(--ink)] text-[var(--paper)] rounded-full px-5 py-2 font-display text-xs uppercase tracking-widest">
          LHW / S2
        </a>
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="w-10 h-10 rounded-full bg-[var(--ink)] text-[var(--paper)] flex items-center justify-center"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>

      {mobileOpen && (
        <div className="md:hidden fixed top-[72px] left-0 w-full z-40 bg-[var(--paper)] border-b-2 border-[var(--ink)] shadow-xl flex flex-col p-4 gap-3">
          {[
            { href: "#characters", label: "About" },
            { href: "#journey", label: "Explore" },
            { href: "#join", label: "Register" },
            { href: "#newsletter", label: "Contact Us" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center bg-[var(--ink)] text-[var(--paper)] rounded-full px-6 py-2.5 font-display text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-sm"
            >
              {item.label}
            </a>
          ))}
          <Link
            to="/faq"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center bg-[var(--ink)] text-[var(--paper)] rounded-full px-6 py-2.5 font-display text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-sm"
          >
            FAQs
          </Link>
        </div>
      )}

      {/* ═══ HERO ═══ */}
      <HeroSection />

      {/* ═══ SECTION ORDER (DESIGN.MD) ═══ */}

      {/* Animated Smooth Divider */}
      <div className="w-full py-16 md:py-24 bg-[var(--ink)] overflow-hidden flex relative border-b border-[var(--ink)]/10">
        <div className="absolute inset-0 bg-grid opacity-10 mix-blend-overlay"></div>
        <div ref={marqueeRef} className="animate-marquee flex gap-12 whitespace-nowrap items-center w-max relative z-10" style={{ willChange: "transform" }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={`div-${i}`} className="flex gap-12 items-center">
              <span className="font-display text-[var(--paper)] text-5xl md:text-8xl uppercase tracking-tight opacity-95">
                Design
              </span>
              <span className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-[var(--sun)]"></span>
              <span className="font-display text-[var(--paper)] text-5xl md:text-8xl uppercase tracking-tight opacity-95">
                Build
              </span>
              <span className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-[var(--mint)]"></span>
              <span className="font-display text-[var(--paper)] text-5xl md:text-8xl uppercase tracking-tight opacity-95">
                Lead
              </span>
              <span className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-[var(--sky)]"></span>
              <span className="font-display text-5xl md:text-8xl uppercase tracking-tight flex items-center gap-3 md:gap-5">
                <span className="bg-[var(--sun)] text-[var(--ink)] px-3 md:px-5 py-1 inline-block">HACKERABAD</span>
                <span className="text-[var(--paper)] text-3xl md:text-5xl inline-block rotate-12 font-black select-none">✕</span>
                <span className="bg-[var(--mint)] text-[var(--ink)] px-3 md:px-5 py-1 inline-block">AIC</span>
                <span className="text-[var(--paper)] text-3xl md:text-5xl inline-block -rotate-12 font-black select-none">✕</span>
                <span className="bg-[var(--sky)] text-[var(--ink)] px-3 md:px-5 py-1 inline-block">ECA</span>
              </span>
              <span className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-[var(--pink)]"></span>
            </div>
          ))}
        </div>
      </div>

      {/* 9. Community Journey */}
      <CommunityJourney />

      {/* 10. Sponsors */}
      <SponsorsSection />

      {/* 11. CTA / Join */}
      <CTASection />

      {/* 12. Newsletter */}
      <NewsletterSection />

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-[var(--ink)] text-[var(--paper)] border-t-4 border-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 pt-8 pb-10">

          {/* ── Top: Register link (top-right) ── */}
          <div className="flex justify-end mb-10">
            <a
              href="#join"
              className="text-[11px] uppercase tracking-[0.3em] opacity-60 hover:opacity-100 hover:text-[#FFC900] transition-all"
            >
              Register ↗
            </a>
          </div>

          {/* ── Hero Grid: Left content + Right Map ── */}
          <div className="grid md:grid-cols-[1fr_auto] gap-12 md:gap-16 items-start mb-12">

            {/* Left Column */}
            <div className="flex flex-col gap-7 max-w-xl">
              {/* Wordmark */}
              <img
                src={logoWordmark}
                alt="Local Hack Week"
                className="w-full max-w-[600px] h-auto object-contain opacity-90"
              />

              {/* Description */}
              <p className="text-sm md:text-base font-medium leading-relaxed text-neutral-400 max-w-sm">
                Six days of learning, building, shipping and meeting
                incredible people. One week can change everything.
              </p>

              {/* CTA Button */}
              <a
                href="https://www.youtube.com/"
                className="inline-flex items-center justify-center bg-[#FF0000] text-white font-display uppercase tracking-wider px-8 py-4 text-sm hover:-translate-y-[2px] transition-transform w-full max-w-sm"
              >
                Youtube Link →
              </a>
            </div>

            {/* Right Column: Map */}
            <div
              className="w-full md:w-[380px] lg:w-[440px] flex-shrink-0 rounded-lg overflow-hidden border-2 border-white/10"
              style={{ height: "280px" }}
            >
              <iframe
                title="SNIST Location"
                src="https://maps.google.com/maps?width=440&height=280&hl=en&q=Sreenidhi+Institute+Of+Science+and+Technology&t=&z=14&ie=UTF8&iwloc=B&output=embed"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* ── Divider ── */}
          <div className="border-t-2 border-white/10 mb-6" />

          {/* ── Footer Bottom: Copyright + Nav ── */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-[0.25em] opacity-50">
              Local Hack Week © 2026
            </span>

            <div className="flex items-center gap-5 text-sm font-medium">
              <a href="#schedule" className="hover:text-[#FFC900] transition-colors">Schedule</a>
              <a href="#sponsors" className="hover:text-[#FFC900] transition-colors">Sponsors</a>
              <a href="#join" className="hover:text-[#FFC900] transition-colors">Register</a>
            </div>
          </div>

        </div>
      </footer>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--ink)] text-[var(--paper)] shadow-lg transition-transform hover:-translate-y-1 hover:bg-[var(--sun)] hover:text-[var(--ink)] border-2 border-[var(--ink)] md:bottom-12 md:right-12"
          aria-label="Back to top"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
}
