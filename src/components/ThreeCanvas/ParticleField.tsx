import { memo, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  count: number;
  color?: string;
  size?: number;
  speed?: number;
  spread?: number;
}

export const ParticleField = memo(({ count = 5000, color = '#ffffff', size = 0.02, speed = 0.1, spread = 50 }: ParticleFieldProps) => {
  const points = useRef<THREE.Points>(null);

  const [positions, velocities] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * spread;
      positions[i3 + 1] = (Math.random() - 0.5) * spread;
      positions[i3 + 2] = (Math.random() - 0.5) * spread;
      
      velocities[i3] = (Math.random() - 0.5) * speed;
      velocities[i3 + 1] = (Math.random() - 0.5) * speed;
      velocities[i3 + 2] = (Math.random() - 0.5) * speed;
    }
    
    return [positions, velocities];
  }, [count, spread, speed]);

  useFrame((_state, delta) => {
    if (!points.current) return;

    const positions = points.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] += velocities[i] * delta;
      positions[i + 1] += velocities[i + 1] * delta;
      positions[i + 2] += velocities[i + 2] * delta;

      if (Math.abs(positions[i]) > spread / 2) positions[i] *= -0.9;
      if (Math.abs(positions[i + 1]) > spread / 2) positions[i + 1] *= -0.9;
      if (Math.abs(positions[i + 2]) > spread / 2) positions[i + 2] *= -0.9;
    }
    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
});
