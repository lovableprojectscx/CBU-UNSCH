import { Link } from "@tanstack/react-router";
import ageupLogo from "@/assets/logo-ageup.webp";
import logoAsset from "@/assets/logo-cbu.svg";

const social = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/cbu.unsch/",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@cbu_unsch",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61552071391025",
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="hairline mt-32 border-t">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-12 md:py-24">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-6">
            <div className="flex items-center gap-3">
              <img src={logoAsset} alt="CBU UNSCH" className="h-9 w-9 object-contain" />
              <p className="label-eyebrow text-accent">CBU · UNSCH · Ayacucho</p>
            </div>
            <h2 className="mt-6 font-serif text-4xl leading-[1.05] text-foreground md:text-5xl">
              La universidad,
              <br />
              <span className="italic">nuestra tierra de misión.</span>
            </h2>
          </div>

          <div className="md:col-span-3">
            <p className="label-eyebrow">Navegación</p>
            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <Link to="/" className="link-underline text-foreground/80 hover:text-foreground">
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/sobre-nosotros"
                  className="link-underline text-foreground/80 hover:text-foreground"
                >
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link
                  to="/vida-universitaria"
                  className="link-underline text-foreground/80 hover:text-foreground"
                >
                  Vida Universitaria
                </Link>
              </li>
              <li>
                <Link
                  to="/oportunidades"
                  className="link-underline text-foreground/80 hover:text-foreground"
                >
                  Oportunidades & RSU
                </Link>
              </li>
              <li>
                <Link
                  to="/pide-oracion"
                  className="link-underline text-foreground/80 hover:text-foreground"
                >
                  Pide Oración
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="label-eyebrow">Redes</p>
            <ul className="mt-6 space-y-3 text-sm">
              {social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-foreground/80 hover:text-foreground"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hairline mt-16 flex flex-col items-start justify-between gap-6 border-t pt-8 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Comunidad Bíblica Universitaria — UNSCH</p>
          <a
            href="https://www.ageup.pe/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3"
          >
            <span>Afiliados a</span>
            <img
              src={ageupLogo}
              alt="AGEUP — Asociación de Grupos Evangélicos Universitarios del Perú"
              className="h-10 w-auto transition-opacity group-hover:opacity-80"
              loading="lazy"
            />
            <span className="text-foreground/70">· Ayacucho, Perú</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
