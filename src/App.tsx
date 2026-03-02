import { useCustomCursor } from "@/hooks/useCustomCursor";
import Header from "@/components/Header";
import HeroSection from "@/components/sections/Hero";
import ProjectsSection from "@/components/sections/Projects";
import AboutSection from "@/components/sections/About";
import ContactSection from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import { CodeBreakerGame } from "@/components/CodeBreakerGame";

function App() {
  // Кастомний курсор — лайм крапка + кільце
  useCustomCursor();

  return (
    <div className="noise">
      <Header />
      <main>
        <HeroSection />
        <ProjectsSection />
        <AboutSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
