import Navigation from "@/components/Navigation";
import ScrollOrbitHero from "@/components/ScrollOrbitHero";
import FruitShowcase from "@/components/FruitShowcase";
import HealthBenefits from "@/components/HealthBenefits";
import Contact from "@/components/Contact";
import FallingFruits from "@/components/FallingFruits";
import ScrollFruits from "@/components/ScrollFruits";
import { Suspense } from "react";

const Index = () => {
  return (
    <div className="bg-background min-h-screen relative">
      {/* 3D Falling Fruits Background */}
      <Suspense fallback={null}>
        <FallingFruits />
      </Suspense>
      
      {/* 2D Emoji Fruits (scroll-reactive) */}
      <ScrollFruits />
      
      {/* Main Content */}
      <div className="relative z-10">
        <Navigation />
        <ScrollOrbitHero />
        <FruitShowcase />
        <HealthBenefits />
        <Contact />
        
        <footer className="py-8 text-center text-muted-foreground border-t border-border backdrop-blur-sm bg-background/80">
          <p>&copy; 2025 Fresh Fruits. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
