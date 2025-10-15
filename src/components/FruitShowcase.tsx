import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FruitCanvas from "./FruitCanvas";

const fruits = [
  {
    name: "Pomegranate",
    model: "pomegranate",
    description: "Rich in antioxidants and bursting with flavor",
    color: "from-red-500/20 to-pink-500/20"
  },
  {
    name: "Pear",
    model: "pear",
    description: "Sweet, juicy, and packed with fiber",
    color: "from-green-500/20 to-yellow-500/20"
  },
  {
    name: "Lychee",
    model: "lychee",
    description: "Exotic tropical delight with unique taste",
    color: "from-pink-500/20 to-purple-500/20"
  }
];

const FruitShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? fruits.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === fruits.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="products" className="min-h-screen py-20 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 text-primary">
          Choose Your Fruit
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-secondary/50 to-background border border-border">
            <FruitCanvas currentFruit={fruits[currentIndex].model} className="w-full h-full" />
          </div>

          <div className="space-y-8 animate-fade-in">
            <h3 className="text-4xl font-bold text-foreground">
              {fruits[currentIndex].name}
            </h3>
            <p className="text-xl text-muted-foreground">
              {fruits[currentIndex].description}
            </p>

            <div className="flex gap-4">
              <Button
                onClick={handlePrevious}
                variant="outline"
                size="lg"
                className="rounded-full"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                onClick={handleNext}
                variant="default"
                size="lg"
                className="rounded-full"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>

            <div className="flex gap-3">
              {fruits.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-3 rounded-full transition-all ${
                    index === currentIndex ? "w-12 bg-primary" : "w-3 bg-muted"
                  }`}
                  aria-label={`Go to fruit ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FruitShowcase;
