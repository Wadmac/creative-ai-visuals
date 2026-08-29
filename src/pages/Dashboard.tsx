import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import {
  ArrowUpRight,
  Search,
  LayoutGrid,
  User,
  LogOut,
  Palette,
  Globe,
  Code2,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router";

// ─── Catalog Data ────────────────────────────────────────────────────────────

const CATALOG_ITEMS = [
  {
    id: 1,
    title: "Neural Brand Identity",
    category: "Brand Design",
    tags: ["Identity", "Print", "AI"],
    color: "from-blue-600/20 to-cyan-500/10",
    icon: Palette,
  },
  {
    id: 2,
    title: "Aether Dashboard",
    category: "UI/UX Design",
    tags: ["Dashboard", "SaaS", "Dark UI"],
    color: "from-indigo-600/20 to-purple-500/10",
    icon: LayoutGrid,
  },
  {
    id: 3,
    title: "Voxel Music Festival",
    category: "Event Campaign",
    tags: ["Print", "Motion", "Events"],
    color: "from-rose-600/20 to-orange-500/10",
    icon: Zap,
  },
  {
    id: 4,
    title: "Prism AI Website",
    category: "Web Design",
    tags: ["Web", "3D", "AI"],
    color: "from-emerald-600/20 to-teal-500/10",
    icon: Globe,
  },
  {
    id: 5,
    title: "Carbon Ledger App",
    category: "Product Design",
    tags: ["Mobile", "Product", "Sustainability"],
    color: "from-amber-600/20 to-yellow-500/10",
    icon: Code2,
  },
  {
    id: 6,
    title: "Vertex Type Foundry",
    category: "Typography",
    tags: ["Typography", "Print", "Digital"],
    color: "from-violet-600/20 to-fuchsia-500/10",
    icon: Palette,
  },
];

const CATEGORIES = ["All", "Brand Design", "UI/UX Design", "Web Design", "Event Campaign", "Product Design", "Typography"];

type View = "catalog" | "dashboard";

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [view, setView] = useState<View>("catalog");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = useMemo(() => {
    return CATALOG_ITEMS.filter((item) => {
      const matchesSearch =
        search === "" ||
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-[0.2em] uppercase text-foreground">
                ADITYA
              </span>
              <span className="text-[9px] tracking-[0.3em] text-muted-foreground">
                PORTFOLIO
              </span>
            </a>

            <div className="mx-3 h-4 w-px bg-border" />

            {/* View toggle */}
            <div className="flex rounded-full border border-border/50 bg-muted/30 p-0.5">
              <button
                onClick={() => setView("catalog")}
                className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[11px] font-medium tracking-[0.1em] uppercase transition-all duration-300 ${
                  view === "catalog"
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <LayoutGrid className="size-3" />
                Catalog
              </button>
              <button
                onClick={() => setView("dashboard")}
                className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[11px] font-medium tracking-[0.1em] uppercase transition-all duration-300 ${
                  view === "dashboard"
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <User className="size-3" />
                Dashboard
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-xs text-muted-foreground">Signed in as</p>
              <p className="text-sm font-medium text-foreground">
                {user?.name || user?.email || "Guest"}
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-2 cursor-pointer"
              onClick={handleSignOut}
            >
              <LogOut className="size-3.5" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        <AnimatePresence mode="wait">
          {view === "catalog" ? (
            <motion.div
              key="catalog"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              {/* Search + Filters */}
              <div className="mb-10">
                <h1 className="mb-2 text-2xl font-bold tracking-tight text-foreground">
                  Project Catalog
                </h1>
                <p className="mb-6 text-sm text-muted-foreground">
                  Browse through the full collection of creative work.
                </p>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search projects, categories, or tags..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-9 bg-muted/30 border-border/40"
                    />
                  </div>
                </div>

                {/* Category chips */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`rounded-full px-3 py-1.5 text-[10px] font-medium tracking-[0.15em] uppercase transition-all duration-300 ${
                        activeCategory === cat
                          ? "bg-foreground text-background"
                          : "border border-border/40 text-muted-foreground hover:border-border hover:text-foreground"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid */}
              {filteredItems.length === 0 ? (
                <div className="py-20 text-center">
                  <p className="text-sm text-muted-foreground">
                    No projects match your search.
                  </p>
                </div>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredItems.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card/50 p-6 transition-all duration-500 hover:border-accent/30 hover:shadow-[0_0_30px_rgba(77,168,218,0.06)] cursor-pointer"
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                      />
                      <div className="relative">
                        <div className="mb-4 flex items-start justify-between">
                          <div className="flex size-9 items-center justify-center rounded-lg bg-muted/50">
                            <item.icon className="size-4 text-muted-foreground" />
                          </div>
                          <ArrowUpRight className="size-4 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                        </div>

                        <h3 className="mb-1.5 text-base font-semibold text-foreground">
                          {item.title}
                        </h3>
                        <p className="mb-4 text-xs text-muted-foreground">
                          {item.category}
                        </p>

                        <div className="flex flex-wrap gap-1.5">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-md bg-muted/40 px-2 py-0.5 text-[9px] font-medium tracking-wider uppercase text-muted-foreground/70"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="mb-2 text-2xl font-bold tracking-tight text-foreground">
                Your Dashboard
              </h1>
              <p className="mb-10 text-sm text-muted-foreground">
                Welcome back{user?.name ? `, ${user.name}` : ""}. Here's an
                overview of your workspace.
              </p>

              {/* Stats */}
              <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: "Total Projects", value: "6", icon: LayoutGrid },
                  { label: "Categories", value: "6", icon: Palette },
                  { label: "Searches Made", value: "—", icon: Search },
                  { label: "Status", value: "Active", icon: Zap },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-border/40 bg-card/30 p-5"
                  >
                    <div className="mb-3 flex size-8 items-center justify-center rounded-lg bg-accent/10">
                      <stat.icon className="size-4 text-accent" />
                    </div>
                    <p className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Recent activity */}
              <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                <h2 className="mb-6 text-sm font-semibold tracking-[0.1em] uppercase text-foreground">
                  Recent Activity
                </h2>
                <div className="space-y-4">
                  {[
                    { action: "Viewed", item: "Prism AI Website", time: "Just now" },
                    { action: "Searched", item: "Brand Design", time: "2 min ago" },
                    { action: "Browsed", item: "Catalog", time: "5 min ago" },
                    { action: "Signed in", item: "Dashboard", time: "Session start" },
                  ].map((activity, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between border-b border-border/20 pb-4 last:border-0 last:pb-0"
                    >
                      <div>
                        <span className="text-sm font-medium text-foreground">
                          {activity.action}
                        </span>{" "}
                        <span className="text-sm text-muted-foreground">
                          {activity.item}
                        </span>
                      </div>
                      <span className="text-[10px] text-muted-foreground/60">
                        {activity.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
