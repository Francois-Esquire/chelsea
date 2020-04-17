import React, { useMemo } from 'react';

// eslint-disable-next-line react/prop-types
export default function Stars({ count = 2000, radius = 6000 }) {
  const positions = useMemo(() => {
    // eslint-disable-next-line no-shadow, prefer-const
    let positions = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < count; i++) {
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      positions.push(
        // x
        radius * Math.cos(theta) * Math.sin(phi) +
          (-2000 + Math.random() * 4000),
        // y
        radius * Math.sin(theta) * Math.sin(phi) +
          (-2000 + Math.random() * 4000),
        // z
        radius * Math.cos(phi) + (-1000 + Math.random() * 2000),
      );
    }
    return new Float32Array(positions);
  }, [count]);

  return (
    <points>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attachObject={['attributes', 'position']}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        size={12.5}
        sizeAttenuation={true}
        color="white"
        fog={false}
      />
    </points>
  );
}
