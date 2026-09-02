"use client";
import { motion } from "framer-motion";
import { ServiceHero } from "@/components/sections/service-hero";
import { CTASection } from "@/components/sections/cta-section";
import { Landmark, PiggyBank, LineChart, BadgeCheck, Umbrella, Baby, Check } from "lucide-react"; // Fixed icons here

const accounts = [
  { icon: Landmark, title: "Checking Account", desc: "Everyday banking made easy with no monthly fees and unlimited transactions.", features: ["No monthly maintenance fee", "Free online and mobile banking", "Free debit card", "Overdraft protection available"] },
  { icon: PiggyBank, title: "High-Yield Savings", desc: "Grow your money with competitive interest rates and flexible access.", features: ["2.50% APY interest rate", "No minimum balance", "FDIC insured up to $250K", "Mobile banking access"] },
  { icon: LineChart, title: "Money Market", desc: "Higher interest rates with check-writing privileges and debit card access.", features: ["3.25% APY interest rate", "$2,500 minimum balance", "Limited check writing", "Debit card included"] },
  { icon: BadgeCheck, title: "Certificate of Deposit", desc: "Lock in guaranteed returns with our competitive CD rates and terms.", features: ["Up to 4.50% APY", "Terms from 3 months to 5 years", "$1,000 minimum deposit", "Guaranteed rate of return"] },
  { icon: Umbrella, title: "IRA Accounts", desc: "Plan for retirement with traditional and Roth IRA options.", features: ["Traditional and Roth options", "Tax advantages", "Investment options available", "Retirement planning tools"] },
  { icon: Baby, title: "Youth Savings", desc: "Help young savers build good financial habits with our youth accounts.", features: ["Ages 13-17 eligible", "No monthly fees", "Financial education resources", "Parent/guardian oversight"] },
];

export default function PersonalBankingPage() {
  return (
    <>
      <ServiceHero title="Personal Banking" subtitle="Comprehensive banking solutions tailored to your personal financial needs" />
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Personal Accounts</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Choose from our range of personal banking accounts designed for your lifestyle</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {accounts.map((account, i) => (
              <motion.div 
                key={account.title} 
                className="bg-card rounded-2xl p-8 shadow-xl border border-border hover:shadow-2xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <account.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{account.title}</h3>
                <p className="text-muted-foreground mb-4">{account.desc}</p>
                <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                  {account.features.map((feat) => (
                    <li key={feat} className="flex items-center"><Check className="text-green-500 mr-2 h-4 w-4" /> {feat}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <CTASection title="Ready to Start Your Banking Journey?" subtitle="Open your personal account today and experience modern banking at its best" />
    </>
  );
}