/** @type {import('next').NextConfig} */

const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.extensions.push(".ts", ".tsx");
    config.resolve.fallback = { fs: false };

    config.plugins.push(
      new NodePolyfillPlugin(),
      new CopyPlugin({
        patterns: [
          {
            from: "./node_modules/onnxruntime-web/dist/ort-wasm.wasm",
            to: "static/chunks/pages",
          },
          {
            from: "./node_modules/onnxruntime-web/dist/ort-wasm-simd.wasm",
            to: "static/chunks/pages",
          },
          {
            from: "./public/model",
            to: "static/chunks/pages",
          },
        ],
      })
    );

    // config.plugins.push(
    //   // Ignore node-specific modules when bundling for the browser
    //   new webpack.IgnorePlugin({
    //     resourceRegExp: /^onnxruntime-node$|^node:/,
    //   })
    // );

    return config;
  },
};
