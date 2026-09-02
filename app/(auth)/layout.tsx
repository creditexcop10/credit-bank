import { AuthBranding } from "@/components/shared/auth-branding";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-background">
      <AuthBranding title="Welcome to CreditExpo" subtitle="Modern Banking Platform" description="Swift and secure money transfers worldwide. Experience banking reimagined with cutting-edge technology." />
      <div className="w-full lg:w-1/2 flex justify-center items-center p-4 lg:p-8">
        {children}
      </div>
    </div>
  );
}