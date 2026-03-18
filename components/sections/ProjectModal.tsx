"use client";

import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { ExternalLink, Github } from "lucide-react";
import { getLanguageColor } from "@/lib/utils";
import type { Project } from "@/lib/types";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={project.name}>
      <div className="space-y-6">
        {/* Language Badge */}
        <div className="flex items-center gap-3">
          <span
            className="px-3 py-1 text-sm rounded-full font-mono"
            style={{
              backgroundColor: `${getLanguageColor(project.language)}20`,
              color: getLanguageColor(project.language),
            }}
          >
            {project.language}
          </span>
          {project.featured && (
            <span className="px-3 py-1 text-sm rounded-full bg-accent-purple/20 text-accent-purple font-mono">
              * Featured
            </span>
          )}
        </div>

        {/* Description */}
        <div>
          <h3 className="text-lg font-mono text-text-primary mb-2">
            <span className="text-accent-green mr-2">#</span>Description
          </h3>
          <p className="text-text-secondary leading-relaxed">
            {project.longDescription}
          </p>
        </div>

        {/* Tech Stack */}
        <div>
          <h3 className="text-lg font-mono text-text-primary mb-3">
            <span className="text-accent-green mr-2">$</span>npm install
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 bg-bg-tertiary border border-border rounded-md text-sm font-mono text-text-primary"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-3 pt-4 border-t border-border">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button variant="secondary" className="w-full">
              <Github size={18} className="mr-2" />
              View Source
            </Button>
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button variant="primary" className="w-full">
                <ExternalLink size={18} className="mr-2" />
                Live Demo
              </Button>
            </a>
          )}
        </div>
      </div>
    </Modal>
  );
}
