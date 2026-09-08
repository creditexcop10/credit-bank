"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Loader2, CheckCircle, Search, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function TransfersPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  
  // Form states
  const [receiverAccount, setReceiverAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [pin, setPin] = useState("");
  
  // Async states
  const [recipientName, setRecipientName] = useState("");
  const [searchingName, setSearchingName] = useState(false);
  const [loading, setLoading] = useState(false);

  // Lookup recipient name when account number is 10 digits
  const handleAccountLookup = async (value: string) => {
    setReceiverAccount(value);
    setRecipientName(""); // Reset name
    
    if (value.length === 10) {
      setSearchingName(true);
      const res = await fetch("/api/users/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountNumber: value }),
      });
      
      if (res.ok) {
        const data = await res.json();
        setRecipientName(data.name);
      } else {
        setRecipientName("Account not found");
      }
      setSearchingName(false);
    }
  };

  const resetModal = () => {
    setIsModalOpen(false);
    setStep(1);
    setReceiverAccount("");
    setAmount("");
    setDescription("");
    setPin("");
    setRecipientName("");
  };

  const handleFinalTransfer = async () => {
    setLoading(true);

    const res = await fetch("/api/transfer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ receiverAccount, amount, description, pin }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.error || "Transfer failed.");
      setLoading(false);
      resetModal();
    } else {
      // Move to success step
      setStep(3);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Transfers</h1>
          <p className="text-muted-foreground">Send money securely to any CreditExcop member.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsModalOpen(true)}>
          Initiate Transfer <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Quick Send</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center h-64 text-center">
              <ShieldCheck className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground">Secure Transfers</h3>
              <p className="text-muted-foreground mt-2 max-w-sm">
                All transfers are protected by your 4-digit Transaction PIN. Verify the recipient's name before sending.
              </p>
              <Button className="mt-6 bg-primary hover:bg-primary/90" onClick={() => setIsModalOpen(true)}>
                Start New Transfer
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <Card className="bg-[#111a4a] text-white border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Transfer Limits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-blue-100">
              <div>
                <p className="text-sm">Daily Limit</p>
                <p className="text-2xl font-bold text-white">$10,000.00</p>
              </div>
              <div>
                <p className="text-sm">Monthly Limit</p>
                <p className="text-2xl font-bold text-white">$50,000.00</p>
              </div>
              <p className="text-xs mt-4 text-blue-100/80">Transfers between CreditExcop accounts are instant.</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Multi-step Transfer Modal */}
      <Dialog open={isModalOpen} onOpenChange={(open) => { if (!open) resetModal(); }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {step === 1 && "Transfer Details"}
              {step === 2 && "Confirm & Authenticate"}
              {step === 3 && "Transfer Successful"}
            </DialogTitle>
          </DialogHeader>

          {/* Step 1: Details & Lookup */}
          {step === 1 && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="toAccount">Recipient Account Number</Label>
                <div className="relative">
                  <Input 
                    id="toAccount" 
                    placeholder="10-digit account number" 
                    value={receiverAccount}
                    onChange={(e) => handleAccountLookup(e.target.value.replace(/\D/g, ""))}
                    maxLength={10}
                  />
                  {searchingName && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />}
                </div>
                {recipientName && (
                  <div className={`text-sm font-medium flex items-center gap-2 ${recipientName === "Account not found" ? "text-red-500" : "text-green-600"}`}>
                    <Search className="h-3 w-3" /> {recipientName}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount (USD)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input 
                    id="amount" 
                    type="number" 
                    step="0.01" 
                    placeholder="0.00" 
                    className="pl-8"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Input 
                  id="description" 
                  placeholder="e.g. Rent for January" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={resetModal}>Cancel</Button>
                <Button 
                  className="bg-primary hover:bg-primary/90"
                  disabled={!recipientName || recipientName === "Account not found" || !amount || parseFloat(amount) <= 0}
                  onClick={() => setStep(2)}
                >
                  Continue
                </Button>
              </DialogFooter>
            </div>
          )}

          {/* Step 2: Confirm & PIN */}
          {step === 2 && (
            <div className="space-y-6 py-4">
              <div className="bg-muted/50 rounded-xl p-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Sending To:</span> <span className="font-semibold">{recipientName}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Account:</span> <span className="font-mono">{receiverAccount}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Amount:</span> <span className="font-bold text-lg">${parseFloat(amount).toFixed(2)}</span></div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pin">Enter Transaction PIN</Label>
                <Input 
                  id="pin" 
                  type="password" 
                  inputMode="numeric" 
                  maxLength={4} 
                  placeholder="****" 
                  className="text-center tracking-[1em] font-bold"
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                />
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                <Button 
                  className="bg-primary hover:bg-primary/90"
                  disabled={pin.length !== 4 || loading}
                  onClick={handleFinalTransfer}
                >
                  {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Processing...</> : "Confirm Transfer"}
                </Button>
              </DialogFooter>
            </div>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
              <h3 className="text-xl font-bold text-foreground">Transfer Complete!</h3>
              <p className="text-muted-foreground mt-2">You successfully sent ${parseFloat(amount).toFixed(2)} to {recipientName}.</p>
              <Button 
                className="mt-6 bg-primary hover:bg-primary/90"
                onClick={() => {
                  resetModal();
                  router.push("/dashboard/accounts");
                  router.refresh();
                }}
              >
                View Transactions
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}