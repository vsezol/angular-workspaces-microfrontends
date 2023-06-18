require("webpack");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  output: {
    publicPath: "http://localhost:4202/",
    uniqueName: "dashboard",
    scriptType: "text/javascript",
  },
  optimization: {
    runtimeChunk: false,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "dashboard",
      library: { type: "var", name: "dashboard" },
      filename: "remoteEntry.js",
      exposes: {
        DashboardModule:
          "./projects/dashboard/src/app/dashboard/dashboard.module.ts",
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
