"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, Lightbulb, HeartHandshake, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const values = [
  { icon: ShieldCheck, title: "Trust & Security", desc: "Your financial security is our top priority with industry-leading protection measures." },
  { icon: Lightbulb, title: "Innovation", desc: "We embrace cutting-edge technology to deliver modern banking solutions." },
  { icon: HeartHandshake, title: "Customer Care", desc: "Personalized service and support whenever you need it, however you prefer." },
  { icon: Users, title: "Community", desc: "Supporting local communities and contributing to economic growth." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 lg:py-32 bg-[#111a4a] text-white overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 text-white/90 rounded-full text-sm font-semibold mb-6 border border-white/20">
            Our Story
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">About CreditExpo</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">Trusted banking partner committed to your financial success since our founding</p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-6">
              At CreditExpo, we're dedicated to empowering individuals, families, and businesses to achieve their financial goals through innovative banking solutions, personalized service, and unwavering commitment to excellence.
            </p>
            <p className="text-lg text-muted-foreground">
              We believe that banking should be simple, secure, and accessible to everyone, which is why we continuously invest in technology and training to deliver the best possible experience for our customers.
            </p>
          </motion.div>
          <motion.div 
            className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6 }}
          >
            <Image src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Modern banking office" fill className="object-cover" />
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">These values guide everything we do and shape our commitment to our customers and community</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <motion.div 
                key={value.title} 
                className="text-center group"
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#111a4a] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { stat: "50K+", label: "Active Customers" },
            { stat: "$2.5B", label: "Assets Under Management" },
            { stat: "25", label: "Branch Locations" },
            { stat: "99.9%", label: "Uptime Guarantee" },
          ].map((item) => (
            <div key={item.label}>
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">{item.stat}</div>
              <div className="text-blue-100 text-sm">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Ready to Join Our Family?</h2>
          <p className="text-xl text-muted-foreground mb-8">Experience the difference of banking with a trusted partner who puts your financial success first.</p>
          <div className="flex flex-row gap-4 justify-center">
            <Link href="/register"><Button size="lg" className="bg-primary hover:bg-primary/90 px-4 lg:px-8 py-2">Open an Account</Button></Link>
            <Link href="/contact"><Button size="lg" variant="outline" className="px-4 lg:px-8 py-2">Contact Us</Button></Link>
          </div>
        </div>
      </section>
    </>
  );
}