import Header from "@/components/layout/Header";
import HeroSection from "@/components/sections/HeroSection";
import dynamic from "next/dynamic";

const AboutSection = dynamic(() => import("@/components/sections/AboutSection"));
const Footer = dynamic(() => import("@/components/layout/Footer"));
const FloatingActionButton = dynamic(() => import("@/components/ui/FloatingActionButton"));
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
