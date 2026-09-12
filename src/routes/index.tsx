import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type ComponentType } from "react";
import { ArrowRight, BookOpenText, Users, HandHeart, HeartHandshake, Flame, Cross, Quote, Sparkles, Mountain } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { CelulaForm } from "@/components/celula-form";
import { MarqueeRibbon } from "@/components/marquee-ribbon";
import heroArbolesImg from "@/assets/hero-grupo-arboles.webp";
import heroParqueImg from "@/assets/hero-grupo-parque.webp";
import heroSalonImg from "@/assets/hero-grupo-salon.webp";

import aventuraImg from "@/assets/aventura-rocas.webp";
import grupoImg from "@/assets/grupo-cachimbos.webp";
import pinturaImg from "@/assets/pintura-creativa.webp";
import voluntariadoImg from "@/assets/voluntariado-cbu.webp";


type QuickAccess = {
  img: string;
  eyebrow: string;
  title: string;
  to: "/sobre-nosotros" | "/vida-universitaria" | "/oportunidades" | "/pide-oracion";
  cta: string;
  icon: ComponentType<{ className?: string }>;
  aspect: string;
};

const quickAccess: QuickAccess[] = [
  {
    img: grupoImg,
    eyebrow: "Sobre Nosotros",
    title: "Una familia que estudia y ora junta.",
    to: "/sobre-nosotros",
    cta: "Conócenos",
    icon: Users,
    aspect: "aspect-[4/5]",
  },
  {
    img: aventuraImg,
    eyebrow: "Vida Universitaria",
    title: "Retiros, vigilias y momentos en comunidad.",
    to: "/vida-universitaria",
    cta: "Ver actividades",
    icon: Mountain,
    aspect: "aspect-[4/5]",
  },
  {
    img: pinturaImg,
    eyebrow: "Pide Oración",
    title: "Escríbenos, oraremos por ti esta semana.",
    to: "/pide-oracion",
    cta: "Enviar pedido",
    icon: HandHeart,
    aspect: "aspect-[4/5]",
  },
  {
    img: voluntariadoImg,
    eyebrow: "Servicio & Comunidad",
    title: "Suma experiencia pedagógica real en aula con impacto social.",
    to: "/oportunidades",
    cta: "Ver convocatoria",
    icon: HeartHandshake,
    aspect: "aspect-[4/5]",
  },
];


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CBU UNSCH — Comunidad Bíblica Universitaria de Ayacucho" },
      {
        name: "description",
        content:
          "Comunidad Bíblica Universitaria de la UNSCH: estudiantes de distintas iglesias viviendo y compartiendo el evangelio en el campus de Ayacucho. Únete a una célula, pide oración o súmate a la obra.",
      },
      { property: "og:title", content: "CBU UNSCH — Comunidad Bíblica Universitaria" },
      {
        property: "og:description",
        content:
          "La universidad, nuestra tierra de misión. Células, vigilias, foros y acompañamiento pastoral en la UNSCH.",
      },
      { property: "og:url", content: "https://cbuunsch.vercel.app/" },
      { property: "og:image", content: "https://cbuunsch.vercel.app/og-image.jpg" },
      { property: "og:image:secure_url", content: "https://cbuunsch.vercel.app/og-image.jpg" },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:image", content: "https://cbuunsch.vercel.app/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://cbuunsch.vercel.app/" }],
  }),
  component: HomePage,
});

const pillars: Array<{
  number: string;
  title: string;
  body: string;
  icon: ComponentType<{ className?: string }>;
}> = [
  {
    number: "01",
    title: "Fe y Academia",
    body: "Estudio bíblico inductivo, diálogo abierto sobre fe y ciencia, y un espacio reflexivo para hacer preguntas y aprender juntos.",
    icon: BookOpenText,
  },
  {
    number: "02",
    title: "Comunidad Estudiantil",
    body: "Vigilias universitarias, tiempos de oración y encuentros al aire libre para compartir y fortalecernos en el campus.",
    icon: Users,
  },
  {
    number: "03",
    title: "Misión y Servicio",
    body: "Iniciativas de ayuda solidaria en la UNSCH y actividades de servicio práctico para bendecir a nuestra comunidad.",
    icon: HandHeart,
  },
];

const ribbonItems = [
  "Comunidad Bíblica Universitaria",
  "UNSCH · Ayacucho",
  "Marcos 16:15",
  "Enciende la luz en tu facultad",
  "Fe · Academia · Misión",
  "Células en cada escuela",
];

