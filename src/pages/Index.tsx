import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import FruitShowcase from "@/components/FruitShowcase";
import HealthBenefits from "@/components/HealthBenefits";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="bg-background min-h-screen">
      <Navigation />
      <Hero />
      <FruitShowcase />
      <HealthBenefits />
      <Contact />
      
      <footer className="py-8 text-center text-muted-foreground border-t border-border">
        <p>&copy; 2025 Fresh Fruits. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
