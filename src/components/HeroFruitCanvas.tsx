import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Environment } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import FruitModel from "./FruitModel";

interface HeroFruitCanvasProps {
  side: 'left' | 'right';
}

const HeroFruitCanvas = ({ side }: HeroFruitCanvasProps) => {
  const [scrollY, setScrollY] = useState(0);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Add continuous rotation animation
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => prev + 0.01);
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, []);

  // Calculate rotation based on scroll and auto-rotation
  const baseRotation = side === 'left' ? -0.3 : 0.3;
  const scrollRotation = scrollY * 0.003;

  return (
    <div className="w-full h-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 4]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight position={[-5, -5, -5]} intensity={0.4} />
        <spotLight position={[0, 10, 0]} intensity={0.8} />
        
        <Suspense fallback={null}>
          <group rotation={[baseRotation + scrollRotation, rotation + scrollRotation, scrollRotation * 0.5]}>
            <FruitModel 
              modelPath={side === 'left' ? '/models/pomegranate.glb' : '/models/lychee.glb'} 
              scale={3.5} 
              rotationSpeed={0.01}
              simpleRotation={false}
            />
          </group>
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroFruitCanvas;
