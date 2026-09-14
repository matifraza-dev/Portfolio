import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const LINES = [
  { prompt: "$", text: "git push origin main", color: "text-fg" },
  { prompt: "", text: "Deploying to production...", color: "text-muted" },
  { prompt: "", text: "Build complete (2.4s)", color: "text-teal" },
  { prompt: "", text: "Django API -- 200 OK", color: "text-teal" },
  { prompt: "", text: "React app -- live", color: "text-teal" },
  { prompt: "$", text: "curl -I https://api.atifraza.dev", color: "text-fg" },
  { prompt: "", text: "HTTP/2 200 OK", color: "text-sky" },
];

function useTypedLines(lines: typeof LINES, speed = 28, pause = 1400) {
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (lineIndex >= lines.length) {
      const t = setTimeout(() => {
        setDisplayed([]);
        setLineIndex(0);
        setCharIndex(0);
      }, pause);
      return () => clearTimeout(t);
    }
    const current = lines[lineIndex].text;
    if (charIndex <= current.length) {
      const t = setTimeout(() => {
        setDisplayed((prev) => {
          const next = [...prev];
          next[lineIndex] = current.slice(0, charIndex);
          return next;
        });
        setCharIndex((c) => c + 1);
      }, speed);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setLineIndex((i) => i + 1);
        setCharIndex(0);
      }, 250);
      return () => clearTimeout(t);
    }
  }, [charIndex, lineIndex, lines, speed, pause]);

  return displayed;
}

export default function HeroVisual() {
  const displayed = useTypedLines(LINES);

  return (
    <div className="relative hidden lg:flex items-center justify-center h-[560px] pt-6">
      <div className="absolute top-10 w-[400px] h-[400px] rounded-full bg-sky/10 blur-[110px]" />

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: [0, -8, 0] }}
        transition={{ opacity: { duration: 0.6, delay: 0.5 }, y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 } }}
        className="absolute top-0 right-2 flex items-center gap-2 bg-panel/90 backdrop-blur border border-line rounded-full px-4 py-2 text-xs font-mono shadow-lg"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-skylight" />
        React + Django &middot; Production Ready
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: [0, -6, 0] }}
        transition={{ opacity: { duration: 0.6, delay: 0.65 }, y: { duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 1.3 } }}
        className="absolute top-16 left-0 flex items-center gap-2 bg-panel/90 backdrop-blur border border-line rounded-full px-3.5 py-1.5 text-xs font-mono shadow-lg"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-sky" />
        Open to contract work
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-[380px] bg-panel/95 backdrop-blur border border-line rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-line bg-ink/40">
          <span className="w-3 h-3 rounded-full bg-muted/40" />
          <span className="w-3 h-3 rounded-full bg-sky/60" />
          <span className="w-3 h-3 rounded-full bg-[#D36938]/70" />
          <span className="ml-2 font-mono text-[11px] text-muted">deploy.sh</span>
        </div>
        <div className="p-5 font-mono text-[13px] leading-relaxed min-h-[220px]">
          {displayed.map((text, i) => (
            <div key={i} className={LINES[i].color}>
              {LINES[i].prompt && <span className="text-sky mr-2">{LINES[i].prompt}</span>}
              {text}
              {i === displayed.length - 1 && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block w-2 h-3.5 bg-sky ml-1 align-middle"
                />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { duration: 0.6, delay: 0.8 }, y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 } }}
        className="absolute bottom-8 left-4 flex items-center gap-2 bg-panel/90 backdrop-blur border border-line rounded-full px-4 py-2 text-xs font-mono shadow-lg"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-sky" />
        Wah Cantt, Pakistan &middot; Remote OK
      </motion.div>
    </div>
  );
}
