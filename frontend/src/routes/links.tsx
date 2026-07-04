import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Instagram, Youtube, Globe, ArrowUpRight, ArrowLeft } from "lucide-react";
import mascotCat from "@/assets/mascot-cat.png";

export const Route = createFileRoute("/links")({
  component: LinksPage,
});

type LinkItem = {
  label: string;
  handle: string;
  href: string;
  icon: React.ReactNode;
  bg: string;
};

function XIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function DiscordIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

const links: LinkItem[] = [
  {
    label: "Gmail",
    handle: "hackclubhackerabad@gmail.com",
    href: "mailto:hackclubhackerabad@gmail.com",
    icon: <Mail size={28} strokeWidth={2.5} />,
    bg: "var(--sun)",
  },
  {
    label: "Instagram",
    handle: "@_hackerabad",
    href: "https://www.instagram.com/_hackerabad/",
    icon: <Instagram size={28} strokeWidth={2.5} />,
    bg: "var(--pink)",
  },
  {
    label: "YouTube",
    handle: "@hackerabad",
    href: "https://www.youtube.com/@hackerabad",
    icon: <Youtube size={28} strokeWidth={2.5} />,
    bg: "var(--coral)",
  },
  {
    label: "X (Twitter)",
    handle: "@hackerabad",
    href: "https://x.com/hackerabad",
    icon: <XIcon size={26} />,
    bg: "var(--sky)",
  },
  {
    label: "Discord",
    handle: "Join the community",
    href: "https://discord.gg/eBp6esZw5h",
    icon: <DiscordIcon size={26} />,
    bg: "var(--lilac)",
  },
  {
    label: "Website",
    handle: "localhackweek.com",
    href: "https://localhackweek.com/",
    icon: <Globe size={28} strokeWidth={2.5} />,
    bg: "var(--mint)",
  },
];

function LinksPage() {
  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)] relative overflow-hidden flex flex-col items-center">
      {/* Background dots */}
      <div className="absolute inset-0 bg-dots opacity-[0.04] pointer-events-none" aria-hidden />

      {/* Watermark */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none w-full text-center"
      >
        <span className="font-display font-black text-[26vw] leading-none text-black/[0.025] tracking-[-0.08em]">
          LINKS
        </span>
      </div>

      <div className="relative z-10 w-full max-w-xl mx-auto px-6 pt-16 pb-12 flex flex-col items-center">
        {/* Back link */}
        <Link
          to="/"
          className="self-start inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] opacity-60 hover:opacity-100 transition-opacity mb-10"
        >
          <ArrowLeft size={14} /> Back to Home
        </Link>

        {/* Mascot avatar */}
        <div className="relative mb-6">
          <div className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-[var(--mint)] border-4 border-[var(--ink)] shadow-[6px_6px_0_0_var(--ink)] overflow-hidden flex items-end justify-center">
            <img
              src={mascotCat}
              alt="Hackerabad Mascot"
              className="w-full h-[115%] object-contain object-bottom p-2"
              loading="lazy"
              decoding="async"
            />
          </div>
          {/* Sticker burst */}
          <div className="burst absolute -top-3 -right-3 w-14 h-14 bg-[var(--sun)] border-[3px] border-[var(--ink)] flex items-center justify-center rotate-12">
            <span className="font-display text-[10px] uppercase leading-tight text-center text-[var(--ink)]">
              Hi!
            </span>
          </div>
        </div>

        {/* Name + eyebrow */}
        <div className="text-center mb-1">
          <span className="font-handwritten text-2xl text-[var(--teal)] opacity-80">
            find us everywhere
          </span>
        </div>
        <h1 className="font-display text-[clamp(2.5rem,8vw,4rem)] leading-[0.9] tracking-[-0.04em] uppercase text-center mb-2">
          HACKERABAD
        </h1>
        <p className="font-mono text-xs uppercase tracking-[0.2em] opacity-50 text-center mb-10">
          Local Hack Week · Season 2
        </p>

        {/* Link buttons */}
        <div className="w-full flex flex-col gap-4">
          {links.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={item.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className="
                group flex items-center gap-4
                w-full
                border-4 border-[var(--ink)]
                px-5 py-4
                shadow-[6px_6px_0_0_var(--ink)]
                transition-all
                hover:-translate-y-1 hover:shadow-[8px_8px_0_0_var(--ink)]
                active:translate-y-0 active:shadow-[3px_3px_0_0_var(--ink)]
              "
              style={{ background: item.bg }}
            >
              {/* Icon box */}
              <span className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-[var(--paper)] border-[3px] border-[var(--ink)] rounded-full">
                {item.icon}
              </span>

              {/* Label + handle */}
              <span className="flex flex-col min-w-0 flex-1">
                <span className="font-display uppercase tracking-wide text-lg leading-none">
                  {item.label}
                </span>
                <span className="font-mono text-xs opacity-70 truncate mt-1">{item.handle}</span>
              </span>

              {/* Arrow */}
              <ArrowUpRight
                size={24}
                strokeWidth={3}
                className="flex-shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-12 flex flex-col items-center gap-3">
          <div className="w-16 h-[3px] bg-[var(--ink)] opacity-20" />
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] opacity-40 text-center">
            Made with ❤ by Hackerabad · © 2026
          </p>
        </div>
      </div>
    </div>
  );
}
