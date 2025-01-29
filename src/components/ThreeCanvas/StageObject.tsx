import { useTexture } from '@react-three/drei';
import { useRef, memo, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useStageTransition } from '../../hooks/useStageTransition';

interface StageObjectProps {
  texture: string;
  position: [number, number, number];
  isActive: boolean;
  onClick: () => void;
}

export const StageObject = memo(({ texture, position, isActive, onClick }: StageObjectProps) => {
  const textureMap = useTexture(texture);
  
  useEffect(() => {
    console.log(`Stage loaded with texture: ${texture}`);
    const handleLoadError = () => {
      console.error('Error loading texture:', texture);
    };
    
    textureMap.addEventListener('dispose', handleLoadError);
    return () => {
      textureMap.removeEventListener('dispose', handleLoadError);
    };
  }, [texture, textureMap]);

  const meshRef = useRef<THREE.Mesh>(null);
  
  const geometry = useMemo(() => new THREE.PlaneGeometry(1, 1, 32, 32), []);

  useStageTransition(isActive, meshRef, position);

  return (
    <mesh 
      ref={meshRef} 
      position={position} 
      onClick={onClick}
    >
      <primitive object={geometry} attach="geometry" />
      <meshStandardMaterial
        map={textureMap}
        transparent={true}
        emissive="#ffffff"
        emissiveIntensity={isActive ? 0.5 : 0.2}
        roughness={0.5}
        metalness={0.8}
        envMapIntensity={1.5}
      />
    </mesh>
  );
});
