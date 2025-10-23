import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";
import FruitModel from "./FruitModel";

interface FruitCanvasProps {
  currentFruit: string;
  className?: string;
}

const FruitCanvas = ({ currentFruit, className = "" }: FruitCanvasProps) => {
  return (
    <div className={className}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />
        <spotLight position={[0, 10, 0]} intensity={0.8} />
        
        <Suspense fallback={null}>
          <FruitModel modelPath={`/models/${currentFruit}.glb`} scale={2} rotationSpeed={0.005} simpleRotation={true} />
          <Environment preset="sunset" />
        </Suspense>
        
        <OrbitControls 
          enableZoom={true} 
          enablePan={false}
          minDistance={3}
          maxDistance={8}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default FruitCanvas;
