"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight } from "lucide-react";

export default function TransfersPage() {
  const [loading, setLoading] = useState(false);

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // We will wire this up to Supabase later
    setTimeout(() => {
      setLoading(false);
      alert("Transfer logic coming next!");
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Transfers</h1>
        <p className="text-muted-foreground">Send money securely to any account.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Transfer Form */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Send Money</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTransfer} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fromAccount">From Account</Label>
                    <Select>
                      <SelectTrigger id="fromAccount"><SelectValue placeholder="Select Account" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="main">Main Account ($24,560.50)</SelectItem>
                        <SelectItem value="savings">Savings Account ($12,450.00)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="toAccount">Recipient Account Number</Label>
                    <Input id="toAccount" placeholder="e.g. 0123456789" required />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input id="amount" type="number" placeholder="0.00" required prefix="$" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pin">Transaction PIN</Label>
                    <Input id="pin" type="password" maxLength={4} placeholder="****" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Input id="description" placeholder="e.g. Rent for January" />
                </div>

                <Button type="submit" disabled={loading} className="w-full h-12 bg-primary hover:bg-primary/90 text-base">
                  {loading ? "Processing..." : <>Transfer Funds <ArrowRight className="h-4 w-4 ml-2" /></>}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Transfer Limits/Info */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          {/* Changed from bg-primary to bg-[#111a4a] so it stays Navy Blue in dark mode */}
          <Card className="bg-[#111a4a] text-white border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Transfer Limits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-blue-100">
              <div>
                <p className="text-sm">Daily Limit</p>
                <p className="text-2xl font-bold text-white">$10,000.00</p>
              </div>
              <div>
                <p className="text-sm">Monthly Limit</p>
                <p className="text-2xl font-bold text-white">$50,000.00</p>
              </div>
              <p className="text-xs mt-4 text-blue-100/80">Transfers between your own accounts are instant and unlimited.</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}