function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const watermarkY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const watermarkOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const heroSlides = [
    {
      src: heroArbolesImg,
      alt: "Grupo de estudiantes de la CBU UNSCH bajo los árboles del campus",
    },
    {
      src: heroParqueImg,
      alt: "Estudiantes de la CBU UNSCH reunidos en el parque",
    },
    {
      src: heroSalonImg,
      alt: "Comunidad de la CBU UNSCH reunida en el salón",
    },
  ];
  const [slideIndex, setSlideIndex] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => {
      setSlideIndex((i) => (i + 1) % heroSlides.length);
    }, 5500);
    return () => window.clearInterval(id);
  }, [heroSlides.length]);


  return (
    <div>
      {/* HERO — UNA SOLA IMAGEN FULL-BLEED */}
      <section ref={heroRef} className="relative overflow-hidden">
        <motion.div
          style={{ y: watermarkY, opacity: watermarkOpacity }}
          aria-hidden
          className="pointer-events-none absolute -bottom-16 -right-6 z-10 select-none font-serif text-[28vw] leading-none tracking-tighter text-accent/10 md:-bottom-24 md:text-[20vw]"
        >
          UNSCH
        </motion.div>

        <motion.figure
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1] }}
          className="relative w-full overflow-hidden"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[3/2] md:aspect-[21/9]">
            <AnimatePresence mode="sync">
              <motion.img
                key={heroSlides[slideIndex].src}
                src={heroSlides[slideIndex].src}
                alt={heroSlides[slideIndex].alt}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ opacity: { duration: 1.2, ease: [0.2, 0.7, 0.2, 1] }, scale: { duration: 6, ease: "linear" } }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />


            <div className="absolute inset-x-0 top-0 px-6 pt-8 md:px-12 md:pt-10">
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-3 border border-primary-foreground/30 bg-background/10 px-4 py-2 backdrop-blur"
              >
                <Flame className="h-3.5 w-3.5 text-primary-foreground" />
                <span className="label-eyebrow text-primary-foreground/90">CBU · UNSCH · Ayacucho</span>
              </motion.div>
            </div>

            <div className="absolute inset-x-0 bottom-0 px-6 pb-10 md:px-12 md:pb-16">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
                className="max-w-[16ch] font-serif text-[clamp(2.5rem,7vw,6rem)] leading-[0.98] tracking-tight text-primary-foreground"
              >
                La universidad,
                <br />
                <span className="italic">nuestra tierra de misión.</span>
              </motion.h1>
            </div>

            <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2 md:bottom-6 md:right-6">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSlideIndex(i)}
                  aria-label={`Mostrar imagen ${i + 1}`}
                  aria-current={i === slideIndex}
                  className={`h-1.5 rounded-full transition-all ${
                    i === slideIndex ? "w-8 bg-primary-foreground" : "w-4 bg-primary-foreground/40 hover:bg-primary-foreground/70"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.figure>


        {/* DESCRIPCIÓN + CTAs debajo del hero */}
        <div className="px-6 py-12 md:px-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mx-auto grid max-w-[1400px] gap-8 md:grid-cols-12 md:gap-10"
          >
            <p className="md:col-span-6 text-base leading-relaxed text-foreground/80 md:text-lg">
              Somos la <span className="font-serif italic text-foreground">Comunidad Bíblica Universitaria</span> de la UNSCH:
              estudiantes de distintas iglesias viviendo y compartiendo el evangelio en el campus de Ayacucho.
            </p>
            <div className="md:col-span-6 flex flex-wrap items-center gap-3.5">
              <a
                href="#unirme"
                className="group inline-flex items-center gap-3 rounded-full bg-primary px-7 py-3.5 font-sans text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-lg transition-all duration-300 hover:gap-4 hover:bg-primary/90 hover:shadow-xl"
              >
                <Flame className="h-4 w-4" />
                <span>Súmate a una célula</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <Link
                to="/sobre-nosotros"
                className="group inline-flex items-center gap-3 rounded-full border border-foreground/30 px-7 py-3.5 font-sans text-sm font-semibold uppercase tracking-wider text-foreground transition-all duration-300 hover:gap-4 hover:border-primary hover:text-primary"
              >
                <span>Conócenos</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link to="/pide-oracion" className="link-underline font-sans text-sm font-medium text-foreground/75 hover:text-foreground">
                o pide oración →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CINTILLO GUINDA — MARQUEE */}
      <MarqueeRibbon items={ribbonItems} />

      {/* ACCESOS RÁPIDOS — TARJETAS CON IMAGEN */}
      <section className="hairline border-t px-6 py-16 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="label-eyebrow">
                  <span className="text-accent">02</span>
                  <span className="mx-3 text-hairline">/</span>
                  Accesos rápidos
                </p>
              <h2 className="mt-6 max-w-[28ch] font-serif text-4xl leading-[1.05] text-foreground md:text-5xl">
                Conoce más sobre la <span className="italic text-primary">CBU UNSCH</span>
              </h2>
              </div>
              <Sparkles className="hidden h-8 w-8 text-accent md:block" />
            </div>
          </Reveal>

          <div className="mt-16 grid gap-6 md:mt-20 sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
            {quickAccess.map((q, i) => {
              const Icon = q.icon;
              return (
                <Reveal key={q.to} delay={i * 0.1}>
                  <Link
                    to={q.to}
                    className="group hairline relative block overflow-hidden rounded-xl border bg-background transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
                  >
                    <div className={`relative w-full overflow-hidden ${q.aspect}`}>
                      <img
                        src={q.img}
                        alt={q.eyebrow}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                      <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 bg-background/90 px-3.5 py-1.5 backdrop-blur-md">
                        <Icon className="h-3.5 w-3.5 text-primary" />
                        <span className="label-eyebrow text-[0.68rem] text-primary">{q.eyebrow}</span>
                      </span>
                      <div className="absolute inset-x-0 bottom-0 p-6 md:p-7 xl:p-8">
                        <p className="max-w-[22ch] font-serif text-xl font-medium leading-snug text-primary-foreground md:text-2xl lg:text-[1.35rem] xl:text-2xl">
                          {q.title}
                        </p>
                        <span className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-primary-foreground/40 bg-primary-foreground/95 px-4 py-2 font-sans text-xs font-semibold uppercase tracking-wider text-foreground transition-all duration-300 group-hover:gap-3.5 group-hover:bg-primary group-hover:text-primary-foreground xl:px-5 xl:py-2.5">
                          <span>{q.cta}</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>



      {/* PULL QUOTE — INTRO COMUNITARIA */}
      <section className="hairline relative overflow-hidden border-t px-6 py-20 md:px-12 md:py-48">
        <span
          aria-hidden
          className="pointer-events-none absolute -left-4 top-1/2 -translate-y-1/2 select-none font-serif text-[22vw] leading-none tracking-tighter text-accent/[0.06] md:-left-8 md:text-[28vw]"
        >
          03
        </span>
        <div className="relative mx-auto max-w-4xl text-center">
          <Reveal>
            <div className="mx-auto inline-flex items-center gap-4">
              <span className="h-px w-12 bg-primary" />
              <Quote className="h-4 w-4 text-primary" />
              <span className="label-eyebrow text-primary">Comunidad</span>
              <Quote className="h-4 w-4 rotate-180 text-primary" />
              <span className="h-px w-12 bg-primary" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-10 font-serif text-3xl leading-[1.2] tracking-tight text-foreground md:text-5xl">
              No estudies solo,
              <br />
              <span className="italic">Dios te pensó en comunidad.</span>
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-10 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              La vida universitaria trae retos académicos, personales y espirituales. En la CBU
              encuentras un grupo de compañeros para orar, estudiar la Biblia y caminar juntos
              durante tus años en la UNSCH.
            </p>
          </Reveal>
        </div>
      </section>

      {/* PILARES */}
      <section className="hairline relative overflow-hidden border-t px-6 py-16 md:px-12 md:py-36">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-6 top-8 select-none font-serif text-[20vw] leading-none tracking-tighter text-primary/[0.05] md:-right-12 md:top-16 md:text-[24vw]"
        >
          03
        </span>
        <div className="relative mx-auto max-w-[1400px]">

          <Reveal>
            <SectionHeading number="03" eyebrow="Nuestros pilares">
              Tres formas de <span className="italic">vivir la fe</span> en tu facultad.
            </SectionHeading>
          </Reveal>

          <div className="mt-20 grid gap-px bg-hairline md:mt-28 md:grid-cols-3">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.number} delay={i * 0.1}>
                  <div className="group relative h-full overflow-hidden bg-background p-8 md:p-12">
                    <span className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 bg-primary transition-transform duration-500 ease-out group-hover:scale-y-100" />
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-12 w-12 items-center justify-center border border-primary/30 bg-primary/5 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="h-5 w-5" />
                      </span>
                      <p className="font-serif text-2xl italic text-accent">{p.number}</p>
                    </div>
                    <h3 className="mt-8 font-serif text-2xl leading-tight text-foreground md:text-3xl">
                      {p.title}
                    </h3>
                    <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
                      {p.body}
                    </p>
                    <div className="mt-8 flex items-center gap-3">
                      <span className="h-px flex-1 bg-hairline" />
                      <Cross className="h-3.5 w-3.5 text-primary" />
                      <span className="h-px w-8 bg-primary" />
                    </div>
                  </div>
                </Reveal>
              );
            })}

          </div>
        </div>
      </section>

      {/* CINTILLO ACCENT */}
      <MarqueeRibbon
        variant="accent"
        items={[
          "Vigilias universitarias",
          "Mañanas de ayuno",
          "Estudio bíblico inductivo",
          "Foros abiertos fe & ciencia",
          "Servicio social en Ayacucho",
        ]}
      />

      {/* REDES SOCIALES EN VIVO */}
      <section className="hairline relative overflow-hidden border-t bg-secondary/40 px-6 py-16 md:px-12 md:py-36">
        <span
          aria-hidden
          className="pointer-events-none absolute -left-6 bottom-8 select-none font-serif text-[20vw] leading-none tracking-tighter text-accent/[0.07] md:-left-12 md:bottom-16 md:text-[24vw]"
        >
          04
        </span>
        <div className="relative mx-auto max-w-[1400px]">

          <Reveal>
            <SectionHeading number="04" eyebrow="#CBUUNSCH en vivo">
              Conéctate con nuestro <span className="italic">día a día</span>.
            </SectionHeading>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-10 max-w-2xl text-base leading-relaxed text-muted-foreground md:ml-[25%] md:text-lg">
              Conoce nuestras actividades, charlas, dinámicas en el campus y momentos compartidos
              en la UNSCH.
            </p>
          </Reveal>

          <div className="mt-20 grid gap-10 md:grid-cols-2">
            <Reveal>
              <div className="hairline border bg-background">
                <div className="hairline flex items-baseline justify-between border-b px-5 py-4">
                  <span className="label-eyebrow">TikTok</span>
                  <a
                    href="https://www.tiktok.com/@cbu_unsch"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-xs text-foreground"
                  >
                    @cbu_unsch
                  </a>
                </div>
                <div className="aspect-[9/12] w-full">
                  <iframe
                    src="https://www.tiktok.com/embed/@cbu_unsch"
                    title="TikTok CBU UNSCH"
                    className="h-full w-full"
                    allow="encrypted-media;"
                    loading="lazy"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="hairline border bg-background">
                <div className="hairline flex items-baseline justify-between border-b px-5 py-4">
                  <span className="label-eyebrow">Instagram</span>
                  <a
                    href="https://www.instagram.com/cbu.unsch/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-xs text-foreground"
                  >
                    @cbu.unsch
                  </a>
                </div>
                <div className="aspect-[9/12] w-full">
                  <iframe
                    src="https://www.instagram.com/cbu.unsch/embed"
                    title="Instagram CBU UNSCH"
                    className="h-full w-full"
                    allow="encrypted-media;"
                    loading="lazy"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FORMULARIO CÉLULAS */}
      <section
        id="unirme"
        className="hairline relative scroll-mt-24 overflow-hidden border-t px-6 py-16 md:px-12 md:py-40"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -right-6 -bottom-8 select-none font-serif text-[22vw] leading-none tracking-tighter text-primary/[0.06] md:-right-16 md:-bottom-16 md:text-[26vw]"
        >
          05
        </span>
        <div className="relative mx-auto max-w-[1400px]">

          <div className="grid gap-16 md:grid-cols-12 md:gap-24">
            <div className="md:col-span-5">
              <Reveal>
                <p className="label-eyebrow">
                  <span className="text-accent">05</span>
                  <span className="mx-3 text-hairline">/</span>
                  Únete
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-8 font-serif text-4xl leading-[1.05] text-foreground md:text-6xl">
                  ¿Quieres sumarte a una <span className="italic">célula</span> en tu facultad?
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
                  Déjanos tus datos. Un estudiante del equipo de la CBU te escribirá por WhatsApp
                  para contarte los horarios y el lugar de reunión más cercano a tu escuela.
                </p>
              </Reveal>
            </div>

            <div className="md:col-span-7">
              <Reveal delay={0.15}>
                <CelulaForm />
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
