import { Resend } from "resend";

export default defineEventHandler(async (event) => {
  try {
    const data = await readBody(event);
    const apiKey = process.env.RESEND_API_KEY;
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
      throw createError({
        statusCode: 400,
        statusMessage: response.error.message,
      });
    }

    return response.data;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error?.message || "Error al enviar el correo",
    });
  }
});
