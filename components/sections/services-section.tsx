"use client";
import { motion } from "framer-motion";
import { Landmark, CreditCard, Home, Briefcase, PieChart, Info } from "lucide-react";

const services = [
  { icon: Landmark, title: "Deposit Accounts", desc: "Secure your money with our high-yield savings and checking accounts designed for growth." },
  { icon: CreditCard, title: "Credit Cards", desc: "Find the perfect credit card for your lifestyle and spending habits with competitive rates." },
  { icon: Home, title: "Loans", desc: "Get competitive rates on personal, auto, and home loans tailored to your financial goals." },
  { icon: Briefcase, title: "Business Banking", desc: "Comprehensive banking solutions designed to help your business thrive and grow." },
  { icon: PieChart, title: "Wealth & Retire", desc: "Plan for your future with our expert investment and retirement planning services." },
  { icon: Info, title: "About Creditexcop", desc: "Learn more about our commitment to exceptional banking services and community support." },
];

export function ServicesSection() {
  return (
    // Forcing Navy Blue background and white text for consistency across light/dark modes
    <section className="relative py-20 bg-[#111a4a] text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            How Can We Help You Today?
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Comprehensive banking solutions tailored to your needs
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div 
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center transition-all duration-500 hover:bg-white/10 hover:-translate-y-2 border border-white/10 hover:border-white/20"
            >
              <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl mb-6 mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <service.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-100">{service.title}</h3>
              <p className="text-blue-100 leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}