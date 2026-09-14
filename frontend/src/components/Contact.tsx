import { useState } from "react";
import { motion } from "framer-motion";
import { api } from "../lib/api";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      await api.post("/contact/", form);
      setStatus("sent");
      setForm({ name: "", email: "", company: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  const inputClass = "w-full bg-[#1a1a1a] border-0 outline outline-2 outline-offset-[3px] outline-white/10 rounded-xl px-4 py-3 text-sm text-fg placeholder:text-muted/40 focus:outline-[#D36938] focus:outline-offset-[5px] transition-all duration-200";

  return (
    <section id="contact" className="py-24 border-t border-line">
      <div className="container-page grid lg:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
        >
          <div className="font-mono text-sm text-amber mb-3">06 / contact</div>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-6">
            Have a build that needs a backend and a project owner?
          </h2>
          <p className="text-muted leading-relaxed max-w-md">
            Tell me what you are working on. I read every message myself and
            reply from Pakistan (UTC+5) usually inside a day, with EU
            morning and US evening overlap.
          </p>
        </motion.div>

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="space-y-4"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-[10px] tracking-[0.15em] text-muted uppercase">Name</span>
              <input required placeholder="Sarah Chen" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-[10px] tracking-[0.15em] text-muted uppercase">Email</span>
              <input required type="email" placeholder="sarah@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="font-mono text-[10px] tracking-[0.15em] text-muted uppercase">Company <span className="normal-case opacity-40">(optional)</span></span>
            <input placeholder="Acme Inc." value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className={inputClass} />
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="font-mono text-[10px] tracking-[0.15em] text-muted uppercase">Message</span>
            <textarea required rows={4} placeholder="What are you building?" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={inputClass + " resize-none"} />
          </div>

          <button type="submit" disabled={status === "loading"} className="font-mono text-sm px-8 py-3 rounded-xl border-0 outline outline-2 outline-offset-[3px] outline-[#D36938] bg-[#D36938] text-white font-medium hover:outline-offset-[5px] transition-all duration-200 disabled:opacity-40">
            {status === "loading" ? "Sending..." : "Send message ->"}
          </button>

          {status === "sent" && <p className="font-mono text-xs text-teal tracking-wide">Sent. I will reply within 24 hours.</p>}
          {status === "error" && <p className="font-mono text-xs text-amber tracking-wide">Could not send. Email matifraza512@gmail.com directly.</p>}
        </motion.form>
      </div>
    </section>
  );
}
