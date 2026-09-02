"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ServiceHero({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="relative py-20 lg:py-32 bg-[#111a4a] text-white overflow-hidden">
      <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center px-4 py-2 bg-white/10 text-white/90 rounded-full text-sm font-semibold mb-6 border border-white/20">
            CreditExpo Services
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">{title}</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">{subtitle}</p>
          <Link href="/register">
            <Button size="lg" className="bg-primary hover:bg-primary/90 h-12 px-8 text-base">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}