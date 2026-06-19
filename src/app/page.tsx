import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import TechStackSection from "@/components/sections/TechStackSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import ProcessSection from "@/components/sections/ProcessSection";
import AISection from "@/components/sections/AISection";
import IndustriesSection from "@/components/sections/IndustriesSection";
import StatsSection from "@/components/sections/StatsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import PricingSection from "@/components/sections/PricingSection";
import BlogSection from "@/components/sections/BlogSection";
import ContactSection from "@/components/sections/ContactSection";
import EasterEggs from "@/components/ui/EasterEggs";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <ServicesSection />
        <TechStackSection />
        <AISection />
        <IndustriesSection />
        <PortfolioSection />
        <ProcessSection />
        <StatsSection />
        <TestimonialsSection />
        <PricingSection />
        <BlogSection />
        <ContactSection />
      </main>
      <Footer />
      <EasterEggs />
    </>
  );
}
