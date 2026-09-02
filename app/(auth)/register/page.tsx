"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, type Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { currencies } from "@/lib/currencies"; // We'll create this file below

const registerSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  pin: z.string().min(4, "PIN must be 4 digits").max(4, "PIN must be 4 digits"),
  currency: z.string().min(3, "Please select a currency"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          first_name: values.firstName,
          last_name: values.lastName,
          phone: values.phone,
          pin: values.pin,
          currency: values.currency,
        }
      }
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
    } else {
      toast.success("Account created! Please check your email to verify.");
      router.push("/login");
    }
  };

  return (
    <motion.div 
      className="w-full max-w-xl"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="lg:hidden text-center mb-6">
        <Image src="/logo-light.png" alt="CreditExpo" width={120} height={32} className="h-10 w-auto mx-auto dark:hidden" priority />
        <Image src="/logo-dark.png" alt="CreditExpo" width={120} height={32} className="hidden h-10 w-auto mx-auto dark:block" priority />
        <h1 className="text-xl font-bold text-foreground mt-4">Create Account</h1>
      </div>

      <div className="bg-card rounded-2xl shadow-xl border border-border overflow-hidden">
        <div className="px-6 py-5 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">Open an Account</h2>
          <p className="text-sm text-muted-foreground">Join CreditExpo today</p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className="block text-xs font-semibold mb-1">First Name</Label>
              <Input id="firstName" placeholder="John" {...register("firstName")} />
              {errors.firstName && <p className="text-xs text-destructive mt-1">{errors.firstName.message}</p>}
            </div>
            <div>
              <Label htmlFor="lastName" className="block text-xs font-semibold mb-1">Last Name</Label>
              <Input id="lastName" placeholder="Doe" {...register("lastName")} />
              {errors.lastName && <p className="text-xs text-destructive mt-1">{errors.lastName.message}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="email" className="block text-xs font-semibold mb-1">Email Address</Label>
            <Input id="email" type="email" placeholder="john@example.com" {...register("email")} />
            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <Label htmlFor="phone" className="block text-xs font-semibold mb-1">Phone Number</Label>
            <Input id="phone" type="tel" placeholder="+1 (555) 555-5555" {...register("phone")} />
            {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="password" className="block text-xs font-semibold mb-1">Password</Label>
              <Input id="password" type="password" placeholder="******" {...register("password")} />
              {errors.password && <p className="text-xs text-destructive mt-1">{errors.password.message}</p>}
            </div>
            <div>
              <Label htmlFor="confirmPassword" className="block text-xs font-semibold mb-1">Confirm Password</Label>
              <Input id="confirmPassword" type="password" placeholder="******" {...register("confirmPassword")} />
              {errors.confirmPassword && <p className="text-xs text-destructive mt-1">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="pin" className="block text-xs font-semibold mb-1">Transaction PIN (4 digits)</Label>
            <Input id="pin" type="number" maxLength={4} placeholder="1234" {...register("pin")} />
            {errors.pin && <p className="text-xs text-destructive mt-1">{errors.pin.message}</p>}
          </div>

          <div>
            <Label htmlFor="currency" className="block text-xs font-semibold mb-1">Account Currency</Label>
            <select id="currency" {...register("currency")} className="w-full px-4 py-3 rounded-xl bg-background border border-input text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary transition">
              <option value="">Select Currency</option>
              {currencies.map((curr) => (
                <option key={curr.code} value={curr.code}>{curr.code} - {curr.name}</option>
              ))}
            </select>
            {errors.currency && <p className="text-xs text-destructive mt-1">{errors.currency.message}</p>}
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90">
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        <div className="px-6 pb-6 text-center text-xs text-muted-foreground">
          Already have an account? <a href="/login" className="text-primary font-semibold hover:underline">Sign In</a>
        </div>
      </div>
    </motion.div>
  );
}