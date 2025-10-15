import { Heart, Zap, Shield } from "lucide-react";

const benefits = [
  {
    icon: Heart,
    title: "Gut-Friendly Goodness",
    description: "Packed with dietary fiber to support digestive health and keep you feeling your best."
  },
  {
    icon: Zap,
    title: "Natural Energy Boost",
    description: "Natural sugars and vitamins provide sustained energy throughout your day."
  },
  {
    icon: Shield,
    title: "Immunity Support",
    description: "Rich in vitamins and antioxidants to strengthen your immune system naturally."
  }
];

const HealthBenefits = () => {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-6xl md:text-7xl font-black mb-4">
            <span className="text-primary">DIVE</span>
            <br />
            <span className="text-foreground">INTO</span>
            <br />
            <span className="text-primary">BETTER</span>
            <br />
            <span className="text-foreground">HEALTH</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="p-8 rounded-2xl bg-card border border-border hover:border-primary transition-all hover:shadow-[0_0_30px_rgba(217,255,0,0.2)] animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <benefit.icon className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HealthBenefits;
