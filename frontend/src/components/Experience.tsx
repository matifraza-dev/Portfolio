import { motion } from "framer-motion";
import type { ExperienceItem, EducationItem } from "../lib/types";

export default function Experience({
  experience, education,
}: { experience: ExperienceItem[]; education: EducationItem[] }) {
  return (
    <section id="experience" className="py-24 border-t border-line">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="mb-12"
        >
          <div className="font-mono text-sm text-amber mb-3">02 / experience</div>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold">Where the work happened.</h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
            {experience.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="grid sm:grid-cols-[140px_1fr] gap-4 sm:gap-8"
              >
                <div className="font-mono text-sm text-muted pt-1">{exp.period}</div>
                <div>
                  <h3 className="font-display text-xl font-semibold">{exp.role}</h3>
                  <div className="text-amber text-sm mt-1">
                    {exp.company} {exp.location && <span className="text-muted">· {exp.location}</span>}
                  </div>
                  <ul className="mt-4 space-y-2.5">
                    {exp.bullets.map((b) => (
                      <li key={b.id} className="text-muted leading-relaxed text-[0.95rem] pl-4 relative before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-1.5 before:rounded-full before:bg-line">
                        {b.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="border border-line rounded-lg p-6 h-fit"
          >
            <h3 className="font-mono text-xs text-muted mb-5">Education</h3>
            <div className="space-y-5">
              {education.map((ed) => (
                <div key={ed.id} className="pb-5 border-b border-line last:border-0 last:pb-0">
                  <div className="text-sm font-medium">{ed.credential}</div>
                  <div className="text-sm text-muted mt-0.5">{ed.institution}</div>
                  <div className="text-xs text-muted mt-1 font-mono">{ed.period}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
