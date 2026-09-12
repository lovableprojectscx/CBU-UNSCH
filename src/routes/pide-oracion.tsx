import { createFileRoute } from "@tanstack/react-router";
import { HandHeart, Users, Flame } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { OracionForm } from "@/components/oracion-form";

export const Route = createFileRoute("/pide-oracion")({
  head: () => ({
    meta: [
      { title: "Pide Oración — CBU UNSCH | Acompañamiento y Oración" },
      {
        name: "description",
        content:
          "Envía tu motivo de oración a la Comunidad Bíblica Universitaria de la UNSCH. Puedes escribir de forma anónima; oramos por ti en nuestras reuniones y vigilias en Ayacucho.",
      },
      { property: "og:title", content: "Pide Oración — CBU UNSCH" },
      {
        property: "og:description",
        content:
          "Comparte tu petición con la comunidad. Puedes escribir de forma anónima o con tu nombre.",
      },
      { property: "og:url", content: "https://cbuunsch.vercel.app/pide-oracion" },
      { property: "og:image", content: "https://cbuunsch.vercel.app/og-image.jpg" },
      { property: "og:image:secure_url", content: "https://cbuunsch.vercel.app/og-image.jpg" },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:image", content: "https://cbuunsch.vercel.app/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://cbuunsch.vercel.app/pide-oracion" }],
  }),
  component: PideOracionPage,
});

const promesas = [
  {
    icon: HandHeart,
    title: "Total privacidad",
    body: "Puedes escribir sin tu nombre si lo prefieres. Tratamos cada petición con sumo cuidado y respeto.",
  },
  {
    icon: Users,
    title: "Una comunidad orando",
    body: "Tu pedido se suma a nuestras reuniones semanales de oración y vigilias estudiantiles.",
  },
  {
    icon: Flame,
    title: "Un Dios que escucha",
    body: "Creemos en el poder de la oración. Puedes compartir lo que sientes con total libertad y confianza.",
  },
];

function PideOracionPage() {
  return (
    <div>
      {/* HERO */}
      <section className="px-6 pt-14 pb-16 md:px-12 md:pt-32 md:pb-32">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <p className="label-eyebrow">
              <span className="text-accent font-bold">Oración</span>
              <span className="mx-3 text-hairline">/</span>
              Comunidad · Fe · Acompañamiento
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-8 max-w-[18ch] font-serif text-[clamp(2.75rem,8vw,6.5rem)] font-medium leading-[1.02] tracking-tight text-foreground">
              Comparte tu carga,
              <br />
              <span className="italic font-normal text-primary">oramos contigo</span>.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-2xl font-sans text-base leading-relaxed text-muted-foreground md:text-lg">
              «Echen toda su ansiedad sobre él, porque él cuida de ustedes.» — 1 Pedro 5:7. Comparte
              tu motivo de oración con confianza; oramos por cada necesidad en nuestras reuniones
              semanales.
            </p>
          </Reveal>
        </div>
      </section>

      {/* PROMESAS */}
      <section className="hairline border-t px-6 py-16 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <SectionHeading number="01" eyebrow="Cómo funciona">
              Un espacio <span className="italic">seguro</span>.
            </SectionHeading>
          </Reveal>

          <div className="mt-20 grid gap-px bg-hairline md:mt-28 md:grid-cols-3">
            {promesas.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.title} delay={i * 0.1}>
                  <div className="h-full bg-background p-8 md:p-12">
                    <span className="inline-flex h-12 w-12 items-center justify-center border border-primary/30 bg-primary/5 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-8 font-serif text-2xl leading-tight text-foreground md:text-3xl">
                      {p.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                      {p.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FORMULARIO */}
      <section
        id="orar"
        className="hairline relative scroll-mt-24 overflow-hidden border-t px-6 py-16 md:px-12 md:py-40"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -right-6 -bottom-8 select-none font-serif text-[22vw] leading-none tracking-tighter text-primary/[0.06] md:-right-16 md:-bottom-16 md:text-[26vw]"
        >
          02
        </span>
        <div className="relative mx-auto max-w-[1400px]">
          <div className="grid gap-16 md:grid-cols-12 md:gap-24">
            <div className="md:col-span-5">
              <Reveal>
                <p className="label-eyebrow">
                  <span className="text-accent">02</span>
                  <span className="mx-3 text-hairline">/</span>
                  Escribe tu pedido
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-8 font-serif text-4xl leading-[1.05] text-foreground md:text-6xl">
                  Cuéntanos por qué <span className="italic">quieres orar</span>.
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
                  Sé tan breve o extenso como necesites. Tu nombre es opcional. Si marcas la casilla
                  al final, podremos compartir tu pedido de forma anónima con la comunidad para
                  orar juntos.
                </p>
              </Reveal>
            </div>

            <div className="md:col-span-7">
              <Reveal delay={0.15}>
                <OracionForm />
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
