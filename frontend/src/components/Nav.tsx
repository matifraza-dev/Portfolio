import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#tools", label: "Tools" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 inset-x-0 z-50 border-b transition-colors ${
        scrolled ? "bg-ink/90 backdrop-blur border-line" : "bg-transparent border-transparent"
      }`}
    >
      <div className="container-page flex items-center justify-between h-16">
        <a href="#top" className="font-display font-semibold text-lg tracking-tight">
          Atif Raza
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-fg transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="font-mono text-sm px-5 py-2.5 rounded-xl border-0 outline outline-2 outline-offset-[3px] outline-[#D36938] bg-[#D36938] text-[#111] font-medium hover:outline-offset-[5px] transition-all duration-200"
        >
          Start a project
        </a>
      </div>
    </motion.header>
  );
}
