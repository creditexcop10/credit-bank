"use client";
import { motion } from "framer-motion";
import { Users, DollarSign, ArrowLeftRight, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const stats = [
  { title: "Total Users", value: "12,450", change: "+12.5% this month", icon: Users, color: "text-blue-500" },
  { title: "Total Assets", value: "$2.4M", change: "+4.1% this month", icon: DollarSign, color: "text-green-500" },
  { title: "Transactions Today", value: "842", change: "+2.3% from yesterday", icon: ArrowLeftRight, color: "text-purple-500" },
  { title: "Pending KYC", value: "18", change: "Requires Attention", icon: AlertCircle, color: "text-orange-500" },
];

const recentUsers = [
  { name: "Sarah Morris", email: "sarah@example.com", status: "Pending KYC", joined: "Jan 9, 2026" },
  { name: "John Davis", email: "john@example.com", status: "Active", joined: "Jan 9, 2026" },
  { name: "Emily Johnson", email: "emily@example.com", status: "Active", joined: "Jan 8, 2026" },
  { name: "Michael Brown", email: "michael@example.com", status: "Suspended", joined: "Jan 7, 2026" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, here's what's happening at CreditExpo today.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">Export Report</Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div key={stat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Registrations */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Registrations</CardTitle>
          <Button variant="outline" size="sm">View All Users</Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {recentUsers.map((user) => (
              <div key={user.email} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    user.status === "Active" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                    user.status === "Pending KYC" ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400" :
                    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  }`}>
                    {user.status}
                  </span>
                  <p className="text-xs text-muted-foreground hidden md:block">{user.joined}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}