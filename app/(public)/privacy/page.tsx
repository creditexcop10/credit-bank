import { ServiceHero } from "@/components/sections/service-hero";

export default function PrivacyPage() {
  return (
    <>
      <ServiceHero title="Privacy Policy" subtitle="Your privacy is our priority. Learn how we protect and handle your personal information" />
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-2xl shadow-xl p-8 lg:p-12 border border-border prose prose-lg dark:prose-invert max-w-none">
            <h2>1. Information We Collect</h2>
            <p>Creditexcop collects information to provide better services to our customers. We collect information in the following ways:</p>
            <ul>
              <li><strong>Personal Information:</strong> Name, address, phone number, email address, Social Security number, and other identifying information</li>
              <li><strong>Financial Information:</strong> Account balances, payment history, credit information, and transaction details</li>
              <li><strong>Technical Information:</strong> IP address, browser type, device information, and usage data</li>
            </ul>
            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide and maintain our banking services</li>
              <li>Process transactions and manage your accounts</li>
              <li>Comply with legal and regulatory requirements</li>
            </ul>
            <h2>3. Data Security</h2>
            <p>We implement robust security measures to protect your information:</p>
            <ul>
              <li><strong>Encryption:</strong> All sensitive data is encrypted in transit and at rest</li>
              <li><strong>Access Controls:</strong> Strict access controls limit who can view your information</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}