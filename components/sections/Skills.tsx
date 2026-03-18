"use client";

import { Terminal, TerminalLine } from "@/components/ui/Terminal";
import skillsData from "@/data/skills.json";

export function Skills() {
  const skills = skillsData.skills;

  // Split skills into two rows for marquee effect
  const firstRow = skills.slice(0, skills.length / 2);
  const secondRow = skills.slice(skills.length / 2);

  return (
    <section id="skills" className="py-20 px-4 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#E6EDF3', marginBottom: '0.5rem' }}>
            Skills
          </h2>
          <p style={{ color: '#8B949E', fontFamily: 'monospace' }}>
            Technologies I work with
          </p>
        </div>

        <Terminal title="skills - bash">
          <TerminalLine command="npm install @ridvankocuk/skills" />

          <div className="mt-6 space-y-4">
            {/* First Row - Scroll Left */}
            <div className="relative">
              {/* Gradient Overlays */}
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-bg-secondary to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-bg-secondary to-transparent z-10" />

              <div className="flex animate-marquee-left">
                {/* Duplicate for seamless loop */}
                {[...firstRow, ...firstRow].map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 mx-2 bg-bg-tertiary rounded-lg border border-border whitespace-nowrap hover:border-accent-green transition-colors"
                  >
                    <span className="text-lg">{skill.icon}</span>
                    <span className="font-mono text-text-primary text-sm">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Second Row - Scroll Right */}
            <div className="relative">
              {/* Gradient Overlays */}
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-bg-secondary to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-bg-secondary to-transparent z-10" />

              <div className="flex animate-marquee-right">
                {/* Duplicate for seamless loop */}
                {[...secondRow, ...secondRow].map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 mx-2 bg-bg-tertiary rounded-lg border border-border whitespace-nowrap hover:border-accent-green transition-colors"
                  >
                    <span className="text-lg">{skill.icon}</span>
                    <span className="font-mono text-text-primary text-sm">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="mt-6 pt-4 border-t border-border">
            <TerminalLine
              prompt=""
              output={
                <span className="text-accent-green">
                  + {skills.length} packages installed successfully.
                </span>
              }
            />
          </div>
        </Terminal>
      </div>
    </section>
  );
}
