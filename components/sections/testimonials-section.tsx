"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export function TestimonialsSection() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-3">Hear From Our Customers</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { quote: "I am impressed with the customer service and speed of payout.", name: "Sarah Morris", role: "Verified Customer" },
            { quote: "Excellent service and competitive rates. Highly recommended!", name: "John Davis", role: "Business Owner" },
            { quote: "The mobile app is fantastic and customer support is top-notch.", name: "Emily Johnson", role: "Personal Banking" },
          ].map((testimonial, i) => (
            <motion.div 
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-muted/50 rounded-xl p-6 text-center"
            >
              <div className="flex justify-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4 italic text-sm">"{testimonial.quote}"</p>
              <div className="flex items-center justify-center">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <span className="font-bold text-primary">{testimonial.name.charAt(0)}</span>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-foreground text-sm">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}