import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Float, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

interface FallingFruitProps {
  modelPath: string;
  position: [number, number, number];
  scale: number;
  fallSpeed: number;
  rotationSpeed: [number, number, number];
}

const FallingFruit = ({ modelPath, position, scale, fallSpeed, rotationSpeed }: FallingFruitProps) => {
  const meshRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(modelPath);
  const initialY = useRef(position[1]);

  useFrame((state) => {
    if (meshRef.current) {
      // Falling animation
      meshRef.current.position.y -= fallSpeed;
      
      // Reset when fruit falls below viewport
      if (meshRef.current.position.y < -15) {
        meshRef.current.position.y = initialY.current;
      }

      // Rotation
      meshRef.current.rotation.x += rotationSpeed[0];
      meshRef.current.rotation.y += rotationSpeed[1];
      meshRef.current.rotation.z += rotationSpeed[2];

      // Slight horizontal drift
      meshRef.current.position.x += Math.sin(state.clock.elapsedTime * 0.5) * 0.002;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.3}>
      <primitive 
        ref={meshRef} 
        object={scene.clone()} 
        position={position} 
        scale={scale} 
      />
    </Float>
  );
};

const FallingFruitsScene = () => {
  const fruits = useMemo(() => {
    const models = ["pomegranate", "pear", "lychee"];
    const fruitArray = [];
    
    for (let i = 0; i < 20; i++) {
      const model = models[Math.floor(Math.random() * models.length)];
      fruitArray.push({
        id: i,
        modelPath: `/models/${model}.glb`,
        position: [
          (Math.random() - 0.5) * 20,
          Math.random() * 20 + 5,
          (Math.random() - 0.5) * 10
        ] as [number, number, number],
        scale: Math.random() * 0.8 + 0.4,
        fallSpeed: Math.random() * 0.015 + 0.005,
        rotationSpeed: [
          Math.random() * 0.02 - 0.01,
          Math.random() * 0.02 - 0.01,
          Math.random() * 0.02 - 0.01
        ] as [number, number, number]
      });
    }
    return fruitArray;
  }, []);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <directionalLight position={[-10, -10, -5]} intensity={0.4} />
      <pointLight position={[0, 5, 0]} intensity={0.6} color="#d9ff00" />
      
      {fruits.map((fruit) => (
        <FallingFruit
          key={fruit.id}
          modelPath={fruit.modelPath}
          position={fruit.position}
          scale={fruit.scale}
          fallSpeed={fruit.fallSpeed}
          rotationSpeed={fruit.rotationSpeed}
        />
      ))}
    </>
  );
};

const FallingFruits = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas>
        <FallingFruitsScene />
      </Canvas>
    </div>
  );
};

export default FallingFruits;
