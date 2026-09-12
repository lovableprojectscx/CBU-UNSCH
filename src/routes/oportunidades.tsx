import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Briefcase,
  Users,
  BookOpen,
  Building2,
  GraduationCap,
  School,
  HeartHandshake,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { MarqueeRibbon } from "@/components/marquee-ribbon";
import bannerVoluntariadoImg from "@/assets/banner-voluntariado.webp";
import bannerVoluntariadoMobileImg from "@/assets/banner-voluntariado-mobile.webp";

export const Route = createFileRoute("/oportunidades")({
  head: () => ({
    meta: [
      { title: "Programas de Voluntariado & Oportunidades — CBU UNSCH | Ayacucho" },
      {
        name: "description",
        content:
          "Acción social, comunidad y aprendizaje en Ayacucho. Descubre las convocatorias activas de voluntariado universitario y oportunidades de desarrollo profesional en la CBU UNSCH.",
      },
      { property: "og:title", content: "Programas de Voluntariado & Oportunidades — CBU UNSCH" },
      {
        property: "og:description",
        content:
          "Convocatorias abiertas de voluntariado universitario, aprendizaje-servicio y desarrollo profesional en Ayacucho.",
      },
      { property: "og:url", content: "https://cbuunsch.vercel.app/oportunidades" },
      { property: "og:image", content: "https://cbuunsch.vercel.app/og-image.jpg" },
      { property: "og:image:secure_url", content: "https://cbuunsch.vercel.app/og-image.jpg" },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:image", content: "https://cbuunsch.vercel.app/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://cbuunsch.vercel.app/oportunidades" }],
  }),
  component: OportunidadesPage,
});

function OportunidadesPage() {
  return (
    <div className="bg-background text-foreground">
      {/* 1. CABECERA HERO SECTION */}
      <section className="relative w-full bg-[#f4f6fa]">
        {/* H1 semántico para SEO */}
        <h1 className="sr-only">
          PROGRAMAS DE VOLUNTARIADO — «Acción social, comunidad y aprendizaje en Ayacucho» | CBU UNSCH
        </h1>

        {/* Banner interactivo: al hacer clic desplaza hacia #convocatorias-activas */}
        <a
          href="#convocatorias-activas"
          className="block w-full cursor-pointer focus:outline-none"
          title="Ver convocatorias de voluntariado activas en Ayacucho"
        >
          <picture className="block w-full">
            <source
              media="(max-width: 767px)"
              srcSet={bannerVoluntariadoMobileImg}
              width={1920}
              height={1080}
            />
            <img
              src={bannerVoluntariadoImg}
              alt="Programas de Voluntariado — Acción social, comunidad y aprendizaje en Ayacucho | CBU UNSCH"
              className="w-full h-auto block max-h-[calc(100vh-8.5rem)] object-contain mx-auto"
              loading="eager"
              width={4200}
              height={1486}
            />
          </picture>
        </a>

        {/* Carrusel guindo compacto debajo del banner */}
        <MarqueeRibbon
          variant="primary"
          compact={true}
          items={[
            "Programas de Voluntariado 2026",
            "Aprendizaje-Servicio",
            "Acción social en Ayacucho",
            "Convocatorias Abiertas",
            "I.E. Nuestra Señora de Lourdes",
            "CBU UNSCH",
            "Todas las Carreras",
            "Horas RSU Acreditadas",
          ]}
        />
      </section>

      {/* IDENTIDAD INSTITUCIONAL */}
      <section className="hairline border-t bg-secondary/20 px-6 py-12 md:px-12 md:py-16">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="label-eyebrow text-accent font-semibold">Identidad Institucional</p>
                <h2 className="mt-2 font-serif text-2xl font-medium text-foreground md:text-3xl">
                  Comunidad Bíblica Universitaria (CBU UNSCH)
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
                  Agrupación estudiantil universitaria multidisciplinaria e interdenominacional orientada a la
                  formación integral y el servicio a través del modelo de Aprendizaje-Servicio en Ayacucho.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background px-4 py-2 text-xs font-semibold text-primary shadow-sm backdrop-blur shrink-0">
                <Building2 className="h-3.5 w-3.5" />
                <span>Filial oficial de AGEUP Perú</span>
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. SECCIÓN 01: CONVOCATORIAS DE VOLUNTARIADO ACTIVAS */}
      <section
        id="convocatorias-activas"
        className="hairline scroll-mt-24 border-t px-6 py-16 md:px-12 md:py-28"
      >
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <SectionHeading number="01" eyebrow="Convocatorias Vigentes">
              Programas de <span className="italic text-primary">voluntariado activos</span>.
            </SectionHeading>
          </Reveal>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {/* TARJETA 1 (ACTIVA — I.E. LOURDES) */}
            <Reveal delay={0.1}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-primary/30 bg-card p-6 shadow-sm transition-all hover:border-primary/60 hover:shadow-md md:p-9">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Convocatoria Abierta • 4 Vacantes</span>
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-hairline bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                      <span>Convenio 2026</span>
                    </span>
                  </div>

                  <h3 className="mt-5 font-serif text-2xl font-medium leading-tight text-foreground md:text-3xl">
                    Programa de Acompañamiento Pedagógico
                  </h3>

                  <div className="mt-6 space-y-3.5 border-t border-hairline pt-6 text-sm text-muted-foreground">
                    <div className="flex items-start gap-3">
                      <School className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                      <div>
                        <strong className="font-semibold text-foreground">Institución:</strong>{" "}
                        <span>I.E. «Nuestra Señora de Lourdes»</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <GraduationCap className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                      <div>
                        <strong className="font-semibold text-foreground">Perfil:</strong>{" "}
                        <span>Estudiantes desde Serie 200 (Educación Primaria y áreas afines)</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                      <div>
                        <strong className="font-semibold text-foreground">Horario:</strong>{" "}
                        <span>Quincenal (2 sábados al mes de 09:00 a 11:00 AM)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-hairline">
                  <Link
                    to="/oportunidades/voluntariado-lourdes"
                    className="group inline-flex items-center gap-2.5 rounded-full bg-primary px-7 py-3.5 font-sans text-xs font-semibold uppercase tracking-wider text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:gap-3.5 cursor-pointer"
                  >
                    <span>Ver Convocatoria y Postular</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* TARJETA 2 (PRÓXIMO LANZAMIENTO) */}
            <Reveal delay={0.2}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-hairline bg-card/70 p-6 shadow-sm md:p-9">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-700 dark:text-amber-400">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Próximamente</span>
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-hairline bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                      <span>Acción Social</span>
                    </span>
                  </div>

                  <h3 className="mt-5 font-serif text-2xl font-medium leading-tight text-foreground md:text-3xl">
                    Acción Comunitaria y Seguridad Alimentaria
                  </h3>

                  <div className="mt-6 space-y-3.5 border-t border-hairline pt-6 text-sm text-muted-foreground">
                    <div className="flex items-start gap-3">
                      <HeartHandshake className="h-4 w-4 shrink-0 text-accent mt-0.5" />
                      <div>
                        <strong className="font-semibold text-foreground">Iniciativa:</strong>{" "}
                        <span>Soporte nutricional y acompañamiento solidario comunitario</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Users className="h-4 w-4 shrink-0 text-accent mt-0.5" />
                      <div>
                        <strong className="font-semibold text-foreground">Perfil:</strong>{" "}
                        <span>Abierto a todas las escuelas profesionales de la UNSCH</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="h-4 w-4 shrink-0 text-accent mt-0.5" />
                      <div>
                        <strong className="font-semibold text-foreground">Estado:</strong>{" "}
                        <span>En fase de articulación intersectorial 2026</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-hairline">
                  <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-secondary/80 px-6 py-3 font-sans text-xs font-semibold uppercase tracking-wider text-muted-foreground select-none">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Próximamente</span>
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3. SECCIÓN 02: OPORTUNIDADES LABORALES Y DESARROLLO PROFESIONAL */}
      <section className="hairline border-t bg-secondary/20 px-6 py-16 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <SectionHeading number="02" eyebrow="Inserción & Futuro">
              Oportunidades laborales y <span className="italic text-primary">desarrollo profesional</span>.
            </SectionHeading>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* TARJETA 1 */}
            <Reveal delay={0.1}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-hairline bg-card p-6 shadow-sm transition-all hover:border-primary/40 hover:shadow-md md:p-8">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 font-serif text-xl font-medium text-foreground md:text-2xl">
                    Bolsa de Prácticas Preprofesionales
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Convocatorias coordinadas con entidades públicas y privadas aliadas en Ayacucho.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-hairline">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    Articulación Institucional
                  </span>
                </div>
              </div>
            </Reveal>

            {/* TARJETA 2 */}
            <Reveal delay={0.2}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-hairline bg-card p-6 shadow-sm transition-all hover:border-primary/40 hover:shadow-md md:p-8">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Users className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 font-serif text-xl font-medium text-foreground md:text-2xl">
                    Red de Mentoría Profesional
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Acompañamiento y orientación de egresados de la UNSCH para inserción laboral.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-hairline">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                    Red Alumni AGEUP
                  </span>
                </div>
              </div>
            </Reveal>

            {/* TARJETA 3 */}
            <Reveal delay={0.3}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-hairline bg-card p-6 shadow-sm transition-all hover:border-primary/40 hover:shadow-md md:p-8">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 font-serif text-xl font-medium text-foreground md:text-2xl">
                    Proyectos de Investigación Aplicada (I+D)
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Iniciativas multidisciplinarias de desarrollo técnico y social para la región.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-hairline">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Investigación & RSU
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
