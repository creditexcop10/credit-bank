"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Smartphone, Laptop, Bell, Receipt, Camera, CreditCard, BarChart, Fingerprint, ShieldCheck, Apple, Play } from "lucide-react";
import { CTASection } from "@/components/sections/cta-section";

const features = [
  { icon: BarChart, title: "Account Overview", desc: "View all your accounts, balances, and recent transactions in one place." },
  { icon: Smartphone, title: "Send Money", desc: "Transfer money instantly to friends, family, or between your accounts." },
  { icon: Receipt, title: "Bill Pay", desc: "Schedule and pay all your bills from one convenient location." },
  { icon: Camera, title: "Mobile Deposit", desc: "Deposit checks instantly by taking a photo with your phone." },
  { icon: CreditCard, title: "Card Controls", desc: "Manage your debit and credit cards with advanced security features." },
  { icon: BarChart, title: "Budgeting", desc: "Track spending, set budgets, and achieve your financial goals." },
];

const security = [
  { icon: Fingerprint, title: "Biometric Login", desc: "Secure access with fingerprint and face recognition" },
  { icon: ShieldCheck, title: "256-bit Encryption", desc: "Military-grade encryption protects all your data" },
  { icon: Bell, title: "Real-time Alerts", desc: "Instant notifications for all account activity" },
  { icon: ShieldCheck, title: "Fraud Protection", desc: "24/7 monitoring and zero liability guarantee" },
];

export default function AppsPage() {
  return (
    <>
      {/* Hero with Image */}
      <section className="relative py-20 lg:py-32 bg-[#111a4a] text-white overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center px-4 py-2 bg-white/10 text-white/90 rounded-full text-sm font-semibold mb-6 border border-white/20"><Smartphone className="mr-2 h-4 w-4" /> Mobile Banking</div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">Banking Made Mobile</h1>
            <p className="text-xl text-blue-100 mb-8">Take control of your finances with our award-winning mobile banking app. Available for iOS and Android.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="inline-flex items-center px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors"><Apple className="text-2xl mr-3" /><div className="text-left"><div className="text-xs">Download on the</div><div className="font-semibold">App Store</div></div></button>
              <button className="inline-flex items-center px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors"><Play className="text-2xl mr-3" /><div className="text-left"><div className="text-xs">Get it on</div><div className="font-semibold">Google Play</div></div></button>
            </div>
          </motion.div>
          <motion.div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <Image src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Mobile banking app interface" fill className="object-cover" />
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Powerful Features at Your Fingertips</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div key={feature.title} className="bg-card rounded-2xl p-8 shadow-xl border border-border" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6"><feature.icon className="h-8 w-8 text-primary" /></div>
                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Bank-Level Security</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {security.map((sec, i) => (
              <motion.div key={sec.title} className="text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4"><sec.icon className="h-8 w-8 text-primary" /></div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{sec.title}</h3>
                <p className="text-muted-foreground">{sec.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Download Our App Today" subtitle="Join millions of satisfied customers who bank with confidence using our mobile app" primaryText="App Store" secondaryText="Google Play" />
    </>
  );
}