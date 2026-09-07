"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2, ShieldCheck } from "lucide-react";

export default function VerifyPage() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("verification_email");
    const storedPassword = sessionStorage.getItem("verification_password");
    
    if (!storedEmail || !storedPassword) {
      router.push("/register");
    } else {
      setEmail(storedEmail);
      setPassword(storedPassword);
    }
  }, [router]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (code.length !== 6) {
      toast.error("Please enter the 6-digit code.");
      return;
    }

    setLoading(true);

    const verifyRes = await fetch("/api/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    });

    if (!verifyRes.ok) {
      const data = await verifyRes.json();
      toast.error(data.error || "Invalid or expired code.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error("Verification successful, but login failed. Please try logging in manually.");
      router.push("/login");
    } else {
      sessionStorage.removeItem("verification_email");
      sessionStorage.removeItem("verification_password");
      toast.success("Account verified! Welcome to CreditExcop.");
      router.refresh();
      router.push("/dashboard");
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        throw new Error("Failed to resend");
      }

      toast.success("A new 6-digit code has been sent to your email.");
    } catch (error) {
      toast.error("Failed to resend code. Please try again.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Image 
            src="/logo2.png" 
            alt="CreditExcop" 
            width={140} 
            height={40} 
            className="h-10 w-auto" 
            priority 
          />
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <ShieldCheck className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-white">Verify Your Account</h1>
            <p className="text-sm text-slate-400 mt-2 max-w-xs">
              Please confirm you are not a robot by entering the 6-digit code we sent to <span className="font-semibold text-white">{email}</span>.
            </p>
          </div>

          <form onSubmit={handleVerify} className="space-y-6">
            <div>
              <label htmlFor="code" className="block text-xs font-semibold text-slate-300 mb-2 text-center">
                Enter 6-Digit Code
              </label>
              <Input
                id="code"
                type="text"
                inputMode="numeric"
                maxLength={6}
                required
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                placeholder="000000"
                className="text-center text-2xl tracking-[0.5em] font-bold bg-slate-900 border-slate-600 text-white placeholder:text-slate-600 placeholder:tracking-[0.2em]"
              />
            </div>

            <Button 
              type="submit" 
              disabled={loading} 
              className="w-full h-12 bg-primary hover:bg-primary/90 text-base font-semibold"
            >
              {loading ? <><Loader2 className="h-5 w-5 mr-2 animate-spin" /> Verifying...</> : "Verify Code"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-400">
            Didn&apos;t get a code?{" "}
            <button 
              onClick={handleResend} 
              disabled={resending}
              className="font-semibold text-primary hover:underline disabled:opacity-50"
            >
              {resending ? "Sending..." : "Resend Code"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}