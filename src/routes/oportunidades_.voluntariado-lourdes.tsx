import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  ChevronRight,
  ShieldCheck,
  Building2,
  Users,
  Calendar,
  Clock,
  Award,
  FileCheck2,
  CheckCircle2,
  AlertCircle,
  Search,
  MessageCircle,
  GraduationCap,
  School,
  FileText,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import voluntariadoImg from "@/assets/voluntariado-cbu.webp";
import { sendEmail } from "@/lib/email";

export const Route = createFileRoute("/oportunidades_/voluntariado-lourdes")({
  component: VoluntariadoLourdesPage,
});

const postulaLourdesSchema = z.object({
  nombre: z.string().min(3, "Ingresa tus nombres y apellidos completos"),
  dni: z
    .string()
    .length(8, "El DNI debe tener 8 dígitos exactos")
    .regex(/^[0-9]+$/, "Solo números"),
  correo: z.string().email("Ingresa un correo electrónico válido"),
  whatsapp: z
    .string()
    .min(6, "Ingresa tu número de WhatsApp válido")
    .regex(/^[0-9+\s()-]+$/, "Solo dígitos y prefijo"),
  escuela: z.string().min(2, "Selecciona tu escuela profesional o carrera"),
  serie: z.string().min(1, "Selecciona tu nivel académico / Serie UNSCH"),
  codigo: z
    .string()
    .trim()
    .regex(/^[0-9]{6,12}$/, "El código de estudiante debe tener entre 6 y 12 dígitos numéricos")
    .or(z.literal("")),
  turno: z.enum(["Grupo A", "Grupo B", "Flexible"], {
    errorMap: () => ({ message: "Selecciona tu turno de preferencia" }),
  }),
  declaracionSalvaguarda: z.literal(true, {
    errorMap: () => ({ message: "Debes aceptar la declaración jurada de salvaguarda" }),
  }),
  terminosLegales: z.literal(true, {
    errorMap: () => ({ message: "Debes aceptar los términos legales y protección de datos" }),
  }),
});

type PostulaLourdesFormValues = z.infer<typeof postulaLourdesSchema>;

const fichaTecnica = [
  {
    param: "Institución Sede",
    detail: "I.E. «Nuestra Señora de Lourdes» (Distrito Andrés Avelino Cáceres Dorregaray)",
    icon: School,
  },
  {
    param: "Población Atendida",
    detail: "7 a más escolares de 2.° grado de primaria focalizados con diagnóstico psicopedagógico",
    icon: Users,
  },
  {
    param: "Vacantes Convocadas",
    detail: "4 plazas exclusivas para Docentes de Nivelación y Acompañamiento",
    icon: Award,
  },
  {
    param: "Régimen de Asistencia",
    detail: "Presencial quincenal (2 sábados al mes, 09:00 AM – 11:00 AM / 120 min)",
    icon: Clock,
  },
  {
    param: "Acreditación Oficial",
    detail: "Constancia Institucional de Voluntariado y Horas Pedagógicas emitida por la Dirección del plantel",
    icon: FileCheck2,
  },
];

const requisitos = [
  {
    title: "Nivel Académico (Series UNSCH)",
    desc: "Ser estudiante universitario regular a partir de la Serie 200 en adelante (Series 200, 300, 400, 500) o egresado, con preferencia en la Escuela Profesional de Educación Primaria o áreas afines.",
    icon: GraduationCap,
  },
  {
    title: "Disponibilidad Horaria",
    desc: "Disponibilidad indispensable para intervenir de manera presencial 2 sábados al mes de forma puntual (09:00 AM a 11:00 AM).",
    icon: Calendar,
  },
  {
    title: "Perfil Ético y Vocación",
    desc: "Vocación formativa, responsabilidad ética y capacidad de trabajo colaborativo interdisciplinario.",
    icon: HeartHandshake,
  },
  {
    title: "Salvaguarda Integral",
    desc: "No registrar antecedentes penales, judiciales ni policiales vinculados a delitos contra la libertad sexual o violencia familiar.",
    icon: ShieldCheck,
  },
];

