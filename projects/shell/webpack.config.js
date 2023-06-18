const {
  shareAll,
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederationPlugin({
  name: "shell",
  remotes: {
    register: "http://localhost:4201/remoteEntry.js",
    dashboard: "http://localhost:4202/remoteEntry.js",
    sidebar: "http://localhost:4203/remoteEntry.js",
  },
  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: "auto",
    }),
  },
  sharedMappings: ["event-bus"],
});
