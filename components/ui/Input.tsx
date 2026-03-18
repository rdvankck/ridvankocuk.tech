"use client";

import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  prefix?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, prefix = "$", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm text-text-secondary mb-1 font-mono">
            {label}
          </label>
        )}
        <div className="flex items-center gap-2 bg-bg-tertiary border border-border rounded-md px-3 py-2 focus-within:border-accent-green focus-within:shadow-[0_0_20px_rgba(57,211,83,0.3)] transition-all duration-200">
          <span className="text-accent-green font-mono shrink-0">{prefix}</span>
          <input
            ref={ref}
            className={cn(
              "flex-1 bg-transparent text-text-primary font-mono text-sm",
              "placeholder:text-text-muted",
              "focus:outline-none",
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-400 font-mono">
            Error: {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
