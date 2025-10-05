"use client"
import { Button } from "@/components/ui/button";
import { Menu, Phone } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="px-20 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <span className="text-xl font-bold text-primary-foreground">YB</span>
            </div>
            <span className="text-xl font-bold text-primary">YourBroker</span>
          </a>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#buy" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Buy
            </a>
            <a href="#rent" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Rent
            </a>
            <a href="#sell" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Sell
            </a>
            <a href="#services" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Services
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span>Contact Us</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="hidden sm:inline-flex"
          >
            <Link href="/login">
              Login
            </Link>
          </Button>
          <Button 
            size="sm" 
          >
            <Link href="/signup">
              Sign Up
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;