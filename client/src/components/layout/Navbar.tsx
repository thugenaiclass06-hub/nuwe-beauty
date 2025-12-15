import { useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "首頁", href: "/" },
    { name: "品牌理念", href: "/brand-story" },
    { name: "精選商品", href: "/products" },
    { name: "聯絡我們", href: "/contact" },
  ];

  const handleNavClick = (href: string) => {
    setLocation(href);
    setIsOpen(false);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.href)}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              data-testid={`link-nav-${link.href.replace('/', '') || 'home'}`}
            >
              {link.name}
            </button>
          ))}
          <Button 
            variant="default" 
            size="sm" 
            className="rounded-full px-6"
            onClick={() => handleNavClick("/products")}
            data-testid="button-nav-buy"
          >
            立即購買
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          data-testid="button-mobile-menu"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-t border-border p-6 flex flex-col gap-4 shadow-lg md:hidden animate-in slide-in-from-top-5">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.href)}
              className="text-left text-base font-medium text-foreground/80 py-2"
              data-testid={`link-mobile-${link.href.replace('/', '') || 'home'}`}
            >
              {link.name}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
