import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import FloatingActionButton from "@/components/ui/FloatingActionButton";
import dynamic from "next/dynamic";

const ExamBannersSection = dynamic(() => import("@/components/sections/ExamBannersSection"));
const ServicesSection = dynamic(() => import("@/components/sections/ServicesSection"));
const UnitsSection = dynamic(() => import("@/components/sections/UnitsSection"));
const ConveniosSection = dynamic(() => import("@/components/sections/ConveniosSection"));
const ContactSection = dynamic(() => import("@/components/sections/ContactSection"));

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
      <FloatingActionButton />
    </>
  );
}
