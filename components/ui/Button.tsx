"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md font-mono text-sm transition-all duration-200",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "focus:outline-none focus:ring-2 focus:ring-accent-green focus:ring-offset-2 focus:ring-offset-bg-primary",
          {
            "bg-accent-green text-bg-primary hover:shadow-[0_0_20px_rgba(57,211,83,0.3)]":
              variant === "primary",
            "bg-bg-tertiary text-text-primary border border-border hover:border-accent-green hover:shadow-[0_0_20px_rgba(57,211,83,0.3)]":
              variant === "secondary",
            "bg-transparent text-text-secondary hover:text-accent-green hover:bg-bg-tertiary":
              variant === "ghost",
          },
          {
            "px-3 py-1.5": size === "sm",
            "px-4 py-2": size === "md",
            "px-6 py-3": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
