import resolve from '@rollup/plugin-node-resolve';

import pkg from './package.json';

const external = Object.keys(pkg.dependencies).concat('perf_hooks');

export default {
  external,
  input: 'src/index.js',
  output: {
    file: 'index.js',
    format: 'cjs',
  },
  plugins: [
    resolve({
      preferBuiltins: true,
    }),
  ],
};
