"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft, ArrowUpRight, ArrowDownLeft, Wallet, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

export default function AdminUserDetailsPage() {
  const params = useParams();
  const router = useRouter();
  
  const [profile, setProfile] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const userId = params.id as string;
    if (!userId) return;

    const fetchData = async () => {
      const res = await fetch(`/api/admin/users/${userId}`);
      if (!res.ok) {
        toast.error("User not found.");
        router.push("/admin/users");
        return;
      }
      const data = await res.json();
      setProfile(data.profile);
      setTransactions(data.transactions);
      setLoading(false);
    };

    fetchData();
  }, [params.id, router]);

  const handleAddFunds = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const res = await fetch(`/api/admin/users/${params.id}/add-funds`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: parseFloat(amount), description: desc }),
    });

    if (!res.ok) {
      toast.error("Failed to add funds.");
      setSubmitting(false);
    } else {
      toast.success(`Successfully added $${amount}!`);
      setIsModalOpen(false);
      setAmount("");
      setDesc("");
      setSubmitting(false);
      
      // Refresh data
      const freshRes = await fetch(`/api/admin/users/${params.id}`);
      const freshData = await freshRes.json();
      setProfile(freshData.profile);
      setTransactions(freshData.transactions);
    }
  };

  if (loading || !profile) {
    return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.push("/admin/users")}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Users
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{profile.first_name} {profile.last_name}</h1>
            <p className="text-muted-foreground">{profile.email}</p>
          </div>
        </div>

        {/* Add Funds Button & Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          {/* Removed asChild and <Button>, applied classes directly to DialogTrigger */}
          <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90">
            <Wallet className="h-4 w-4 mr-2" /> Add Funds
          </DialogTrigger>
          <DialogContent>
            {/* ... rest of the modal ... */}
            <DialogHeader>
              <DialogTitle>Credit User Account</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddFunds} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (USD)</Label>
                <Input id="amount" type="number" step="0.01" required value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g. 500.00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="desc">Description (Optional)</Label>
                <Input id="desc" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="e.g. Wire Transfer Deposit" />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={submitting} className="bg-primary hover:bg-primary/90">
                  {submitting ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Processing...</> : "Confirm Deposit"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader><CardTitle className="text-sm text-muted-foreground">Account Number</CardTitle></CardHeader>
          <CardContent><p className="text-xl font-mono">{profile.account_number}</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm text-muted-foreground">Current Balance</CardTitle></CardHeader>
          <CardContent><p className="text-xl font-bold">${profile.balance?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm text-muted-foreground">Status</CardTitle></CardHeader>
          <CardContent>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${profile.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {profile.status}
            </span>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Transaction History</CardTitle></CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <p className="text-center py-10 text-muted-foreground">No transactions found for this user.</p>
          ) : (
            <div className="space-y-2">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === "credit" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                      {tx.type === "credit" ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{tx.description}</p>
                      <p className="text-xs text-muted-foreground">{new Date(tx.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                  <p className={`text-sm font-bold ${tx.type === "credit" ? "text-green-600" : "text-foreground"}`}>
                    {tx.type === "credit" ? "+" : "-"}${tx.amount?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
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