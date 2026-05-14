import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/success")({
  component: SuccessPage,
});

function SuccessPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background texture-grain scanlines vignette">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[oklch(0.78_0.13_78/0.08)] blur-[140px] animate-drift" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
        {/* Top mark */}
        <div className="mb-12 flex items-center gap-3 font-dossier text-[11px] text-sepia animate-cine-fade-slow">
          <span className="h-px w-12 bg-sepia/40" />
          <span>ARCHIVE TRANSMISSION RECEIVED</span>
          <span className="h-px w-12 bg-sepia/40" />
        </div>

        {/* Seal / icon */}
        <div className="relative mb-10 flex h-32 w-32 items-center justify-center animate-cine-zoom">
          <div className="absolute inset-0 rounded-full border border-gold/40 animate-flicker" />
          <div className="absolute inset-3 rounded-full border border-sepia/30" />
          <div className="absolute inset-0 rounded-full bg-[oklch(0.78_0.13_78/0.12)] blur-2xl" />
          <svg viewBox="0 0 24 24" className="relative h-12 w-12 text-gold">
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 12.5l4.5 4.5L19 7.5"
            />
          </svg>
        </div>

        <h1 className="font-display text-4xl font-bold leading-[1.1] text-archive sm:text-6xl animate-cine-rise">
          Identity reconstruction
          <br />
          <span className="italic text-gold animate-shimmer-gold">completed.</span>
        </h1>

        <p className="mx-auto mt-8 max-w-lg font-display text-lg text-muted-foreground sm:text-xl animate-cine-fade [animation-delay:300ms]">
          Wait for the result at the
          <span className="text-sepia"> Batch 2006 screening.</span>
        </p>

        <div className="mt-14 h-px w-24 bg-sepia/30" />

        <p className="mt-6 font-dossier text-[11px] text-muted-foreground/70 animate-cine-fade [animation-delay:600ms]">
          A Cognosy AI Experience
        </p>

        <Link
          to="/"
          className="mt-10 font-dossier text-[11px] text-sepia/70 hover:text-gold transition-colors"
        >
          ← Return to archive entry
        </Link>
      </div>
    </div>
  );
}
