"use client";
import { motion } from "framer-motion";
import { TrendingUp, Users, HeartHandshake } from "lucide-react";
import Image from "next/image";

export function FeatureSection() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-50 via-white to-teal-50/30 dark:from-gray-800 dark:via-gray-900 dark:to-teal-900/20 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold">
              Member-Focused Banking
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight bg-gradient-to-r from-gray-900 via-primary-700 to-teal-700 dark:from-white dark:via-primary-300 dark:to-teal-300 bg-clip-text text-transparent">
              Building Strength Together
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Creditexcop is a full-service credit union built on the foundation of providing our members with every step of their financial journey. We're committed to helping our members achieve their financial goals through personalized service and competitive rates.
            </p>
            
            <div className="space-y-4">
              {[
                { icon: TrendingUp, title: "Competitive Rates", desc: "Better rates on savings, loans, and credit cards designed to maximize your financial growth." },
                { icon: Users, title: "Member-Focused", desc: "We're owned by our members, not shareholders. Your success is our priority." },
                { icon: HeartHandshake, title: "Community Committed", desc: "Supporting local communities and causes that matter to our members." },
              ].map((feature) => (
                <div key={feature.title} className="group flex items-start space-x-4 p-4 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-border hover:shadow-lg transition-all">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">{feature.title}</h4>
                    <p className="text-muted-foreground">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {/* Placeholder images for the grid */}
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-xl aspect-square bg-muted">
                <Image src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Team collaboration" width={400} height={400} className="w-full h-full object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/3] bg-muted">
                <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Banking consultant" width={400} height={300} className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/3] bg-muted">
                <Image src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Banking technology" width={400} height={300} className="w-full h-full object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl aspect-square bg-muted">
                <Image src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Community support" width={400} height={400} className="w-full h-full object-cover" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}