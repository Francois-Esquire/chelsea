import React, { useRef, useEffect } from 'react';
import { extend, useThree, useFrame } from 'react-three-fiber';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass';
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';

extend({
  EffectComposer,
  ShaderPass,
  RenderPass,
  UnrealBloomPass,
  FilmPass,
  SSAOPass,
  FXAAShader,
});

// eslint-disable-next-line react/prop-types
export default function Effects({ children }) {
  const composer = useRef();

  const { gl, scene, camera, size } = useThree();
  useEffect(() => {
    composer.current.setSize(size.width, size.height);
  }, [size]);
  useFrame(() => composer.current.render(), 1);

  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera} />
      {children}
    </effectComposer>
  );
}
