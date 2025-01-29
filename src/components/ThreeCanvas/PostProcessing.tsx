import { useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { EffectComposer as EffectComposerImpl } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { Vector2 } from 'three';

export const PostProcessing = () => {
  const { gl, scene, camera } = useThree();
  
  useEffect(() => {
    const composer = new EffectComposerImpl(gl);
    const renderPass = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
      new Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    );

    composer.addPass(renderPass);
    composer.addPass(bloomPass);

    return () => {
      composer.dispose();
    };
  }, [gl, scene, camera]);

  return null;
};
