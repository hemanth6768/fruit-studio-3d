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

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <primitive ref={meshRef} object={scene.clone()} position={position} scale={scale} />
    </Float>
  );
};

export default FruitModel;
