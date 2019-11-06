// Rollup plugins
import babel from 'rollup-plugin-babel';
import builtins from 'rollup-plugin-node-builtins';
import commonjs from 'rollup-plugin-commonjs';
import multiEntry from 'rollup-plugin-multi-entry';
import resolve from 'rollup-plugin-node-resolve';

const plugins = [
  multiEntry(),
  resolve({
    preferBuiltins: false,
    mainFields: ['browser']
  }),
  commonjs(),
  builtins(),
  babel()
];

export default {
  input: './index.js',
  output: {
    file: './dist/lovelace-screensaver.js',
    format: 'iife',
    name: 's6'
  },
  plugins
};
