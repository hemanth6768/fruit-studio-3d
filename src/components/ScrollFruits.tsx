import { useEffect, useRef } from "react";

interface FruitParticle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  emoji: string;
}

const ScrollFruits = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<FruitParticle[]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Fruit emojis
    const fruitEmojis = ["🍎", "🍐", "🍇", "🍊", "🍋", "🍌", "🍉", "🍓", "🫐", "🥝"];

    // Create particles
    const createParticle = (): FruitParticle => ({
      x: Math.random() * canvas.width,
      y: -50,
      size: Math.random() * 30 + 20,
      speedY: Math.random() * 2 + 1,
      speedX: Math.random() * 2 - 1,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.1,
      emoji: fruitEmojis[Math.floor(Math.random() * fruitEmojis.length)]
    });

    // Initialize particles
    for (let i = 0; i < 15; i++) {
      particlesRef.current.push({
        ...createParticle(),
        y: Math.random() * canvas.height
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        particle.y += particle.speedY;
        particle.x += particle.speedX;
        particle.rotation += particle.rotationSpeed;

        // Reset particle if it goes off screen
        if (particle.y > canvas.height + 50) {
          particlesRef.current[index] = createParticle();
        }

        // Boundary check for x
        if (particle.x < -50) particle.x = canvas.width + 50;
        if (particle.x > canvas.width + 50) particle.x = -50;

        // Draw emoji
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        ctx.font = `${particle.size}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(particle.emoji, 0, 0);
        ctx.restore();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Add scroll listener to speed up falling
    const handleScroll = () => {
      particlesRef.current.forEach(particle => {
        particle.speedY = Math.min(particle.speedY + 0.5, 8);
      });

      // Gradually slow down
      setTimeout(() => {
        particlesRef.current.forEach(particle => {
          particle.speedY = Math.max(particle.speedY - 0.3, particle.speedY * 0.5);
        });
      }, 200);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ mixBlendMode: "screen", opacity: 0.6 }}
    />
  );
};

export default ScrollFruits;
