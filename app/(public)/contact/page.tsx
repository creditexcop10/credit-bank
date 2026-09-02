"use client";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const contactInfo = [
  { icon: Phone, title: "Phone", lines: ["1-800-BANKING", "Available 24/7"], color: "text-primary" },
  { icon: Mail, title: "Email", lines: ["support@creditexpo.com", "Response within 24 hours"], color: "text-teal-500" },
  { icon: MapPin, title: "Visit Us", lines: ["123 Banking Street", "New York, NY 10001"], color: "text-purple-500" },
  { icon: Clock, title: "Banking Hours", lines: ["Mon-Fri: 9AM-5PM", "Sat: 9AM-1PM"], color: "text-orange-500" },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 lg:py-32 bg-[#111a4a] text-white overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 text-white/90 rounded-full text-sm font-semibold mb-6 border border-white/20">
            Get In Touch
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">We're here to help with all your banking needs. Reach out to us anytime.</p>
        </div>
      </section>

      {/* Form & Info */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
          
          {/* Form */}
          <motion.div 
            className="bg-muted/30 rounded-2xl p-8 border border-border"
            initial={{ opacity: 0, x: -50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="block text-sm font-medium mb-2">Full Name</Label>
                  <Input id="name" type="text" required placeholder="John Doe" />
                </div>
                <div>
                  <Label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</Label>
                  <Input id="email" type="email" required placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <Label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</Label>
                <Input id="subject" type="text" required placeholder="How can we help?" />
              </div>
              <div>
                <Label htmlFor="message" className="block text-sm font-medium mb-2">Message</Label>
                <Textarea id="message" rows={6} required placeholder="Your message..." />
              </div>
              <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">Send Message</Button>
            </form>
          </motion.div>

          {/* Info */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6 }}
          >
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Get in Touch</h2>
              <p className="text-muted-foreground mb-8">Have questions about our services? Need help with your account? Our team is ready to assist you.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((item, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className={`w-12 h-12 bg-muted rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    {item.lines.map((line, idx) => (
                      <p key={idx} className="text-sm text-muted-foreground">{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}