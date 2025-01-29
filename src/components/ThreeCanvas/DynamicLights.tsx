import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

interface DynamicLightsProps {
  activeStage: number;
}

export const DynamicLights = ({ activeStage }: DynamicLightsProps) => {
  const lightRef = useRef<THREE.PointLight>(null);
  const secondaryLightRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    if (!lightRef.current || !secondaryLightRef.current) return;
    
    const time = clock.getElapsedTime();
    
    // Primary light movement
    lightRef.current.position.x = Math.sin(time * 0.5) * 3;
    lightRef.current.position.y = Math.cos(time * 0.3) * 2;
    
    // Secondary light color pulsing
    const intensity = 1 + Math.sin(time) * 0.3;
    secondaryLightRef.current.intensity = intensity;
  });

  return (
    <>
      <pointLight 
        ref={lightRef}
        color="#ffffff"
        intensity={1.5}
        distance={20}
        decay={2}
      />
      <pointLight
        ref={secondaryLightRef}
        color={getStageColor(activeStage)}
        intensity={1}
        position={[2, 2, 2]}
        distance={15}
        decay={2}
      />
    </>
  );
};

const getStageColor = (stage: number): string => {
  const colors = {
    1: "#7090ff", // Nebula
    2: "#ffb366", // Sun
    3: "#ff6633", // Red Giant
    4: "#66ffcc", // Planetary Nebula
    5: "#ffffff", // White Dwarf
  };
  return colors[stage as keyof typeof colors] || "#ffffff";
};
