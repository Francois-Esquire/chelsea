import React from 'react';

const Scene = React.lazy(() =>
  import(/* webpackChunkName: "Scene" */ './Scene'),
);

const ChelseaScene = () => (
  <React.Suspense fallback={null}>
    <Scene />
  </React.Suspense>
);

export default ChelseaScene;
