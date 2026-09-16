import { motion } from "framer-motion";
import type { Stat } from "../lib/types";
import HeroVisual from "./HeroVisual";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const STACK = [
  "Python", "Django", "Django REST Framework", "PostgreSQL",
  "React 19", "TypeScript", "Vite", "Tailwind CSS", "JWT Auth", "Git",
];

export default function Hero({ stats }: { stats: Stat[] }) {
  return (
    <section id="top" className="relative pt-28 pb-24 overflow-hidden">
      <div className="container-page grid lg:grid-cols-2 gap-8 items-start">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 font-mono text-xs text-skylight border border-skylight/30 rounded px-3 py-1 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
            status --available for remote work Â· UTC+5
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display font-semibold text-[2.6rem] leading-[1.08] sm:text-6xl sm:leading-[1.05]"
          >
            I build the product,{" "}
            <span className="text-sky">then run the sprint</span> that ships it.
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-xl text-lg text-muted leading-relaxed">
            Full Stack Developer and Technical Project Coordinator. Django REST
            backends, React/TypeScript frontends, and the sprint coordination
            that keeps a 4-person team on schedule â€” from one person, remote,
            from Pakistan.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center justify-start gap-4">
            <a href="#projects" className="px-5 py-3 rounded-xl outline outline-2 outline-offset-[3px] outline-[#D36938] bg-transparent text-white font-medium hover:outline-offset-[5px] transition-all duration-200">See the work</a>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl border-t border-line pt-8"
          >
            {stats.map((s) => (
              <div key={s.id}>
                <div className="font-display text-2xl sm:text-3xl font-semibold text-sky">{s.value}</div>
                <div className="text-xs text-muted mt-1 leading-snug">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <HeroVisual />
      </div>

      <div className="mt-20 border-t border-line py-4 overflow-hidden">
        <motion.div
          className="flex gap-10 font-mono text-sm text-muted whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {[...STACK, ...STACK].map((t, i) => (
            <span key={i} className="flex items-center gap-10">
              {t}
              <span className="text-line">/</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

