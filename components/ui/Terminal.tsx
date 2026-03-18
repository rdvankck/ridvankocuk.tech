"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface TerminalProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Terminal({ title = "terminal", children, className }: TerminalProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-bg-secondary overflow-hidden",
        className
      )}
    >
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-bg-tertiary border-b border-border">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="ml-2 text-sm text-text-secondary font-mono">{title}</span>
      </div>
      {/* Terminal Content */}
      <div className="p-4 font-mono text-sm">{children}</div>
    </div>
  );
}

interface TerminalLineProps {
  prompt?: string;
  command?: string;
  output?: ReactNode;
  className?: string;
}

export function TerminalLine({
  prompt = "$",
  command,
  output,
  className,
}: TerminalLineProps) {
  return (
    <div className={cn("flex items-start gap-2", className)}>
      <span className="text-accent-green shrink-0">{prompt}</span>
      {command && <span className="text-accent-blue">{command}</span>}
      {output && <span className="text-text-primary">{output}</span>}
    </div>
  );
}

export function TerminalComment({ children }: { children: ReactNode }) {
  return <span className="text-text-muted italic">{children}</span>;
}
