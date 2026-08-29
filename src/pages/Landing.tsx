import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { ThreeHero } from "@/components/ThreeHero";
import {
  ArrowUpRight,
  Sparkles,
  Palette,
  Globe,
  Code2,
  Zap,
  Mail,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

// ─── Data ────────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    id: 1,
    title: "Neural Brand Identity",
    category: "Brand Design",
    description:
      "Complete brand system for an AI research lab — logo suite, typography, colour palette, and a 60-page guidelines document.",
    tags: ["Identity", "Print", "AI"],
    color: "from-blue-600/20 to-cyan-500/10",
  },
  {
    id: 2,
    title: "Aether Dashboard",
    category: "UI/UX Design",
    description:
      "A real-time analytics dashboard for a SaaS platform, designed for clarity at scale and built with a dark-mode-first philosophy.",
    tags: ["Dashboard", "SaaS", "Dark UI"],
    color: "from-indigo-600/20 to-purple-500/10",
  },
  {
    id: 3,
    title: "Voxel Music Festival",
    category: "Event Campaign",
    description:
      "Poster series, animated social assets, and on-site signage for a three-day electronic music festival in Bangalore.",
    tags: ["Print", "Motion", "Events"],
    color: "from-rose-600/20 to-orange-500/10",
  },
  {
    id: 4,
    title: "Prism AI Website",
    category: "Web Design",
    description:
      "AI-powered website for a generative art platform — complete with interactive 3D elements, responsive layout, and CMS integration.",
    tags: ["Web", "3D", "AI"],
    color: "from-emerald-600/20 to-teal-500/10",
  },
  {
    id: 5,
    title: "Carbon Ledger App",
    category: "Product Design",
    description:
      "Mobile app concept for tracking personal carbon emissions with gamified challenges and community leaderboards.",
    tags: ["Mobile", "Product", "Sustainability"],
    color: "from-amber-600/20 to-yellow-500/10",
  },
  {
    id: 6,
    title: "Vertex Type Foundry",
    category: "Typography",
    description:
      "Custom variable typeface with optical sizing, designed for editorial use across print and digital mediums.",
    tags: ["Typography", "Print", "Digital"],
    color: "from-violet-600/20 to-fuchsia-500/10",
  },
];

const SERVICES = [
  {
    icon: Palette,
    title: "Graphic Design",
    description:
      "Visual identities, brand systems, editorial layouts, and marketing collateral that communicate with clarity and style.",
  },
  {
    icon: Globe,
    title: "AI-Powered Web Design",
    description:
      "Websites and web apps designed with AI as a creative partner — fast to produce, refined by hand, and built to perform.",
  },
  {
    icon: Code2,
    title: "Vibe Coding",
    description:
      "Rapid prototyping and interactive experiences built with modern frameworks, blending code craft with creative instinct.",
  },
  {
    icon: Zap,
    title: "Creative Direction",
    description:
      "End-to-end creative strategy for campaigns, products, and brand launches — from concept to final delivery.",
  },
];

const STATS = [
  { value: "50+", label: "Projects Delivered" },
  { value: "3+", label: "Years of Experience" },
  { value: "100%", label: "Client Satisfaction" },
  { value: "∞", label: "Creative Ambition" },
];

// ─── Reusable Animation Wrapper ──────────────────────────────────────────────

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
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Hero Section ────────────────────────────────────────────────────────────

