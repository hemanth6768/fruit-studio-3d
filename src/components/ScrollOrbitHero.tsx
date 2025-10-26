import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Environment, Text3D, Center, useGLTF, Float } from "@react-three/drei";
import { Suspense } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface OrbitingFruitProps {
  modelPath: string;
  orbitRadius: number;
  orbitSpeed: number;
  angleOffset: number;
  zOffset: number;
  scale: number;
  scrollProgress: number;
}

const OrbitingFruit = ({ 
  modelPath, 
  orbitRadius, 
  orbitSpeed, 
  angleOffset, 
  zOffset, 
  scale,
  scrollProgress 
}: OrbitingFruitProps) => {
  const meshRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(modelPath);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.getElapsedTime() * orbitSpeed;
      const angle = time + angleOffset;
      
      // Phase 1 (0-0.15): Fruits blast outward from center (revealing title)
      const blastProgress = Math.min(scrollProgress / 0.15, 1);
      const blastRadius = (1 - blastProgress) * 3; // Start close, blast to orbit position
      
      // Phase 2 (0.15-0.6): Orbit around title
      const orbitProgress = Math.max(0, Math.min((scrollProgress - 0.15) / 0.45, 1));
      const currentRadius = orbitRadius * Math.max(blastProgress, orbitProgress);
      
      // Phase 3 (0.6-1.0): Smash effect - fruits collapse and explode
      const smashProgress = Math.max(0, (scrollProgress - 0.6) / 0.4);
      const smashDistance = smashProgress * 20;
      const smashIntensity = Math.pow(smashProgress, 2);
      
      // Calculate position - start clustered, blast out, then orbit, then smash
      const targetRadius = currentRadius - blastRadius + smashDistance;
      const x = Math.cos(angle) * targetRadius;
      const y = Math.sin(angle) * targetRadius * 0.5 - smashIntensity * 8;
      const z = zOffset + Math.sin(angle * 2) * 2 - smashProgress * 15;
      
      meshRef.current.position.set(x, y, z);
      
      // Scale: start small during blast, grow to full, then shrink on smash
      const blastScale = blastProgress * scale;
      meshRef.current.scale.setScalar(blastScale * (1 - smashIntensity * 0.95));
      
      // Rotation - faster during blast and smash
      const rotationSpeed = 1 + (1 - blastProgress) * 2 + smashProgress * 3;
      meshRef.current.rotation.x = time * 0.5 * rotationSpeed;
      meshRef.current.rotation.y = time * 0.7 * rotationSpeed;
      
      // Opacity
      if (meshRef.current.children[0]) {
        meshRef.current.traverse((child) => {
          if (child instanceof THREE.Mesh && child.material) {
            const material = child.material as THREE.MeshStandardMaterial;
            material.transparent = true;
            // Fade in during blast, fade out during smash
            material.opacity = Math.min(blastProgress, 1 - Math.pow(smashProgress, 1.5));
          }
        });
      }
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <primitive ref={meshRef} object={scene.clone()} />
    </Float>
  );
};

const Scene = ({ scrollProgress }: { scrollProgress: number }) => {
  const fruits = [
    { model: "/models/pomegranate.glb", radius: 6, speed: 0.3, angle: 0, z: 2, scale: 2.5 },
    { model: "/models/lychee.glb", radius: 7, speed: -0.25, angle: Math.PI / 3, z: -1, scale: 2.2 },
    { model: "/models/pear.glb", radius: 6.5, speed: 0.28, angle: Math.PI * 2 / 3, z: 3, scale: 2.3 },
    { model: "/models/pomegranate.glb", radius: 7.5, speed: -0.22, angle: Math.PI, z: -2, scale: 2.0 },
    { model: "/models/lychee.glb", radius: 6.8, speed: 0.26, angle: Math.PI * 4 / 3, z: 1, scale: 2.4 },
    { model: "/models/pear.glb", radius: 7.2, speed: -0.24, angle: Math.PI * 5 / 3, z: -3, scale: 2.1 },
  ];

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 20]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-10, -10, -5]} intensity={0.4} />
      <spotLight position={[0, 15, 10]} intensity={0.8} angle={0.3} penumbra={1} />
      
      {fruits.map((fruit, index) => (
        <OrbitingFruit
          key={index}
          modelPath={fruit.model}
          orbitRadius={fruit.radius}
          orbitSpeed={fruit.speed}
          angleOffset={fruit.angle}
          zOffset={fruit.z}
          scale={fruit.scale}
          scrollProgress={scrollProgress}
        />
      ))}
      
      <Environment preset="sunset" />
    </>
  );
};

const ScrollOrbitHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  // Title fades in as fruits blast outward (0-0.2), then fades out at end (0.7-1.0)
  const titleBlastIn = Math.min(scrollProgress / 0.2, 1);
  const titleFadeOut = scrollProgress < 0.7 ? 1 : 1 - (scrollProgress - 0.7) / 0.3;
  const titleOpacity = titleBlastIn * titleFadeOut;
  const titleScale = 0.8 + (titleBlastIn * 0.2) - (scrollProgress * 0.15);

  return (
    <section 
      ref={containerRef}
      id="home" 
      className="h-[200vh] relative overflow-hidden"
    >
      {/* Fixed viewport container */}
      <div className="sticky top-0 h-screen w-full">
        {/* 3D Canvas Background */}
        <div className="absolute inset-0">
          <Canvas>
            <Suspense fallback={null}>
              <Scene scrollProgress={scrollProgress} />
            </Suspense>
          </Canvas>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/60 pointer-events-none" />

        {/* Title - Revealed by fruit blast */}
        <div 
          className="absolute inset-0 flex items-center justify-center z-10"
          style={{
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
            transition: 'opacity 0.1s ease-out, transform 0.1s ease-out'
          }}
        >
          <div className="text-center px-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(217,255,0,0.8)] leading-[0.9] mb-8">
              <div className="mb-4">PARA</div>
              <div className="mb-4">AGRI</div>
              <div>FRESH</div>
            </h1>
            <div className="h-2 w-64 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent rounded-full mb-8" />
            
            {scrollProgress < 0.3 && (
              <div className="animate-fade-in">
                <p className="text-xl md:text-2xl text-foreground/90 mb-8 font-light max-w-2xl mx-auto">
                  Farm to Table. <span className="text-primary font-semibold">Fresh Burst of Nature</span>
                </p>
                <Button 
                  onClick={scrollToProducts}
                  size="lg" 
                  className="rounded-full shadow-[0_0_30px_rgba(217,255,0,0.4)] hover:shadow-[0_0_40px_rgba(217,255,0,0.6)] transition-all duration-300"
                >
                  Explore Fresh Produce
                  <ChevronDown className="ml-2 h-5 w-5" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Scroll indicator */}
        {scrollProgress < 0.1 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
            <ChevronDown className="h-8 w-8 text-primary drop-shadow-[0_0_10px_rgba(217,255,0,0.8)]" />
          </div>
        )}
      </div>
    </section>
  );
};

export default ScrollOrbitHero;
