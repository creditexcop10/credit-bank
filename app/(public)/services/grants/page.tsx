"use client";
import { motion } from "framer-motion";
import { ServiceHero } from "@/components/sections/service-hero";
import { CTASection } from "@/components/sections/cta-section";
import { Store, GraduationCap, Home, HeartHandshake, Users, Stethoscope, ArrowRight } from "lucide-react";
import Link from "next/link";

const grants = [
  { icon: Store, title: "Small Business Grant", desc: "Up to $50,000 in funding for small business startups and expansion projects.", color: "text-blue-500" },
  { icon: GraduationCap, title: "Education Grant", desc: "Financial assistance for higher education, vocational training, and skill development.", color: "text-purple-500" },
  { icon: Home, title: "Home Ownership Grant", desc: "Down payment assistance and closing cost support for first-time homebuyers.", color: "text-green-500" },
  { icon: HeartHandshake, title: "Emergency Relief Grant", desc: "Immediate financial assistance for unexpected emergencies and hardships.", color: "text-red-500" },
  { icon: Users, title: "Community Development", desc: "Support for community projects, non-profits, and local development initiatives.", color: "text-orange-500" },
  { icon: Stethoscope, title: "Healthcare Grant", desc: "Medical expense assistance and healthcare accessibility support programs.", color: "text-teal-500" },
];

export default function GrantsPage() {
  return (
    <>
      <ServiceHero title="Grants & Financial Aid" subtitle="Supporting your dreams with accessible funding opportunities and financial assistance programs" />
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Available Grant Programs</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {grants.map((grant, i) => (
              <motion.div key={grant.title} className="bg-card rounded-2xl p-8 shadow-xl border border-border hover:shadow-2xl transition-all duration-300" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mb-6"><grant.icon className={`h-8 w-8 ${grant.color}`} /></div>
                <h3 className="text-xl font-bold text-foreground mb-3">{grant.title}</h3>
                <p className="text-muted-foreground mb-6">{grant.desc}</p>
                <Link href="/register" className={`inline-flex items-center font-semibold hover:underline ${grant.color}`}>Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <CTASection title="Ready to Apply for a Grant?" subtitle="Take the first step towards achieving your financial goals with our grant programs" primaryText="Start Application" />
    </>
  );
}