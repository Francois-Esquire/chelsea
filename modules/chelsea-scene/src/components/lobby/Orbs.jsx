import React from 'react';
import { Dom } from 'react-three-fiber';

// eslint-disable-next-line react/prop-types
export function Orb({ color = 'hotpink' }) {
  const [showInfo, setShowInfo] = React.useState(false);
  return (
    <group visible={true} position={[0, 6, 0]} rotation={[0, 0, 0]}>
      {showInfo ? (
        <Dom position={[0, 2, 3]}>
          <p>memory</p>
        </Dom>
      ) : null}

      <mesh
        onPointerOver={() => {
          setShowInfo(true);
        }}
        onPointerOut={() => {
          setShowInfo(false);
        }}
      >
        <pointLight intensity={0.125} position={[0, 0, 0]} color={color} />
        <sphereGeometry attach="geometry" args={[1, 24, 24]} />
        <meshPhysicalMaterial
          attach="material"
          color={color}
          transparency={0.15}
          transparent={true}
          emmissive={0.75}
          emmissiveColor={color}
        />
      </mesh>
    </group>
  );
}

export default function Orbs() {
  return <Orb />;
}
