import React from 'react';

export default function Plane() {
  return (
    <mesh receiveShadow={true} rotation={[270, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
      <meshPhysicalMaterial
        attach="material"
        color="#171717"
        roughness={0.2}
        metalness={0.3}
        reflectivity={0.6}
        clearcoat={0.1}
        clearcoatRoughness={0.67}
        emmissive={0}
      />
    </mesh>
  );
}
