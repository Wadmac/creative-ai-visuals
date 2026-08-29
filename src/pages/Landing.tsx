import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { ArchivistScene } from "@/components/ThreeHero";
import { ExternalLink, ArrowRight, Mail } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════════════
   DATA — preserved from original, reformatted
   ═══════════════════════════════════════════════════════════════════════════ */

const PROJECTS = [
  {
    num: "01",
    title: "Star Central Asia",
    url: "https://star-central-asia-gsq2.vercel.app/",
    category: "Website Design",
    description:
      "A polished, editorial website for a Central Asian creative agency — bold typography, responsive layout, and refined visual hierarchy.",
  },
  {
    num: "02",
    title: "Delhi Delight Cafe",
    url: "https://delhi-delight-digital.vercel.app/",
    category: "Restaurant Website",
    description:
      "A warm, inviting digital presence for a Delhi-based cafe — rich food imagery, smooth navigation, and brand storytelling.",
  },
  {
    num: "03",
    title: "Royal Siyaram Estates",
    url: "https://royal-siyaram-estates-k1dy.vercel.app/",
    category: "Real Estate Platform",
    description:
      "A premium property showcase website with clean architectural layouts, property listings, and a trustworthy design language.",
  },
  {
    num: "04",
    title: "Motion & Video Work",
    url: "https://www.instagram.com/aditya_motion_graphics/reels/",
    category: "Motion Design",
    description:
      "A collection of motion graphics, video edits, and visual experiments — showcasing rhythm, timing, and visual storytelling.",
  },
];

const SERVICES = [
  {
    num: "01",
    title: "AI Website Design & Improvement",
    description:
      "Websites designed with AI as a creative partner, then refined by hand. Fast production, high finish, built to perform.",
  },
  {
    num: "02",
    title: "Graphic Design",
    description:
      "Visual identities, editorial layouts, posters, social assets — crafted with clarity and strong compositional instinct.",
  },
  {
    num: "03",
    title: "Social Media Visuals",
    description:
      "Scroll-stopping posts, stories, and campaign assets designed to communicate and resonate across platforms.",
  },
  {
    num: "04",
    title: "Video Editing & Visual Improvement",
    description:
      "Post-production, colour grading, pacing, and visual polish for video content that needs a professional edge.",
  },
  {
    num: "05",
    title: "Brand Promotion Videos",
    description:
      "Short-form and long-form promotional videos that tell a brand's story with motion, sound, and visual craft.",
  },
];

