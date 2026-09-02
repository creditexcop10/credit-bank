"use client";
import { motion } from "framer-motion";
import { ServiceHero } from "@/components/sections/service-hero";
import { CTASection } from "@/components/sections/cta-section";
import { Home, Car, User, Briefcase, GraduationCap, HousePlus, ArrowRight } from "lucide-react";
import Link from "next/link";

const loans = [
  { icon: Home, title: "Home Loans", rate: "From 3.25% APR", amount: "Up to $1M", term: "15-30 years" },
  { icon: Car, title: "Auto Loans", rate: "From 2.99% APR", amount: "Up to $100K", term: "3-7 years" },
  { icon: User, title: "Personal Loans", rate: "From 5.99% APR", amount: "Up to $50K", term: "2-7 years" },
  { icon: Briefcase, title: "Business Loans", rate: "From 4.25% APR", amount: "Up to $5M", term: "1-25 years" },
  { icon: GraduationCap, title: "Student Loans", rate: "From 3.75% APR", amount: "Up to $200K", term: "5-20 years" },
  { icon: HousePlus, title: "Home Equity", rate: "From 4.50% APR", amount: "Up to $500K", term: "5-30 years" },
];

export default function LoansPage() {
  return (
    <>
      <ServiceHero title="Loans & Financing" subtitle="Competitive rates and flexible terms to help you achieve your financial goals" />
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Loan Options</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Find the perfect loan solution for your personal or business needs</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loans.map((loan, i) => (
              <motion.div key={loan.title} className="bg-card rounded-2xl p-8 shadow-xl border border-border hover:shadow-2xl transition-all duration-300" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6"><loan.icon className="h-8 w-8 text-primary" /></div>
                <h3 className="text-xl font-bold text-foreground mb-3">{loan.title}</h3>
                <div className="space-y-2 text-sm text-muted-foreground mb-6">
                  <div className="flex justify-between"><span>Interest Rate:</span><span className="font-semibold text-primary">{loan.rate}</span></div>
                  <div className="flex justify-between"><span>Loan Amount:</span><span className="font-semibold">{loan.amount}</span></div>
                  <div className="flex justify-between"><span>Term:</span><span className="font-semibold">{loan.term}</span></div>
                </div>
                <Link href="/register" className="inline-flex items-center text-primary font-semibold hover:underline">Apply Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <CTASection title="Ready to Apply for a Loan?" subtitle="Get started with your loan application today and receive a decision within 24 hours" primaryText="Apply Now" />
    </>
  );
}