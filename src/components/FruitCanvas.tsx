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
    <div className={`${className} rounded-2xl overflow-hidden bg-gradient-to-br from-background/40 to-background/20 backdrop-blur-sm`}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={1.2} />
        <directionalLight position={[10, 10, 5]} intensity={2} />
        <directionalLight position={[-10, -10, -5]} intensity={1} />
        <directionalLight position={[0, -10, 5]} intensity={1} />
        <spotLight position={[0, 10, 0]} intensity={1.5} />
        
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