const marcoLegal = [
  {
    ley: "Ley N.° 28238 — Ley General del Voluntariado",
    title: "Naturaleza del Voluntariado",
    desc: "La participación es estrictamente formativa, solidaria y ad honorem. No genera vínculo laboral, relación contractual de subordinación ni derechos de remuneración con la CBU UNSCH ni con la I.E. «Nuestra Señora de Lourdes».",
  },
  {
    ley: "Ley N.° 27337 y Ley N.° 30466",
    title: "Salvaguarda y Protección de Menores",
    desc: "En aplicación del principio del Interés Superior del Niño, el postulante se compromete a preservar la integridad física y psicológica de los menores. Se prohíbe el contacto individual no autorizado fuera de las instalaciones escolares y la toma o difusión de material audiovisual sin autorización formal de la Dirección.",
  },
  {
    ley: "Ley N.° 29733 — Protección de Datos",
    title: "Tratamiento de Datos Personales",
    desc: "Toda información consignada en el formulario será tratada bajo estricta reserva, destinándose exclusivamente a la evaluación del comité, elaboración del padrón oficial y gestión de constancias institucionales.",
  },
  {
    ley: "Normativa Institucional",
    title: "Confidencialidad Pedagógica",
    desc: "Los diagnósticos, fichas y evaluaciones de los menores son de uso exclusivo del equipo técnico interdisciplinario.",
  },
];

