import React from 'react';
import { Canvas } from 'react-three-fiber';
import * as THREE from 'three';

import Lobby from './lobby';
// import Room from './room';

export default function Scene() {
  return (
    <Canvas
      gl2={true}
      concurrent={true}
      camera={{
        position: [0, 0, 10],
        near: 0.01,
        far: 10000,
        fov: 50,
      }}
      onCreated={({ gl }) => {
        // eslint-disable-next-line no-param-reassign
        gl.toneMapping = THREE.Uncharted2ToneMapping;
        gl.setClearColor(new THREE.Color('#020207'));
        // gl.setClearColor(new THREE.Color('#BFFFBC'));
      }}
    >
      <Lobby />
      {/* <Room /> */}
    </Canvas>
  );
}
