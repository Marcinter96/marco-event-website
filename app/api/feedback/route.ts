import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface Answer {
  question: string;
  answer: string;
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, answers } = body as { name?: string; answers?: Answer[] };

    if (!Array.isArray(answers) || answers.length === 0) {
      return NextResponse.json({ error: "No feedback to send" }, { status: 400 });
    }

    if (!process.env.MARCO_EMAIL) {
      return NextResponse.json(
        { error: "Feedback inbox is not configured" },
        { status: 500 }
      );
    }

    const rows = answers
      .map(
        ({ question, answer }) => `
          <tr>
            <td style="padding:12px 0 4px;color:#6B6B6B;font-size:13px;font-weight:600;">
              ${escapeHtml(question)}
            </td>
          </tr>
          <tr>
            <td style="padding:0 0 12px;color:#1C1C1C;font-size:15px;border-bottom:1px solid #EEE9E1;">
              ${answer?.trim() ? escapeHtml(answer).replace(/\n/g, "<br/>") : "<em style='color:#ABABAB;'>(left blank)</em>"}
            </td>
          </tr>`
      )
      .join("");

    await resend.emails.send({
      from: process.env.FROM_EMAIL ?? "onboarding@resend.dev",
      to: process.env.MARCO_EMAIL,
      subject: `Rose said no (for now) — here's her feedback 📝`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;background:#F9F5F0;">
          <div style="border-top:3px solid #C4704F;margin-bottom:32px;"></div>
          <p style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#C4704F;font-weight:600;margin:0 0 16px;">Feedback to turn a no into a yes</p>
          <h1 style="font-size:26px;font-weight:700;color:#1C1C1C;margin:0 0 8px;">${escapeHtml(name?.trim() || "Rose")} isn't sold — yet</h1>
          <p style="color:#6B6B6B;font-size:15px;margin:0 0 24px;">
            Here's exactly what she'd want changed before it's a yes. Time to improve. 💪
          </p>
          <div style="background:white;border-radius:16px;padding:8px 24px 16px;">
            <table style="width:100%;border-collapse:collapse;">${rows}</table>
          </div>
          <p style="color:#ABABAB;font-size:12px;margin:32px 0 0;">Sent from the getaway invite site</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Feedback send error:", err);
    return NextResponse.json(
      { error: "Failed to send feedback. Please try again." },
      { status: 500 }
    );
  }
}
