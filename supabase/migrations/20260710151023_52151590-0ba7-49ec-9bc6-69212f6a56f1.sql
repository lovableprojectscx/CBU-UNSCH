
CREATE TABLE public.celula_registros (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre text NOT NULL,
  facultad text NOT NULL,
  ciclo text NOT NULL,
  whatsapp text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.celula_registros TO anon, authenticated;
GRANT ALL ON public.celula_registros TO service_role;
ALTER TABLE public.celula_registros ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert celula registros"
  ON public.celula_registros FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE TABLE public.apoyo_propuestas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre text NOT NULL,
  rol text NOT NULL,
  contacto text NOT NULL,
  mensaje text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.apoyo_propuestas TO anon, authenticated;
GRANT ALL ON public.apoyo_propuestas TO service_role;
ALTER TABLE public.apoyo_propuestas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert apoyo propuestas"
  ON public.apoyo_propuestas FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
