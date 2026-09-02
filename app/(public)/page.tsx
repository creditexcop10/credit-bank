import { HeroSection } from "@/components/shared/hero-section";
import { RatesSection } from "@/components/sections/rates-section";
import { ServicesSection } from "@/components/sections/services-section";
import { FeatureSection } from "@/components/sections/feature-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { ContactInfoSection } from "@/components/sections/contact-info-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <RatesSection />
      <ServicesSection />
      <FeatureSection />
      <TestimonialsSection />
      <ContactInfoSection />
    </>
  );
}