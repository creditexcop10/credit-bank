"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, DollarSign, ArrowLeftRight, AlertCircle, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      setStats(data);
      setLoading(false);
    };
    fetchStats();
  }, []);

  if (loading || !stats) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  const statCards = [
    { title: "Total Users", value: stats.totalUsers, change: "Active members", icon: Users, color: "text-blue-500" },
    { title: "Total Assets", value: `$${stats.totalAssets?.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, change: "Bank liquidity", icon: DollarSign, color: "text-green-500" },
    { title: "Transactions Today", value: stats.txToday, change: "Processed today", icon: ArrowLeftRight, color: "text-purple-500" },
    { title: "Pending Approvals", value: stats.pendingDeposits, change: "Requires Attention", icon: AlertCircle, color: "text-orange-500", link: "/admin/deposits" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, here's what's happening at CreditExcop today.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">Export Report</Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, i) => (
          <motion.div key={stat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }}>
            <Card className={stat.link ? "hover:border-primary cursor-pointer transition-colors" : ""}>
              <Link href={stat.link || "#"}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                </CardContent>
              </Link>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}