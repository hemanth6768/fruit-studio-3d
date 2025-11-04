import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, PerspectiveCamera, Environment } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Button } from "./ui/button";
import orange1 from "/images/orange1.png";
import apple1 from "/images/apple1.png";
import apple2 from "/images/apple2.png";

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

// Hero Orange - Prominent rotating orange near title coming towards user
const HeroOrange = () => {
  const meshRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/orange.glb');

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    
    // Continuous rotation towards user
    meshRef.current.rotation.y += 0.015; // Primary rotation
    meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.2; // Dynamic tilt
    meshRef.current.rotation.z = Math.cos(time * 0.4) * 0.15; // Secondary wobble
    
    // Gentle floating motion
    meshRef.current.position.y = 0.5 + Math.sin(time * 0.8) * 0.3;
    meshRef.current.position.x = Math.sin(time * 0.6) * 0.2;
  });

  return <primitive ref={meshRef} object={scene.clone()} scale={3.5} position={[0, 0.5, 8]} />;
};

const Scene = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={50} />
      
      {/* Lighting setup for organic farm-fresh look */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
      <directionalLight position={[-10, 5, -5]} intensity={0.8} color="#b8f0d4" />
      <spotLight position={[0, 15, 0]} intensity={1.2} angle={0.6} penumbra={1} color="#ffffff" />
      <pointLight position={[5, 0, 5]} intensity={0.6} color="#4ade80" />
      
      {/* HERO ORANGE - Prominent rotating orange near title */}
      <HeroOrange />

      {/* Flying fruits entering from different angles */}
      <FlyingFruit 
        modelPath="/models/pomegranate.glb" 
        startPos={[-15, 8, -5]} 
        endPos={[-4, 2, -2]} 
        delay={0.5}
        rotationAxis="x"
      />
      <FlyingFruit 
        modelPath="/models/pear.glb" 
        startPos={[15, -8, -8]} 
        endPos={[4, -2, -3]} 
        delay={1.0}
        rotationAxis="y"
      />
      <FlyingFruit 
        modelPath="/models/pomegranate.glb" 
        startPos={[18, 5, 15]} 
        endPos={[5, 1, 3]} 
        delay={2.0}
        rotationAxis="y"
      />

      {/* Flying apples coming towards viewer near title */}
      <FlyingFruit 
        modelPath="/models/apple.gltf" 
        startPos={[-10, 12, -10]} 
        endPos={[-2, 3, 5]} 
        delay={0.8}
        rotationAxis="z"
      />
      <FlyingFruit 
        modelPath="/models/apple.gltf" 
        startPos={[12, 10, -12]} 
        endPos={[3, 2, 6]} 
        delay={1.2}
        rotationAxis="x"
      />
      <FlyingFruit 
        modelPath="/models/apple.gltf" 
        startPos={[-8, -12, 15]} 
        endPos={[-3, -2, 7]} 
        delay={1.6}
        rotationAxis="y"
      />

      {/* Background slowly rotating fruits */}
      <BackgroundFruit 
        modelPath="/models/pear.glb" 
        position={[-7, 4, -8]} 
        orbitRadius={0.5}
        orbitSpeed={0.2}
      />
      <BackgroundFruit 
        modelPath="/models/lychee.glb" 
        position={[8, -4, -10]} 
        orbitRadius={0.6}
        orbitSpeed={0.15}
      />
      <BackgroundFruit 
        modelPath="/models/pomegranate.glb" 
        position={[0, 6, -12]} 
        orbitRadius={0.4}
        orbitSpeed={0.25}
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
    <section className="relative h-screen w-full overflow-hidden">
      {/* Fresh Green Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--agri-green-start))] to-[hsl(var(--agri-green-end))]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas shadows>
          <Scene />
        </Canvas>
      </div>

      {/* Animated Fruit Images with Depth & Parallax */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Orange - Top Right */}
        <img 
          src={orange1} 
          alt="Fresh Orange"
          className={`absolute top-[12%] right-[8%] w-32 md:w-48 transition-all duration-[1500ms] ${
            showText ? 'opacity-100 scale-100' : 'opacity-0 scale-50 translate-x-full -translate-y-full'
          }`}
          style={{
            animation: showText ? 'float 6s ease-in-out infinite, rotate 20s linear infinite' : 'none',
            filter: 'drop-shadow(0 15px 40px rgba(255, 140, 0, 0.5)) drop-shadow(0 5px 15px rgba(0, 0, 0, 0.3)) brightness(1.1) contrast(1.05)',
            transform: showText ? `translate(${mousePos.x * 25}px, ${mousePos.y * 25}px)` : undefined,
            transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        />
        
        {/* Apple 1 - Top Left (Flying in from left) */}
        <img 
          src={apple1} 
          alt="Fresh Red Apple"
          className={`absolute top-[15%] left-[10%] w-28 md:w-44 transition-all duration-[1800ms] ${
            showText ? 'opacity-100 scale-100' : 'opacity-0 scale-50 -translate-x-full -translate-y-full'
          }`}
          style={{
            animation: showText ? 'float 7s ease-in-out infinite 0.5s, rotate 18s linear infinite' : 'none',
            filter: 'drop-shadow(0 12px 35px rgba(220, 20, 60, 0.5)) drop-shadow(0 5px 15px rgba(0, 0, 0, 0.3)) brightness(1.08) contrast(1.04)',
            transform: showText ? `translate(${mousePos.x * 22}px, ${mousePos.y * 22}px)` : undefined,
            transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        />
        
        {/* Apple 2 - Bottom Center (Sliced apple) */}
        <img 
          src={apple2} 
          alt="Sliced Apple"
          className={`absolute bottom-[20%] left-[50%] -translate-x-1/2 w-32 md:w-48 transition-all duration-[2000ms] delay-400 ${
            showText ? 'opacity-95 scale-100' : 'opacity-0 scale-50 translate-y-full rotate-180'
          }`}
          style={{
            animation: showText ? 'float 6.5s ease-in-out infinite 1s, rotate 16s linear infinite reverse' : 'none',
            filter: 'drop-shadow(0 10px 30px rgba(220, 20, 60, 0.45)) drop-shadow(0 4px 12px rgba(0, 0, 0, 0.25)) brightness(1.06) contrast(1.03) blur(0.2px)',
            transform: showText ? `translate(calc(-50% + ${mousePos.x * 18}px), ${mousePos.y * 18}px)` : undefined,
            transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        />
      </div>

      {/* Brand Text with Glow Effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div 
          className={`text-center transition-all duration-1000 ${
            showText ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <h1 
            className="text-6xl md:text-8xl font-bold text-white mb-4"
            style={{
              textShadow: '0 0 20px rgba(52, 211, 153, 0.6), 0 0 40px rgba(52, 211, 153, 0.4), 0 0 60px rgba(52, 211, 153, 0.2)',
              letterSpacing: '0.05em'
            }}
          >
            PARA AGRI FRESH
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-light tracking-wide">
            Farm Fresh. Naturally Organic. Delivered Daily.
          </p>
          <Button 
            onClick={scrollToProducts}
            size="lg"
            className="pointer-events-auto bg-white text-[hsl(var(--agri-green-start))] hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-xl"
          >
            Explore Our Fruits
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-white/60 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default ParaAgriFreshHero;