function VoluntariadoLourdesPage() {
  const [dniConsulta, setDniConsulta] = useState("");
  const [resultadoConsulta, setResultadoConsulta] = useState<{
    tipo: "admitido" | "evaluacion" | "no_encontrado";
    nombre?: string;
    turno?: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PostulaLourdesFormValues>({
    resolver: zodResolver(postulaLourdesSchema),
    defaultValues: {
      turno: "Grupo A",
      declaracionSalvaguarda: true,
      terminosLegales: true,
      serie: "Serie 200",
      escuela: "Educación Primaria",
    },
  });

  const onPostularSubmit = async (values: PostulaLourdesFormValues) => {
    try {
      const existing = JSON.parse(localStorage.getItem("cbu_postulaciones") || "[]");
      const nueva = {
        ...values,
        id: Date.now(),
        fecha: new Date().toLocaleDateString("es-PE"),
        programa: "Programa de Acompañamiento Pedagógico y Nivelación Escolar — I.E. Lourdes",
        estado: "EN REVISIÓN POR EL COMITÉ TÉCNICO",
      };
      existing.unshift(nueva);
      localStorage.setItem("cbu_postulaciones", JSON.stringify(existing));

      // Envío de correo oficial vía Resend API a cbu.unsch@gmail.com
      try {
        await sendEmail({
          subject: `[Postulación Voluntariado Lourdes] - ${values.nombre} (DNI ${values.dni})`,
          html: `
            <div style="font-family: sans-serif; line-height: 1.6; color: #1e293b; max-width: 650px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; padding: 28px; background: #ffffff;">
              <div style="border-bottom: 2px solid #800020; padding-bottom: 14px; margin-bottom: 20px;">
                <span style="background: #800020; color: #ffffff; font-size: 11px; font-weight: bold; padding: 4px 10px; border-radius: 9999px; text-transform: uppercase;">Nueva Postulación 2026</span>
                <h2 style="color: #800020; margin: 10px 0 4px; font-size: 22px;">Programa de Acompañamiento Pedagógico — I.E. Lourdes</h2>
                <p style="margin: 0; color: #64748b; font-size: 13px;">Comunidad Bíblica Universitaria (CBU UNSCH) en convenio con I.E. Nuestra Señora de Lourdes</p>
              </div>

              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
                <p style="margin: 0; font-size: 14px; font-weight: 600; color: #0f172a;">
                  Carrera y Nivel: ${values.escuela} — ${values.serie} (Código: ${values.codigo || "No registrado / Egresado"})
                </p>
              </div>

              <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 10px 0; color: #64748b; font-weight: bold; width: 170px;">Postulante:</td>
                  <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">${values.nombre}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 10px 0; color: #64748b; font-weight: bold;">DNI:</td>
                  <td style="padding: 10px 0; color: #0f172a;">${values.dni}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 10px 0; color: #64748b; font-weight: bold;">WhatsApp / Celular:</td>
                  <td style="padding: 10px 0; color: #0f172a;"><a href="https://wa.me/${values.whatsapp.replace(/\D/g, "")}" style="color: #059669; font-weight: 600; text-decoration: none;">${values.whatsapp} (Contactar)</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 10px 0; color: #64748b; font-weight: bold;">Correo:</td>
                  <td style="padding: 10px 0; color: #0f172a;"><a href="mailto:${values.correo}" style="color: #2563eb; text-decoration: none;">${values.correo}</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 10px 0; color: #64748b; font-weight: bold;">Turno preferente:</td>
                  <td style="padding: 10px 0; color: #0f172a;"><span style="background: #fef3c7; color: #92400e; padding: 3px 8px; border-radius: 4px; font-weight: 600;">${values.turno}</span></td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 10px 0; color: #64748b; font-weight: bold;">Salvaguarda:</td>
                  <td style="padding: 10px 0; color: #059669; font-weight: 600;">Declaración Jurada Aceptada (Ley N.° 27337)</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #64748b; font-weight: bold;">Términos y Ley 28238:</td>
                  <td style="padding: 10px 0; color: #059669; font-weight: 600;">Aceptado (Ad honorem & Datos)</td>
                </tr>
              </table>

              <p style="font-size: 12px; color: #94a3b8; margin: 0; text-align: center;">Notificación automática del Sistema de Postulaciones CBU UNSCH.</p>
            </div>
          `,
        });
      } catch (err) {
        console.warn("Error enviando email de postulación:", err);
      }

      toast.success("¡Postulación enviada correctamente!", {
        description: `Carrera y Nivel: ${values.escuela} — ${values.serie} ${values.codigo ? `(Código: ${values.codigo})` : ""}`,
      });
      reset();
      // Auto-set the DNI for immediate lookup feedback
      setDniConsulta(values.dni);
      setResultadoConsulta({
        tipo: "evaluacion",
        nombre: values.nombre,
        turno: values.turno,
      });
      const consultaEl = document.getElementById("consulta");
      if (consultaEl) {
        consultaEl.scrollIntoView({ behavior: "smooth" });
      }
    } catch {
      toast.error("Hubo un error al registrar la postulación. Intenta nuevamente.");
    }
  };

  const onConsultarDni = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanDni = dniConsulta.trim();
    if (!cleanDni || cleanDni.length !== 8) {
      toast.error("Ingresa un número de DNI válido de 8 dígitos.");
      return;
    }

    const postulaciones = JSON.parse(localStorage.getItem("cbu_postulaciones") || "[]");
    const found = postulaciones.find((p: any) => p.dni === cleanDni);

    if (found) {
      if (found.estado && found.estado.toLowerCase().includes("admitido")) {
        setResultadoConsulta({
          tipo: "admitido",
          nombre: found.nombre,
          turno: found.turno || "Grupo A (Semanas 1 y 3 del mes — 09:00 a 11:00 AM)",
        });
      } else {
        setResultadoConsulta({
          tipo: "evaluacion",
          nombre: found.nombre,
          turno: found.turno,
        });
      }
    } else {
      setResultadoConsulta({
        tipo: "no_encontrado",
      });
    }
  };

  return (
    <div className="bg-background text-foreground">
      {/* 1. HERO Y BREADCRUMB */}
      <section className="hairline border-b bg-secondary/30 px-6 py-10 md:px-12 md:py-16">
        <div className="mx-auto max-w-[1280px]">
          {/* BREADCRUMB */}
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">
              Inicio
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/oportunidades" className="hover:text-primary transition-colors">
              Oportunidades
            </Link>
            <ChevronRight className="h-3 w-3" />
            <a href="/oportunidades#convocatoria" className="hover:text-primary transition-colors">
              Convocatorias Activas
            </a>
            <ChevronRight className="h-3 w-3" />
            <span className="font-semibold text-foreground">I.E. Nuestra Señora de Lourdes</span>
          </nav>

          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>CONVENIO DE COOPERACIÓN 2026 • CBU UNSCH</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>4 Plazas Disponibles</span>
              </span>
            </div>

            <h1 className="mt-6 font-serif text-3xl font-medium tracking-tight text-foreground md:text-5xl lg:text-6xl max-w-4xl">
              Programa de Acompañamiento Pedagógico y Nivelación Escolar
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-xl">
              Iniciativa de Aprendizaje-Servicio e intervención didáctica personalizada en lectoescritura y razonamiento
              lógico-matemático para escolares de 2.° grado de primaria, con respaldo técnico multidisciplinario.
            </p>

            {/* BOTONES DE ACCIÓN HERO */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#formulario"
                className="inline-flex items-center gap-2.5 rounded-full bg-primary px-8 py-3.5 font-sans text-xs font-semibold uppercase tracking-wider text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:gap-3.5 cursor-pointer"
              >
                <span>POSTULAR AHORA</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#consulta"
                className="inline-flex items-center gap-2 rounded-full border border-hairline bg-background px-6 py-3.5 font-sans text-xs font-semibold uppercase tracking-wider text-foreground transition-colors hover:bg-secondary cursor-pointer"
              >
                <Search className="h-4 w-4 text-accent" />
                <span>CONSULTAR ESTADO DNI</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FICHA TÉCNICA INSTITUCIONAL */}
      <section className="px-6 py-12 md:px-12 md:py-20">
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              {/* IMAGEN OFICIAL */}
              <div className="lg:col-span-5">
                <div className="relative overflow-hidden rounded-2xl border border-hairline bg-card shadow-md aspect-[4/3]">
                  <img
                    src={voluntariadoImg}
                    alt="Programa de Acompañamiento Pedagógico I.E. Nuestra Señora de Lourdes"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-background/95 px-3.5 py-1.5 text-xs font-semibold text-primary shadow backdrop-blur">
                    <Building2 className="h-3.5 w-3.5" />
                    <span>I.E. Lourdes · Sede Oficial</span>
                  </span>
                </div>
              </div>

              {/* TABLA DE FICHA TÉCNICA */}
              <div className="lg:col-span-7">
                <p className="label-eyebrow text-accent">Ficha Técnica Oficial</p>
                <h2 className="mt-2 font-serif text-2xl font-medium text-foreground md:text-3xl">
                  Detalles institucionales de la convocatoria
                </h2>

                <div className="mt-6 divide-y divide-hairline rounded-2xl border border-hairline bg-card shadow-sm">
                  {fichaTecnica.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div key={idx} className="flex flex-col gap-2 p-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6 md:p-5">
                        <div className="flex items-center gap-3 sm:w-1/3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Icon className="h-4 w-4" />
                          </div>
                          <span className="font-sans text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            {item.param}
                          </span>
                        </div>
                        <div className="sm:w-2/3">
                          <p className="font-serif text-sm font-medium text-foreground sm:text-base">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. REQUISITOS DE PARTICIPACIÓN (SERIES UNSCH) */}
      <section className="hairline border-t bg-secondary/20 px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <SectionHeading number="01" eyebrow="Perfil Requerido">
              Requisitos de <span className="italic text-primary">participación</span>.
            </SectionHeading>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {requisitos.map((req, idx) => {
              const Icon = req.icon;
              return (
                <Reveal key={idx} delay={idx * 0.1}>
                  <div className="flex h-full flex-col justify-between rounded-2xl border border-hairline bg-card p-6 shadow-sm transition-all hover:border-primary/40 hover:shadow-md">
                    <div>
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-5 font-serif text-lg font-medium text-foreground">
                        {req.title}
                      </h3>
                      <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">
                        {req.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. MARCO LEGAL Y SALVAGUARDA INFANTIL */}
      <section className="hairline border-t px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <SectionHeading number="02" eyebrow="Protección y Garantías">
              Marco legal y <span className="italic text-primary">salvaguarda infantil</span>.
            </SectionHeading>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {marcoLegal.map((item, idx) => (
              <Reveal key={idx} delay={idx * 0.08}>
                <div className="rounded-2xl border border-hairline bg-card p-6 shadow-sm md:p-8">
                  <span className="label-eyebrow text-accent font-semibold">{item.ley}</span>
                  <h3 className="mt-2 font-serif text-xl font-medium text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FORMULARIO OFICIAL DE POSTULACIÓN */}
      <section id="formulario" className="hairline scroll-mt-24 border-t bg-secondary/30 px-6 py-16 md:px-12 md:py-28">
        <div className="mx-auto max-w-[860px]">
          <Reveal>
            <div className="text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                <FileText className="h-3.5 w-3.5" />
                <span>Convocatoria Lourdes 2026</span>
              </span>
              <h2 className="mt-4 font-serif text-3xl font-medium text-foreground md:text-4xl">
                Formulario Oficial de Postulación
              </h2>
              <p className="mt-3 text-sm text-muted-foreground md:text-base">
                Completa tus datos con precisión según tu DNI. Los resultados de selección se notificarán vía correo y en este portal.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onPostularSubmit)}
              className="mt-10 rounded-2xl border border-hairline bg-card p-6 shadow-lg md:p-10 space-y-6"
            >
              {/* 1. Nombres */}
              <div>
                <label className="label-eyebrow mb-1.5 block text-xs">
                  1. Nombres y Apellidos Completos (según DNI) *
                </label>
                <input
                  {...register("nombre")}
                  placeholder="Ingrese sus nombres y apellidos completos..."
                  className="w-full rounded-xl border border-hairline bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none"
                />
                {errors.nombre && (
                  <p className="mt-1 text-xs text-destructive">{errors.nombre.message}</p>
                )}
              </div>

              {/* 2 y 3. DNI y Correo */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="label-eyebrow mb-1.5 block text-xs">
                    2. Documento Nacional de Identidad (DNI) *
                  </label>
                  <input
                    {...register("dni")}
                    placeholder="8 dígitos exactos"
                    maxLength={8}
                    className="w-full rounded-xl border border-hairline bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none"
                  />
                  {errors.dni && (
                    <p className="mt-1 text-xs text-destructive">{errors.dni.message}</p>
                  )}
                </div>

                <div>
                  <label className="label-eyebrow mb-1.5 block text-xs">
                    3. Correo Electrónico Institucional / Personal *
                  </label>
                  <input
                    {...register("correo")}
                    type="email"
                    placeholder="ejemplo@correo.com"
                    className="w-full rounded-xl border border-hairline bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none"
                  />
                  {errors.correo && (
                    <p className="mt-1 text-xs text-destructive">{errors.correo.message}</p>
                  )}
                </div>
              </div>

              {/* 4. WhatsApp */}
              <div>
                <label className="label-eyebrow mb-1.5 block text-xs">
                  4. Número de WhatsApp / Teléfono de Contacto *
                </label>
                <input
                  {...register("whatsapp")}
                  placeholder="+51 9XX XXX XXX"
                  className="w-full rounded-xl border border-hairline bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none"
                />
                {errors.whatsapp && (
                  <p className="mt-1 text-xs text-destructive">{errors.whatsapp.message}</p>
                )}
              </div>

              {/* 5 y 6. Escuela Profesional y Serie UNSCH */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="label-eyebrow mb-1.5 block text-xs">
                    5. Escuela Profesional / Carrera *
                  </label>
                  <select
                    {...register("escuela")}
                    className="w-full rounded-xl border border-hairline bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none"
                  >
                    <option value="Educación Primaria">Educación Primaria</option>
                    <option value="Educación Inicial">Educación Inicial</option>
                    <option value="Educación Secundaria">Educación Secundaria</option>
                    <option value="Trabajo Social">Trabajo Social</option>
                    <option value="Psicología">Psicología</option>
                    <option value="Ciencias de la Comunicación">Ciencias de la Comunicación</option>
                    <option value="Antropología Social">Antropología Social</option>
                    <option value="Otra Carrera afín">Otra Carrera afín</option>
                  </select>
                  {errors.escuela && (
                    <p className="mt-1 text-xs text-destructive">{errors.escuela.message}</p>
                  )}
                </div>

                <div>
                  <label className="label-eyebrow mb-1.5 block text-xs">
                    6. Nivel Académico (Serie UNSCH) *
                  </label>
                  <select
                    {...register("serie")}
                    className="w-full rounded-xl border border-hairline bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none"
                  >
                    <option value="Serie 200">Serie 200</option>
                    <option value="Serie 300">Serie 300</option>
                    <option value="Serie 400">Serie 400</option>
                    <option value="Serie 500">Serie 500</option>
                    <option value="Egresado / Bachiller">Egresado / Bachiller</option>
                  </select>
                  {errors.serie && (
                    <p className="mt-1 text-xs text-destructive">{errors.serie.message}</p>
                  )}
                </div>
              </div>

              {/* 7 y 8. Código UNSCH y Turno */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="label-eyebrow mb-1.5 block text-xs">
                    7. Código de Estudiante UNSCH
                  </label>
                  <input
                    {...register("codigo")}
                    placeholder="Ej. 27220101"
                    maxLength={12}
                    className="w-full rounded-xl border border-hairline bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none"
                  />
                  {errors.codigo && (
                    <p className="mt-1 text-xs text-destructive">{errors.codigo.message}</p>
                  )}
                  <span className="mt-1 block text-[0.7rem] text-muted-foreground">
                    Opcional si eres egresado sin código activo.
                  </span>
                </div>

                <div>
                  <label className="label-eyebrow mb-2 block text-xs">
                    8. Turno de Preferencia *
                  </label>
                  <div className="space-y-2 rounded-xl border border-hairline bg-background/50 p-3.5">
                    <label className="flex items-center gap-2.5 text-xs text-foreground cursor-pointer">
                      <input
                        type="radio"
                        value="Grupo A"
                        {...register("turno")}
                        className="text-primary focus:ring-primary"
                      />
                      <span>Grupo A: Semanas 1 y 3 del mes (09:00 - 11:00 AM)</span>
                    </label>
                    <label className="flex items-center gap-2.5 text-xs text-foreground cursor-pointer">
                      <input
                        type="radio"
                        value="Grupo B"
                        {...register("turno")}
                        className="text-primary focus:ring-primary"
                      />
                      <span>Grupo B: Semanas 2 y 4 del mes (09:00 - 11:00 AM)</span>
                    </label>
                    <label className="flex items-center gap-2.5 text-xs text-foreground cursor-pointer">
                      <input
                        type="radio"
                        value="Flexible"
                        {...register("turno")}
                        className="text-primary focus:ring-primary"
                      />
                      <span>Flexible / Cualquier turno disponible</span>
                    </label>
                  </div>
                  {errors.turno && (
                    <p className="mt-1 text-xs text-destructive">{errors.turno.message}</p>
                  )}
                </div>
              </div>

              {/* CHECKBOXES OBLIGATORIOS */}
              <div className="space-y-4 pt-4 border-t border-hairline">
                <label className="flex items-start gap-3 text-xs leading-relaxed text-foreground/90 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("declaracionSalvaguarda")}
                    className="mt-0.5 rounded border-hairline text-primary focus:ring-primary"
                  />
                  <span>
                    <strong>DECLARACIÓN JURADA DE SALVAGUARDA (OBLIGATORIO) *:</strong> Declaro bajo juramento no
                    registrar antecedentes penales, policiales ni judiciales por violencia o delitos contra la
                    libertad sexual, y me comprometo al cumplimiento de las normas de protección integral infantil
                    (Ley N.° 27337).
                  </span>
                </label>
                {errors.declaracionSalvaguarda && (
                  <p className="text-xs text-destructive">{errors.declaracionSalvaguarda.message}</p>
                )}

                <label className="flex items-start gap-3 text-xs leading-relaxed text-foreground/90 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("terminosLegales")}
                    className="mt-0.5 rounded border-hairline text-primary focus:ring-primary"
                  />
                  <span>
                    <strong>TÉRMINOS LEGALES Y PROTECCIÓN DE DATOS (OBLIGATORIO) *:</strong> Acepto la naturaleza ad
                    honorem del voluntariado (Ley N.° 28238) y autorizo el tratamiento de mis datos con fines de
                    acreditación institucional (Ley N.° 29733).
                  </span>
                </label>
                {errors.terminosLegales && (
                  <p className="text-xs text-destructive">{errors.terminosLegales.message}</p>
                )}
              </div>

              {/* BOTÓN ENVIAR */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full bg-primary py-4 font-sans text-xs font-semibold uppercase tracking-wider text-primary-foreground shadow-md transition-all hover:bg-primary/90 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? "Enviando postulación..." : "ENVIAR POSTULACIÓN OFICIAL"}
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </section>

      {/* 5. MÓDULO DE CONSULTA DE ADMISIÓN (DNI LOOKUP) */}
      <section id="consulta" className="hairline scroll-mt-24 border-t px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-[720px]">
          <Reveal>
            <div className="text-center">
              <span className="label-eyebrow text-accent font-semibold">Panel de Verificación</span>
              <h2 className="mt-2 font-serif text-3xl font-medium text-foreground">
                Consulta de Admisión al Voluntariado
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Ingresa tu DNI registrado para verificar el estado actualizado emitido por el comité técnico.
              </p>
            </div>

            {/* FORMULARIO CONSULTA */}
            <form onSubmit={onConsultarDni} className="mt-8 flex gap-3">
              <input
                type="text"
                value={dniConsulta}
                onChange={(e) => setDniConsulta(e.target.value.replace(/\D/g, "").slice(0, 8))}
                placeholder="DNI (8 dígitos exactos)"
                maxLength={8}
                className="flex-1 rounded-full border border-hairline bg-card px-5 py-3 text-sm text-foreground focus:border-primary focus:outline-none shadow-sm"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 font-sans text-xs font-semibold uppercase tracking-wider text-primary-foreground shadow transition-colors hover:bg-primary/90 cursor-pointer"
              >
                <Search className="h-4 w-4" />
                <span>CONSULTAR</span>
              </button>
            </form>

            {/* RESULTADO PANEL */}
            {resultadoConsulta && (
              <div className="mt-8 rounded-2xl border border-hairline bg-card p-6 shadow-md md:p-8">
                {resultadoConsulta.tipo === "admitido" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>POSTULANTE SELECCIONADO / ADMITIDO</span>
                      </span>
                    </div>
                    {resultadoConsulta.nombre && (
                      <p className="font-serif text-xl font-medium text-foreground">
                        {resultadoConsulta.nombre}
                      </p>
                    )}
                    <p className="text-sm leading-relaxed text-foreground/90">
                      «¡Felicitaciones! Has sido admitido para el {resultadoConsulta.turno || "Grupo A (Semanas 1 y 3 del mes — 09:00 a 11:00 AM)"}.»
                    </p>
                    <div className="pt-2">
                      <a
                        href="https://chat.whatsapp.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 rounded-full bg-emerald-600 px-6 py-3 font-sans text-xs font-semibold uppercase tracking-wider text-white shadow transition-colors hover:bg-emerald-700 cursor-pointer"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>Unirse al Grupo Operativo de WhatsApp</span>
                      </a>
                    </div>
                  </div>
                )}

                {resultadoConsulta.tipo === "evaluacion" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 rounded-full bg-amber-500/15 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                        <Clock className="h-4 w-4" />
                        <span>EN REVISIÓN POR EL COMITÉ TÉCNICO</span>
                      </span>
                    </div>
                    {resultadoConsulta.nombre && (
                      <p className="font-serif text-xl font-medium text-foreground">
                        {resultadoConsulta.nombre}
                      </p>
                    )}
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      «Tu postulación está siendo evaluada. Los resultados finales se publicarán en este panel en menos de 24 horas.»
                    </p>
                  </div>
                )}

                {resultadoConsulta.tipo === "no_encontrado" && (
                  <div className="space-y-4 text-center py-2">
                    <div className="flex justify-center">
                      <span className="inline-flex items-center gap-2 rounded-full bg-destructive/15 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-destructive">
                        <AlertCircle className="h-4 w-4" />
                        <span>DNI NO ENCONTRADO</span>
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      «El número no registra una postulación activa. Completa el formulario para participar en la convocatoria.»
                    </p>
                    <div className="pt-2">
                      <a
                        href="#formulario"
                        className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 font-sans text-xs font-semibold uppercase tracking-wider text-primary-foreground hover:bg-primary/90"
                      >
                        <span>IR AL FORMULARIO</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}
          </Reveal>
        </div>
      </section>
    </div>
  );
}
