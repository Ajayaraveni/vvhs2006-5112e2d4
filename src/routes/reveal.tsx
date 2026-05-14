import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import dossier1 from "@/assets/dossier-1.jpg";
import dossier2 from "@/assets/dossier-2.jpg";
import dossier3 from "@/assets/dossier-3.jpg";
import dossier4 from "@/assets/dossier-4.jpg";

export const Route = createFileRoute("/reveal")({
  component: RevealPage,
});

type Mood = "mass" | "comedy" | "silent" | "sports";

interface Dossier {
  id: string;
  name: string;
  title: string;
  mood: Mood;
  moodLabel: string;
  section: string;
  roll: string;
  portrait: string;
  records: string[];
  incident: string;
  status: string;
  quote: string;
}

const DOSSIERS: Dossier[] = [
  {
    id: "001",
    name: "Nayan",
    title: "The Early Morning Escapist",
    mood: "mass",
    moodLabel: "Mass Legend",
    section: "B",
    roll: "27",
    portrait: dossier1,
    records: [
      "Morning assembly evasion",
      "Excessive classroom energy",
      "Unauthorized lunch cricket operations",
    ],
    incident: "Caught laughing during silent study hour.",
    status: "Still operating with 2006 energy.",
    quote: "Some legends never left the last bench.",
  },
  {
    id: "002",
    name: "Karthik",
    title: "The Mimicry Minister",
    mood: "comedy",
    moodLabel: "Comedy Chaos",
    section: "A",
    roll: "14",
    portrait: dossier2,
    records: [
      "Impersonating physics teacher mid-lecture",
      "Spontaneous backbench stand-up sessions",
      "Suspected weaponization of laughter",
    ],
    incident: "Made the principal laugh during punishment.",
    status: "Currently producing reels nobody asked for.",
    quote: "He didn't disturb the class. He was the class.",
  },
  {
    id: "003",
    name: "Meghana",
    title: "The Silent Observer",
    mood: "silent",
    moodLabel: "Silent Legend",
    section: "C",
    roll: "08",
    portrait: dossier3,
    records: [
      "Watched everything. Said nothing.",
      "Topped exams without anyone noticing",
      "Unmatched corner-of-the-room presence",
    ],
    incident: "Smiled once in 2005. Still talked about.",
    status: "Now leading a team that doesn't realize she runs it.",
    quote: "The quietest seat held the loudest mind.",
  },
  {
    id: "004",
    name: "Arjun",
    title: "The Ground Floor King",
    mood: "sports",
    moodLabel: "Sports King",
    section: "A",
    roll: "33",
    portrait: dossier4,
    records: [
      "Cricket every interval, no exceptions",
      "Permanent ground booking by intimidation",
      "Sportsday medals · classification: many",
    ],
    incident: "Hit a six that broke the staff room window. Twice.",
    status: "Still believes the next match is the big one.",
    quote: "The ground remembers his footsteps.",
  },
];

const MOOD_ACCENT: Record<Mood, { hue: string; label: string; sub: string }> = {
  mass:    { hue: "oklch(0.55 0.20 30)",  label: "M-CLASS LEGEND",   sub: "High-impact subject. Approach with awe." },
  comedy:  { hue: "oklch(0.78 0.16 70)",  label: "C-CLASS DISRUPTOR", sub: "Weaponized humor. Laughter advisory in effect." },
  silent:  { hue: "oklch(0.65 0.10 65)",  label: "S-CLASS OBSERVER",  sub: "Low signature. High signal. Do not underestimate." },
  sports:  { hue: "oklch(0.70 0.15 50)",  label: "K-CLASS ATHLETE",   sub: "Field dominant. Ground attendance: 100%." },
};

const ROTATE_MS = 15000;
const INTRO_MS = 2600;

