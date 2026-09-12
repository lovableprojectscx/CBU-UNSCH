CREATE TABLE public.oraciones (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT,
  categoria TEXT NOT NULL,
  mensaje TEXT NOT NULL,
  permite_publicar BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT INSERT ON public.oraciones TO anon, authenticated;
GRANT ALL ON public.oraciones TO service_role;

ALTER TABLE public.oraciones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a prayer request"
  ON public.oraciones
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(mensaje) BETWEEN 10 AND 1000
    AND char_length(categoria) BETWEEN 2 AND 40
    AND (nombre IS NULL OR char_length(nombre) <= 80)
  );