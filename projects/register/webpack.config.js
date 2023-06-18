require("webpack");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  output: {
    publicPath: "http://localhost:4201/",
    uniqueName: "register",
    scriptType: "text/javascript",
  },
  optimization: {
    runtimeChunk: false,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "register",
      library: { type: "var", name: "register" },
      filename: "remoteEntry.js",
      exposes: {
        RegisterModule:
          "./projects/register/src/app/register/register.module.ts",
      },
      shared: {
        "@angular/core": { singleton: true, requiredVersion: "auto" },
        "@angular/common": { singleton: true, requiredVersion: "auto" },
        "@angular/router": { singleton: true, requiredVersion: "auto" },
        rxjs: { singleton: true, requiredVersion: "auto" },
      },
    }),
  ],
};
