import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";

export type EmailPayload = {
  subject: string;
  html: string;
  text?: string;
  to?: string;
};

export const sendEmailFn = createServerFn({ method: "POST" })
  .validator((d: EmailPayload) => d)
  .handler(async ({ data }) => {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn("RESEND_API_KEY is not defined in environment variables");
    }
    const resend = new Resend(apiKey || "");
    const from = process.env.RESEND_FROM_EMAIL || "CBU UNSCH <onboarding@resend.dev>";
    const to = data.to || process.env.RESEND_TO_EMAIL || "cbu.unsch@gmail.com";

    const response = await resend.emails.send({
      from,
      to,
      subject: data.subject,
      html: data.html,
      text: data.text,
    });

    if (response.error) {
      console.error("Resend API Error:", response.error);
      throw new Error(response.error.message);
    }

    return response.data;
  });

export async function sendEmail(payload: EmailPayload) {
  try {
    return await sendEmailFn({ data: payload });
  } catch (err) {
    console.warn("sendEmailFn failed, falling back to /api/send-email endpoint:", err);
    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      throw new Error("No se pudo enviar el correo");
    }
    return await res.json();
  }
}
