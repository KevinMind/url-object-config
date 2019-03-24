import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';
import json from 'rollup-plugin-json';
import uglify from 'rollup-plugin-uglify-es';

import pkg from './package.json';

const external = Object.keys(pkg.dependencies || {});

const {
  banner, input, plugins,
} = {
  banner: '#!/usr/bin/env node\n',
  input: 'src/index.js',
  plugins: [
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
    builtins(),
    globals({
      process: false,
    }),
    commonjs({
      exclude: '/node_modules/snapdragon/*',
    }),
    json(),
    resolve({
      jsnext: true,
      preferBuiltins: false,
    }),
  ],
};

export default [
  {
    input,
    output: [
      {
        banner, file: 'build/index.cjs.js', format: 'cjs', sourcemap: 'inline',
      },
      { file: 'build/index.js', format: 'es' },
    ],
    external,
    plugins: [...plugins],
  },
  {
    input,
    output: [
      {
        banner, file: 'build/index.cjs.min.js', format: 'cjs', sourcemap: 'inline',
      },
      { file: 'build/index.min.js', format: 'es' },
    ],
    external,
    plugins: [...plugins, uglify()],
  },
];
