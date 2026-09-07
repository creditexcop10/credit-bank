"use client";
import { motion } from "framer-motion";
import { CreditCard, Snowflake, Settings, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const cards = [
  { id: 1, type: "Visa Debit", last4: "4521", balance: 24560.50, expiry: "08/27", gradient: "from-[#111a4a] to-[#2f55d4]" },
  { id: 2, type: "Mastercard Credit", last4: "8832", balance: 12450.00, expiry: "12/26", gradient: "from-[#167e6c] to-[#2eca8b]" },
];

export default function CardsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Cards</h1>
          <p className="text-muted-foreground">Manage your virtual and physical cards.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90"><Plus className="h-4 w-4 mr-2" /> Request Card</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, i) => (
          <div key={card.id} className="space-y-4">
            {/* Visual Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative overflow-hidden rounded-2xl p-6 text-white shadow-xl bg-gradient-to-br ${card.gradient} h-48 flex flex-col justify-between`}
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
              <div className="relative z-10 flex justify-between items-start">
                <div>
                  <p className="text-sm text-white/80 uppercase tracking-wider">{card.type}</p>
                  <p className="text-xl font-bold mt-1">CreditExcop Bank</p>
                </div>
                <CreditCard className="h-8 w-8 text-white/40" />
              </div>
              <div className="relative z-10">
                <p className="text-2xl font-mono tracking-wider">**** **** **** {card.last4}</p>
                <div className="flex justify-between mt-4">
                  <div>
                    <p className="text-xs text-white/60">Expires</p>
                    <p className="text-sm font-semibold">{card.expiry}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/60">Balance</p>
                    <p className="text-sm font-semibold">${card.balance.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card Actions */}
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="hover:border-primary hover:text-primary"><Snowflake className="h-4 w-4 mr-2" /> Freeze</Button>
              <Button variant="outline" className="hover:border-primary hover:text-primary"><Settings className="h-4 w-4 mr-2" /> Settings</Button>
            </div>
          </div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Card Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Detailed controls for spending limits, online payments, and contactless transactions will appear here when you select a card.</p>
        </CardContent>
      </Card>
    </div>
  );
}