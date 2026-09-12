import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { SiteNav } from "../components/site-nav";
import { SiteFooter } from "../components/site-footer";
import { Toaster } from "../components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <p className="label-eyebrow text-accent">Error 404</p>
        <h1 className="mt-4 font-serif text-6xl text-foreground">
          Página <span className="italic">no encontrada</span>
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          El enlace que sigues no existe o fue movido.
        </p>
        <div className="mt-8">
          <Link to="/" className="link-underline font-serif text-lg italic text-primary">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <p className="label-eyebrow text-accent">Algo salió mal</p>
        <h1 className="mt-4 font-serif text-4xl text-foreground">Esta página no cargó</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Puedes intentar de nuevo o volver al inicio.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-6">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="link-underline font-serif italic text-primary"
          >
            Intentar de nuevo
          </button>
          <a href="/" className="link-underline font-serif italic text-foreground">
            Ir al inicio
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "CBU UNSCH — Comunidad Bíblica Universitaria de Ayacucho" },
      {
        name: "description",
        content:
          "Comunidad Bíblica Universitaria de la UNSCH en Ayacucho. Estudiantes cristianos unidos por la fe, el estudio de la Biblia y la vida universitaria.",
      },
      { name: "author", content: "CBU UNSCH" },
      { property: "og:title", content: "CBU UNSCH — Comunidad Bíblica Universitaria" },
      {
        property: "og:description",
        content:
          "Estudiantes cristianos de la Universidad Nacional de San Cristóbal de Huamanga viviendo y compartiendo su fe.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "CBU UNSCH" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "CBU UNSCH — Comunidad Bíblica Universitaria" },
      {
        name: "twitter:description",
        content:
          "Estudiantes cristianos de la Universidad Nacional de San Cristóbal de Huamanga viviendo y compartiendo su fe en Ayacucho.",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "apple-touch-icon", href: "/favicon.svg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&family=Fraunces:ital,opsz,wght,SOFT@0,9..144,300..700,0..100;1,9..144,300..700,0..100&display=swap",
      },

    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <SiteNav />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}
