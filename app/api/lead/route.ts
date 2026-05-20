import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, story } = await request.json();

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    if (process.env.SMTP_HOST) {
      const nodemailer = (await import("nodemailer")).default;
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT ?? 587),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"StoryIP" <${process.env.SMTP_USER}>`,
        to: process.env.LEAD_EMAIL ?? "hello@storyip.ai",
        subject: `New memoir inquiry from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nStory: ${story || "Not provided"}`,
        html: `<h2 style="font-family:Georgia,serif;">New Memoir Inquiry</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Story:</strong> ${story || "Not provided"}</p>`,
      });
    } else {
      console.log("[StoryIP Lead]", { name, email, story, timestamp: new Date().toISOString() });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[Lead API Error]", err);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
