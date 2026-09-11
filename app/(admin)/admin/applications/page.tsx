"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, CheckCircle, XCircle, Clock, Filter } from "lucide-react";

export default function AdminApplicationsPage() {
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // 'all', 'loan', 'grant'
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchApps = async (category: string) => {
    setLoading(true);
    const url = category === "all" ? "/api/admin/applications" : `/api/admin/applications?category=${category}`;
    const res = await fetch(url);
    const data = await res.json();
    setApps(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchApps(filter);
  }, [filter]);

  const handleAction = async (id: string, status: string) => {
    setUpdatingId(id);
    const res = await fetch(`/api/admin/applications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (res.ok) {
      toast.success(`Application ${status}!`);
      // Update local state to remove it from pending list
      setApps(apps.map(a => a.id === id ? { ...a, status } : a));
    } else {
      toast.error("Failed to update application.");
    }
    setUpdatingId(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Applications</h1>
          <p className="text-muted-foreground">Review and approve user Loans and Grants.</p>
        </div>
        
        {/* Filter Buttons */}
        <div className="flex gap-2 bg-muted/50 p-1 rounded-lg">
          <Button variant={filter === "all" ? "default" : "ghost"} size="sm" onClick={() => setFilter("all")}>All</Button>
          <Button variant={filter === "loan" ? "default" : "ghost"} size="sm" onClick={() => setFilter("loan")}>Loans</Button>
          <Button variant={filter === "grant" ? "default" : "ghost"} size="sm" onClick={() => setFilter("grant")}>Grants</Button>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle>{filter === "all" ? "All Applications" : filter === "loan" ? "Loan Applications" : "Grant Applications"}</CardTitle></CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-40"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : apps.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              <Filter className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p>No applications found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {apps.map((app) => (
                <motion.div 
                  key={app.id} 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl border border-border hover:bg-muted/50 gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      app.status === "approved" ? "bg-green-100 text-green-600" :
                      app.status === "rejected" ? "bg-red-100 text-red-600" : "bg-orange-100 text-orange-600"
                    }`}>
                      {app.status === "approved" ? <CheckCircle /> : app.status === "rejected" ? <XCircle /> : <Clock />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-foreground">{app.type}</p>
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${app.category === "loan" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}`}>
                          {app.category}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{app.profile?.first_name} {app.profile?.last_name} ({app.profile?.email})</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-lg font-bold text-foreground">${app.amount?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                      <p className="text-xs text-muted-foreground">{new Date(app.created_at).toLocaleDateString()}</p>
                    </div>

                    {/* Action Buttons (only show if pending) */}
                    {app.status === "pending" ? (
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          className="hover:border-red-500 hover:text-red-500"
                          disabled={updatingId === app.id}
                          onClick={() => handleAction(app.id, "rejected")}
                        >
                          {updatingId === app.id ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <XCircle className="h-4 w-4 mr-2" />}
                          Reject
                        </Button>
                        <Button 
                          className="bg-green-600 hover:bg-green-700"
                          disabled={updatingId === app.id}
                          onClick={() => handleAction(app.id, "approved")}
                        >
                          {updatingId === app.id ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <CheckCircle className="h-4 w-4 mr-2" />}
                          Approve
                        </Button>
                      </div>
                    ) : (
                      <span className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${
                        app.status === "approved" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}>
                        {app.status}
                      </span>
                    )}
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