"use client";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { ShieldCheck, Zap, Globe, Smartphone } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: "easeOut" } },
};

export function AuthBranding({ title, subtitle, description }: { title: string; subtitle: string; description: string }) {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-[#111a4a] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-white/10 rounded-full backdrop-blur-sm animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-white/5 rounded-full backdrop-blur-sm animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)", backgroundSize: "25px 25px" }}></div>
      </div>
      
      <motion.div 
        className="relative flex flex-col justify-center items-center w-full h-full text-white p-8 z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-6 relative">
          <div className="absolute inset-0 bg-white/20 rounded-2xl blur-lg"></div>
          <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <Image src="/logo-dark.png" alt="CreditExpo" width={120} height={32} className="h-10 w-auto" priority />
          </div>
        </motion.div>
        
        <motion.h1 variants={itemVariants} className="text-3xl font-black mb-3 text-center bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
          {title}
        </motion.h1>
        <motion.h2 variants={itemVariants} className="text-lg font-semibold mb-6 text-center text-white/90">
          {subtitle}
        </motion.h2>
        <motion.p variants={itemVariants} className="text-sm mb-8 max-w-md text-center text-white/80 leading-relaxed">
          {description}
        </motion.p>
        
        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 w-full max-w-md">
          {[
            { icon: ShieldCheck, title: "Bank-Grade Security", desc: "256-bit encryption" },
            { icon: Zap, title: "Instant Transfers", desc: "Real-time processing" },
            { icon: Globe, title: "Global Reach", desc: "200+ countries" },
            { icon: Smartphone, title: "Mobile First", desc: "iOS & Android" },
          ].map((feature) => (
            <div key={feature.title} className="group flex items-center space-x-3 p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <feature.icon className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">{feature.title}</h3>
                <p className="text-xs text-white/70">{feature.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}