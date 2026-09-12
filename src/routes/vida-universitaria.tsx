import { createFileRoute } from "@tanstack/react-router";
import { Flame, BookOpen, Users, Mountain, Lightbulb, HeartHandshake } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ApoyoForm } from "@/components/apoyo-form";
import aperturaImg from "@/assets/apertura-cbu.webp";
import vigiliaImg from "@/assets/vigilia-cbu.webp";
import evangelismoImg from "@/assets/evangelismo-creativo.webp";
import campamentoImg from "@/assets/campamento-fogata.webp";
import bienvenidaCampusImg from "@/assets/encendiendo-la-luz-campus.webp";
import locurasAmorImg from "@/assets/locuras-de-amor.webp";

export const Route = createFileRoute("/vida-universitaria")({
  head: () => ({
    meta: [
      { title: "Vida Universitaria — CBU UNSCH | Actividades y Comunidad" },
      {
        name: "description",
        content:
          "Descubre las actividades de la Comunidad Bíblica Universitaria en la UNSCH: reuniones semanales, pausas reflexivas, retiros y servicio en el campus de Ayacucho.",
      },
      { property: "og:title", content: "Vida Universitaria — CBU UNSCH" },
      {
        property: "og:description",
        content:
          "Reuniones, talleres, voluntariado y comunidad cristiana estudiantil en la UNSCH.",
      },
      { property: "og:url", content: "/vida-universitaria" },
    ],
    links: [{ rel: "canonical", href: "/vida-universitaria" }],
  }),
  component: VidaUniversitariaPage,
});

const lineas = [
  {
    number: "01",
    title: "Pausas Reflexivas y Foros",
    body: "Espacios abiertos en el campus universitario para conversar sobre fe, ciencia, vocación y cultura con respeto y pensamiento crítico.",
  },
  {
    number: "02",
    title: "Encuentros y Comunidad",
    body: "Tiempos para compartir entre estudiantes: almuerzos fraternos, paseos, dinámicas y momentos de oración y gratitud.",
  },
  {
    number: "03",
    title: "Servicio y Apoyo Estudiantil",
    body: "Iniciativas de ayuda solidaria en la UNSCH, campañas de reciclaje y apoyo mutuo entre compañeros durante su etapa universitaria.",
  },
];

const momentos = [
  {
    img: aperturaImg,
    title: "Apertura CBU-UNSCH",
    caption: "Bienvenida a nuevos estudiantes al inicio del semestre académico.",
    tag: "Ceremonia",
    icon: Users,
    span: "md:col-span-7 md:row-span-2",
    aspect: "aspect-[4/5]",
    rotate: "md:-rotate-1",
  },
  {
    img: vigiliaImg,
    title: "Vigilia CBU",
    caption: "Noche de adoración, oración y comunión con estudiantes y familias invitadas.",
    tag: "Vigilia",
    icon: Flame,
    span: "md:col-span-5",
    aspect: "aspect-[5/4]",
    rotate: "md:rotate-1",
  },
  {
    img: evangelismoImg,
    title: "Evangelismo Creativo",
    caption: "Ruleta de la fe en la Plaza Mayor: FE · ESPERANZA · AMOR · VERDAD.",
    tag: "Misión",
    icon: BookOpen,
    span: "md:col-span-5",
    aspect: "aspect-square",
    rotate: "md:-rotate-1",
  },
  {
    img: campamentoImg,
    title: "Campamento & Fogata",
    caption: "Retiros fuera del campus para descansar, orar y estrechar lazos.",
    tag: "Ebenezer",
    icon: Mountain,
    span: "md:col-span-7",
    aspect: "aspect-[16/10]",
    rotate: "md:rotate-1",
  },
  {
    img: bienvenidaCampusImg,
    title: "Encendiendo la luz en el campus",
    caption: "Activación de bienvenida con mensaje visual fuerte para recibir a los cachimbos.",
    tag: "Bienvenida",
    icon: Lightbulb,
    span: "md:col-span-6",
    aspect: "aspect-[4/5]",
    rotate: "md:rotate-1",
  },
  {
    img: locurasAmorImg,
    title: "Locuras de Amor",
    caption: "Intervención nocturna y salida evangelística con presencia pública de la comunidad.",
    tag: "Impacto",
    icon: HeartHandshake,
    span: "md:col-span-6",
    aspect: "aspect-square",
    rotate: "md:-rotate-1",
  },
];



