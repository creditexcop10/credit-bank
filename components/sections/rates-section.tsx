"use client";
import { motion } from "framer-motion";
import { PiggyBank, ShieldCheck, CreditCard, Landmark } from "lucide-react";

const rates = [
  { icon: PiggyBank, title: "High Yield Savings", rate: "3.75%", type: "APY*", featured: true },
  { icon: ShieldCheck, title: "18 Month Certificate", rate: "3.65%", type: "APY*" },
  { icon: CreditCard, title: "Credit Cards", rate: "4.00%", type: "APR*" },
  { icon: Landmark, title: "Loans", rate: "15.49%", type: "APR*" },
];

export function RatesSection() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-50 via-white to-primary-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-primary-900/20 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-primary-700 to-gray-900 dark:from-white dark:via-primary-300 dark:to-white bg-clip-text text-transparent mb-4">
            Creditexcop Member Care
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover competitive rates designed to help your money grow faster
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {rates.map((rate, i) => (
            <motion.div 
              key={rate.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-border hover:border-primary/30"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <rate.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-blue-600 dark:from-primary-400 dark:to-blue-400 bg-clip-text text-transparent mb-2">{rate.rate}</div>
                <div className="text-sm text-muted-foreground mb-3 font-medium">{rate.type}</div>
                <div className="font-bold text-foreground mb-2 text-sm">{rate.title.toUpperCase()}</div>
              </div>
              {rate.featured && (
                <div className="mt-4 text-center">
                  <span className="inline-flex items-center px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-bold">
                    FEATURED
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}