function HeroSection() {
  const { isAuthenticated } = useAuth();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 80]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/0" />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* 3D Canvas */}
      <ThreeHero />

      {/* Content overlay */}
      <motion.div
        style={{ opacity, y }}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-32 lg:px-12"
      >
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-border/50 bg-surface/60 px-4 py-2 backdrop-blur-sm"
          >
            <Sparkles className="size-3.5 text-accent" />
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground">
              Graphic Designer · AI Website Designer · Vibe Coding Explorer
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
          >
            VISUALS THAT
            <br />
            <span className="text-gradient-glow">WORK.</span>
            <br />
            IDEAS THAT{" "}
            <span className="text-gradient-glow">MOVE.</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            I'm Aditya — a Graphic Designer and Vibe Coding Explorer creating
            professional visuals, AI-powered websites, and creative digital
            experiences that make an impression.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a href="#work" className="btn-primary">
              View My Work
              <ArrowUpRight className="size-4" />
            </a>
            <a
              href={isAuthenticated ? "/dashboard" : "/auth?returnTo=/dashboard"}
              className="btn-outline"
            >
              Let's Work Together
            </a>
          </motion.div>
        </div>

        {/* Bot label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="pointer-events-none absolute bottom-24 right-12 hidden text-right lg:block"
        >
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground/60">
            Meet your creative guide
          </p>
          <div className="mt-2 h-px w-24 bg-gradient-to-r from-transparent to-accent/40 ml-auto" />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground/40">
            Scroll
          </span>
          <div className="h-8 w-px bg-gradient-to-b from-muted-foreground/30 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Work / Portfolio Section ────────────────────────────────────────────────

function WorkSection() {
  return (
    <section id="work" className="relative py-32 section-padding">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-20 max-w-2xl">
            <p className="mb-4 text-[11px] font-medium tracking-[0.3em] uppercase text-accent">
              Selected Work
            </p>
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Projects that speak{" "}
              <span className="text-gradient-glow">for themselves</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              A curated selection of brand identities, web experiences, and
              creative campaigns — each crafted with diligence and creative
              ambition.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.08}>
              <div className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card/50 p-8 transition-all duration-500 hover:border-accent/30 hover:shadow-[0_0_40px_rgba(77,168,218,0.06)]">
                {/* Gradient accent */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                />

                <div className="relative">
                  <div className="mb-6 flex items-start justify-between">
                    <span className="rounded-full border border-border/50 px-3 py-1 text-[10px] font-medium tracking-[0.15em] uppercase text-muted-foreground">
                      {project.category}
                    </span>
                    <ArrowUpRight className="size-4 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                  </div>

                  <h3 className="mb-3 text-xl font-semibold text-foreground">
                    {project.title}
                  </h3>

                  <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-muted/50 px-2.5 py-1 text-[10px] font-medium tracking-wider uppercase text-muted-foreground/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* View All link */}
        <Reveal>
          <div className="mt-16 text-center">
            <a
              href="#"
              className="group inline-flex items-center gap-2 text-sm font-medium tracking-[0.15em] uppercase text-muted-foreground transition-colors hover:text-foreground"
            >
              View Full Catalog
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Stats Divider ───────────────────────────────────────────────────────────

function StatsBar() {
  return (
    <section className="relative py-20 section-padding">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
        <div className="mt-16 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
      </div>
    </section>
  );
}

// ─── Services Section ────────────────────────────────────────────────────────

