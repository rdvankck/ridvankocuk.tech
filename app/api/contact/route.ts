import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
  honeypot: z.string().max(0),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input" },
        { status: 400 }
      );
    }

    const { name, email, message } = result.data;

    // Rate limiting (simple IP-based)
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    // In production, use Redis or similar for rate limiting

    // Send email with Resend (or your preferred service)
    if (process.env.RESEND_API_KEY) {
      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "portfolio@ridvankocuk.tech",
          to: "contact@ridvankocuk.tech",
          subject: `New message from ${name}`,
          reply_to: email,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `,
        }),
      });

      if (!resendResponse.ok) {
        throw new Error("Failed to send email");
      }
    } else {
      // Log to console in development
      console.log("Contact form submission:", { name, email, message, ip });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
