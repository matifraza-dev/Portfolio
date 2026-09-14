import { motion } from "framer-motion";
import type { Skill } from "../lib/types";

const CATEGORY_LABELS: Record<string, string> = {
  languages: "Languages",
  frontend: "Frontend",
  backend: "Backend",
  database: "Database",
  devops: "DevOps & Tools",
  project_mgmt: "Project Management",
};

export default function Skills({ skills }: { skills: Skill[] }) {
  const grouped = skills.reduce<Record<string, Skill[]>>((acc, s) => {
    (acc[s.category] ??= []).push(s);
    return acc;
  }, {});

  return (
    <section className="py-24 border-t border-line">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="mb-12"
        >
          <div className="font-mono text-sm text-amber mb-3">04 / stack</div>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold">What I build with.</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {Object.entries(grouped).map(([cat, items], i) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
            >
              <h3 className="font-mono text-xs text-muted mb-4">{CATEGORY_LABELS[cat] || cat}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((s) => (
                  <span
                    key={s.id}
                    className="text-sm px-3 py-1.5 rounded border border-line text-fg/90 hover:border-amber/50 hover:text-amber transition-colors"
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
