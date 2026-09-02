import { ServiceHero } from "@/components/sections/service-hero";
import { CTASection } from "@/components/sections/cta-section";

export default function CardsPage() {
  return (
    <>
      <ServiceHero title="Credit & Debit Cards" subtitle="Find the perfect card for your lifestyle and spending habits with competitive rates." />
      <div className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Our Card Offerings</h2>
          <p className="text-muted-foreground">Details about Cashback, Travel Rewards, and Low-APR cards will go here.</p>
        </div>
      </div>
      <CTASection title="Ready to Get Your Card?" subtitle="Apply for a CreditExpo card today and start earning rewards." primaryText="Apply Now" />
    </>
  );
}