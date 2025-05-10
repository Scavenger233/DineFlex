
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogIn, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { toast } = useToast();

  // Handle scroll events to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Login Successful",
      description: "Welcome back to DineFlex!",
    });
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Registration Successful",
      description: "Welcome to DineFlex! You can now log in.",
    });
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white shadow-md py-2" 
          : "bg-white/80 backdrop-blur-sm py-4"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center group">
          <h1 className="text-dineflex-burgundy text-3xl font-bold transition-transform duration-300 group-hover:scale-105">
            Dine<span className="text-dineflex-gold">Flex</span>
          </h1>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex gap-8">
            <li>
              <Link 
                to="/" 
                className={cn(
                  "font-medium text-dineflex-charcoal hover:text-dineflex-burgundy transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-0.5 after:bg-dineflex-burgundy after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100",
                  location.pathname === '/' && "text-dineflex-burgundy after:scale-x-100"
                )}
              >
                Restaurants
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className={cn(
                  "font-medium text-dineflex-charcoal hover:text-dineflex-burgundy transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-0.5 after:bg-dineflex-burgundy after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100",
                  location.pathname === '/about' && "text-dineflex-burgundy after:scale-x-100"
                )}
              >
                About
              </Link>
            </li>
          </ul>
          
          {/* Auth Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                className="border-dineflex-burgundy text-dineflex-burgundy hover:bg-dineflex-burgundy hover:text-white transition-colors"
              >
                <LogIn className="w-4 h-4 mr-2" />
                <span>Sign In</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-center text-2xl">Account Access</DialogTitle>
                <DialogDescription className="text-center">
                  Sign in or create a new account to make reservations
                </DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="login" className="mt-4">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Sign In</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your@email.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" required />
                    </div>
                    <Button type="submit" className="w-full bg-dineflex-burgundy hover:bg-dineflex-burgundy/90">
                      Sign In
                    </Button>
                  </form>
                </TabsContent>
                <TabsContent value="register">
                  <form onSubmit={handleRegisterSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-name">Full Name</Label>
                      <Input id="register-name" placeholder="John Smith" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <Input id="register-email" type="email" placeholder="your@email.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Password</Label>
                      <Input id="register-password" type="password" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-confirm-password">Confirm Password</Label>
                      <Input id="register-confirm-password" type="password" required />
                    </div>
                    <Button type="submit" className="w-full bg-dineflex-gold hover:bg-dineflex-gold/90 text-dineflex-charcoal">
                      Create Account
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="border-dineflex-burgundy text-dineflex-burgundy hover:bg-dineflex-burgundy hover:text-white transition-colors"
              >
                <User className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-center text-2xl">Account Access</DialogTitle>
                <DialogDescription className="text-center">
                  Sign in or create a new account to make reservations
                </DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="login" className="mt-4">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Sign In</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email-mobile">Email</Label>
                      <Input id="email-mobile" type="email" placeholder="your@email.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password-mobile">Password</Label>
                      <Input id="password-mobile" type="password" required />
                    </div>
                    <Button type="submit" className="w-full bg-dineflex-burgundy hover:bg-dineflex-burgundy/90">
                      Sign In
                    </Button>
                  </form>
                </TabsContent>
                <TabsContent value="register">
                  <form onSubmit={handleRegisterSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-name-mobile">Full Name</Label>
                      <Input id="register-name-mobile" placeholder="John Smith" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email-mobile">Email</Label>
                      <Input id="register-email-mobile" type="email" placeholder="your@email.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password-mobile">Password</Label>
                      <Input id="register-password-mobile" type="password" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-confirm-password-mobile">Confirm Password</Label>
                      <Input id="register-confirm-password-mobile" type="password" required />
                    </div>
                    <Button type="submit" className="w-full bg-dineflex-gold hover:bg-dineflex-gold/90 text-dineflex-charcoal">
                      Create Account
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md absolute top-full left-0 right-0 animate-fade-in">
          <nav className="container mx-auto px-4 py-4">
            <ul className="flex flex-col gap-4">
              <li>
                <Link 
                  to="/" 
                  className={cn(
                    "block py-2 font-medium text-dineflex-charcoal hover:text-dineflex-burgundy transition-colors",
                    location.pathname === '/' && "text-dineflex-burgundy"
                  )}
                >
                  Restaurants
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className={cn(
                    "block py-2 font-medium text-dineflex-charcoal hover:text-dineflex-burgundy transition-colors",
                    location.pathname === '/about' && "text-dineflex-burgundy"
                  )}
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
