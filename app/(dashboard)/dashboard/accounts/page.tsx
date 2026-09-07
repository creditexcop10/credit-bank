"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Wallet, ArrowUpRight, ArrowDownLeft, Plus, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type Profile = {
  account_number: string | null;
  balance: number | null;
  currency: string | null;
};

type Transaction = {
  id: string;
  type: string;
  amount: number;
  description: string | null;
  created_at: string;
};

export default function AccountsPage() {
  const supabase = createSupabaseBrowserClient();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  
  // State for concealing balance
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profileData } = await supabase
        .from("profiles")
        .select("account_number, balance, currency")
        .eq("id", user.id)
        .single();

      setProfile(profileData);

      const { data: txData } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      setTransactions(txData || []);
      setLoading(false);
    };

    fetchData();
  }, [supabase]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const balance = profile?.balance || 0;
  const currency = profile?.currency || "USD";
  
  // Format strings for display/concealing
  const formattedBalance = balance.toLocaleString("en-US", { style: "currency", currency: currency });
  const maskedBalance = "••••••";
  // Show full account number when eye is open, hide it completely when closed
  const formattedAccount = profile?.account_number || "Account number pending";
  const maskedAccount = "••••••••••";

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Accounts</h1>
          <p className="text-muted-foreground">Manage your accounts and view balances.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90"><Plus className="h-4 w-4 mr-2" /> Open New Account</Button>
      </div>

      {/* Account Summary Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="overflow-hidden bg-[#111a4a] text-white border-transparent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-100">Main Account ({currency})</CardTitle>
            <div className="flex items-center gap-2">
              {/* Conceal Toggle Button */}
              <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-100 hover:text-white hover:bg-white/10" onClick={() => setIsHidden(!isHidden)}>
                {isHidden ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              <Wallet className="h-5 w-5 text-blue-100/50" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold transition-all duration-300">
              {isHidden ? maskedBalance : formattedBalance}
            </div>
            <p className="text-xs text-blue-100/70 mt-2 font-mono transition-all duration-300">
              {isHidden ? maskedAccount : formattedAccount}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Detailed Activity Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              <p>No transactions yet.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      tx.type === "credit" ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                    }`}>
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
  );
}