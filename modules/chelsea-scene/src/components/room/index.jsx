import React from 'react';
import { Color, DoubleSide } from 'three';
import { useThree } from 'react-three-fiber';

import { TrackBallControls } from '../controls';

export default function Room() {
  const { gl } = useThree();

  React.useEffect(() => {
    gl.setClearColor(new Color('lightpink'));
  }, []);

  return (
    <group>
      <ambientLight intensity={0.9} />
      <pointLight intensity={0.012} position={[0, 0, 0]} />
      <mesh>
        <boxGeometry
          attach="geometry"
          args={[1000, 100, 1000]}
          position={[0, 98, 0]}
        />
        <meshPhysicalMaterial
          attach="material"
          color="#A09EBB"
          side={DoubleSide}
          shadowSide={DoubleSide}
        />
      </mesh>
      <TrackBallControls />
    </group>
  );
}
