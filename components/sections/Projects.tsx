"use client";

import { Terminal, TerminalLine } from "@/components/ui/Terminal";
import { Button } from "@/components/ui/Button";
import { ProjectModal } from "./ProjectModal";
import projectsData from "@/data/projects.json";
import { useState } from "react";
import { Folder, ExternalLink } from "lucide-react";
import { cn, getLanguageColor } from "@/lib/utils";
import type { Project as ProjectType } from "@/lib/types";

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#E6EDF3', marginBottom: '0.5rem' }}>
            Projects
          </h2>
          <p style={{ color: '#8B949E', fontFamily: 'monospace' }}>
            Featured work & side projects
          </p>
        </div>

        <Terminal title="projects - bash">
          <TerminalLine command="ls -la ~/projects" />

          <div className="mt-6 space-y-3">
            {(projectsData as ProjectType[]).map((project) => (
              <div
                key={project.id}
                className={cn(
                  "group flex items-center justify-between p-3 rounded-md",
                  "hover:bg-bg-tertiary cursor-pointer transition-all duration-200",
                  "border border-transparent hover:border-border"
                )}
                onClick={() => setSelectedProject(project)}
              >
                <div className="flex items-center gap-4">
                  <Folder className="text-accent-yellow" size={20} />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-text-primary">
                        {project.name}/
                      </span>
                      <span
                        className="px-2 py-0.5 text-xs rounded-full font-mono"
                        style={{
                          backgroundColor: `${getLanguageColor(project.language)}20`,
                          color: getLanguageColor(project.language),
                        }}
                      >
                        {project.language}
                      </span>
                    </div>
                    <p className="text-text-muted text-sm mt-1">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-accent-green font-mono text-sm">
                    $ open project
                  </span>
                  <ExternalLink size={16} className="text-text-muted" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <a
              href="https://github.com/rdvankck?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary" size="sm">
                <span className="text-accent-green mr-2">+</span>
                View All on GitHub
              </Button>
            </a>
          </div>
        </Terminal>

        {/* Project Modal */}
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
}
