import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomSidebar } from "./CustomSidebar";

const Navigation = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-6 left-6 z-50">
        <Button
          variant="secondary"
          size="icon"
          onClick={() => setSidebarOpen(true)}
          className="bg-secondary/90 backdrop-blur-md hover:bg-secondary border border-border/50 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </nav>
      
      <CustomSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

export default Navigation;
