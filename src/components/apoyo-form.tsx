import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { sendEmail } from "@/lib/email";
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
    try {
      const rolLabels: Record<string, string> = {
        iglesia_local: "Iglesia local",
        profesional: "Profesional",
        egresado: "Egresado CBU",
        mentor: "Mentor / Asesor",
      };
      const rolTexto = rolLabels[values.rol] || values.rol;

      await sendEmail({
        subject: `[Propuesta de Apoyo / Alianza] - ${values.nombre} (${rolTexto})`,
        html: `
          <div style="font-family: sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; background: #ffffff;">
            <div style="border-bottom: 2px solid #800020; padding-bottom: 12px; margin-bottom: 20px;">
              <h2 style="color: #800020; margin: 0; font-size: 20px;">Nueva Propuesta de Apoyo y Alianza</h2>
              <p style="margin: 4px 0 0; color: #64748b; font-size: 13px;">Comunidad Bíblica Universitaria — CBU UNSCH</p>
            </div>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; width: 140px; font-weight: bold;">Nombre:</td>
                <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${values.nombre}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Rol / Perfil:</td>
                <td style="padding: 8px 0; color: #0f172a;"><span style="background: #f1f5f9; padding: 4px 10px; border-radius: 6px; font-weight: 600;">${rolTexto}</span></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Contacto:</td>
                <td style="padding: 8px 0; color: #0f172a;">${values.contacto}</td>
              </tr>
            </table>
            <div style="background: #f8fafc; border-left: 4px solid #800020; padding: 16px; border-radius: 4px; margin-bottom: 20px;">
              <p style="margin: 0 0 6px; font-weight: bold; color: #334155;">Mensaje / Propuesta:</p>
              <p style="margin: 0; color: #1e293b; white-space: pre-line;">${values.mensaje.trim()}</p>
            </div>
            <p style="font-size: 11px; color: #94a3b8; margin: 0; text-align: center;">Enviado desde el portal web cbuunsch.pe</p>
          </div>
        `,
      });
      toast.success("Propuesta enviada. Gracias por sumarte a la obra.");
      setSubmitted(true);
      reset();
    } catch {
      toast.error("No pudimos enviar tu propuesta. Intenta de nuevo.");
    }
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