function RevealPage() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"intro" | "dossier">("intro");

  useEffect(() => {
    setPhase("intro");
    const introTimer = setTimeout(() => setPhase("dossier"), INTRO_MS);
    const advance = setTimeout(() => {
      setIndex((i) => (i + 1) % DOSSIERS.length);
    }, ROTATE_MS);
    return () => {
      clearTimeout(introTimer);
      clearTimeout(advance);
    };
  }, [index]);

  const d = DOSSIERS[index];
  const accent = MOOD_ACCENT[d.mood];

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-background texture-grain scanlines"
      style={{ ["--accent" as never]: accent.hue }}
    >
      {/* Ambient mood glow */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-40 left-1/4 h-[700px] w-[900px] rounded-full opacity-25 blur-[160px] animate-drift"
          style={{ background: accent.hue }}
        />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-[oklch(0.78_0.13_78/0.10)] blur-[140px]" />
      </div>

      {/* Top bar */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6 sm:px-14">
        <div className="flex items-center gap-3 font-dossier text-[11px] text-sepia">
          <span className="h-2 w-2 animate-flicker rounded-full bg-ember" />
          <span>BATCH 2006 · LIVE SCREENING</span>
        </div>
        <div className="font-mono text-[11px] text-muted-foreground">
          DOSSIER {String(index + 1).padStart(2, "0")} / {String(DOSSIERS.length).padStart(2, "0")}
        </div>
      </header>

      {/* Stage */}
      <main className="relative z-10 px-6 sm:px-14">
        {phase === "intro" ? (
          <IntroPhase d={d} accent={accent} key={`intro-${d.id}`} />
        ) : (
          <DossierPhase d={d} accent={accent} key={`doss-${d.id}`} />
        )}
      </main>

      {/* Progress + footer */}
      <footer className="absolute bottom-0 left-0 right-0 z-10 px-8 pb-6 sm:px-14">
        <div className="mb-4 flex items-center gap-2">
          {DOSSIERS.map((_, i) => (
            <div
              key={i}
              className="h-[2px] flex-1 overflow-hidden bg-border/50"
            >
              <div
                className="h-full bg-gold transition-all"
                style={{
                  width: i < index ? "100%" : i === index ? "100%" : "0%",
                  animation:
                    i === index ? `progress ${ROTATE_MS}ms linear forwards` : undefined,
                }}
              />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between font-dossier text-[10px] text-muted-foreground/70">
          <span>A COGNOSY AI EXPERIENCE</span>
          <span>ARCHIVE №2006 · AUTHORIZED VIEWING</span>
        </div>
      </footer>

      <style>{`
        @keyframes progress { from { width: 0%; } to { width: 100%; } }
      `}</style>
    </div>
  );
}

function IntroPhase({ d, accent }: { d: Dossier; accent: { label: string; sub: string } }) {
  return (
    <div className="flex min-h-[calc(100vh-160px)] items-center justify-center text-center animate-cine-fade-slow">
      <div>
        <div
          className="mb-6 inline-flex items-center gap-3 font-dossier text-xs"
          style={{ color: "var(--accent)" }}
        >
          <span className="h-px w-8" style={{ background: "var(--accent)" }} />
          <span>{accent.label}</span>
          <span className="h-px w-8" style={{ background: "var(--accent)" }} />
        </div>
        <h1 className="font-display text-7xl font-black leading-[0.95] text-archive sm:text-9xl animate-cine-rise">
          {d.name}
        </h1>
        <p className="mt-6 font-display text-2xl italic text-gold sm:text-3xl animate-cine-fade [animation-delay:600ms] animate-shimmer-gold">
          {d.title}
        </p>
        <p className="mt-8 font-dossier text-[11px] text-muted-foreground animate-cine-fade [animation-delay:1200ms]">
          {accent.sub}
        </p>
      </div>
    </div>
  );
}

function DossierPhase({ d, accent }: { d: Dossier; accent: { label: string; sub: string } }) {
  return (
    <div className="grid min-h-[calc(100vh-200px)] items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
      {/* LEFT: Dossier text */}
      <div className="order-2 space-y-8 lg:order-1 animate-cine-fade">
        <div>
          <div
            className="mb-3 inline-flex items-center gap-2 font-dossier text-[11px]"
            style={{ color: "var(--accent)" }}
          >
            <span className="h-px w-6" style={{ background: "var(--accent)" }} />
            DOSSIER №{d.id} · SECTION {d.section} · ROLL {d.roll}
          </div>
          <h2 className="font-display text-6xl font-black leading-[0.95] text-archive sm:text-8xl">
            {d.name}
          </h2>
          <p className="mt-3 font-display text-xl italic text-gold sm:text-2xl">
            {d.title}
          </p>
        </div>

        <div className="grid gap-6">
          <Section label="Classified Records">
            <ul className="space-y-2">
              {d.records.map((r, i) => (
                <li key={i} className="flex gap-3 font-display text-lg text-archive sm:text-xl">
                  <span className="font-mono text-sm text-sepia pt-1.5">0{i + 1}</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section label="Most Reported Incident">
            <p className="font-display text-lg italic text-archive sm:text-xl">
              "{d.incident}"
            </p>
          </Section>

          <Section label="Current Status">
            <p className="font-display text-lg text-archive sm:text-xl">{d.status}</p>
          </Section>
        </div>

        <div className="border-t border-sepia/20 pt-5">
          <p className="font-display text-base italic text-sepia sm:text-lg">
            "{d.quote}"
          </p>
        </div>
      </div>

      {/* RIGHT: Portrait */}
      <div className="relative order-1 lg:order-2 animate-cine-zoom">
        <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden dossier-frame bg-card lg:max-w-none">
          <img
            src={d.portrait}
            alt={d.name}
            className="h-full w-full object-cover"
          />
          {/* Color tint overlay matching mood */}
          <div
            className="pointer-events-none absolute inset-0 mix-blend-color opacity-30"
            style={{ background: "var(--accent)" }}
          />
          {/* Vignette */}
          <div className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_45%,oklch(0_0_0/0.7)_100%)]" />
          {/* Grain */}
          <div className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay [background-image:url('data:image/svg+xml;utf8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%22200%22%20height=%22200%22><filter%20id=%22n%22><feTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.9%22%20numOctaves=%222%22/></filter><rect%20width=%22100%25%22%20height=%22100%25%22%20filter=%22url(%23n)%22/></svg>')]" />

          {/* Stamps */}
          <div
            className="stamp absolute right-5 top-5"
            style={{ color: "var(--accent)" }}
          >
            CLASSIFIED
          </div>
          <div className="absolute bottom-5 left-5 font-dossier text-[10px] text-archive/80">
            <div>FILE №{d.id} · 2006</div>
            <div className="mt-1 text-sepia">{accent.label}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2 font-dossier text-[10px] text-sepia">
        <span className="h-px w-5 bg-sepia/50" />
        {label}
      </div>
      {children}
    </div>
  );
}
