import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const NAV_LINKS = [
  { label: "Archive", href: "#home" },
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
      setScrolled(window.scrollY > 40);

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
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-background/90 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 lg:px-12">
          {/* Left: archive label */}
          <button
            onClick={() => scrollTo("#home")}
            className="flex items-baseline gap-3"
          >
            <span className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground">
              Archive_01
            </span>
            <span className="hidden text-[10px] tracking-[0.25em] uppercase text-foreground sm:inline">
              Aditya
            </span>
          </button>

          {/* Center: desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`text-[11px] font-medium tracking-[0.2em] uppercase transition-colors duration-300 ${
                  active === link.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right: auth + resume */}
          <div className="hidden items-center gap-6 md:flex">
            <a
              href="#"
              className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground transition-colors hover:text-foreground"
            >
              Resume
            </a>
            <span className="h-3 w-px bg-border" />
            <a
              href={isAuthenticated ? "/dashboard" : "/auth?returnTo=/dashboard"}
              className="text-[10px] font-medium tracking-[0.2em] uppercase text-foreground transition-colors hover:text-accent"
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
              <X className="size-4 text-foreground" />
            ) : (
              <Menu className="size-4 text-foreground" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background md:hidden"
          >
            <div className="flex flex-col items-center gap-10">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.04 }}
                  onClick={() => scrollTo(link.href)}
                  className={`text-[11px] font-medium tracking-[0.35em] uppercase ${
                    active === link.href
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </motion.button>
              ))}

              <div className="mt-2 h-px w-12 bg-border" />

              <a
                href={
                  isAuthenticated ? "/dashboard" : "/auth?returnTo=/dashboard"
                }
                className="text-[10px] font-medium tracking-[0.25em] uppercase text-foreground"
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
