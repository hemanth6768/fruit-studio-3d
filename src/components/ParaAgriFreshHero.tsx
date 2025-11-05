import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, PerspectiveCamera, Environment } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Button } from "./ui/button";

interface FlyingFruitProps {
  modelPath: string;
  startPos: [number, number, number];
  endPos: [number, number, number];
  delay: number;
  rotationAxis: 'x' | 'y' | 'z';
}

const FlyingFruit = ({ modelPath, startPos, endPos, delay, rotationAxis }: FlyingFruitProps) => {
  const meshRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(modelPath);
  const [progress, setProgress] = useState(0);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    
    // Flying animation with delay
    if (time > delay && progress < 1) {
      setProgress(Math.min(progress + delta * 0.5, 1));
    }

    // Smooth position interpolation with easing
    const easeProgress = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    meshRef.current.position.x = THREE.MathUtils.lerp(startPos[0], endPos[0], easeProgress);
    meshRef.current.position.y = THREE.MathUtils.lerp(startPos[1], endPos[1], easeProgress);
    meshRef.current.position.z = THREE.MathUtils.lerp(startPos[2], endPos[2], easeProgress);

    // Rotation during flight
    if (progress < 1) {
      meshRef.current.rotation[rotationAxis] += delta * 3;
    } else {
      // Slow rotation when in place
      meshRef.current.rotation.y += delta * 0.3;
    }

    // Opacity fade in
    meshRef.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const material = mesh.material as THREE.MeshStandardMaterial;
          material.transparent = true;
          material.opacity = Math.min(progress * 1.5, 1);
        }
      }
    });
  });

  return <primitive ref={meshRef} object={scene.clone()} scale={1.8} />;
};

interface BackgroundFruitProps {
  modelPath: string;
  position: [number, number, number];
  orbitRadius: number;
  orbitSpeed: number;
}

const BackgroundFruit = ({ modelPath, position, orbitRadius, orbitSpeed }: BackgroundFruitProps) => {
  const meshRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(modelPath);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    
    // Gentle orbital motion
    meshRef.current.position.x = position[0] + Math.sin(time * orbitSpeed) * orbitRadius;
    meshRef.current.position.y = position[1] + Math.cos(time * orbitSpeed * 0.7) * (orbitRadius * 0.5);
    meshRef.current.position.z = position[2] + Math.cos(time * orbitSpeed) * orbitRadius;

    // Slow rotation
    meshRef.current.rotation.y += 0.005;
    meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;
  });

  return <primitive ref={meshRef} object={scene.clone()} scale={1.2} />;
};

// Orbiting Fruit - Rotates around the title in 360 degrees
interface OrbitingFruitProps {
  modelPath: string;
  orbitRadius: number;
  orbitSpeed: number;
  startAngle: number;
  scale: number;
  zPosition: number;
}

const OrbitingFruit = ({ modelPath, orbitRadius, orbitSpeed, startAngle, scale, zPosition }: OrbitingFruitProps) => {
  const meshRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(modelPath);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    
    // Orbital motion around center (where title is)
    const angle = time * orbitSpeed + startAngle;
    meshRef.current.position.x = Math.cos(angle) * orbitRadius;
    meshRef.current.position.y = Math.sin(angle) * orbitRadius;
    meshRef.current.position.z = zPosition;
    
    // Rotate the fruit itself as it orbits
    meshRef.current.rotation.y += 0.02;
    meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.2;
  });

  return <primitive ref={meshRef} object={scene.clone()} scale={scale} />;
};

const Scene = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={50} />
      
      {/* Clean lighting for fresh look */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-10, 5, -5]} intensity={0.6} />
      <pointLight position={[0, 5, 5]} intensity={0.5} />
      
      {/* Apple and Orange orbiting around title */}
      <OrbitingFruit 
        modelPath="/models/apple.glb"
        orbitRadius={4}
        orbitSpeed={0.3}
        startAngle={0}
        scale={5}
        zPosition={7}
      />
      <OrbitingFruit 
        modelPath="/models/orange.glb"
        orbitRadius={4}
        orbitSpeed={0.3}
        startAngle={Math.PI}
        scale={5}
        zPosition={7}
      />

      <Environment preset="sunset" />
    </>
  );
};

const ParaAgriFreshHero = () => {
  const [showText, setShowText] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Show text after initial fruit blast
    const timer = setTimeout(() => setShowText(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-background">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/30" />

      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas shadows>
          <Scene />
        </Canvas>
      </div>

      {/* Animated Fruit Images with Depth & Parallax - Removed */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
      </div>

      {/* Brand Text with Glow Effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div 
          className={`text-center transition-all duration-1000 ${
            showText ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <h1 
            className="text-6xl md:text-8xl font-bold text-foreground mb-4"
            style={{
              textShadow: '0 0 20px hsl(var(--foreground) / 0.2)',
              letterSpacing: '0.05em'
            }}
          >
            PARA AGRI FRESH
          </h1>
          <p className="text-xl md:text-2xl text-foreground mb-8 font-light tracking-wide">
            Farm Fresh. Naturally Organic. Delivered Daily.
          </p>
          <Button 
            onClick={scrollToProducts}
            size="lg"
            className="pointer-events-auto hover:scale-105 transition-all duration-300"
          >
            Explore Our Fruits
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/60 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-primary/60 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default ParaAgriFreshHero;
