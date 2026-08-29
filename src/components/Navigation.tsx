import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FileDown } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      // Determine active section
      const sections = NAV_LINKS.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActive(`#${sections[i]}`);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-12">
          {/* Logo */}
          <button
            onClick={() => scrollTo("#home")}
            className="group flex items-center gap-2"
          >
            <span className="text-lg font-bold tracking-[0.2em] uppercase text-foreground">
              ADITYA
            </span>
            <span className="hidden text-[10px] tracking-[0.3em] text-muted-foreground sm:inline">
              PORTFOLIO
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`relative px-4 py-2 text-xs font-medium tracking-[0.15em] uppercase transition-colors duration-300 ${
                  active === link.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                {active === link.href && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-1/2 h-px w-4 -translate-x-1/2 bg-accent"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}

            <div className="ml-4 h-4 w-px bg-border" />

            <a
              href="#"
              className="ml-4 flex items-center gap-1.5 px-3 py-2 text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground transition-colors hover:text-foreground"
            >
              <FileDown className="size-3" />
              Resume
            </a>

            <a
              href={isAuthenticated ? "/dashboard" : "/auth?returnTo=/dashboard"}
              className="ml-3 rounded-full border border-border/60 px-5 py-2 text-[10px] font-medium tracking-[0.2em] uppercase text-foreground transition-all duration-300 hover:border-accent hover:text-accent hover:shadow-[0_0_20px_rgba(77,168,218,0.15)]"
            >
              {isAuthenticated ? "Dashboard" : "Sign In"}
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="relative z-50 flex size-10 items-center justify-center md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="size-5 text-foreground" />
            ) : (
              <Menu className="size-5 text-foreground" />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  onClick={() => scrollTo(link.href)}
                  className={`text-2xl font-light tracking-[0.2em] uppercase ${
                    active === link.href
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </motion.button>
              ))}

              <div className="mt-4 h-px w-16 bg-border" />

              <a
                href={isAuthenticated ? "/dashboard" : "/auth?returnTo=/dashboard"}
                className="mt-4 rounded-full border border-border/60 px-8 py-3 text-xs font-medium tracking-[0.2em] uppercase text-foreground transition-all duration-300 hover:border-accent hover:text-accent"
              >
                {isAuthenticated ? "Dashboard" : "Sign In"}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
