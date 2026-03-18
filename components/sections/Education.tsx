"use client";

import { Terminal, TerminalLine } from "@/components/ui/Terminal";
import { GraduationCap, Calendar, MapPin } from "lucide-react";

const educationData = [
  {
    id: 1,
    school: "İstanbul Nişantaşı Üniversitesi",
    degree: "Bachelor of Engineering - BE, Computer Engineering",
    date: "Sep 2023 – Jan 2026",
    location: "Istanbul, Turkey",
  },
  {
    id: 2,
    school: "Muğla Sıtkı Koçman Üniversitesi",
    degree: "Associate's Degree, Computer Programming",
    date: "Sep 2020 – Jun 2022",
    location: "Muğla, Turkey",
  },
];

export function Education() {
  return (
    <section id="education" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#E6EDF3', marginBottom: '0.5rem' }}>
            Education
          </h2>
          <p style={{ color: '#8B949E', fontFamily: 'monospace' }}>
            Academic background
          </p>
        </div>

        <Terminal title="education - bash">
          <TerminalLine command="cat education.json" />

          <div className="mt-6 space-y-6">
            {educationData.map((edu) => (
              <div
                key={edu.id}
                className="p-4 bg-bg-tertiary rounded-lg border border-border hover:border-accent-green transition-colors"
              >
                {/* Header */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-bg-secondary rounded-lg">
                    <GraduationCap size={24} className="text-accent-green" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-text-primary">
                      {edu.school}
                    </h3>
                    <p className="text-accent-blue font-mono text-sm">
                      {edu.degree}
                    </p>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} className="text-text-muted" />
                    <span className="font-mono">{edu.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={14} className="text-text-muted" />
                    <span className="font-mono">{edu.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-6 pt-4 border-t border-border">
            <TerminalLine
              prompt=""
              output={
                <span className="text-accent-green">
                  + {educationData.length} education entries found.
                </span>
              }
            />
          </div>
        </Terminal>
      </div>
    </section>
  );
}
