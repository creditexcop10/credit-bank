"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, TrendingUp } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const blurInVariants: Variants = {
  hidden: { opacity: 0, y: 10, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-slate-900 text-white">
      <div className="absolute inset-0 h-full w-full bg-[radial-gradient(circle_at_50%_50%,rgba(47,85,212,0.25),transparent_80%)]" />
      
      {/* Reduced py here */}
      <div className="container mx-auto grid grid-cols-1 gap-12 px-4 py-12 md:px-6 lg:grid-cols-2 lg:py-16 relative z-10">
        
        <motion.div 
          className="flex flex-col justify-center gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            variants={blurInVariants}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/80 backdrop-blur-sm"
          >
            {/* Changed icon color to blue-400 so it's visible */}
            <ShieldCheck className="h-4 w-4 text-blue-400" />
            Bank with confidence. FDIC Insured.
          </motion.div>
          
          <motion.h1 
            variants={blurInVariants}
            className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Modern Banking for the <span className="text-blue-400">Co-operative</span> Generation.
          </motion.h1>
          
          <motion.p 
            variants={blurInVariants}
            className="max-w-xl text-lg text-white/70"
          >
            Experience credit union benefits with modern technology. Manage your money, track expenses, and grow your wealth securely in one place.
          </motion.p>
          
          <motion.div 
            variants={blurInVariants}
            className="flex gap-4 flex-row"
          >
            <Link href="/register">
              {/* Made buttons bigger with custom classes */}
              <Button size="lg" className="h-12 px-8 text-base bg-primary hover:bg-primary/90">
                Open an Account <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="h-12 px-8 text-base bg-transparent text-white border-white/20 hover:bg-white/10 hover:text-white">
                Login to Dashboard
              </Button>
            </Link>
          </motion.div>

          <motion.div 
            variants={blurInVariants}
            className="mt-8 flex items-center gap-8"
          >
            <div>
              <p className="text-2xl font-bold text-white">$2.4B+</p>
              <p className="text-sm text-white/50">Assets Managed</p>
            </div>
            <div className="h-12 w-px bg-white/20" />
            <div>
              <p className="text-2xl font-bold text-white">120K+</p>
              <p className="text-sm text-white/50">Active Members</p>
            </div>
          </motion.div>
        </motion.div>

        <div className="relative flex items-center justify-center">
          <motion.div 
            className="absolute h-80 w-80 rounded-full bg-accent/20 blur-3xl lg:h-96 lg:w-96"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <motion.div 
            className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-white/10 shadow-2xl lg:max-w-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          >
            <div className="relative h-80 w-full sm:h-96 lg:h-[28rem]">
              <Image
                src="/metro.jpg"
                alt="CreditExpo mobile app"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
            </div>
          </motion.div>

          <motion.div 
            className="absolute -left-4 bottom-10 z-20 hidden w-64 rounded-xl border border-white/10 bg-slate-800/95 p-4 shadow-xl backdrop-blur sm:block lg:left-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: [0, -10, 0] }}
            transition={{ 
              opacity: { duration: 0.5, delay: 0.8 },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-white/70">Total Balance</p>
              <TrendingUp className="h-4 w-4 text-green-400" />
            </div>
            <p className="mt-2 text-2xl font-bold text-white">$14,560.50</p>
            <div className="mt-3 h-1 w-full rounded-full bg-white/10">
              <div className="h-1 w-3/4 rounded-full bg-blue-500" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}