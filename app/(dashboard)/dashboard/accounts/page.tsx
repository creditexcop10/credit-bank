"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Wallet, ArrowUpRight, ArrowDownLeft, Eye, EyeOff, Plus, Loader2, Copy, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

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
  status: string | null;
};

export default function AccountsPage() {
  const supabase = createSupabaseBrowserClient();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [isHidden, setIsHidden] = useState(false);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [depositStep, setDepositStep] = useState(1);
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [submitting, setSubmitting] = useState(false);

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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const handleDepositRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const res = await fetch("/api/deposit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: parseFloat(amount), description: `Ref: ${desc}` }),
    });

    if (!res.ok) {
      toast.error("Failed to request deposit.");
      setSubmitting(false);
    } else {
      toast.success("Deposit submitted! Pending admin approval.");
      setIsModalOpen(false);
      setDepositStep(1);
      setAmount("");
      setDesc("");
      setSubmitting(false);
      
      // Refresh transactions
      const { data: { user } } = await supabase.auth.getUser();
      const { data: txData } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });
      setTransactions(txData || []);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
  }

  const balance = profile?.balance || 0;
  const currency = profile?.currency || "USD";
  const formattedBalance = balance.toLocaleString("en-US", { style: "currency", currency: currency });
  const maskedBalance = "••••••";
  const formattedAccount = profile?.account_number || "Account number pending";
  const maskedAccount = "••••••••••";

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Accounts</h1>
          <p className="text-muted-foreground">Manage your accounts and view balances.</p>
        </div>
        
        {/* Request Deposit Button & Modal */}
        <Dialog open={isModalOpen} onOpenChange={(open) => { setIsModalOpen(open); if(!open) setDepositStep(1); }}>
          <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" /> Deposit Money
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{depositStep === 1 ? "Fund Your Account" : "Confirm Your Transfer"}</DialogTitle>
            </DialogHeader>

            {depositStep === 1 && (
              <div className="space-y-4 py-4">
                <p className="text-sm text-muted-foreground">To fund your CreditExcop account, send a transfer to the bank details below using your external bank (e.g., Chase, Bank of America).</p>
                
                <div className="bg-muted/50 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <div><p className="text-xs text-muted-foreground">Bank Name</p><p className="font-medium">CreditExcop Reserve Bank</p></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div><p className="text-xs text-muted-foreground">Account Name</p><p className="font-medium">CreditExcop Holdings LLC</p></div>
                    <Button size="sm" variant="ghost" onClick={() => copyToClipboard("CreditExcop Holdings LLC")}><Copy className="h-3 w-3" /></Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <div><p className="text-xs text-muted-foreground">Account Number</p><p className="font-mono font-medium">9876543210</p></div>
                    <Button size="sm" variant="ghost" onClick={() => copyToClipboard("9876543210")}><Copy className="h-3 w-3" /></Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <div><p className="text-xs text-muted-foreground">Routing Number</p><p className="font-mono font-medium">021000021</p></div>
                    <Button size="sm" variant="ghost" onClick={() => copyToClipboard("021000021")}><Copy className="h-3 w-3" /></Button>
                  </div>
                </div>

                <DialogFooter>
                  <Button className="w-full bg-primary hover:bg-primary/90" onClick={() => setDepositStep(2)}>
                    I have made the transfer
                  </Button>
                </DialogFooter>
              </div>
            )}

            {depositStep === 2 && (
              <form onSubmit={handleDepositRequest} className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount Transferred (USD)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input id="amount" type="number" step="0.01" required value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g. 500.00" className="pl-8" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="desc">Transfer Reference / Receipt No.</Label>
                  <Input id="desc" required value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="e.g. TXN123456789" />
                  <p className="text-xs text-muted-foreground">Found on your bank receipt. Helps the admin verify your deposit faster.</p>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setDepositStep(1)}>Back</Button>
                  <Button type="submit" disabled={submitting} className="bg-primary hover:bg-primary/90">
                    {submitting ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Submitting...</> : "Submit Request"}
                  </Button>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Account Summary Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="overflow-hidden bg-[#111a4a] text-white border-transparent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-100">Main Account ({currency})</CardTitle>
            <div className="flex items-center gap-2">
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
            <div className="text-center py-10 text-muted-foreground"><p>No transactions yet.</p></div>
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
                  <div className="text-right">
                    <p className={`text-sm font-bold ${tx.type === "credit" ? "text-green-600 dark:text-green-400" : "text-foreground"}`}>
                      {tx.type === "credit" ? "+" : "-"}{tx.amount.toLocaleString("en-US", { style: "currency", currency: currency })}
                    </p>
                    {tx.status === "pending" && (
                      <span className="text-xs font-medium text-orange-500">Pending</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}