export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="container-page flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
        <span>© {new Date().getFullYear()} Atif Raza</span>
        <div className="flex gap-6 font-mono">
          <a href="mailto:matifraza512@gmail.com" className="hover:text-fg">matifraza512@gmail.com</a>
          <a href="https://github.com/matifraza512-dot" target="_blank" rel="noreferrer" className="hover:text-fg">GitHub</a>
          <a href="https://linkedin.com/in/atif-raza-6346002b4" target="_blank" rel="noreferrer" className="hover:text-fg">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
