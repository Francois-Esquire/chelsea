import React, { useMemo } from 'react';
import { useThree } from 'react-three-fiber';
import { Vector2 } from 'three';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';

import Stars from './Stars';
import Orbs from './Orbs';
import Plane from './Plane';
import Controls from './Controls';

import Effects from '../Effects';

export default function Lobby() {
  const { scene, camera, size } = useThree();
  const aspect = useMemo(() => new Vector2(size.width, size.height), [size]);
  return (
    <>
      <fog attach="fog" args={['black', 100, 700]} />
      <ambientLight intensity={0.25} />
      <hemisphereLight
        intensity={0.8}
        skyColor="#020f2f"
        groundColor="#0f4445"
      />
      <Stars count={10000} />
      <Plane />
      <Orbs />
      <Effects>
        <filmPass attachArray="passes" args={[0.05, 0.5, 1500, false]} />
        <sSAOPass
          attachArray="passes"
          args={[scene, camera]}
          kernelRadius={0.6}
          maxDistance={0.03}
        />
        <unrealBloomPass attachArray="passes" args={[aspect, 2, 1, 0.291]} />
        <shaderPass
          attachArray="passes"
          args={[FXAAShader]}
          material-uniforms-resolution-value={[1 / size.width, 1 / size.height]}
          renderToScreen={true}
        />
      </Effects>
      <Controls />
    </>
  );
}
