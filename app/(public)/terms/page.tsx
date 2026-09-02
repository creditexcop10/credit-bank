import { ServiceHero } from "@/components/sections/service-hero";

export default function TermsPage() {
  return (
    <>
      <ServiceHero title="Terms of Service" subtitle="Please read these terms carefully before using our banking services" />
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-2xl shadow-xl p-8 lg:p-12 border border-border prose prose-lg dark:prose-invert max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing and using Creditexcop banking services, you accept and agree to be bound by the terms and provision of this agreement.</p>
            <h2>2. Account Opening and Maintenance</h2>
            <p>To open an account with Creditexcop, you must:</p>
            <ul>
              <li>Be at least 18 years of age</li>
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
            </ul>
            <h2>3. Account Security</h2>
            <p>You are responsible for maintaining the confidentiality of your account information and password. You agree to notify us immediately of any unauthorized use of your account.</p>
            <h2>4. Services and Fees</h2>
            <p>Creditexcop provides various banking services including but not limited to:</p>
            <ul>
              <li>Savings and checking accounts</li>
              <li>Online and mobile banking</li>
              <li>Loan services</li>
            </ul>
            <h2>5. Privacy and Data Protection</h2>
            <p>We are committed to protecting your privacy and personal information. Please review our Privacy Policy for detailed information about how we collect, use, and protect your data.</p>
            <h2>6. Limitation of Liability</h2>
            <p>Creditexcop shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services.</p>
          </div>
        </div>
      </section>
    </>
  );
}