import { motion } from "framer-motion";

const DETAILS = [
  { label: "Location", value: "Wah Cantt, Rawalpindi, Pakistan (UTC+5)" },
  { label: "Availability", value: "Full-time remote, contract, freelance" },
  { label: "Email", value: "matifraza512@gmail.com" },
  { label: "Phone", value: "+92 341 7905918" },
];

export default function About() {
  return (
    <section id="about" className="py-24 border-t border-line">
      <div className="container-page grid md:grid-cols-5 gap-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="md:col-span-3"
        >
          <div className="font-mono text-sm text-amber mb-3">01 / about</div>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-6">
            The bridge between the backlog and the backend.
          </h2>
          <p className="text-muted leading-relaxed mb-4">
            I'm a Full Stack Developer and Technical Project Coordinator. On
            most teams those are two different hires — one writes the Django
            models and React components, the other runs the sprint and
            translates what stakeholders actually need into tickets a
            developer can pick up. I've done both at once, on a live team,
            for over two years.
          </p>
          <p className="text-muted leading-relaxed">
            That means I can take a product from a Postgres schema to a
            deployed React frontend, and also keep a small team's sprint on
            schedule while I do it — no handoff gap where things get lost in
            translation. I'm currently completing a BS in Computer Science at
            Virtual University of Pakistan while building production
            projects in parallel.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="md:col-span-2 border border-line rounded-lg p-6 h-fit font-mono text-sm"
        >
          {DETAILS.map((d, i) => (
            <div key={d.label} className={`flex flex-col gap-1 ${i > 0 ? "mt-4 pt-4 border-t border-line" : ""}`}>
              <span className="text-muted text-xs">{d.label}</span>
              <span className="text-fg">{d.value}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
