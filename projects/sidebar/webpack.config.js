require("webpack");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  output: {
    publicPath: "http://localhost:4203/",
    uniqueName: "sidebar",
    scriptType: "text/javascript",
  },
  optimization: {
    runtimeChunk: false,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "sidebar",
      library: { type: "var", name: "sidebar" },
      filename: "remoteEntry.js",
      exposes: {
        SidebarComponent: "./projects/sidebar/src/app/sidebar.component.ts",
      },
      shared: {
        "@angular/core": { singleton: true, requiredVersion: "auto" },
        "@angular/common": { singleton: true, requiredVersion: "auto" },
        "@angular/router": { singleton: true, requiredVersion: "auto" },
      },
    }),
  ],
};
