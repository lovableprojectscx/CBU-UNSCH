import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { sendEmail } from "@/lib/email";
import { ArrowRight, HandHeart, CheckCircle2 } from "lucide-react";

const schema = z.object({
  nombre: z
    .string()
    .trim()
    .max(80, "Máx. 80 caracteres")
    .optional()
    .or(z.literal("")),
  categoria: z.string().min(2, "Selecciona una categoría"),
  mensaje: z
    .string()
    .trim()
    .min(10, "Cuéntanos un poco más (mín. 10 caracteres)")
    .max(1000, "Máx. 1000 caracteres"),
  permite_publicar: z.boolean().optional(),
});

type FormValues = z.infer<typeof schema>;

export function OracionForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { categoria: "", permite_publicar: false },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const nombreFinal = values.nombre?.trim() || "Anónimo";
      await sendEmail({
        subject: `[Pedido de Oración] - ${values.categoria} - ${nombreFinal}`,
        html: `
          <div style="font-family: sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; background: #ffffff;">
            <div style="border-bottom: 2px solid #800020; padding-bottom: 12px; margin-bottom: 20px;">
              <h2 style="color: #800020; margin: 0; font-size: 20px;">Nuevo Pedido de Oración — CBU UNSCH</h2>
              <p style="margin: 4px 0 0; color: #64748b; font-size: 13px;">Comunidad Bíblica Universitaria de Ayacucho</p>
            </div>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; width: 140px; font-weight: bold;">Nombre:</td>
                <td style="padding: 8px 0; color: #0f172a;">${nombreFinal}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Categoría:</td>
                <td style="padding: 8px 0; color: #0f172a;"><span style="background: #f1f5f9; padding: 4px 10px; border-radius: 6px; font-weight: 600;">${values.categoria}</span></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Compartir en comunidad:</td>
                <td style="padding: 8px 0; color: #0f172a;">${values.permite_publicar ? "Sí, compartir de forma anónima" : "No, privacidad pastoral exclusiva"}</td>
              </tr>
            </table>
            <div style="background: #f8fafc; border-left: 4px solid #800020; padding: 16px; border-radius: 4px; margin-bottom: 20px;">
              <p style="margin: 0 0 6px; font-weight: bold; color: #334155;">Petición / Motivo:</p>
              <p style="margin: 0; color: #1e293b; white-space: pre-line;">${values.mensaje.trim()}</p>
            </div>
            <p style="font-size: 11px; color: #94a3b8; margin: 0; text-align: center;">Enviado desde el portal web cbuunsch.pe</p>
          </div>
        `,
      });

      toast.success("Pedido recibido. La comunidad orará por ti.");
      setSubmitted(true);
      reset();
    } catch {
      toast.error("No pudimos enviar tu pedido de oración. Intenta de nuevo.");
    }
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-hairline bg-card p-8 md:p-12 shadow-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <p className="label-eyebrow text-accent mt-6">Pedido recibido</p>
        <p className="mt-4 font-serif text-2xl font-medium leading-tight text-foreground md:text-3xl">
          Gracias por confiar. Vamos a <span className="italic text-primary">orar por ti</span>.
        </p>
        <p className="mt-4 font-sans text-sm leading-relaxed text-muted-foreground">
          Tu pedido llegó a la Junta Directiva Local. En nuestras próximas vigilias y células lo llevaremos al Padre.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="link-underline mt-8 font-sans text-sm font-semibold text-primary"
        >
          Enviar otro pedido
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div>
        <label htmlFor="nombre" className="label-eyebrow mb-2 block">
          Tu nombre <span className="normal-case tracking-normal text-muted-foreground/70">(opcional)</span>
        </label>
        <input
          id="nombre"
          {...register("nombre")}
          placeholder="Puedes dejarlo en blanco si prefieres"
          maxLength={80}
          className="w-full border-0 border-b border-hairline bg-transparent py-2.5 font-sans text-base font-medium text-foreground transition-colors placeholder:text-muted-foreground/40 focus:border-primary focus:outline-none focus:ring-0 md:text-lg"
        />
        {errors.nombre ? (
          <p className="mt-1.5 font-sans text-xs font-medium text-destructive">{errors.nombre.message}</p>
        ) : null}
      </div>

      <div>
        <label htmlFor="categoria" className="label-eyebrow mb-2 block">
          Motivo principal
        </label>
        <select
          id="categoria"
          {...register("categoria")}
          className="w-full appearance-none border-0 border-b border-hairline bg-transparent py-2.5 font-sans text-base font-medium text-foreground focus:border-primary focus:outline-none focus:ring-0 md:text-lg"
        >
          <option value="" className="bg-background text-foreground">Selecciona un motivo…</option>
          <option value="salud" className="bg-background text-foreground">Salud</option>
          <option value="familia" className="bg-background text-foreground">Familia</option>
          <option value="estudios" className="bg-background text-foreground">Estudios y exámenes</option>
          <option value="vocacion" className="bg-background text-foreground">Vocación y futuro</option>
          <option value="espiritual" className="bg-background text-foreground">Vida espiritual</option>
          <option value="accion_de_gracias" className="bg-background text-foreground">Acción de gracias</option>
          <option value="otro" className="bg-background text-foreground">Otro</option>
        </select>
        {errors.categoria ? (
          <p className="mt-1.5 font-sans text-xs font-medium text-destructive">{errors.categoria.message}</p>
        ) : null}
      </div>

      <div>
        <label htmlFor="mensaje" className="label-eyebrow mb-2 block">
          Tu pedido de oración
        </label>
        <textarea
          id="mensaje"
          rows={5}
          {...register("mensaje")}
          placeholder="Cuéntanos por qué quieres que oremos…"
          maxLength={1000}
          className="w-full resize-none border-0 border-b border-hairline bg-transparent py-2.5 font-sans text-base leading-relaxed text-foreground transition-colors placeholder:text-muted-foreground/40 focus:border-primary focus:outline-none focus:ring-0 md:text-lg"
        />
        {errors.mensaje ? (
          <p className="mt-1.5 font-sans text-xs font-medium text-destructive">{errors.mensaje.message}</p>
        ) : null}
      </div>

      <label className="flex cursor-pointer items-start gap-3.5 font-sans text-sm text-foreground/80">
        <input
          type="checkbox"
          {...register("permite_publicar")}
          className="mt-0.5 h-4 w-4 rounded border-hairline text-primary focus:ring-primary/20"
        />
        <span className="leading-relaxed">
          Autorizo compartir mi pedido de forma <em className="not-italic font-semibold">anónima</em> con la comunidad para orar juntos.
        </span>
      </label>

      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex items-center gap-3 rounded-full border border-primary bg-primary px-8 py-3.5 font-sans text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-md transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:gap-4 disabled:opacity-40"
        >
          <span>{isSubmitting ? "Enviando…" : "Enviar pedido de oración"}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </form>
  );
}
