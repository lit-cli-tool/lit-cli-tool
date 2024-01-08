import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import terser  from '@rollup/plugin-terser';

export default {
  input: 'index.js',
  output: {
    file: 'dist/index.js',
    format: 'es',
    sourcemap: true,
    plugins: [terser()]
  },
  plugins: [
    replace({
      'Reflect.decorate': 'undefined',
      'preventAssignment': true
    }),
    resolve({
      moduleDirectories: ['node_modules']
    })
  ]
};