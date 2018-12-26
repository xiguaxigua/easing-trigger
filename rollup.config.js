import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: './index.js',
  plugins: [
    resolve(),
    babel()
  ],
  output: [
    {
      format: 'umd',
      file: 'lib/index.umd.js',
      name: 'EasingTrigger',
    },
    {
      format: 'cjs',
      file: 'lib/index.common.js',
    },
    {
      format: 'esm',
      file: 'lib/index.esm.js',
    },
  ],
};
