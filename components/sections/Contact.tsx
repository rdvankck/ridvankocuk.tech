"use client";

import { Terminal, TerminalLine } from "@/components/ui/Terminal";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Github, Linkedin, Mail, Loader2, CheckCircle, XCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format. Try again."),
  message: z.string().min(10, "Message cannot be empty. Min 10 chars."),
  honeypot: z.string().max(0, "Bot detected"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#E6EDF3', marginBottom: '0.5rem' }}>
            Contact
          </h2>
          <p style={{ color: '#8B949E', fontFamily: 'monospace' }}>
            Get in touch with me
          </p>
        </div>

        <Terminal title="contact - bash">
          <TerminalLine command="./send-message.sh" />

          <div className="mt-6 text-center mb-8">
            <span className="text-2xl">*</span>
            <p className="text-text-primary font-mono mt-2">Let&apos;s connect!</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Honeypot */}
            <input type="text" {...register("honeypot")} className="hidden" tabIndex={-1} autoComplete="off" />

            <Input
              label="name:"
              placeholder="Your name"
              {...register("name")}
              error={errors.name?.message}
            />

            <Input
              label="email:"
              type="email"
              placeholder="your@email.com"
              {...register("email")}
              error={errors.email?.message}
            />

            <Textarea
              label="message:"
              placeholder="Your message..."
              {...register("message")}
              error={errors.message?.message}
            />

            {/* Status Messages */}
            {status === "success" && (
              <div className="flex items-center gap-2 text-accent-green font-mono text-sm">
                <CheckCircle size={16} />
                + Message sent successfully! I&apos;ll respond within 24h.
              </div>
            )}

            {status === "error" && (
              <div className="flex items-center gap-2 text-red-400 font-mono text-sm">
                <XCircle size={16} />
                Error: Failed to send message. Please try again.
              </div>
            )}

            {/* Submit Button */}
            <div className="flex items-center gap-4 pt-4">
              <Button type="submit" disabled={status === "loading"}>
                {status === "loading" ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Execute ./send-message.sh"
                )}
              </Button>
              <span className="text-text-muted text-sm font-mono">
                or Ctrl+C to cancel
              </span>
            </div>
          </form>

          {/* Social Links */}
          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href={SITE_CONFIG.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-text-secondary hover:text-accent-green transition-colors font-mono text-sm"
              >
                <Github size={18} />
                github.com/rdvankck
              </a>
              <a
                href={SITE_CONFIG.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-text-secondary hover:text-accent-blue transition-colors font-mono text-sm"
              >
                <Linkedin size={18} />
                linkedin.com/in/ridvankocuk
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-2 text-text-secondary hover:text-accent-purple transition-colors font-mono text-sm"
              >
                <Mail size={18} />
                {SITE_CONFIG.email}
              </a>
            </div>
          </div>
        </Terminal>
      </div>
    </section>
  );
}
