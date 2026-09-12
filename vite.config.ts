import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tailwindcss(),
    tanstackStart({
      server: { entry: "server" },
    }),
    nitro({
      preset: process.env.NITRO_PRESET || (process.env.VERCEL ? "vercel" : "vercel"),
    }),
    react(),
    {
      name: "resend-api-middleware",
      configureServer(server) {
        server.middlewares.use("/api/send-email", async (req, res) => {
          if (req.method !== "POST") {
            res.statusCode = 405;
            res.end(JSON.stringify({ error: "Method not allowed" }));
            return;
          }
          let body = "";
          req.on("data", (chunk: any) => (body += chunk));
          req.on("end", async () => {
            try {
              const data = JSON.parse(body);
              const apiKey = process.env.RESEND_API_KEY;
              const { Resend } = await import("resend");
              const resend = new Resend(apiKey || "");
              const from = process.env.RESEND_FROM_EMAIL || "CBU UNSCH <onboarding@resend.dev>";
              const to = data.to || process.env.RESEND_TO_EMAIL || "cbu.unsch@gmail.com";
              const result = await resend.emails.send({
                from,
                to,
                subject: data.subject,
                html: data.html,
                text: data.text,
              });
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify(result));
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: err.message }));
            }
          });
        });
      },
    },
  ],
});

