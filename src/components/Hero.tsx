import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Suspense, lazy } from "react";

const HeroFruitCanvas = lazy(() => import("./HeroFruitCanvas"));

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
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/40 to-background opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_hsl(75_100%_65%_/_0.1),_transparent_50%)]" />
      
      {/* Parallax effect on scroll */}
      <div 
        className="container mx-auto px-4 relative z-10 animate-fade-in transition-transform duration-300"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <div className="mb-6 flex items-center justify-center gap-4 lg:gap-8">
          {/* Left Fruit */}
          <div 
            className="w-[250px] h-[350px] lg:w-[300px] lg:h-[400px] hidden md:block"
            style={{ 
              transform: `perspective(1000px) rotateY(${scrollY * 0.1}deg) rotateX(${-20 + scrollY * 0.05}deg)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <Suspense fallback={null}>
              <HeroFruitCanvas side="left" />
            </Suspense>
          </div>

          {/* Title Stack */}
          <div className="text-center">
            <h1 className="text-6xl md:text-7xl lg:text-9xl font-display font-black bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(217,255,0,0.6)] leading-tight">
              <div className="mb-2">PRA</div>
              <div className="mb-2">AGRI</div>
              <div>FRESH</div>
            </h1>
            <div className="h-2 w-48 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent rounded-full mt-6" />
          </div>

          {/* Right Fruit */}
          <div 
            className="w-[250px] h-[350px] lg:w-[300px] lg:h-[400px] hidden md:block"
            style={{ 
              transform: `perspective(1000px) rotateY(${-scrollY * 0.1}deg) rotateX(${-20 + scrollY * 0.05}deg)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <Suspense fallback={null}>
              <HeroFruitCanvas side="right" />
            </Suspense>
          </div>
        </div>
        
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground font-display tracking-tight">
          Nature's Perfection, <span className="text-primary">Delivered Fresh</span>
        </h2>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-10 font-light">
          Indulge in <span className="text-primary font-semibold">premium quality</span> fruits that are juicy, sweet, and bursting with flavor. 
          Every piece is carefully selected to bring you the <span className="text-accent font-semibold">finest farm-fresh goodness</span>. 
          Experience nature's candy at its absolute best.
        </p>
        
        <Button 
          onClick={scrollToProducts}
          size="lg" 
          className="rounded-full group shadow-[0_0_30px_rgba(217,255,0,0.3)] hover:shadow-[0_0_40px_rgba(217,255,0,0.5)] transition-all duration-300 text-base font-semibold px-10 py-6 h-auto"
        >
          Explore Our Collection
          <ChevronDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
        </Button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown className="h-8 w-8 text-primary drop-shadow-[0_0_10px_rgba(217,255,0,0.8)]" />
      </div>
    </section>
  );
};

export default Hero;
