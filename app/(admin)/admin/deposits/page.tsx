"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, CheckCircle, Clock } from "lucide-react";

export default function AdminDepositsPage() {
  const [deposits, setDeposits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [approvingId, setApprovingId] = useState<string | null>(null);

  const fetchDeposits = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/deposits");
    const data = await res.json();
    
    if (res.ok) {
      setDeposits(data || []);
    } else {
      toast.error(data.error || "Failed to load deposits.");
      setDeposits([]); // Ensure it's always an array
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDeposits();
  }, []);

  const handleApprove = async (id: string) => {
    setApprovingId(id);
    const res = await fetch(`/api/admin/deposits/${id}/approve`, { method: "POST" });
    
    if (res.ok) {
      toast.success("Deposit approved and balance updated!");
      // Remove from list
      setDeposits(deposits.filter(d => d.id !== id));
    } else {
      toast.error("Failed to approve deposit.");
    }
    setApprovingId(null);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Pending Deposits</h1>
        <p className="text-muted-foreground">Review and approve user deposit requests.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Awaiting Approval</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : deposits.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
              <p>No pending deposits. You&apos;re all caught up!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {deposits.map((deposit) => (
                <motion.div 
                  key={deposit.id} 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl border border-border hover:bg-muted/50 gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">
                        {deposit.profile?.first_name} {deposit.profile?.last_name}
                      </p>
                      <p className="text-xs text-muted-foreground">{deposit.profile?.email}</p>
                      <p className="text-xs text-muted-foreground mt-1">{deposit.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-lg font-bold text-foreground">
                        ${deposit.amount?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </p>
                      <p className="text-xs text-muted-foreground">{new Date(deposit.created_at).toLocaleString()}</p>
                    </div>
                    <Button 
                      className="bg-green-600 hover:bg-green-700"
                      disabled={approvingId === deposit.id}
                      onClick={() => handleApprove(deposit.id)}
                    >
                      {approvingId === deposit.id ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <CheckCircle className="h-4 w-4 mr-2" />}
                      Approve
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}