import { motion } from "framer-motion";
import { Code2, Server, Database, Lock, Globe, Rocket } from "lucide-react";

const STACK = [
  { icon: Code2, label: "React" },
  { icon: Server, label: "Django" },
  { icon: Database, label: "PostgreSQL" },
  { icon: Lock, label: "JWT Auth" },
  { icon: Globe, label: "REST API" },
  { icon: Rocket, label: "Vercel" },
];

const STATS = [
  { value: "30%", label: "Perf gain" },
  { value: "4", label: "Projects" },
  { value: "CS", label: "Degree" },
];

const NODES: [number, number][] = [
  [30, 20], [200, 10], [400, 40], [430, 180],
  [400, 340], [200, 460], [20, 420], [10, 220],
];

export default function HeroVisual() {
  return (
    <div className="relative hidden lg:flex items-center justify-center h-[560px] pt-6">
      <div className="absolute top-10 w-[400px] h-[400px] rounded-full bg-sky/10 blur-[110px]" />

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 440 480" fill="none">
        {NODES.map(([x, y], i, arr) => {
          const next = arr[(i + 1) % arr.length];
          return (
            <line
              key={i}
              x1={x} y1={y} x2={next[0]} y2={next[1]}
              stroke="#1B2733" strokeWidth="1"
            />
          );
        })}
        {NODES.map(([x, y], i) => (
          <motion.circle
            key={i}
            cx={x} cy={y} r="2.5"
            fill="#0EA5E9"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </svg>

      {/* status pill, right up near the nav */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: [0, -8, 0] }}
        transition={{ opacity: { duration: 0.6, delay: 0.5 }, y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 } }}
        className="absolute top-0 right-2 flex items-center gap-2 bg-panel/90 backdrop-blur border border-line rounded-full px-4 py-2 text-xs font-mono shadow-lg"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-skylight" />
        React + Django · Production Ready
      </motion.div>

      {/* small secondary pill, upper-left, fills the empty corner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: [0, -6, 0] }}
        transition={{ opacity: { duration: 0.6, delay: 0.65 }, y: { duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 1.3 } }}
        className="absolute top-16 left-0 flex items-center gap-2 bg-panel/90 backdrop-blur border border-line rounded-full px-3.5 py-1.5 text-xs font-mono shadow-lg"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-sky" />
        Open to contract work
      </motion.div>

      {/* central glass card */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-[300px] bg-panel/80 backdrop-blur border border-line rounded-2xl p-6 shadow-2xl"
      >
        <div className="font-mono text-xs text-sky mb-4">// tech stack</div>
        <div className="grid grid-cols-2 gap-2.5">
          {STACK.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 bg-ink/60 border border-line rounded-lg px-3 py-2.5"
            >
              <Icon className="w-4 h-4 text-sky shrink-0" strokeWidth={1.75} />
              <span className="text-xs text-fg/90 truncate">{label}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-line">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display font-bold text-lg text-sky">{s.value}</div>
              <div className="text-[10px] text-muted mt-0.5 leading-tight">{s.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* location pill, bottom */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { duration: 0.6, delay: 0.8 }, y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 } }}
        className="absolute bottom-8 left-4 flex items-center gap-2 bg-panel/90 backdrop-blur border border-line rounded-full px-4 py-2 text-xs font-mono shadow-lg"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-sky" />
        Wah Cantt, Pakistan · Remote OK
      </motion.div>
    </div>
  );
}
