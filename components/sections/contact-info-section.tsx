"use client";
import { Clock, Phone, Mail, MapPin } from "lucide-react";

export function ContactInfoSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {[
            { icon: Clock, title: "Banking Hours", lines: ["Mon-Fri: 9AM-5PM", "Sat: 9AM-1PM", "Sun: Closed"] },
            { icon: Phone, title: "Phone Banking", lines: ["Available 24/7"] },
            { icon: Mail, title: "Email Support", lines: ["Response within 24hrs", "support@creditexcop.com"] },
            { icon: MapPin, title: "Visit Us", lines: ["123 Banking Street", "New York, NY 10001"] },
          ].map((item) => (
            <div key={item.title} className="text-center lg:text-left">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto lg:mx-0 mb-3">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2 text-sm">{item.title}</h3>
              {item.lines.map((line, i) => (
                <p key={i} className="text-muted-foreground text-xs">{line}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}