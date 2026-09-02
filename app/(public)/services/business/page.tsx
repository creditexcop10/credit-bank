"use client";
import { motion } from "framer-motion";
import { ServiceHero } from "@/components/sections/service-hero";
import { CTASection } from "@/components/sections/cta-section";
import { Landmark, PiggyBank, HandCoins, CreditCard, LineChart, Wallet, Check, Users, Smartphone, BarChart, ShieldCheck } from "lucide-react";

const services = [
  { icon: Landmark, title: "Business Checking", desc: "Flexible checking accounts with low fees and high transaction limits.", features: ["No monthly maintenance fees", "Unlimited transactions", "Online banking included"] },
  { icon: PiggyBank, title: "Business Savings", desc: "Competitive interest rates to help your business funds grow.", features: ["High-yield interest rates", "No minimum balance", "FDIC insured"] },
  { icon: HandCoins, title: "Business Loans", desc: "Flexible financing solutions for expansion, equipment, and working capital.", features: ["Competitive rates", "Quick approval process", "Flexible terms"] },
  { icon: CreditCard, title: "Merchant Services", desc: "Accept payments anywhere with our secure payment processing solutions.", features: ["Multiple payment methods", "Secure transactions", "Real-time reporting"] },
  { icon: LineChart, title: "Cash Management", desc: "Optimize your cash flow with advanced treasury management tools.", features: ["Automated clearing", "Wire transfers", "Account reconciliation"] },
  { icon: Wallet, title: "Business Credit Cards", desc: "Build business credit while earning rewards on everyday purchases.", features: ["Cashback rewards", "Expense tracking", "Employee cards"] },
];

const benefits = [
  { icon: Users, title: "Dedicated Support", desc: "Personal relationship managers for your business" },
  { icon: Smartphone, title: "Digital Banking", desc: "Advanced online and mobile banking platforms" },
  { icon: BarChart, title: "Financial Insights", desc: "Detailed reporting and analytics tools" },
  { icon: ShieldCheck, title: "Security First", desc: "Enterprise-grade security for all transactions" },
];

export default function BusinessBankingPage() {
  return (
    <>
      <ServiceHero title="Business Banking Solutions" subtitle="Comprehensive financial services designed to help your business grow and thrive" />
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Business Banking Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Everything your business needs to manage finances efficiently and scale successfully</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div key={service.title} className="bg-card rounded-2xl p-8 shadow-xl border border-border hover:shadow-2xl transition-all duration-300" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6"><service.icon className="h-8 w-8 text-primary" /></div>
                <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.desc}</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {service.features.map((feat) => (<li key={feat} className="flex items-center"><Check className="text-green-500 mr-2 h-4 w-4" /> {feat}</li>))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Why Businesses Choose Us</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, i) => (
              <motion.div key={benefit.title} className="text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4"><benefit.icon className="h-8 w-8 text-primary" /></div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <CTASection title="Ready to Bank with Us?" subtitle="Let's discuss how we can support your business growth and financial success" primaryText="Open Business Account" />
    </>
  );
}