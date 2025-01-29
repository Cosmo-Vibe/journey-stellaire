import { Canvas } from '@react-three/fiber';
import { FC, memo, useEffect, Suspense } from 'react';
import { OrbitControls } from '@react-three/drei';
import { Stage as StageType } from '../../types/Stage';
import { Scene } from './Scene';  // Add this import
import './ThreeCanvas.css';

interface ThreeCanvasProps {
  stages: StageType[];
  activeStage: number;
  onStageSelect: (id: number) => void;
}

const ThreeCanvas: FC<ThreeCanvasProps> = memo(({ stages, activeStage, onStageSelect }) => {
  useEffect(() => {
    console.log('ThreeCanvas mounted');
    return () => console.log('ThreeCanvas unmounted');
  }, []);

  return (
    <Canvas 
      gl={{ 
        alpha: false,
        powerPreference: "high-performance",
        antialias: true,
        stencil: false
      }}
      camera={{ position: [0, 0, 10], fov: 50 }}
      style={{ background: '#000000' }}
    >
      <Suspense fallback={null}>
        <Scene 
          stages={stages}
          activeStage={activeStage}
          onStageSelect={onStageSelect}
        />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
      </Suspense>
    </Canvas>
  );
});

export default ThreeCanvas;
