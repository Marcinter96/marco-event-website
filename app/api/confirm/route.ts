import { NextResponse } from "next/server";
import { Resend } from "resend";
import { destinations } from "@/lib/destinations";
import { availableWeekends } from "@/lib/weekends";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, destinationId, weekendId, parisNote, message } = body;

    if (!email || !destinationId || !weekendId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const destination = destinations.find((d) => d.id === destinationId);
    const weekend = availableWeekends.find((w) => w.id === weekendId);

    if (!destination || !weekend) {
      return NextResponse.json({ error: "Invalid destination or weekend" }, { status: 400 });
    }

    const planLines = destination.isRosesCity
      ? parisNote
        ? `<p><strong>Rose's plan for Paris:</strong><br/>${parisNote.replace(/\n/g, "<br/>")}</p>`
        : "<p>Rose will plan this one — stay tuned.</p>"
      : destination.about.map((line) => `<li>${line}</li>`).join("");

    const planHtml = destination.isRosesCity
      ? planLines
      : `<ul style="padding-left:20px;">${planLines}</ul>`;

    const extraMessage = message
      ? `<p><strong>Extra note:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>`
      : "";

    // Email to Rose
    await resend.emails.send({
      from: process.env.FROM_EMAIL ?? "onboarding@resend.dev",
      to: email,
      subject: `Your weekend getaway is confirmed 🌍`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;background:#F9F5F0;">
          <div style="border-top:3px solid #C4704F;margin-bottom:32px;"></div>
          <p style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#C4704F;font-weight:600;margin:0 0 16px;">Your weekend getaway</p>
          <h1 style="font-size:28px;font-weight:700;color:#1C1C1C;margin:0 0 8px;">Hey ${name}!</h1>
          <p style="color:#6B6B6B;font-size:16px;margin:0 0 32px;">
            You're in for a <strong style="color:#1C1C1C;">${destination.name}</strong> on <strong style="color:#1C1C1C;">${weekend.label}</strong>.
            Marco is already making a list.
          </p>
          <div style="background:white;border-radius:16px;padding:24px;margin-bottom:24px;">
            <h2 style="font-size:16px;font-weight:600;color:#1C1C1C;margin:0 0 16px;">The plan</h2>
            ${planHtml}
          </div>
          ${extraMessage ? `<div style="background:white;border-radius:16px;padding:24px;margin-bottom:24px;">${extraMessage}</div>` : ""}
          <p style="color:#6B6B6B;font-size:14px;margin:24px 0 0;">
            Marco will be in touch soon to confirm details. Get excited. 🌍
          </p>
          <p style="color:#ABABAB;font-size:12px;margin:32px 0 0;">Made with care by Marco</p>
        </div>
      `,
    });

    // Notification to Marco
    if (process.env.MARCO_EMAIL) {
      await resend.emails.send({
        from: process.env.FROM_EMAIL ?? "onboarding@resend.dev",
        to: process.env.MARCO_EMAIL,
        subject: `Rose said yes! 🎉`,
        html: `
          <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;">
            <h1 style="color:#C4704F;">Rose confirmed! 🎉</h1>
            <table style="width:100%;border-collapse:collapse;margin:24px 0;">
              <tr><td style="padding:8px 0;color:#6B6B6B;width:120px;">Name</td><td style="color:#1C1C1C;font-weight:600;">${name}</td></tr>
              <tr><td style="padding:8px 0;color:#6B6B6B;">Email</td><td style="color:#1C1C1C;font-weight:600;">${email}</td></tr>
              <tr><td style="padding:8px 0;color:#6B6B6B;">Destination</td><td style="color:#1C1C1C;font-weight:600;">${destination.name}</td></tr>
              <tr><td style="padding:8px 0;color:#6B6B6B;">Weekend</td><td style="color:#1C1C1C;font-weight:600;">${weekend.label}</td></tr>
              ${parisNote ? `<tr><td style="padding:8px 0;color:#6B6B6B;vertical-align:top;">Paris plan</td><td style="color:#1C1C1C;">${parisNote}</td></tr>` : ""}
              ${message ? `<tr><td style="padding:8px 0;color:#6B6B6B;vertical-align:top;">Message</td><td style="color:#1C1C1C;">${message}</td></tr>` : ""}
            </table>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json(
      { error: "Failed to send confirmation. Please try again." },
      { status: 500 }
    );
  }
}
