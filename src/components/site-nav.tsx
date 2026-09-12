import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import logoAsset from "@/assets/logo-cbu.svg";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/sobre-nosotros", label: "Sobre Nosotros" },
  { to: "/vida-universitaria", label: "Vida Universitaria" },
  { to: "/oportunidades", label: "Oportunidades" },
] as const;

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-hairline bg-background/90 backdrop-blur-md shadow-sm"
          : "border-transparent bg-background"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-12 md:py-5">
        {/* BRAND LOGO */}
        <Link to="/" className="group flex items-center gap-3.5">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-primary/20 bg-background p-1 shadow-sm transition-transform duration-300 group-hover:scale-105 md:h-11 md:w-11">
            <img
              src={logoAsset}
              alt="CBU UNSCH"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg font-semibold tracking-tight text-foreground md:text-xl">
              CBU <span className="text-primary italic">UNSCH</span>
            </span>
            <span className="label-eyebrow text-[0.65rem] tracking-widest text-muted-foreground">
              Ayacucho · Perú
            </span>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="link-underline font-sans text-sm font-medium tracking-wide text-foreground/75 transition-colors hover:text-foreground"
              activeProps={{ className: "text-primary font-semibold" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/pide-oracion"
            className="inline-flex items-center gap-2 rounded-full border border-primary bg-primary px-4 py-2 font-sans text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-all duration-300 hover:bg-primary/90 hover:shadow-md"
          >
            <Sparkles className="h-3.5 w-3.5 text-white" />
            <span>Pide Oración</span>
          </Link>
        </nav>

        {/* MOBILE TOGGLE BUTTON */}
        <button
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-hairline bg-background text-foreground transition-colors hover:bg-secondary md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* MOBILE NAV DRAWER */}
      {open ? (
        <div className="border-t border-hairline bg-background/98 backdrop-blur-xl md:hidden">
          <nav className="mx-auto flex max-w-[1400px] flex-col px-6 py-6 space-y-2">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-lg px-4 py-3.5 font-sans text-base font-medium text-foreground transition-colors hover:bg-secondary/60 active:bg-secondary"
                activeProps={{ className: "bg-primary/10 text-primary font-semibold" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                <span>{l.label}</span>
                <span className="font-serif italic text-xs text-muted-foreground">→</span>
              </Link>
            ))}
            <div className="pt-2">
              <Link
                to="/pide-oracion"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-sans text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-md"
              >
                <Sparkles className="h-4 w-4" />
                <span>Pide Oración</span>
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
