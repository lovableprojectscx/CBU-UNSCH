import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import comunidadImg from "@/assets/comunidad-cbu-grupo.webp";

export const Route = createFileRoute("/sobre-nosotros")({
  head: () => ({
    meta: [
      { title: "Sobre Nosotros — CBU UNSCH | Comunidad Cristiana Universitaria" },
      {
        name: "description",
        content:
          "Conoce la Comunidad Bíblica Universitaria (CBU) de la UNSCH en Ayacucho. Quiénes somos, nuestra historia en el campus y lo que creemos como estudiantes.",
      },
      { property: "og:title", content: "Sobre Nosotros — CBU UNSCH" },
      {
        property: "og:description",
        content:
          "Comunidad universitaria de estudiantes cristianos en la UNSCH, afiliados a AGEUP en Ayacucho.",
      },
      { property: "og:url", content: "https://cbuunsch.vercel.app/sobre-nosotros" },
      { property: "og:image", content: "https://cbuunsch.vercel.app/og-image.jpg" },
      { property: "og:image:secure_url", content: "https://cbuunsch.vercel.app/og-image.jpg" },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:image", content: "https://cbuunsch.vercel.app/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://cbuunsch.vercel.app/sobre-nosotros" }],
  }),
  component: SobreNosotrosPage,
});

const doctrina = [
  "Creemos en un solo Dios, Padre, Hijo y Espíritu Santo.",
  "La Biblia como Palabra inspirada por Dios y nuestra guía fundamental de fe y vida diaria.",
  "La salvación por gracia mediante la fe en Jesucristo.",
  "La unidad de todos los creyentes en Cristo, compartiendo en comunidad sin distinción de denominación.",
];

const hitos = [
  { year: "2023", label: "Reactivación del grupo de estudiantes en la UNSCH" },
  { year: "2024", label: "Consolidación de células y reuniones semanales" },
  { year: "2025", label: "Crecimiento en más escuelas y facultades" },
];

function SobreNosotrosPage() {
  return (
    <div>
      {/* HERO */}
      <section className="px-6 pt-14 pb-16 md:px-12 md:pt-32 md:pb-32">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <p className="label-eyebrow">
              <span className="text-accent">Quiénes somos</span>
              <span className="mx-3 text-hairline">/</span>
              Comunidad · Historia · Lo que creemos
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-10 max-w-[16ch] font-serif text-[clamp(2.75rem,8vw,7rem)] leading-[0.98] tracking-[-0.02em] text-foreground">
              Estudiantes de fe
              <br />
              <span className="italic text-primary">en la universidad.</span>
            </h1>
          </Reveal>
        </div>
      </section>

      {/* FOTO COMUNIDAD */}
      <section className="hairline border-t px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <figure className="hairline relative overflow-hidden border bg-background p-3 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.25)] md:p-4">
              <div className="relative aspect-[21/9] w-full overflow-hidden">
                <img
                  src={comunidadImg}
                  alt="Comunidad CBU UNSCH — hermanos y hermanas en el campus"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-4 px-1 pb-1">
                <span className="label-eyebrow">
                  <span className="text-accent">Retrato</span>
                  <span className="mx-3 text-hairline">/</span>
                  Familia CBU · UNSCH
                </span>
                <span className="font-serif text-xs italic text-muted-foreground">
                  Ayacucho, Perú
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>


      {/* NATURALEZA */}
      <section className="hairline border-t px-6 py-16 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <SectionHeading number="01" eyebrow="Nuestra comunidad">
              Quiénes somos y <span className="italic">qué buscamos</span>.
            </SectionHeading>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-16 grid gap-12 md:grid-cols-12">
              <div className="md:col-span-8 md:col-start-4 space-y-6 text-lg leading-relaxed text-foreground/85 md:text-xl">
                <p>
                  Somos una comunidad de estudiantes universitarios de diferentes iglesias y
                  carreras de la UNSCH. Nos une el deseo de seguir a Jesús, profundizar en el
                  estudio de la Biblia y apoyarnos como compañeros en cada etapa de la vida
                  universitaria.
                </p>
                <p>
                  Somos una iniciativa estudiantil sin fines de lucro ni vínculos partidarios. En
                  Ayacucho formamos parte de la{" "}
                  <span className="font-serif italic text-primary">
                    Asociación de Grupos Evangélicos Universitarios del Perú (AGEUP)
                  </span>
                  , con la visión de que cada estudiante viva su fe de manera práctica en su
                  profesión y al servicio de la sociedad.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* HISTORIA */}
      <section className="hairline border-t px-6 py-16 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <SectionHeading number="02" eyebrow="Nuestra historia">
              Un camino que sigue <span className="italic">creciendo</span>.
            </SectionHeading>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-16 max-w-3xl text-lg leading-relaxed text-foreground/85 md:ml-[25%] md:text-xl">
              La CBU tiene una larga trayectoria acompañando a jóvenes en la UNSCH. Aunque las
              reuniones pasaron por pausas temporales debido a la graduación de promociones
              anteriores, en 2023 un nuevo grupo de estudiantes retomamos la iniciativa con mucho
              entusiasmo. Hoy continuamos reuniéndonos en células, organizando talleres y
              compartiendo con nuevos compañeros de distintas escuelas.
            </p>
          </Reveal>

          <div className="mt-20 grid gap-px bg-hairline md:mt-24 md:grid-cols-3">
            {hitos.map((h, i) => (
              <Reveal key={h.year} delay={i * 0.1}>
                <div className="h-full bg-background p-8 md:p-12">
                  <p className="font-serif text-6xl leading-none text-primary md:text-8xl">
                    {h.year}
                  </p>
                  <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {h.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DOCTRINA */}
      <section className="hairline border-t px-6 py-16 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <SectionHeading number="03" eyebrow="En qué creemos">
              Bases de nuestra <span className="italic">fe</span>.
            </SectionHeading>
          </Reveal>

          <ol className="mt-20 space-y-px bg-hairline md:mt-24">
            {doctrina.map((d, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <li className="grid gap-6 bg-background px-4 py-10 md:grid-cols-12 md:gap-12 md:px-12 md:py-16">
                  <div className="md:col-span-2">
                    <span className="font-serif text-3xl italic text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="md:col-span-10 font-serif text-xl leading-snug text-foreground md:text-3xl">
                    {d}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
