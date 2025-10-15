const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary opacity-50" />
      
      <div className="container mx-auto px-4 text-center relative z-10 animate-fade-in">
        <h1 className="text-8xl md:text-9xl font-black mb-6 text-primary drop-shadow-[0_0_20px_rgba(217,255,0,0.5)]">
          HELLO!
        </h1>
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">
          Freshness Perfected!
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Juicy, sweet, and bursting with flavor, fiber, natural sweetness, and a variety of fruits 
          to keep your taste buds dancing. Welcome to the world of farm-fresh goodness, 
          where every bite is a delight.
        </p>
      </div>
    </section>
  );
};

export default Hero;
