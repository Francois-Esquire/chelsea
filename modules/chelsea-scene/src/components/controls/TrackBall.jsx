import React from 'react';
import { useThree, useFrame } from 'react-three-fiber';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';

export default function TrackBall() {
  const [controls, setControls] = React.useState();

  const { gl, camera } = useThree();

  React.useEffect(() => {
    setControls(new TrackballControls(camera, gl.domElement));
  }, [gl, camera]);

  useFrame(() => {
    if (controls) controls.update();
  });

  return null;
}
