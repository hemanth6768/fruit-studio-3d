import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary opacity-50" />
      
      {/* Parallax effect on scroll */}
      <div 
        className="container mx-auto px-4 text-center relative z-10 animate-fade-in transition-transform duration-300"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <h1 className="text-8xl md:text-9xl font-black mb-6 text-primary drop-shadow-[0_0_20px_rgba(217,255,0,0.5)] animate-pulse">
          HELLO!
        </h1>
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">
          Freshness Perfected!
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
          Juicy, sweet, and bursting with flavor, fiber, natural sweetness, and a variety of fruits 
          to keep your taste buds dancing. Welcome to the world of farm-fresh goodness, 
          where every bite is a delight.
        </p>
        
        <Button 
          onClick={scrollToProducts}
          size="lg" 
          className="rounded-full group"
        >
          Explore Fruits
          <ChevronDown className="ml-2 h-5 w-5 animate-bounce" />
        </Button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown className="h-8 w-8 text-primary" />
      </div>
    </section>
  );
};

export default Hero;
