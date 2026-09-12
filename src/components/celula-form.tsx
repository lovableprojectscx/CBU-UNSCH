import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const schema = z.object({
  nombre: z.string().min(2, "Ingresa tu nombre completo"),
  facultad: z.string().min(2, "Ingresa tu facultad o escuela"),
  ciclo: z.string().min(1, "Indica tu ciclo actual"),
  whatsapp: z
    .string()
    .min(6, "Número de WhatsApp inválido")
    .regex(/^[0-9+\s()-]+$/, "Solo dígitos y símbolos telefónicos"),
});

type FormValues = z.infer<typeof schema>;

const fields: Array<{ name: keyof FormValues; label: string; placeholder: string; type?: string }> = [
  { name: "nombre", label: "Nombre completo", placeholder: "Ej. María Quispe Huamán" },
  { name: "facultad", label: "Facultad / Escuela profesional", placeholder: "Ej. Ing. de Sistemas" },
  { name: "ciclo", label: "Ciclo actual", placeholder: "Ej. V" },
  { name: "whatsapp", label: "Número de WhatsApp", placeholder: "Ej. 966 123 456", type: "tel" },
];

export function CelulaForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    const { error } = await supabase.from("celula_registros").insert(values);
    if (error) {
      toast.error("No pudimos enviar tu registro. Intenta de nuevo.");
      return;
    }
    toast.success("Registro enviado. Un coordinador te escribirá pronto.");
    setSubmitted(true);
    reset();
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-hairline bg-card p-8 md:p-12 shadow-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <p className="label-eyebrow text-accent mt-6">Registro recibido</p>
        <p className="mt-4 font-serif text-2xl font-medium leading-tight text-foreground md:text-3xl">
          Gracias. Un coordinador te escribirá por{" "}
          <span className="italic text-primary">WhatsApp</span> muy pronto.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="link-underline mt-8 font-sans text-sm font-semibold text-primary"
        >
          Enviar otro registro
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {fields.map((f) => (
        <div key={f.name} className="group">
          <label
            htmlFor={f.name}
            className="label-eyebrow mb-2 block"
          >
            {f.label}
          </label>
          <input
            id={f.name}
            type={f.type ?? "text"}
            placeholder={f.placeholder}
            {...register(f.name)}
            className="w-full border-0 border-b border-hairline bg-transparent py-2.5 font-sans text-base font-medium text-foreground transition-colors placeholder:text-muted-foreground/40 focus:border-primary focus:outline-none focus:ring-0 md:text-lg"
          />
          {errors[f.name] ? (
            <p className="mt-1.5 font-sans text-xs font-medium text-destructive">
              {errors[f.name]?.message as string}
            </p>
          ) : null}
        </div>
      ))}

      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex items-center gap-3 rounded-full border border-primary bg-primary px-8 py-3.5 font-sans text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-md transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:gap-4 disabled:opacity-40"
        >
          <span>{isSubmitting ? "Enviando…" : "Enviar solicitud"}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </form>
  );
}
