"use client";

import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/constants";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = NAV_ITEMS.map((item) => item.href.replace("#", ""));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          isScrolled
            ? "bg-bg-primary/90 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        )}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => scrollToSection("#hero")}
              className="font-mono text-lg text-accent-green hover:shadow-[0_0_20px_rgba(57,211,83,0.3)] transition-all"
            >
              {"<Rıdvan />"}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={cn(
                    "px-4 py-2 font-mono text-sm rounded-md transition-all",
                    activeSection === item.href.replace("#", "")
                      ? "text-accent-green bg-bg-tertiary"
                      : "text-text-secondary hover:text-text-primary hover:bg-bg-tertiary"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-text-secondary hover:text-text-primary"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden bg-bg-primary/95 backdrop-blur-md pt-20">
          <div className="flex flex-col items-center gap-4 p-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className={cn(
                  "w-full px-6 py-4 font-mono text-lg text-left rounded-md transition-all border border-border",
                  activeSection === item.href.replace("#", "")
                    ? "text-accent-green bg-bg-tertiary border-accent-green"
                    : "text-text-secondary hover:text-text-primary hover:bg-bg-tertiary"
                )}
              >
                <span className="text-accent-green mr-2">$</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
