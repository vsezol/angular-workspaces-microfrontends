import { Environment } from './environment';

export const environment: Environment = {
  production: true,
  remotes: [
    {
      remoteName: 'register',
      remoteEntry: 'http://localhost:4201/remoteEntry.js',
      exposes: ['RegisterModule'],
    },
    {
      remoteName: 'dashboard',
      remoteEntry: 'http://localhost:4202/remoteEntry.js',
      exposes: ['DashboardModule'],
    },
    {
      remoteName: 'sidebar',
      remoteEntry: 'http://localhost:4203/remoteEntry.js',
      exposes: ['SidebarComponent'],
    },
  ],
};
