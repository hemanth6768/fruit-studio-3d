import { Button } from "@/components/ui/button";

const Navigation = () => {
  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Products", href: "#products" },
    { name: "Events", href: "#events" },
    { name: "Blogs", href: "#blogs" },
    { name: "About", href: "#about" },
    { name: "Contact Us", href: "#contact" },
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-secondary/80 backdrop-blur-md rounded-full px-4 py-2 border border-border">
      <ul className="flex items-center gap-2">
        {navItems.map((item, index) => (
          <li key={item.name}>
            <Button
              variant={index === 0 ? "default" : "ghost"}
              size="sm"
              className={index === 0 ? "rounded-full" : "rounded-full text-foreground hover:text-primary"}
              asChild
            >
              <a href={item.href}>{item.name}</a>
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
