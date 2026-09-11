"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Loader2, Plus, CheckCircle, Clock, XCircle } from "lucide-react";

export default function LoansPage() {
  const supabase = createSupabaseBrowserClient();
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loanType, setLoanType] = useState("");
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchApps = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return; 
      
      const { data } = await supabase
        .from("applications")
        .select("*")
        .eq("user_id", user.id)
        .eq("category", "loan")
        .order("created_at", { ascending: false });
      setApplications(data || []);
      setLoading(false);
    };
    fetchApps();
  }, [supabase]);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const res = await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category: "loan", type: loanType, amount }),
    });

    if (res.ok) {
      toast.success("Loan application submitted!");
      setIsModalOpen(false);
      setLoanType(""); 
      setAmount("");
      
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("applications")
          .select("*")
          .eq("user_id", user.id)
          .eq("category", "loan")
          .order("created_at", { ascending: false });
        setApplications(data || []);
      }
    } else {
      toast.error("Failed to submit application.");
    }
    setSubmitting(false);
  };

  if (loading) return <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Loans & Credit</h1>
          <p className="text-muted-foreground">Manage your loans and apply for new financing.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" /> Apply for Loan
        </Button>
      </div>

      <Card>
        <CardHeader><CardTitle>My Loan Applications</CardTitle></CardHeader>
        <CardContent>
          {applications.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground"><p>You have no loan applications yet.</p></div>
          ) : (
            <div className="space-y-4">
              {applications.map((app) => (
                <div key={app.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl border border-border gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      app.status === "approved" ? "bg-green-100 text-green-600" :
                      app.status === "rejected" ? "bg-red-100 text-red-600" : "bg-orange-100 text-orange-600"
                    }`}>
                      {app.status === "approved" ? <CheckCircle /> : app.status === "rejected" ? <XCircle /> : <Clock />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">{app.type}</p>
                      <p className="text-xs text-muted-foreground">Requested: ${app.amount?.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${
                      app.status === "approved" ? "bg-green-100 text-green-700" :
                      app.status === "rejected" ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"
                    }`}>{app.status}</span>
                    <p className="text-xs text-muted-foreground mt-1">{new Date(app.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Apply for a Loan</DialogTitle></DialogHeader>
          <form onSubmit={handleApply} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="loanType">Loan Type</Label>
              {/* Replaced shadcn Select with a styled native select to fix TS issues */}
              <select 
                id="loanType"
                value={loanType} 
                onChange={(e) => setLoanType(e.target.value)} 
                required
                className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary"
              >
                <option value="" disabled>Select loan type</option>
                <option value="Home Loan">Home Loan</option>
                <option value="Auto Loan">Auto Loan</option>
                <option value="Personal Loan">Personal Loan</option>
                <option value="Business Loan">Business Loan</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount Requested ($)</Label>
              <Input id="amount" type="number" required value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g. 25000" />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={submitting} className="bg-primary hover:bg-primary/90">
                {submitting ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Submitting...</> : "Submit Application"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}