import { useCustomCursor } from "@/hooks/useCustomCursor";
import { LangProvider } from "@/context/LangContext";
import Header from "@/components/Header";
import HeroSection from "@/components/sections/Hero";
import ProjectsSection from "@/components/sections/Projects";
import AboutSection from "@/components/sections/About";
import ContactSection from "@/components/sections/Contact";
import Footer from "@/components/Footer";

function App() {
  useCustomCursor();

  return (
    // LangProvider огортає весь застосунок — мова доступна скрізь
    <LangProvider>
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
    </LangProvider>
  );
}

export default App;
