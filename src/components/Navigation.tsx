import { SidebarTrigger } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";

const Navigation = () => {
  return (
    <nav className="fixed top-6 left-6 z-50">
      <SidebarTrigger className="bg-secondary/90 backdrop-blur-md hover:bg-secondary border border-border/50 rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:scale-105">
        <Menu className="h-5 w-5 text-foreground" />
      </SidebarTrigger>
    </nav>
  );
};

export default Navigation;
