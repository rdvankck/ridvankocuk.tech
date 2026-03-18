"use client";

import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/constants";
import { Folder, FileCode } from "lucide-react";

interface FileTreeProps {
  activeFile: string;
  onFileSelect: (file: string, href: string) => void;
}

export function FileTree({ activeFile, onFileSelect }: FileTreeProps) {
  return (
    <div className="w-56 bg-bg-tertiary border-r border-border p-2">
      <div className="text-xs text-text-muted font-mono mb-3 px-2">
        EXPLORER
      </div>
      <div className="space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = activeFile === item.label;
          const isTsx = item.label.endsWith(".tsx");

          return (
            <button
              key={item.href}
              onClick={() => onFileSelect(item.label, item.href)}
              className={cn(
                "w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm font-mono transition-all",
                isActive
                  ? "bg-accent-green/10 text-accent-green border-l-2 border-accent-green"
                  : "text-text-secondary hover:bg-bg-secondary hover:text-text-primary"
              )}
            >
              {isTsx ? (
                <FileCode size={16} className="text-accent-blue" />
              ) : (
                <Folder size={16} className="text-accent-yellow" />
              )}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
