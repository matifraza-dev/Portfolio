import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../lib/api";

type ToolKey = "seo" | "performance" | "competitor";

const TOOLS: { key: ToolKey; label: string; description: string }[] = [
  { key: "seo", label: "SEO Checker", description: "Live on-page audit: title, meta description, headings, alt text, crawlability." },
  { key: "performance", label: "Site Performance", description: "Real response time, page weight, and crawlability signals — no fabricated traffic numbers." },
  { key: "competitor", label: "Competitor Analysis", description: "Run the same audit on two URLs and see the on-page scores side by side." },
];

function ScoreBar({ score, max }: { score: number; max: number }) {
  const pct = Math.round((score / max) * 100);
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 rounded-full bg-line overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="h-full bg-amber"
        />
      </div>
      <span className="font-mono text-sm text-muted w-14 text-right">{score}/{max}</span>
    </div>
  );
}

function CheckList({ checks }: { checks: { passed: boolean; label: string; detail: string }[] }) {
  return (
    <ul className="mt-4 space-y-2">
      {checks.map((c) => (
        <li key={c.label} className="flex gap-3 text-sm">
          <span className={c.passed ? "text-teal" : "text-amber"}>{c.passed ? "✓" : "!"}</span>
          <span>
            <span className="text-fg">{c.label}</span>{" "}
            <span className="text-muted">— {c.detail}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function Tools() {
  const [active, setActive] = useState<ToolKey>("seo");
  const [url, setUrl] = useState("");
  const [urlB, setUrlB] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const endpoints: Record<ToolKey, string> = {
    seo: "/tools/seo-checker/",
    performance: "/tools/site-performance/",
    competitor: "/tools/competitor-analysis/",
  };

  async function run(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const payload = active === "competitor" ? { url_a: url, url_b: urlB } : { url };
      const { data } = await api.post(endpoints[active], payload);
      setResult(data);
    } catch (err: any) {
      setError(err?.response?.data?.error || "Couldn't reach the analysis service. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="tools" className="py-24 border-t border-line">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="mb-12 max-w-2xl"
        >
          <div className="font-mono text-sm text-amber mb-3">05 / free tools</div>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold">
            Live tools, not a lead-gen form.
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            These run against the real page — the backend fetches it and
            measures it while you wait. No signup, and no invented traffic
            numbers: if a metric can't be measured honestly, the tool says so.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-8">
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">
            {TOOLS.map((t) => (
              <button
                key={t.key}
                onClick={() => { setActive(t.key); setResult(null); setError(null); }}
                className={`text-left px-4 py-3 rounded border shrink-0 transition-colors ${
                  active === t.key ? "border-amber/50 bg-amber/5" : "border-line hover:border-muted"
                }`}
              >
                <div className={`text-sm font-medium ${active === t.key ? "text-amber" : "text-fg"}`}>{t.label}</div>
                <div className="text-xs text-muted mt-1 hidden lg:block leading-relaxed">{t.description}</div>
              </button>
            ))}
          </div>

          <div className="border border-line rounded-lg p-6 sm:p-8">
            <form onSubmit={run} className="flex flex-col sm:flex-row gap-3">
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={active === "competitor" ? "yoursite.com" : "https://example.com"}
                required
                className="flex-1 bg-panel border border-line rounded px-4 py-3 text-sm font-mono outline-none focus:border-amber/60"
              />
              {active === "competitor" && (
                <input
                  value={urlB}
                  onChange={(e) => setUrlB(e.target.value)}
                  placeholder="competitor.com"
                  required
                  className="flex-1 bg-panel border border-line rounded px-4 py-3 text-sm font-mono outline-none focus:border-amber/60"
                />
              )}
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded bg-amber text-ink font-medium hover:bg-amber/90 transition-colors disabled:opacity-50 shrink-0"
              >
                {loading ? "Analyzing…" : "Run"}
              </button>
            </form>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="mt-6 text-sm text-amber font-mono"
                >
                  {error}
                </motion.div>
              )}

              {result && active !== "competitor" && (
                <motion.div
                  key="single"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="mt-8"
                >
                  {result.disclaimer && (
                    <p className="text-xs text-muted mb-5 font-mono">{result.disclaimer}</p>
                  )}
                  {"score" in result && <ScoreBar score={result.score} max={result.max_score} />}
                  {"speed_rating" in result && (
                    <div className="grid grid-cols-3 gap-4 mt-6 text-sm">
                      <div><div className="text-muted text-xs mb-1">Speed</div><div className="font-medium">{result.speed_rating} · {result.page.response_time_ms}ms</div></div>
                      <div><div className="text-muted text-xs mb-1">Weight</div><div className="font-medium">{result.weight_rating} · {result.page.page_size_kb}KB</div></div>
                      <div><div className="text-muted text-xs mb-1">Crawlability</div><div className="font-medium">{result.crawlability_score}/{result.crawlability_max}</div></div>
                    </div>
                  )}
                  {result.checks && <CheckList checks={result.checks} />}
                </motion.div>
              )}

              {result && active === "competitor" && (
                <motion.div
                  key="competitor"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="mt-8 grid sm:grid-cols-2 gap-8"
                >
                  {["site_a", "site_b"].map((key) => {
                    const site = result[key];
                    return (
                      <div key={key}>
                        <div className="text-xs font-mono text-muted mb-2 truncate">{site.page.final_url}</div>
                        <ScoreBar score={site.score} max={site.max_score} />
                        <CheckList checks={site.checks} />
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
