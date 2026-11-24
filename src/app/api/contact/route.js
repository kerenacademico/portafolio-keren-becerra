import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Falta configurar RESEND_API_KEY en el servidor." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const body = await request.json();

    // Aquí continúa tu lógica de envío con resend.emails.send(...)
    return NextResponse.json({ ok: true, data: body });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al procesar la solicitud de contacto." },
      { status: 500 }
    );
  }
}