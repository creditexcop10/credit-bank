"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, KeyRound, Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setLoading(false);
    if (res.ok) {
      toast.success("If an account exists, a reset code has been sent.");
      setStep(2);
    } else {
      toast.error("Something went wrong.");
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code, newPassword }),
    });
    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      toast.success("Password reset successfully! Please log in.");
      router.push("/login");
    } else {
      toast.error(data.error || "Failed to reset password.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Image src="/logo-dark.png" alt="CreditExpo" width={140} height={40} className="h-10 w-auto" priority />
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
          {step === 1 && (
            <form onSubmit={handleSendCode} className="space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-white">Forgot Password</h1>
                <p className="text-sm text-slate-400 mt-2">Enter your email to receive a reset code.</p>
              </div>
              <div>
                <Label htmlFor="email" className="text-slate-300">Email Address</Label>
                <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" className="mt-1 bg-slate-900 border-slate-600 text-white" />
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90">
                {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Sending...</> : "Send Reset Code"}
              </Button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleResetPassword} className="space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-white">Reset Password</h1>
                <p className="text-sm text-slate-400 mt-2">Enter the 6-digit code and your new password.</p>
              </div>
              <div>
                <Label htmlFor="code" className="text-slate-300">6-Digit Code</Label>
                <Input id="code" type="text" inputMode="numeric" maxLength={6} required value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))} placeholder="000000" className="mt-1 text-center text-2xl tracking-[0.5em] font-bold bg-slate-900 border-slate-600 text-white" />
              </div>
              <div>
                <Label htmlFor="newPassword" className="text-slate-300">New Password</Label>
                <Input id="newPassword" type="password" required minLength={6} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="******" className="mt-1 bg-slate-900 border-slate-600 text-white" />
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90">
                {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Resetting...</> : "Reset Password"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}