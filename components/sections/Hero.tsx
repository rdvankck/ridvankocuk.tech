"use client";

import { Terminal } from "@/components/ui/Terminal";
import { FileTree } from "@/components/shared/FileTree";
import { DEVELOPER_CODE, SITE_CONFIG } from "@/lib/constants";
import { useTypewriter } from "@/lib/hooks/useTypewriter";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

// Token types for syntax highlighting
type TokenType = "comment" | "keyword" | "string" | "property" | "number" | "text";

interface Token {
  type: TokenType;
  value: string;
}

// Parse code into tokens
function tokenizeCode(code: string): Token[] {
  const tokens: Token[] = [];
  const keywords = ["const", "let", "var", "export", "default", "return"];
  const properties = ["name", "location", "focus", "exp", "passion"];

  // Process line by line to handle comments properly
  const lines = code.split("\n");

  lines.forEach((line, lineIndex) => {
    let remaining = line;

    // Check for comment at start
    const commentMatch = remaining.match(/^(\/\/.*)/);
    if (commentMatch) {
      tokens.push({ type: "comment", value: commentMatch[1] });
      remaining = "";
    }

    // Process remaining content
    while (remaining.length > 0) {
      let matched = false;

      // Check for string
      const stringMatch = remaining.match(/^("[^"]*")/);
      if (stringMatch) {
        tokens.push({ type: "string", value: stringMatch[1] });
        remaining = remaining.slice(stringMatch[1].length);
        matched = true;
        continue;
      }

      // Check for keyword
      for (const keyword of keywords) {
        const regex = new RegExp(`^(${keyword})\\b`);
        const match = remaining.match(regex);
        if (match) {
          tokens.push({ type: "keyword", value: match[1] });
          remaining = remaining.slice(match[1].length);
          matched = true;
          break;
        }
      }
      if (matched) continue;

      // Check for property
      for (const prop of properties) {
        const regex = new RegExp(`^(${prop}):`);
        const match = remaining.match(regex);
        if (match) {
          tokens.push({ type: "property", value: match[1] });
          tokens.push({ type: "text", value: ":" });
          remaining = remaining.slice(match[1].length + 1);
          matched = true;
          break;
        }
      }
      if (matched) continue;

      // Check for number with years
      const numberMatch = remaining.match(/^(\d+\+?\s*years?)/);
      if (numberMatch) {
        tokens.push({ type: "number", value: numberMatch[1] });
        remaining = remaining.slice(numberMatch[1].length);
        matched = true;
        continue;
      }

      // Take next character as text
      tokens.push({ type: "text", value: remaining[0] });
      remaining = remaining.slice(1);
    }

    // Add newline token (except for last line)
    if (lineIndex < lines.length - 1) {
      tokens.push({ type: "text", value: "\n" });
    }
  });

  return tokens;
}

// Get style for token type
function getTokenStyle(type: TokenType): React.CSSProperties {
  switch (type) {
    case "comment":
      return { color: "#484F58", fontStyle: "italic" };
    case "keyword":
      return { color: "#A371F7" };
    case "string":
      return { color: "#D29922" };
    case "property":
      return { color: "#58A6FF" };
    case "number":
      return { color: "#58A6FF" };
    default:
      return { color: "#E6EDF3" };
  }
}

export function Hero() {
  const [activeFile, setActiveFile] = useState("about.tsx");
  const { displayText, isTyping } = useTypewriter({
    text: DEVELOPER_CODE,
    speed: 15,
    delay: 300,
  });

  const handleFileSelect = (file: string, href: string) => {
    setActiveFile(file);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Tokenize and render code
  const highlightedCode = useMemo(() => {
    const tokens = tokenizeCode(displayText);
    return tokens.map((token, index) => (
      <span key={index} style={getTokenStyle(token.type)}>
        {token.value}
      </span>
    ));
  }, [displayText]);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-2 py-2">
      <div className="w-full max-w-5xl">
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#E6EDF3', marginBottom: '0.5rem' }} className="md:text-5xl">
            {SITE_CONFIG.name}
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#39D353', fontFamily: 'monospace', marginBottom: '1rem' }} className="md:text-xl">
            {SITE_CONFIG.title}
          </p>
          {/* Tagline */}
          <p style={{ color: '#8B949E', maxWidth: '36rem', margin: '0 auto', marginBottom: '1.5rem' }} className="md:text-lg">
            Building scalable web applications with modern technologies.
          </p>
          {/* Tech Stack Icons */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.75rem', backgroundColor: '#21262D', borderRadius: '0.375rem', border: '1px solid #30363D' }}>
              <span>⚛️</span>
              <span style={{ color: '#8B949E', fontSize: '0.875rem', fontFamily: 'monospace' }}>React</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.75rem', backgroundColor: '#21262D', borderRadius: '0.375rem', border: '1px solid #30363D' }}>
              <span>📘</span>
              <span style={{ color: '#8B949E', fontSize: '0.875rem', fontFamily: 'monospace' }}>TypeScript</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.75rem', backgroundColor: '#21262D', borderRadius: '0.375rem', border: '1px solid #30363D' }}>
              <span>🟢</span>
              <span style={{ color: '#8B949E', fontSize: '0.875rem', fontFamily: 'monospace' }}>Node.js</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.75rem', backgroundColor: '#21262D', borderRadius: '0.375rem', border: '1px solid #30363D' }}>
              <span>▲</span>
              <span style={{ color: '#8B949E', fontSize: '0.875rem', fontFamily: 'monospace' }}>Next.js</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.75rem', backgroundColor: '#21262D', borderRadius: '0.375rem', border: '1px solid #30363D' }}>
              <span>🐍</span>
              <span style={{ color: '#8B949E', fontSize: '0.875rem', fontFamily: 'monospace' }}>Python</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.75rem', backgroundColor: '#21262D', borderRadius: '0.375rem', border: '1px solid #30363D' }}>
              <span style={{ fontWeight: 'bold' }}>⬢</span>
              <span style={{ color: '#8B949E', fontSize: '0.875rem', fontFamily: 'monospace' }}>.NET</span>
            </div>
          </div>
        </div>

        <Terminal title="ridvankocuk.tech">
          <div className="flex min-h-[400px]">
            {/* File Tree - Desktop Only */}
            <div className="hidden md:block">
              <FileTree activeFile={activeFile} onFileSelect={handleFileSelect} />
            </div>

            {/* Code Editor */}
            <div className="flex-1 p-4 overflow-x-auto">
              {/* Tab Bar */}
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
                <div className="flex items-center gap-2 px-3 py-1 bg-bg-tertiary rounded-t border-t border-l border-r border-border">
                  <div className="w-2 h-2 rounded-full bg-accent-blue" />
                  <span className="text-xs font-mono text-text-primary">
                    {activeFile}
                  </span>
                </div>
              </div>

              {/* Code Content */}
              <div className="flex">
                {/* Line Numbers */}
                <div className="pr-4 text-right select-none">
                  {displayText.split("\n").map((_, i) => (
                    <div
                      key={i}
                      className="text-text-muted text-sm leading-6 font-mono"
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>

                {/* Code */}
                <pre className="flex-1 text-sm leading-6 overflow-x-auto">
                  <code className="font-mono">
                    {highlightedCode}
                  </code>
                  {/* Blinking Cursor */}
                  <span
                    className={cn(
                      "inline-block w-2 h-5 bg-accent-green ml-1 align-middle",
                      isTyping ? "animate-blink-cursor" : "opacity-0"
                    )}
                  />
                </pre>
              </div>
            </div>
          </div>
        </Terminal>

        {/* Mobile Navigation Hint */}
        <div className="md:hidden text-center mt-4 text-text-muted text-sm font-mono">
          <span className="text-accent-green">$</span> Navigate using menu
        </div>
      </div>
    </section>
  );
}