function VidaUniversitariaPage() {
  return (
    <div>
      {/* HERO */}
      <section className="px-6 pt-14 pb-16 md:px-12 md:pt-32 md:pb-32">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <p className="label-eyebrow">
              <span className="text-accent">Vida universitaria</span>
              <span className="mx-3 text-hairline">/</span>
              Actividades · Comunidad · Servicio
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-10 max-w-[16ch] font-serif text-[clamp(2.75rem,8vw,7rem)] leading-[0.98] tracking-[-0.02em] text-foreground">
              Vivir la fe
              <br />
              en el <span className="italic text-primary">campus</span>.
            </h1>
          </Reveal>
        </div>
      </section>

      {/* LÍNEAS DE IMPACTO */}
      <section className="hairline border-t px-6 py-16 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <SectionHeading number="01" eyebrow="Áreas de trabajo">
              Tres áreas de <span className="italic">servicio</span>.
            </SectionHeading>
          </Reveal>

          <div className="mt-20 space-y-px bg-hairline md:mt-28">
            {lineas.map((l, i) => (
              <Reveal key={l.number} delay={i * 0.08}>
                <div className="grid gap-6 bg-background px-4 py-12 md:grid-cols-12 md:gap-12 md:px-12 md:py-20">
                  <div className="md:col-span-2">
                    <span className="font-serif text-3xl italic text-accent">{l.number}</span>
                  </div>
                  <h3 className="md:col-span-5 font-serif text-2xl leading-tight text-foreground md:text-4xl">
                    {l.title}
                  </h3>
                  <p className="md:col-span-5 text-base leading-relaxed text-muted-foreground md:text-lg">
                    {l.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MOMENTOS — GALERÍA */}
      <section className="hairline relative overflow-hidden border-t bg-secondary/30 px-6 py-16 md:px-12 md:py-36">
        <span
          aria-hidden
          className="pointer-events-none absolute -left-6 top-8 select-none font-serif text-[20vw] leading-none tracking-tighter text-primary/[0.05] md:-left-12 md:top-16 md:text-[22vw]"
        >
          02
        </span>
        <div className="relative mx-auto max-w-[1400px]">
          <Reveal>
            <SectionHeading number="02" eyebrow="Momentos memorables">
              Fotografías de <span className="italic">nuestra historia</span> reciente.
            </SectionHeading>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-10 max-w-2xl text-base leading-relaxed text-muted-foreground md:ml-[25%] md:text-lg">
              Aperturas de semestre, vigilias, dinámicas en la Plaza Mayor y retiros de integración.
              Momentos que unen y fortalecen a cada grupo en la CBU-UNSCH.
            </p>
          </Reveal>

          <div className="mt-20 grid gap-8 md:mt-28 md:grid-cols-12 md:gap-10">
            {momentos.map((m, i) => {
              const Icon = m.icon;
              return (
                <Reveal key={m.title} delay={i * 0.08} className={m.span}>
                  <figure
                    className={`group hairline relative rounded-xl border bg-background p-3 shadow-md transition-all duration-500 ease-out hover:rotate-0 hover:shadow-2xl md:p-4 ${m.rotate}`}
                  >
                    <div className={`relative w-full overflow-hidden rounded-lg ${m.aspect}`}>
                      <img
                        src={m.img}
                        alt={m.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                      />
                      <span className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/90 px-3.5 py-1.5 backdrop-blur-md">
                        <Icon className="h-3.5 w-3.5 text-primary" />
                        <span className="label-eyebrow text-[0.68rem] text-primary">{m.tag}</span>
                      </span>
                    </div>
                    <figcaption className="mt-4 flex items-start justify-between gap-4 px-1 pb-1">
                      <div>
                        <p className="font-serif text-xl font-medium leading-tight text-foreground md:text-2xl">
                          {m.title}
                        </p>
                        <p className="mt-2 font-sans text-xs leading-relaxed text-muted-foreground md:text-sm">
                          {m.caption}
                        </p>
                      </div>
                      <span className="font-serif text-lg italic font-semibold text-accent md:text-xl">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </figcaption>
                  </figure>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ESPACIO PARA IGLESIAS, PROFESIONALES Y EGRESADOS */}
      <section className="hairline border-t px-6 py-16 md:px-12 md:py-40">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-16 md:grid-cols-12 md:gap-24">
            <div className="md:col-span-5">
              <Reveal>
                <p className="label-eyebrow">
                  <span className="text-accent">03</span>
                  <span className="mx-3 text-hairline">/</span>
                  Iglesias · Profesionales · Egresados
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-8 font-serif text-4xl leading-[1.05] text-foreground md:text-6xl">
                  Caminando junto a las <span className="italic">nuevas generaciones</span>.
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
                  Los egresados y profesionales que pasaron por las aulas de la UNSCH son una parte
                  muy valiosa para nosotros. Si deseas apoyar como mentor, compartir talleres o
                  colaborar con las actividades de los estudiantes en Ayacucho, este espacio es para
                  ti.
                </p>
              </Reveal>
            </div>

            <div className="md:col-span-7">
              <Reveal delay={0.15}>
                <ApoyoForm />
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
