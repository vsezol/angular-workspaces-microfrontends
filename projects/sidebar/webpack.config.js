const {
  shareAll,
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederationPlugin({
  name: "sidebar",
  exposes: {
    SidebarComponent: "./projects/sidebar/src/app/sidebar.component.ts",
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
