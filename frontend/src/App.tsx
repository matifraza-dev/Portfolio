import { useResumeBundle } from "./hooks/useResumeBundle";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Tools from "./components/Tools";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const { data } = useResumeBundle();

  if (!data) return null;

  return (
    <div className="min-h-screen">
      <Nav />
      <Hero stats={data.stats} />
      <About />
      <Experience experience={data.experience} education={data.education} />
      <Projects projects={data.projects} />
      <Skills skills={data.skills} />
      <Tools />
      <Contact />
      <Footer />
    </div>
  );
}
