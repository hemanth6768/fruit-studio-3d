import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Float } from "@react-three/drei";
import * as THREE from "three";

interface FruitModelProps {
  modelPath: string;
  position?: [number, number, number];
  scale?: number;
  rotationSpeed?: number;
}

const FruitModel = ({ modelPath, position = [0, 0, 0], scale = 1, rotationSpeed = 0.01 }: FruitModelProps) => {
  const meshRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(modelPath);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.getElapsedTime();
      // Create dynamic rotation like the Fizzi cans
      meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.3;
      meshRef.current.rotation.y += rotationSpeed;
      meshRef.current.rotation.z = Math.cos(time * 0.3) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <primitive ref={meshRef} object={scene.clone()} position={position} scale={scale} />
    </Float>
  );
};

export default FruitModel;
