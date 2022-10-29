/**
 * Base webpack config used across other specific configs
 */

import path from 'path'
import webpack from 'webpack'

import { dependencies as externals } from '../../release/app/package.json'
import webpackPaths from './webpack.paths'

const configuration: webpack.Configuration = {
  externals: [...Object.keys(externals || {})],

  stats: 'errors-only',

  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            // Remove this line to enable type checking in webpack builds
            transpileOnly: true,
          },
        },
      },
    ],
  },

  output: {
    path: webpackPaths.srcPath,
    // https://github.com/webpack/webpack/issues/1114
    library: {
      type: 'commonjs2',
    },
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    modules: [webpackPaths.srcPath, 'node_modules'],
    alias: {
      '@assets': path.join(__dirname, '../../src/renderer/assets'),
      '@components': path.join(__dirname, '../../src/renderer/components'),
      '@contexts': path.join(__dirname, '../../src/renderer/contexts'),
      '@hooks': path.join(__dirname, '../../src/renderer/hooks'),
      '@pages': path.join(__dirname, '../../src/renderer/pages'),
      '@routes': path.join(__dirname, '../../src/renderer/routes'),
      '@utils': path.join(__dirname, '../../src/renderer/utils'),
      '@lib': path.join(__dirname, '../../src/renderer/lib'),
      '@styles': path.join(__dirname, '../../src/renderer/styles'),
      '@services': path.join(__dirname, '../../src/renderer/services'),
    },
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
  ],
}

export default configuration
