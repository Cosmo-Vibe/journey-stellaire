import { useEffect } from 'react';
import gsap from 'gsap';
import type { Mesh } from 'three';

export const useStageTransition = (
  isActive: boolean,
  meshRef: React.RefObject<Mesh>,
  position: [number, number, number]
) => {
  useEffect(() => {
    if (!meshRef.current) return;

    gsap.to(meshRef.current.position, {
      x: isActive ? 0 : position[0],
      y: isActive ? -2 : position[1],
      z: isActive ? 0 : position[2],
      duration: 1.5,
      ease: "power3.inOut"
    });

    gsap.to(meshRef.current.scale, {
      x: isActive ? 2 : 1,
      y: isActive ? 2 : 1,
      z: isActive ? 1 : 1,
      duration: 1.5,
      ease: "power3.inOut"
    });

    gsap.to(meshRef.current.rotation, {
      z: isActive ? Math.PI * 2 : 0,
      duration: 2,
      ease: "power2.inOut"
    });
  }, [isActive, position]);
};
