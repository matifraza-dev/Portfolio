import { motion } from "framer-motion";

export default function SectionHeading({
  kicker, title, description,
}: { kicker: string; title: string; description?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55 }}
      className="mb-12 max-w-2xl"
    >
      <div className="font-mono text-sm text-amber mb-3">{kicker}</div>
      <h2 className="font-display text-3xl sm:text-4xl font-semibold">{title}</h2>
      {description && <p className="mt-4 text-muted leading-relaxed">{description}</p>}
    </motion.div>
  );
}