function ServicesSection() {
  return (
    <section id="services" className="relative py-32 section-padding">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-20 max-w-2xl">
            <p className="mb-4 text-[11px] font-medium tracking-[0.3em] uppercase text-accent">
              What I Do
            </p>
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Crafted services for{" "}
              <span className="text-gradient-glow">modern brands</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              I partner with businesses and creators to bring their visions to
              life through design, code, and creative strategy.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.1}>
              <div className="group rounded-2xl border border-border/40 bg-card/30 p-8 transition-all duration-500 hover:border-accent/30 hover:bg-card/60">
                <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-accent/10 transition-colors duration-300 group-hover:bg-accent/20">
                  <service.icon className="size-5 text-accent" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About Section ───────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <section id="about" className="relative py-32 section-padding">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <Reveal>
            <div>
              <p className="mb-4 text-[11px] font-medium tracking-[0.3em] uppercase text-accent">
                About Me
              </p>
              <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Designing with{" "}
                <span className="text-gradient-glow">purpose</span>
              </h2>
              <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
                <p>
                  I'm Aditya — a Graphic Designer and AI Website Designer based
                  in India. I create visuals for professional workplaces, blending
                  traditional design principles with the power of artificial
                  intelligence.
                </p>
                <p>
                  My philosophy is simple: work with diligence and creative
                  ambition, using AI as a partner in creativity — not a
                  replacement for it. Every project I take on is an opportunity
                  to push boundaries while staying true to craft.
                </p>
                <p>
                  When I'm not designing, you'll find me exploring the cutting
                  edge of vibe coding — building interactive experiences that
                  merge art and technology.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                {[
                  "Figma",
                  "Photoshop",
                  "Illustrator",
                  "React",
                  "Three.js",
                  "GSAP",
                  "AI Tools",
                ].map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-border/50 bg-muted/30 px-4 py-2 text-[11px] font-medium tracking-wider uppercase text-muted-foreground"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="relative">
              {/* Abstract decorative element */}
              <div className="aspect-square rounded-3xl border border-border/30 bg-gradient-to-br from-accent/5 via-transparent to-accent/10 p-12">
                <div className="flex h-full flex-col items-center justify-center gap-8">
                  {/* Decorative rings */}
                  <div className="relative">
                    <div className="size-32 rounded-full border border-accent/20" />
                    <div className="absolute inset-4 rounded-full border border-accent/30" />
                    <div className="absolute inset-8 rounded-full border border-accent/40" />
                    <div className="absolute inset-12 rounded-full bg-accent/10" />
                  </div>

                  <div className="text-center">
                    <p className="text-sm font-medium tracking-[0.2em] uppercase text-foreground">
                      Creative
                    </p>
                    <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                      &amp; Technical
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating accent dot */}
              <div className="absolute -right-3 -top-3 size-6 rounded-full bg-accent/20" />
              <div className="absolute -bottom-4 -left-4 size-4 rounded-full bg-accent/15" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Contact Section ─────────────────────────────────────────────────────────

function ContactSection() {
  return (
    <section id="contact" className="relative py-32 section-padding">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-4 text-[11px] font-medium tracking-[0.3em] uppercase text-accent">
              Get in Touch
            </p>
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Let's create something{" "}
              <span className="text-gradient-glow">remarkable</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Have a project in mind or want to explore a collaboration? I'd love
              to hear from you.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mx-auto mt-16 grid max-w-3xl gap-8 sm:grid-cols-2">
            {/* Email card */}
            <a
              href="mailto:hello@aditya.design"
              className="group flex items-start gap-4 rounded-2xl border border-border/40 bg-card/30 p-6 transition-all duration-500 hover:border-accent/30 hover:bg-card/60"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                <Mail className="size-4 text-accent" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Email</p>
                <p className="mt-1 text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                  hello@aditya.design
                </p>
              </div>
            </a>

            {/* Location card */}
            <div className="flex items-start gap-4 rounded-2xl border border-border/40 bg-card/30 p-6">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                <MapPin className="size-4 text-accent" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Location</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  India · Available Worldwide
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Social links */}
        <Reveal delay={0.3}>
          <div className="mt-12 flex justify-center gap-4">
            {[
              { name: "Dribbble", href: "#" },
              { name: "Behance", href: "#" },
              { name: "LinkedIn", href: "#" },
              { name: "GitHub", href: "#" },
            ].map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1 rounded-full border border-border/40 px-4 py-2 text-[11px] font-medium tracking-[0.15em] uppercase text-muted-foreground transition-all duration-300 hover:border-accent/30 hover:text-foreground"
              >
                {social.name}
                <ExternalLink className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="relative py-12 section-padding border-t border-border/30">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold tracking-[0.2em] uppercase text-foreground">
            ADITYA
          </span>
          <span className="text-[10px] tracking-[0.3em] text-muted-foreground">
            PORTFOLIO
          </span>
        </div>
        <p className="text-xs text-muted-foreground/60">
          © {new Date().getFullYear()} Aditya. All rights reserved. Built with
          creative ambition.
        </p>
      </div>
    </footer>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <WorkSection />
      <StatsBar />
      <ServicesSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
