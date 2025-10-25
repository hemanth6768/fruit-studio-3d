import { Home, Package, Calendar, BookOpen, Info, Mail } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { name: "Home", href: "#home", icon: Home },
  { name: "Products", href: "#products", icon: Package },
  { name: "Events", href: "#events", icon: Calendar },
  { name: "Blogs", href: "#blogs", icon: BookOpen },
  { name: "About", href: "#about", icon: Info },
  { name: "Contact Us", href: "#contact", icon: Mail },
];

export function AppSidebar() {
  const { open } = useSidebar();

  const handleClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Sidebar className="border-r border-border/50 bg-background/95 backdrop-blur-md">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary text-lg font-bold mb-2">
            Para Agri Fresh
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    onClick={() => handleClick(item.href)}
                    className="hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                  >
                    <item.icon className="h-4 w-4" />
                    {open && <span>{item.name}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
