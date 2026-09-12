import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const schema = z.object({
  nombre: z.string().min(2, "Ingresa tu nombre"),
  rol: z.string().min(2, "Indica tu rol"),
  contacto: z.string().min(4, "Ingresa un contacto válido"),
  mensaje: z.string().min(10, "Cuéntanos brevemente tu propuesta"),
});

type FormValues = z.infer<typeof schema>;

export function ApoyoForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { rol: "" },
  });

  const onSubmit = async (values: FormValues) => {
    const { error } = await supabase.from("apoyo_propuestas").insert(values);
    if (error) {
      toast.error("No pudimos enviar tu propuesta. Intenta de nuevo.");
      return;
    }
    toast.success("Propuesta enviada. Gracias por sumarte a la obra.");
    setSubmitted(true);
    reset();
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-hairline bg-card p-8 md:p-12 shadow-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <p className="label-eyebrow text-accent mt-6">Propuesta recibida</p>
        <p className="mt-4 font-serif text-2xl font-medium leading-tight text-foreground md:text-3xl">
          Gracias por sumarte. Nos comunicaremos contigo <span className="italic text-primary">muy pronto</span>.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="link-underline mt-8 font-sans text-sm font-semibold text-primary"
        >
          Enviar otra propuesta
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div>
        <label htmlFor="nombre" className="label-eyebrow mb-2 block">
          Nombre completo
        </label>
        <input
          id="nombre"
          {...register("nombre")}
          placeholder="Ej. Juan Pérez"
          className="w-full border-0 border-b border-hairline bg-transparent py-2.5 font-sans text-base font-medium text-foreground transition-colors placeholder:text-muted-foreground/40 focus:border-primary focus:outline-none focus:ring-0 md:text-lg"
        />
        {errors.nombre ? (
          <p className="mt-1.5 font-sans text-xs font-medium text-destructive">{errors.nombre.message}</p>
        ) : null}
      </div>

      <div>
        <label htmlFor="rol" className="label-eyebrow mb-2 block">
          Tu rol o vinculación
        </label>
        <select
          id="rol"
          {...register("rol")}
          className="w-full appearance-none border-0 border-b border-hairline bg-transparent py-2.5 font-sans text-base font-medium text-foreground focus:border-primary focus:outline-none focus:ring-0 md:text-lg"
        >
          <option value="" className="bg-background text-foreground">Selecciona tu perfil…</option>
          <option value="iglesia_local" className="bg-background text-foreground">Iglesia local</option>
          <option value="profesional" className="bg-background text-foreground">Profesional</option>
          <option value="egresado" className="bg-background text-foreground">Egresado CBU</option>
          <option value="mentor" className="bg-background text-foreground">Mentor / Asesor</option>
        </select>
        {errors.rol ? <p className="mt-1.5 font-sans text-xs font-medium text-destructive">{errors.rol.message}</p> : null}
      </div>

      <div>
        <label htmlFor="contacto" className="label-eyebrow mb-2 block">
          Contacto (Email o WhatsApp)
        </label>
        <input
          id="contacto"
          {...register("contacto")}
          placeholder="Ej. juan@ejemplo.com"
          className="w-full border-0 border-b border-hairline bg-transparent py-2.5 font-sans text-base font-medium text-foreground transition-colors placeholder:text-muted-foreground/40 focus:border-primary focus:outline-none focus:ring-0 md:text-lg"
        />
        {errors.contacto ? (
          <p className="mt-1.5 font-sans text-xs font-medium text-destructive">{errors.contacto.message}</p>
        ) : null}
      </div>

      <div>
        <label htmlFor="mensaje" className="label-eyebrow mb-2 block">
          Tu propuesta o mensaje
        </label>
        <textarea
          id="mensaje"
          rows={4}
          {...register("mensaje")}
          placeholder="Cuéntanos cómo te gustaría sumarte a la obra…"
          className="w-full resize-none border-0 border-b border-hairline bg-transparent py-2.5 font-sans text-base leading-relaxed text-foreground transition-colors placeholder:text-muted-foreground/40 focus:border-primary focus:outline-none focus:ring-0 md:text-lg"
        />
        {errors.mensaje ? (
          <p className="mt-1.5 font-sans text-xs font-medium text-destructive">{errors.mensaje.message}</p>
        ) : null}
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex items-center gap-3 rounded-full border border-primary bg-primary px-8 py-3.5 font-sans text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-md transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:gap-4 disabled:opacity-40"
        >
          <span>{isSubmitting ? "Enviando…" : "Enviar propuesta"}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </form>
  );
}
