import { useState } from "react";
import { Home, Package, Calendar, BookOpen, Info, Mail, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const menuItems = [
  { name: "Home", href: "#home", icon: Home },
  { name: "Products", href: "#products", icon: Package },
  { name: "Events", href: "#events", icon: Calendar },
  { name: "Blogs", href: "#blogs", icon: BookOpen },
  { name: "About", href: "#about", icon: Info },
  { name: "Contact Us", href: "#contact", icon: Mail },
];

interface CustomSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CustomSidebar({ isOpen, onClose }: CustomSidebarProps) {
  const handleClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-card/95 backdrop-blur-md border-r border-border/50 z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-primary">Para Agri Fresh</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-primary/10"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Menu Items */}
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleClick(item.href)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors text-left group"
              >
                <item.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
