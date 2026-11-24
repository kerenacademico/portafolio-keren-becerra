import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { name, email, topic, message } = await request.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Por favor completa tu nombre, correo y mensaje." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Ingresa un correo electrónico válido." },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from: "Portafolio Keren <onboarding@resend.dev>",
      to: ["kerenacademico@gmail.com"],
      replyTo: email.trim(),
      subject: `[Portafolio · ${topic || "Contacto"}] Mensaje de ${name.trim()}`,
      text: `Nombre: ${name.trim()}\nCorreo: ${email.trim()}\nMotivo: ${topic || "General"}\n\nMensaje:\n${message.trim()}`,
    });

    if (error) {
      return NextResponse.json(
        { error: "No se pudo enviar el correo en este momento." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Error interno al procesar la solicitud." },
      { status: 500 }
    );
  }
}