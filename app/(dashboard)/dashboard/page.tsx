"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownLeft, CreditCard, Plus, Send, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function DashboardPage() {
  const supabase = createSupabaseBrowserClient();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profileData } = await supabase
        .from("profiles")
        .select("balance, currency, account_number")
        .eq("id", user.id)
        .single();
      
      setProfile(profileData);

      const { data: txData } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(4);

      setTransactions(txData || []);
      setLoading(false);
    };
    fetchData();
  }, [supabase]);

  if (loading || !profile) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  const balance = profile.balance || 0;
  const currency = profile.currency || "USD";

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, here's your financial overview.</p>
        </div>
        <div className="flex gap-2">
          <a href="/api/statement" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground">
            <Download className="h-4 w-4 mr-2" /> Statement
          </a>
          <Link href="/dashboard/accounts"><Button className="bg-primary hover:bg-primary/90"><Plus className="h-4 w-4 mr-2" /> Add Money</Button></Link>
        </div>
      </div>

      {/* Account Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="relative overflow-hidden rounded-2xl p-6 text-white shadow-xl bg-gradient-to-br from-[#111a4a] to-[#2f55d4]">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-sm text-white/80 uppercase tracking-wider">Main Account ({currency})</p>
                <p className="text-xs text-white/60 mt-1 font-mono">**** **** **** {profile.account_number?.slice(-4)}</p>
              </div>
              <CreditCard className="h-8 w-8 text-white/40" />
            </div>
            <p className="text-4xl font-bold">
              {balance.toLocaleString("en-US", { style: "currency", currency: currency })}
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Link href="/dashboard/transfers">
              <Button variant="outline" className="h-24 w-full flex-col gap-2 hover:border-primary hover:text-primary">
                <Send className="h-6 w-6" /> Send Money
              </Button>
            </Link>
            <Link href="/dashboard/accounts">
              <Button variant="outline" className="h-24 w-full flex-col gap-2 hover:border-primary hover:text-primary">
                <ArrowDownLeft className="h-6 w-6" /> Deposit
              </Button>
            </Link>
            <Link href="/dashboard/cards">
              <Button variant="outline" className="h-24 w-full flex-col gap-2 hover:border-primary hover:text-primary">
                <CreditCard className="h-6 w-6" /> Cards
              </Button>
            </Link>
            <Link href="/dashboard/transfers">
              <Button variant="outline" className="h-24 w-full flex-col gap-2 hover:border-primary hover:text-primary">
                <Plus className="h-6 w-6" /> Request
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Transactions</CardTitle>
            <Link href="/dashboard/accounts"><Button variant="ghost" size="sm" className="text-muted-foreground">View All</Button></Link>
          </CardHeader>
          <CardContent>
            {transactions.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground"><p>No transactions yet.</p></div>
            ) : (
              <div className="space-y-2">
                {transactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === "credit" ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"}`}>
                        {tx.type === "credit" ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{tx.description}</p>
                        <p className="text-xs text-muted-foreground">{new Date(tx.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <p className={`text-sm font-bold ${tx.type === "credit" ? "text-green-600 dark:text-green-400" : "text-foreground"}`}>
                      {tx.type === "credit" ? "+" : "-"}{tx.amount.toLocaleString("en-US", { style: "currency", currency: currency })}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}