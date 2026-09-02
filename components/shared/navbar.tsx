"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Moon, Sun, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const services = [
  { name: "Personal Banking", href: "/services/personal", desc: "Everyday checking and savings" },
  { name: "Business Banking", href: "/services/business", desc: "Solutions for your business" },
  { name: "Loans & Credit", href: "/services/loans", desc: "Personal, auto, and home loans" },
  { name: "Cards", href: "/services/cards", desc: "Credit and debit cards" },
  { name: "Grants & Aid", href: "/services/grants", desc: "Community support and aid" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="CreditExpo" width={120} height={32} className="h-8 w-auto dark:hidden" priority />
          <Image src="/logo2.png" alt="CreditExpo" width={120} height={32} className="hidden h-8 w-auto dark:block" priority />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              {link.name}
            </Link>
          ))}
          
          {/* Services Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus:outline-none">
              Services <ChevronDown className="ml-1 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-64">
              {services.map((service) => (
                <DropdownMenuItem key={service.name} className="p-0">
                  <Link href={service.href} className="flex flex-col gap-1 w-full h-full p-3 cursor-pointer">
                    <span className="text-sm font-semibold text-foreground">{service.name}</span>
                    <span className="text-xs text-muted-foreground">{service.desc}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            <Sun className="h-5 w-5 dark:hidden" />
            <Moon className="hidden h-5 w-5 dark:block" />
          </Button>
          <Link href="/login"><Button variant="ghost">Login</Button></Link>
          <Link href="/register"><Button className="bg-primary hover:bg-primary/90">Open Account</Button></Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            <Sun className="h-5 w-5 dark:hidden" />
            <Moon className="hidden h-5 w-5 dark:block" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border/40 bg-background">
          <nav className="container mx-auto flex flex-col gap-4 px-4 py-6">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground">
                {link.name}
              </Link>
            ))}
            <div className="py-2 border-y border-border/40">
              <p className="text-xs font-bold uppercase text-muted-foreground mb-2">Services</p>
              {services.map((service) => (
                <Link key={service.name} href={service.href} onClick={() => setIsOpen(false)} className="block py-2 text-base font-medium text-muted-foreground hover:text-foreground">
                  {service.name}
                </Link>
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-3">
              <Link href="/login" onClick={() => setIsOpen(false)}><Button variant="outline" className="w-full">Login</Button></Link>
              <Link href="/register" onClick={() => setIsOpen(false)}><Button className="w-full bg-primary hover:bg-primary/90">Open Account</Button></Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}