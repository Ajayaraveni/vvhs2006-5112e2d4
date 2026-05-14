import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useRef } from "react";

export const Route = createFileRoute("/")({
  component: FormPage,
});

const FAMOUS_FOR = [
  "Nonstop Talking", "Homework Copying", "Last Bench", "Cricket", "Fighting",
  "Mimicry", "Comedy", "Late Coming", "Sleeping in Class", "Teacher's Favorite",
  "Assembly Escape", "Backbench Gang", "Lunch Box Raids", "Attendance Shortage",
  "Dance/Singing", "Sports", "Silent Observer", "Chalk Piece Attacks",
  "Punishment Regular", "Class Leader",
];

function FormPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [gender, setGender] = useState<"Male" | "Female" | "">("");
  const [section, setSection] = useState<"A" | "B" | "C" | "">("");
  const [roll, setRoll] = useState("");
  const [m1, setM1] = useState("");
  const [m2, setM2] = useState("");
  const [m3, setM3] = useState("");
  const [famous, setFamous] = useState<string[]>([]);
  const [photo, setPhoto] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const toggleFamous = (tag: string) => {
    setFamous((prev) => {
      if (prev.includes(tag)) return prev.filter((t) => t !== tag);
      if (prev.length >= 2) return prev;
      return [...prev, tag];
    });
  };

  const onPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result as string);
    reader.readAsDataURL(f);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/success" });
  };

  const valid = name && gender && section && m1 && m2 && famous.length > 0 && photo;

  return (
    <div className="relative min-h-screen overflow-hidden bg-background texture-grain scanlines">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[oklch(0.55_0.20_30/0.12)] blur-[120px] animate-drift" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-[oklch(0.78_0.13_78/0.10)] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 py-16 sm:py-24">
        {/* Header */}
        <header className="mb-16 text-center animate-cine-rise">
          <div className="mb-6 flex items-center justify-center gap-3 font-dossier text-xs text-sepia">
            <span className="h-px w-10 bg-sepia/40" />
            <span>CONFIDENTIAL · ARCHIVE 2006</span>
            <span className="h-px w-10 bg-sepia/40" />
          </div>
          <h1 className="font-display text-5xl font-bold leading-[1.05] text-archive sm:text-7xl animate-shimmer-gold">
            Batch 2006
          </h1>
          <h2 className="mt-2 font-display text-3xl italic text-gold sm:text-4xl">
            Archive Access
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-dossier text-sm text-muted-foreground sm:text-base">
            Classified student records reopening after 20 years.
          </p>
        </header>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="dossier-frame relative space-y-10 rounded-sm bg-card/60 p-8 backdrop-blur-sm sm:p-12 animate-cine-fade"
        >
          <CornerStamps />

          <Field label="Full Name" required>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="As recorded in school register"
              className="w-full bg-transparent border-b border-border pb-3 font-display text-xl text-archive placeholder:text-muted-foreground/50 focus:border-gold focus:outline-none transition-colors"
            />
          </Field>

          <Field label="Gender" required>
            <div className="flex flex-wrap gap-3">
              {(["Male", "Female"] as const).map((g) => (
                <PillButton key={g} active={gender === g} onClick={() => setGender(g)}>{g}</PillButton>
              ))}
            </div>
          </Field>

          <Field label="Section" required>
            <div className="flex flex-wrap gap-3">
              {(["A", "B", "C"] as const).map((s) => (
                <PillButton key={s} active={section === s} onClick={() => setSection(s)}>{s}</PillButton>
              ))}
            </div>
          </Field>

          <Field label="Roll Number" optional>
            <input
              value={roll}
              onChange={(e) => setRoll(e.target.value)}
              placeholder="e.g. 27"
              className="w-full bg-transparent border-b border-border pb-3 font-mono text-lg text-archive placeholder:text-muted-foreground/50 focus:border-gold focus:outline-none transition-colors"
            />
          </Field>

          <Field label="Memory 01" required>
            <textarea
              value={m1}
              onChange={(e) => setM1(e.target.value)}
              required
              rows={2}
              placeholder="A moment burned into the archive..."
              className="w-full resize-none bg-transparent border-b border-border pb-3 font-display text-base text-archive placeholder:text-muted-foreground/50 focus:border-gold focus:outline-none transition-colors"
            />
          </Field>

          <Field label="Memory 02" required>
            <textarea
              value={m2}
              onChange={(e) => setM2(e.target.value)}
              required
              rows={2}
              placeholder="Another classified incident..."
              className="w-full resize-none bg-transparent border-b border-border pb-3 font-display text-base text-archive placeholder:text-muted-foreground/50 focus:border-gold focus:outline-none transition-colors"
            />
          </Field>

          <Field label="Memory 03" optional>
            <textarea
              value={m3}
              onChange={(e) => setM3(e.target.value)}
              rows={2}
              placeholder="Optional — for the deep archive."
              className="w-full resize-none bg-transparent border-b border-border pb-3 font-display text-base text-archive placeholder:text-muted-foreground/50 focus:border-gold focus:outline-none transition-colors"
            />
          </Field>

          <Field
            label="Famous For"
            required
            hint={`SELECT UP TO 2 · ${famous.length}/2`}
          >
            <div className="flex flex-wrap gap-2">
              {FAMOUS_FOR.map((tag) => {
                const active = famous.includes(tag);
                const disabled = !active && famous.length >= 2;
                return (
                  <button
                    type="button"
                    key={tag}
                    disabled={disabled}
                    onClick={() => toggleFamous(tag)}
                    className={[
                      "rounded-sm border px-3 py-1.5 font-dossier text-[11px] transition-all",
                      active
                        ? "border-gold bg-gold/15 text-gold shadow-[0_0_20px_oklch(0.78_0.13_78/0.2)]"
                        : disabled
                        ? "border-border/50 text-muted-foreground/40 cursor-not-allowed"
                        : "border-border text-muted-foreground hover:border-sepia hover:text-sepia",
                    ].join(" ")}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </Field>

          <Field label="Selfie Upload" required>
            <div className="flex items-center gap-5">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="group relative h-24 w-24 shrink-0 overflow-hidden rounded-sm border border-dashed border-sepia/60 bg-secondary/40 transition-colors hover:border-gold"
              >
                {photo ? (
                  <img src={photo} alt="Preview" className="h-full w-full object-cover" />
                ) : (
                  <span className="flex h-full w-full items-center justify-center font-dossier text-[10px] text-sepia">
                    + UPLOAD
                  </span>
                )}
              </button>
              <p className="font-dossier text-[11px] text-muted-foreground">
                A current photo for the dossier portrait. JPG / PNG.
              </p>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={onPhoto}
                className="hidden"
              />
            </div>
          </Field>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              style={{
                WebkitAppearance: "none",
                appearance: "none",
                WebkitTextFillColor: "#1a1208",
                color: "#1a1208",
              }}
              className="group relative w-full overflow-hidden rounded-sm border border-gold bg-gradient-to-r from-[oklch(0.55_0.15_50)] to-[oklch(0.78_0.13_78)] px-8 py-5 font-dossier text-sm font-bold tracking-wider shadow-glow transition-all hover:brightness-110"
            >
              <span className="relative z-10" style={{ color: "#1a1208", WebkitTextFillColor: "#1a1208" }}>Submit to Archives</span>
            </button>
          </div>
        </form>

        {/* Footer */}
        <footer className="mt-12 flex items-center justify-center gap-3 font-dossier text-[10px] text-muted-foreground/70">
          <span className="h-px w-8 bg-muted-foreground/30" />
          <span>POWERED BY COGNOSY AI</span>
          <span className="h-px w-8 bg-muted-foreground/30" />
        </footer>
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  optional,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between">
        <label className="font-dossier text-[11px] text-sepia">
          {label}
          {required && <span className="ml-2 text-ember">*</span>}
          {optional && <span className="ml-2 text-muted-foreground/60 normal-case">— optional</span>}
        </label>
        {hint && <span className="font-mono text-[10px] text-muted-foreground/70">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function PillButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-sm border px-6 py-2.5 font-dossier text-xs transition-all",
        active
          ? "border-gold bg-gold/15 text-gold shadow-[0_0_20px_oklch(0.78_0.13_78/0.2)]"
          : "border-border text-muted-foreground hover:border-sepia hover:text-sepia",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function CornerStamps() {
  return (
    <div className="pointer-events-none absolute -top-3 left-6 bg-background px-3 font-dossier text-[10px] text-sepia">
      FILE №2006/AR · CLASSIFIED
    </div>
  );
}
