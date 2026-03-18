"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg-secondary">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="text-text-secondary text-sm font-mono">
            <span>(c) {currentYear} {SITE_CONFIG.name}</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a
              href={SITE_CONFIG.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent-green transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href={SITE_CONFIG.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent-blue transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="text-text-secondary hover:text-accent-purple transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
