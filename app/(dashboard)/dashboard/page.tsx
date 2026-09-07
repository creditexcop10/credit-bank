"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownLeft, CreditCard, Plus, Send, Download, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const accounts = [
  { name: "Main Account (USD)", balance: 24560.50, number: "**** **** **** 4521", color: "from-[#111a4a] to-[#2f55d4]" },
  { name: "Savings Account (EUR)", balance: 12450.00, number: "**** **** **** 8832", color: "from-[#167e6c] to-[#2eca8b]" },
];

const transactions = [
  { id: 1, name: "Apple Store", date: "Jan 9, 2026", amount: -129.00, type: "Debit" },
  { id: 2, name: "Salary Deposit", date: "Jan 1, 2026", amount: 4500.00, type: "Credit" },
  { id: 3, name: "Netflix Subscription", date: "Dec 28, 2025", amount: -15.99, type: "Debit" },
  { id: 4, name: "Transfer to John", date: "Dec 25, 2025", amount: -200.00, type: "Debit" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, here's your financial overview.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Download className="h-4 w-4 mr-2" /> Statement</Button>
          <Button className="bg-primary hover:bg-primary/90"><Plus className="h-4 w-4 mr-2" /> Add Account</Button>
        </div>
      </div>

      {/* Account Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {accounts.map((account, i) => (
          <motion.div
            key={account.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className={`relative overflow-hidden rounded-2xl p-6 text-white shadow-xl bg-gradient-to-br ${account.color}`}>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <p className="text-sm text-white/80 uppercase tracking-wider">{account.name}</p>
                    <p className="text-xs text-white/60 mt-1">{account.number}</p>
                  </div>
                  <CreditCard className="h-8 w-8 text-white/40" />
                </div>
                <p className="text-3xl font-bold">
                  {account.balance.toLocaleString("en-US", { style: "currency", currency: account.name.includes("USD") ? "USD" : "EUR" })}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-24 flex-col gap-2 hover:border-primary hover:text-primary">
              <Send className="h-6 w-6" /> Send Money
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-2 hover:border-primary hover:text-primary">
              <ArrowDownLeft className="h-6 w-6" /> Request
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-2 hover:border-primary hover:text-primary">
              <CreditCard className="h-6 w-6" /> Pay Bills
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-2 hover:border-primary hover:text-primary">
              <Plus className="h-6 w-6" /> Top Up
            </Button>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Transactions</CardTitle>
            <Button variant="ghost" size="sm" className="text-muted-foreground">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.amount > 0 ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"}`}>
                      {tx.amount > 0 ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{tx.name}</p>
                      <p className="text-xs text-muted-foreground">{tx.date}</p>
                    </div>
                  </div>
                  <p className={`text-sm font-bold ${tx.amount > 0 ? "text-green-600 dark:text-green-400" : "text-foreground"}`}>
                    {tx.amount > 0 ? "+" : ""}{tx.amount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}