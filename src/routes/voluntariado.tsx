import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/voluntariado")({
  beforeLoad: () => {
    throw redirect({ to: "/oportunidades" });
  },
});


