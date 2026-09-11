"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CreditCard, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

export default function AdminCardsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchRequests = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/cards");
    const data = await res.json();
    setRequests(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchRequests(); }, []);

  const handleAction = async (reqId: string, action: string) => {
    setUpdatingId(reqId);
    const res = await fetch(`/api/admin/cards/${reqId}/approve`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });

    if (res.ok) {
      toast.success(`Card request ${action}!`);
      setRequests(requests.filter(r => r.id !== reqId));
    } else {
      toast.error("Failed to update request.");
    }
    setUpdatingId(null);
  };

  if (loading) return <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Card Approvals</h1>
        <p className="text-muted-foreground">Review and approve user requests for new virtual cards.</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Pending Card Requests</CardTitle></CardHeader>
        <CardContent>
          {requests.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p>No pending card requests. You're all caught up!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {requests.map((req) => (
                <div key={req.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl border border-border hover:bg-muted/50 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <CreditCard className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">{req.profile?.first_name} {req.profile?.last_name}</p>
                      <p className="text-xs text-muted-foreground">{req.profile?.email}</p>
                      <p className="text-xs text-muted-foreground mt-1">Requested on: {new Date(req.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      className="hover:border-red-500 hover:text-red-500"
                      disabled={updatingId === req.id}
                      onClick={() => handleAction(req.id, "rejected")}
                    >
                      {updatingId === req.id ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <XCircle className="h-4 w-4 mr-2" />}
                      Reject
                    </Button>
                    <Button 
                      className="bg-green-600 hover:bg-green-700"
                      disabled={updatingId === req.id}
                      onClick={() => handleAction(req.id, "approved")}
                    >
                      {updatingId === req.id ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <CheckCircle className="h-4 w-4 mr-2" />}
                      Approve & Generate
                    </Button>
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