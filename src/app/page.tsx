import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ExamBannersSection from "@/components/sections/ExamBannersSection";
import ServicesSection from "@/components/sections/ServicesSection";
import UnitsSection from "@/components/sections/UnitsSection";
import ConveniosSection from "@/components/sections/ConveniosSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ExamBannersSection />
        <ServicesSection />
        <UnitsSection />
        <ConveniosSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