const TOOLS = [
  "Photoshop",
  "Illustrator",
  "CorelDraw",
  "Canva",
  "Video Editing",
  "Filmora",
  "CapCut",
  "AI Website Design",
  "Vibe Coding",
  "AI Creative Workflows",
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Understand",
    text: "Every project starts with listening. What is the goal, who is the audience, what does the brand need to say? I map the context before touching a pixel.",
  },
  {
    num: "02",
    title: "Imagine",
    text: "This is where creative instinct meets research. Moodboards, references, rough sketches — I explore directions that feel right before committing.",
  },
  {
    num: "03",
    title: "Create",
    text: "The real work begins. Design, build, iterate. I move between AI tools and traditional craft to find the fastest path to something genuinely good.",
  },
  {
    num: "04",
    title: "Refine",
    text: "The gap between good and great is in the details. I refine spacing, type, motion, and colour until everything feels intentional and complete.",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   ERROR BOUNDARY — catches runtime errors (e.g. Three.js / WebGL) so a
   single component crash never blanks the entire page.
   ═══════════════════════════════════════════════════════════════════════════ */

class ComponentErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(err: Error) {
    console.warn("[ComponentErrorBoundary]", err.message);
  }
  render() {
    if (this.state.hasError) return this.props.fallback ?? null;
    return this.props.children;
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   REVEAL ANIMATION
   ═══════════════════════════════════════════════════════════════════════════ */

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   OPENING — THE ARCHIVE
   ═══════════════════════════════════════════════════════════════════════════ */

function OpeningSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const nameOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const nameY = useTransform(scrollYProgress, [0, 0.4], [0, -60]);
  const archivistOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 80, rotateX: -40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.3 + i * 0.06,
      },
    }),
  };

  const name = "ADITYA";

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden"
    >
      {/* Top label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.1 }}
        className="relative z-10 flex items-center justify-between px-6 pt-28 pb-4 lg:px-12"
      >
        <span className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground">
          Archive_01 / Aditya / Creative Visuals
        </span>
      </motion.div>

      {/* Center: massive name */}
      <motion.div
        style={{ opacity: nameOpacity, y: nameY }}
        className="relative z-10 flex flex-1 flex-col items-center justify-center px-6"
      >
        {/* The name — oversized, editorial */}
        <div className="overflow-hidden">
          <div className="flex justify-center" style={{ perspective: "600px" }}>
            {name.split("").map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={letterVariants}
                className="text-[clamp(4rem,18vw,14rem)] font-bold leading-none tracking-[-0.04em] text-foreground"
                style={{ transformOrigin: "bottom center" }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Titles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-10 flex flex-col items-center gap-1"
        >
          <span className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground">
            Graphic Designer
          </span>
          <span className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground">
            AI Website Creator
          </span>
          <span className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground">
            Visual Storyteller
          </span>
        </motion.div>

        {/* Statement */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="mt-8 max-w-md text-center text-sm leading-relaxed text-muted-foreground"
        >
          I create visuals for professional workplaces and explore how AI can
          expand creativity.
        </motion.p>

        {/* Enter CTA */}
        <motion.a
          href="#work"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="group mt-12 flex items-center gap-3 text-[12px] font-medium tracking-[0.25em] uppercase text-foreground transition-colors hover:text-accent"
        >
          Enter the Work
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
        </motion.a>
      </motion.div>

      {/* Archivist — subtle, bottom-right */}
      <motion.div
        style={{ opacity: archivistOpacity }}
        className="pointer-events-none absolute bottom-0 right-0 z-10 h-[280px] w-[280px] md:h-[360px] md:w-[360px]"
      >
        <ComponentErrorBoundary fallback={null}>
          <ArchivistScene className="h-full w-full" />
        </ComponentErrorBoundary>
      </motion.div>

      {/* Scroll line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-6 z-10 flex items-center gap-3 lg:left-12"
      >
        <div className="h-px w-12 bg-border" />
        <span className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground/50">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SELECTED WORK — each project unique
   ═══════════════════════════════════════════════════════════════════════════ */

function Project01({ project }: { project: (typeof PROJECTS)[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="relative">
      {/* Full-width cinematic preview */}
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative aspect-[16/7] w-full overflow-hidden bg-surface"
      >
        <iframe
          src={project.url}
          title={project.title}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          sandbox="allow-scripts allow-same-origin"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
      </motion.div>

      {/* Info overlay */}
      <Reveal>
        <div className="mt-6 flex items-start justify-between">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-accent">
              {project.num} / {project.category}
            </span>
            <h3 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {project.title}
            </h3>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
              {project.description}
            </p>
          </div>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-1 flex shrink-0 items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-muted-foreground transition-colors hover:text-foreground"
          >
            Visit
            <ExternalLink className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </Reveal>
    </div>
  );
}

function Project02({ project }: { project: (typeof PROJECTS)[1] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="relative grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
      {/* Editorial text side */}
      <Reveal>
        <div className="order-2 lg:order-1">
          <span className="text-[10px] tracking-[0.3em] uppercase text-accent">
            {project.num} / {project.category}
          </span>
          <h3 className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {project.title}
          </h3>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-foreground transition-colors hover:text-accent"
          >
            View Project
            <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </Reveal>

      {/* Preview */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="order-1 lg:order-2"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-surface">
          <iframe
            src={project.url}
            title={project.title}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </motion.div>
    </div>
  );
}

function Project03({ project }: { project: (typeof PROJECTS)[2] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="relative">
      <Reveal>
        <div className="mb-8 flex items-end justify-between">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-accent">
              {project.num} / {project.category}
            </span>
            <h3 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {project.title}
            </h3>
          </div>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group hidden items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-muted-foreground transition-colors hover:text-foreground sm:flex"
          >
            Visit
            <ExternalLink className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </Reveal>

      {/* Browser frame composition */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="relative"
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border border-border/60 bg-surface px-4 py-3">
          <div className="flex gap-1.5">
            <div className="size-2 rounded-full bg-border" />
            <div className="size-2 rounded-full bg-border" />
            <div className="size-2 rounded-full bg-border" />
          </div>
          <div className="ml-4 flex-1 rounded bg-background/40 px-3 py-1 text-[10px] text-muted-foreground/50">
            {project.url.replace("https://", "")}
          </div>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden border border-t-0 border-border/60 bg-surface">
          <iframe
            src={project.url}
            title={project.title}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </motion.div>

      <Reveal delay={0.1}>
        <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
      </Reveal>
    </div>
  );
}

function Project04({ project }: { project: (typeof PROJECTS)[3] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="relative overflow-hidden">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        {/* Motion-focused typography */}
        <Reveal>
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-accent">
              {project.num} / {project.category}
            </span>
            <h3 className="mt-4 text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Motion
              <br />&amp; Video
            </h3>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
              {project.description}
            </p>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-foreground transition-colors hover:text-accent"
            >
              View Reels
              <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>

        {/* Animated preview strip */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative"
        >
          <div className="relative aspect-[4/5] overflow-hidden bg-surface">
            <iframe
              src="https://www.instagram.com/aditya_motion_graphics/reels/"
              title={project.title}
              className="absolute inset-0 h-[120%] w-full border-0"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin"
              style={{ transform: "translateY(-8%)" }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function WorkSection() {
  return (
    <section id="work" className="py-24 section-padding">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="mb-20">
            <span className="text-[10px] tracking-[0.3em] uppercase text-accent">
              Selected Work
            </span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              The Archive
            </h2>
          </div>
        </Reveal>

        <div className="space-y-32">
          <Project01 project={PROJECTS[0]} />
          <div className="h-px w-full bg-border/40" />
          <Project02 project={PROJECTS[1]} />
          <div className="h-px w-full bg-border/40" />
          <Project03 project={PROJECTS[2]} />
          <div className="h-px w-full bg-border/40" />
          <Project04 project={PROJECTS[3]} />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SERVICES — vertical numbered list
   ═══════════════════════════════════════════════════════════════════════════ */

function ServicesSection() {
  return (
    <section id="services" className="py-28 section-padding">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="mb-20">
            <span className="text-[10px] tracking-[0.3em] uppercase text-accent">
              What I Do
            </span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Services
            </h2>
          </div>
        </Reveal>

        <div>
          {SERVICES.map((service, i) => (
            <Reveal key={service.num} delay={i * 0.06}>
              <div className="group border-t border-border/40 py-8 transition-colors hover:border-accent/40">
                <div className="flex items-start gap-6 sm:items-center">
                  {/* Number — expands on hover */}
                  <span className="shrink-0 text-3xl font-bold tracking-tight text-border transition-all duration-500 group-hover:text-accent group-hover:text-4xl sm:text-4xl sm:group-hover:text-5xl">
                    {service.num}
                  </span>

                  {/* Title */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                      {service.title}
                    </h3>

                    {/* Description — revealed on hover */}
                    <p className="mt-0 max-h-0 overflow-hidden text-sm leading-relaxed text-muted-foreground opacity-0 transition-all duration-500 group-hover:mt-3 group-hover:max-h-40 group-hover:opacity-100">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
          <div className="border-t border-border/40" />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PORTRAIT — loads from /portrait.jpg, falls back to a designed SVG
   ═══════════════════════════════════════════════════════════════════════════ */

function PortraitImage() {
  const [src, setSrc] = useState<string | null>(null);
  const [tried, setTried] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setSrc("/portrait.jpg");
    img.onerror = () => setTried(true);
    img.src = "/portrait.jpg";
  }, []);

  if (src) {
    return (
      <img
        src={src}
        alt="Aditya — Graphic Designer and AI Website Creator"
        className="h-full w-full object-cover object-center"
        loading="lazy"
      />
    );
  }

  if (tried) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-surface">
        <svg
          viewBox="0 0 400 560"
          className="h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Dark abstract composition */}
          <rect width="400" height="560" fill="#0a0f1a" />
          <line x1="200" y1="0" x2="200" y2="560" stroke="#3a7cc6" strokeWidth="0.5" opacity="0.15" />
          <line x1="0" y1="280" x2="400" y2="280" stroke="#3a7cc6" strokeWidth="0.5" opacity="0.15" />
          <circle cx="200" cy="240" r="120" fill="none" stroke="#3a7cc6" strokeWidth="0.5" opacity="0.2" />
          <circle cx="200" cy="240" r="80" fill="none" stroke="#ffffff" strokeWidth="0.3" opacity="0.1" />
          <text
            x="200"
            y="260"
            textAnchor="middle"
            fontFamily="system-ui, sans-serif"
            fontSize="96"
            fontWeight="bold"
            fill="#ffffff"
            opacity="0.08"
          >
            A
          </text>
          <text
            x="200"
            y="480"
            textAnchor="middle"
            fontFamily="monospace"
            fontSize="9"
            letterSpacing="0.3em"
            fill="#3a7cc6"
            opacity="0.4"
          >
            PLACE YOUR PORTRAIT AT
          </text>
          <text
            x="200"
            y="500"
            textAnchor="middle"
            fontFamily="monospace"
            fontSize="9"
            letterSpacing="0.15em"
            fill="#ffffff"
            opacity="0.3"
          >
            PUBLIC / PORTRAIT.JPG
          </text>
        </svg>
      </div>
    );
  }

  return <div className="h-full w-full animate-pulse bg-surface" />;
}

/* ═══════════════════════════════════════════════════════════════════════════
   ABOUT — manifesto
   ═══════════════════════════════════════════════════════════════════════════ */

function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  // Mouse parallax for the portrait
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!portraitRef.current) return;
    const rect = portraitRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x * 12);
    mouseY.set(y * 12);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section id="about" ref={sectionRef} className="py-32 section-padding">
      <div className="mx-auto max-w-[1400px]">
        {/* Label */}
        <Reveal>
          <span className="text-[10px] tracking-[0.3em] uppercase text-accent">
            The Human Behind the Work
          </span>
        </Reveal>

        <div className="mt-16 grid items-start gap-12 lg:grid-cols-[1fr_1fr] lg:gap-8">
          {/* Left: portrait with oversized typography */}
          <motion.div
            style={{ y: parallaxY }}
            className="relative"
          >
            <div
              ref={portraitRef}
              className="relative overflow-hidden"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Oversized background typography */}
              <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center overflow-hidden">
                <span className="text-[clamp(5rem,20vw,14rem)] font-bold leading-none tracking-[-0.05em] text-foreground/[0.04]">
                  ADITYA
                </span>
              </div>

              {/* Portrait image with mouse parallax */}
              <motion.div
                style={{ x: springX, y: springY }}
                className="relative z-20"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-surface">
                  <PortraitImage />
                  {/* Subtle vignette overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-transparent" />
                </div>
              </motion.div>
            </div>

            {/* Small editorial caption under the image */}
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground/50">
                Portrait / 2025
              </span>
              <div className="h-px flex-1 mx-6 bg-border/30" />
              <span className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground/50">
                New Delhi, India
              </span>
            </div>
          </motion.div>

          {/* Right: manifesto + about content */}
          <div className="flex flex-col justify-center lg:pt-16">
            <Reveal>
              <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Human Instinct.
              </h2>
              <h2 className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                AI-Amplified
                <br />
                Creativity.
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10 max-w-md space-y-5 text-sm leading-relaxed text-muted-foreground">
                <p>
                  I work with diligence and creative ambition. AI is my partner
                  in creativity — helping me explore, experiment, and turn ideas
                  into visuals and digital experiences.
                </p>
                <p>
                  I create visuals for professional workplaces, blending
                  traditional design principles with the power of artificial
                  intelligence. Every project is an opportunity to push
                  boundaries while staying true to craft.
                </p>
                <p>
                  When I am not designing, I am exploring the cutting edge of
                  vibe coding — building interactive experiences that merge art
                  and technology.
                </p>
              </div>
            </Reveal>

            {/* Tool tags */}
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-2">
                {[
                  "Photoshop",
                  "Illustrator",
                  "CorelDraw",
                  "Filmora",
                  "CapCut",
                  "AI Tools",
                  "Vibe Coding",
                ].map((tool) => (
                  <span
                    key={tool}
                    className="border border-border/40 px-3 py-1.5 text-[10px] font-medium tracking-wider uppercase text-muted-foreground/70"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CREATIVE TOOLKIT — typography composition
   ═══════════════════════════════════════════════════════════════════════════ */

function ToolkitSection() {
  return (
    <section className="py-24 overflow-hidden section-padding">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <span className="text-[10px] tracking-[0.3em] uppercase text-accent">
            Creative Toolkit
          </span>
        </Reveal>
      </div>

      {/* Scrolling typography composition */}
      <div className="mt-12 space-y-0">
        {TOOLS.map((tool, i) => (
          <motion.div
            key={tool}
            initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: i * 0.04,
            }}
            className="border-t border-border/30 py-3"
          >
            <span
              className={`block text-[clamp(2rem,6vw,5rem)] font-bold leading-none tracking-[-0.03em] ${
                i % 3 === 0
                  ? "text-foreground"
                  : "text-foreground/25"
              }`}
            >
              {tool}
            </span>
          </motion.div>
        ))}
        <div className="border-t border-border/30" />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PROCESS — four chapters
   ═══════════════════════════════════════════════════════════════════════════ */

function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineProgress = useTransform(scrollYProgress, [0.1, 0.85], [0, 1]);

  return (
    <section id="process" ref={sectionRef} className="py-32 section-padding">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="mb-20">
            <span className="text-[10px] tracking-[0.3em] uppercase text-accent">
              Process
            </span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              How I Work
            </h2>
          </div>
        </Reveal>

        <div className="relative">
          {/* Vertical progress line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border/30 lg:left-10">
            <motion.div
              style={{ scaleY: lineProgress }}
              className="w-full origin-top bg-accent/60"
            />
          </div>

          <div className="space-y-24">
            {PROCESS_STEPS.map((step, i) => (
              <Reveal key={step.num} delay={i * 0.08}>
                <div className="relative pl-16 lg:pl-24">
                  {/* Chapter dot */}
                  <div className="absolute left-4 top-1.5 flex size-5 items-center justify-center lg:left-8">
                    <div className="size-2 rounded-full bg-accent" />
                  </div>

                  <span className="text-[10px] tracking-[0.3em] uppercase text-accent">
                    Chapter {step.num}
                  </span>
                  <h3 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
                    {step.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CONTACT — full-screen bold ending
   ═══════════════════════════════════════════════════════════════════════════ */

function ContactSection() {
  return (
    <section
      id="contact"
      className="relative flex min-h-[90svh] flex-col justify-center py-24 section-padding"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <Reveal>
          <h2 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
            Your Next Idea
            <br />
            Deserves Better
            <br />
            Visuals.
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-accent">
                Let's Create Something
              </span>
              <div className="mt-6">
                <a
                  href="mailto:aditya.singh267742@gmail.com"
                  className="text-xl font-medium tracking-tight text-foreground underline underline-offset-4 transition-colors hover:text-accent sm:text-2xl"
                >
                  aditya.singh267742@gmail.com
                </a>
              </div>
            </div>

            <div className="flex gap-6">
              <a
                href="mailto:aditya.singh267742@gmail.com"
                className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-foreground transition-colors hover:text-accent"
              >
                <Mail className="size-3.5" />
                Send Email
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-muted-foreground transition-colors hover:text-foreground"
              >
                Download Resume
                <ArrowRight className="size-3" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════════════════════ */

function Footer() {
  return (
    <footer className="border-t border-border/30 py-10 section-padding">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 sm:flex-row">
        <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground/50">
          © {new Date().getFullYear()} Aditya. All rights reserved.
        </span>
        <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground/50">
          Built with creative ambition
        </span>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════════════════ */

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <OpeningSection />
      <WorkSection />
      <ServicesSection />
      <AboutSection />
      <ToolkitSection />
      <ProcessSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
