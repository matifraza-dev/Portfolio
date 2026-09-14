import { motion } from "framer-motion";
import type { Project } from "../lib/types";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="py-24 border-t border-line">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="mb-16"
        >
          <div className="font-mono text-sm text-amber mb-3">03 / projects</div>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold max-w-xl">
            Four builds, in the order I built them.
          </h2>
        </motion.div>

        <div>
          {projects.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="grid lg:grid-cols-[110px_1fr] gap-6 lg:gap-12 py-12 border-t border-line first:border-t-0"
            >
              <div className="font-display text-4xl text-line select-none">{pad(p.number)}</div>

              <div>
                <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                  <h3 className="font-display text-2xl font-semibold max-w-xl">{p.title}</h3>
                  <div className="flex gap-3 text-sm font-mono">
                    {p.live_url && (
                      <a href={p.live_url} target="_blank" rel="noreferrer" className="text-amber hover:underline">
                        live
                      </a>
                    )}
                    {p.repo_url && (
                      <a href={p.repo_url} target="_blank" rel="noreferrer" className="text-muted hover:text-fg">
                        source
                      </a>
                    )}
                    {p.docs_url && (
                      <a href={p.docs_url} target="_blank" rel="noreferrer" className="text-muted hover:text-fg">
                        docs
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-muted leading-relaxed max-w-2xl mb-6">{p.tagline}</p>

                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 mb-6">
                  {p.highlights.map((h) => (
                    <div key={h.id}>
                      <div className="text-xs font-mono text-teal mb-1">{h.label}</div>
                      <div className="text-sm text-muted leading-relaxed">{h.text}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {p.stack_list.map((s) => (
                    <span key={s} className="text-xs font-mono text-muted border border-line rounded px-2 py-1">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
