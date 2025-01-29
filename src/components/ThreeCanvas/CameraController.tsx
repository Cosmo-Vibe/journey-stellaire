import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import gsap from 'gsap';

interface CameraControllerProps {
  activeStage: number;
  totalStages: number;
}

export const CameraController = ({ activeStage, totalStages }: CameraControllerProps) => {
  const cameraTarget = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    const targetX = (activeStage - Math.ceil(totalStages / 2)) * 2;
    const targetY = activeStage === 1 ? 1 : 0;
    const targetZ = -activeStage * 2 + 5;

    gsap.to(cameraTarget.current, {
      x: targetX,
      y: targetY,
      z: targetZ,
      duration: 2,
      ease: "power2.inOut"
    });
  }, [activeStage, totalStages]);
  
  useFrame(({ camera }) => {
    camera.position.lerp(cameraTarget.current, 0.05);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  });

  return null;
};
