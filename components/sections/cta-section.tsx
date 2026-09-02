"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTASection({ title, subtitle, primaryLink = "/register", primaryText = "Open an Account", secondaryLink = "/contact", secondaryText = "Speak with Advisor" }: { title: string; subtitle: string; primaryLink?: string; primaryText?: string; secondaryLink?: string; secondaryText?: string; }) {
  return (
    <section className="py-16 bg-[#111a4a] text-white overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2 
          className="text-3xl lg:text-4xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h2>
        <motion.p 
          className="text-xl text-blue-100 mb-8"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
        >
          {subtitle}
        </motion.p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={primaryLink}><Button size="lg" className="bg-white text-[#111a4a] hover:bg-blue-50">{primaryText}</Button></Link>
          <Link href={secondaryLink}><Button size="lg" variant="outline" className="bg-transparent text-white border-white/30 hover:bg-white/10 hover:text-white">{secondaryText}</Button></Link>
        </div>
      </div>
    </section>
  );
}