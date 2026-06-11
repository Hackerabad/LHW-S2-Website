import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, Check } from "lucide-react";
import { Link } from "@tanstack/react-router";
import mascotAi from "@/assets/mascot-ai.png";

gsap.registerPlugin(ScrollTrigger);

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".newsletter-eyebrow", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".newsletter-title", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".newsletter-form", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".newsletter-mascot", {
        x: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.to(".newsletter-mascot", {
        y: -12,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setSubmitted(true);
  };

  return (
    <section
      id="newsletter"
      ref={sectionRef}
      className="relative bg-[var(--mint)] border-b-[3px] border-[var(--ink)] overflow-hidden"
    >
      {/* Background Watermark */}
      <div
        aria-hidden
        className="
          absolute
          inset-0
          flex
          items-center
          justify-center
          pointer-events-none
          select-none
        "
      >
        <span
          className="
            font-display
            font-black
            text-[18vw]
            leading-none
            text-black/[0.03]
            tracking-[-0.08em]
          "
        >
          JOIN
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24">

        <div className="grid lg:grid-cols-[1fr_420px] gap-16 lg:gap-20 items-center">

          {/* Content */}
          <div>

            <div className="newsletter-eyebrow mb-6">
              <span className="font-mono text-xs uppercase tracking-[0.35em] font-bold">
                JOIN THE COMMUNITY
              </span>
            </div>




            <h2 className="
              newsletter-title
              font-display
              text-5xl
              md:text-7xl
              leading-[0.9]
              tracking-[-0.05em]
              mb-8
              max-w-4xl
            ">
              Be there before
              <br />
              everyone else.
            </h2>

            {!submitted ? (
              <>
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="newsletter-form max-w-2xl"
                >
                  <div className="flex flex-col sm:flex-row">

                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      placeholder="your@email.com"
                      aria-label="Email address"
                      className="
                        flex-1
                        border-[3px]
                        border-black
                        bg-[var(--paper)]
                        px-5
                        py-4
                        text-lg
                        font-medium
                        outline-none
                        placeholder:text-neutral-400
                      "
                    />

                    <button
                      type="submit"
                      className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        border-[3px]
                        border-black
                        sm:border-l-0
                        bg-[#FFC900]
                        px-8
                        py-4
                        font-display
                        uppercase
                        transition-transform
                        hover:-translate-y-[2px]
                      "
                    >
                      Join
                      <Send size={16} />
                    </button>
                  </div>

                  {error && (
                    <p className="mt-3 text-sm font-semibold text-red-700">
                      {error}
                    </p>
                  )}
                </form>

                <p className="mt-6 max-w-md text-neutral-700 leading-relaxed">
                  Registrations. Workshop schedules. Project showcases. Community updates. One email at a time.
                </p>
              </>
            ) : (
              <div className="
                mt-4
                inline-flex
                items-center
                gap-4
                border-[3px]
                border-black
                bg-[var(--paper)]
                px-6
                py-5
              ">
                <div className="
                  w-12
                  h-12
                  border-[3px]
                  border-black
                  flex
                  items-center
                  justify-center
                  bg-[#FFC900]
                ">
                  <Check size={24} />
                </div>

                <div>
                  <div className="font-display text-2xl">
                    You're in.
                  </div>

                  <p className="text-sm text-neutral-600 mt-1">
                    We'll let you know when the next build begins.
                  </p>
                </div>
              </div>
            )}

            {/* Volunteer & Contact Cards */}
            <div className="mt-12 grid md:grid-cols-2 gap-6 max-w-2xl">
              <Link
                to="/volunteer"
                className="
                  group
                  border-[3px]
                  border-black
                  bg-[var(--paper)]
                  p-6
                  transition-all
                  hover:-translate-y-1
                "
              >
                <div className="text-xs font-mono uppercase tracking-[0.25em] mb-3">
                  Volunteer
                </div>

                <h3 className="font-display text-3xl leading-none mb-4">
                  Help Run
                  <br />
                  The Week
                </h3>

                <p className="text-neutral-700 text-sm leading-relaxed mb-6">
                  Support workshops, manage participants,
                  coordinate sessions and help shape the experience.
                </p>

                <div className="flex items-center gap-2 font-bold uppercase text-sm">
                  Apply Now
                  <Send size={14} />
                </div>
              </Link>

              <a
                href="mailto:hello@hackerabad.com"
                className="
                  group
                  border-[3px]
                  border-black
                  bg-[#FFC900]
                  p-6
                  transition-all
                  hover:-translate-y-1
                "
              >
                <div className="text-xs font-mono uppercase tracking-[0.25em] mb-3">
                  Contact
                </div>

                <h3 className="font-display text-3xl leading-none mb-4">
                  Questions?
                  <br />
                  Let's Talk.
                </h3>

                <p className="text-sm leading-relaxed mb-6">
                  Sponsorships, partnerships, speaking opportunities,
                  community support or anything else.
                </p>

                <div className="flex items-center gap-2 font-bold uppercase text-sm">
                  Contact Us
                  <Send size={14} />
                </div>
              </a>
            </div>

          </div>

          {/* Mascot */}
          <div className="flex justify-center lg:justify-end">
            <img
              src={mascotAi}
              alt="Robot mascot"
              className="
                newsletter-mascot
                w-[240px]
                md:w-[320px]
                lg:w-[420px]
                h-auto
                object-contain
                select-none
                pointer-events-none
              "
            />
          </div>

        </div>
      </div>
    </section>
  );
}
