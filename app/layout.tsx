import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner"; // <-- Import Toaster

export const metadata: Metadata = {
  title: "CreditExcop Bank",
  description: "Modern online banking reimagined.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-full flex flex-col bg-background text-foreground antialiased font-sans")} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors position="top-right" /> {/* <-- Add Toaster here */}
        </ThemeProvider>
      </body>
    </html>
  );
}