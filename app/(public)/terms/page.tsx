import { ServiceHero } from "@/components/sections/service-hero";

export default function TermsPage() {
  return (
    <>
      <ServiceHero title="Terms of Service" subtitle="Please read these terms carefully before using our banking services" />
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-12">
            
            {/* Sticky Table of Contents */}
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <h3 className="text-sm font-bold uppercase text-muted-foreground mb-4 tracking-wider">Contents</h3>
                <ul className="space-y-3 text-sm border-l border-border">
                  <li className="pl-4 border-l-2 border-primary text-primary font-medium"><a href="#acceptance">1. Acceptance</a></li>
                  <li className="pl-4 text-muted-foreground hover:text-foreground"><a href="#accounts">2. Accounts</a></li>
                  <li className="pl-4 text-muted-foreground hover:text-foreground"><a href="#security">3. Security</a></li>
                  <li className="pl-4 text-muted-foreground hover:text-foreground"><a href="#fees">4. Fees</a></li>
                  <li className="pl-4 text-muted-foreground hover:text-foreground"><a href="#privacy">5. Privacy</a></li>
                </ul>
              </div>
            </div>

            {/* Document Content */}
            <div className="lg:col-span-3">
              <div className="bg-card rounded-2xl shadow-xl p-8 lg:p-12 border border-border">
                <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-h2:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground">
                  
                  <h2 id="acceptance">1. Acceptance of Terms</h2>
                  <p>By accessing and using CreditExcop banking services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our services.</p>

                  <h2 id="accounts">2. Account Opening and Maintenance</h2>
                  <p>To open an account with CreditExcop, you must meet the following requirements:</p>
                  <ul>
                    <li>Be at least 18 years of age</li>
                    <li>Provide accurate and complete personal information</li>
                    <li>Maintain the security of your account credentials</li>
                    <li>Comply with all applicable laws and regulations</li>
                  </ul>

                  <h2 id="security">3. Account Security</h2>
                  <p>You are responsible for maintaining the confidentiality of your account information, password, and PIN. You agree to notify us immediately of any unauthorized use of your account or any other security breach.</p>

                  <h2 id="fees">4. Services and Fees</h2>
                  <p>CreditExcop provides various banking services including but not limited to:</p>
                  <ul>
                    <li>Savings and checking accounts</li>
                    <li>Online and mobile banking</li>
                    <li>Loan and credit services</li>
                    <li>Investment products</li>
                  </ul>
                  <p>We reserve the right to modify our fee structure at any time. You will be notified of any changes via email or in-app notification.</p>

                  <h2 id="privacy">5. Privacy and Data Protection</h2>
                  <p>We are committed to protecting your privacy and personal information. Our data collection and usage practices are outlined in detail in our Privacy Policy.</p>
                  
                  <div className="mt-12 pt-8 border-t border-border not-prose">
                    <p className="text-sm text-muted-foreground">Last updated: January 9, 2026</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}