import { getMicrofrontendRemote } from './functions/get-microfrontend-remote.function';
import { Microfrontend } from './types/microfrontend.type';

export const MICROFRONTENDS: Microfrontend[] = [
  {
    name: 'Dashboard',
    moduleName: 'DashboardModule',
    route: {
      path: 'dashboard',
    },
    remote: getMicrofrontendRemote('dashboard', 'DashboardModule'),
  },
  {
    name: 'Register',
    moduleName: 'RegisterModule',
    route: {
      path: 'register',
    },
    remote: getMicrofrontendRemote('register', 'RegisterModule'),
  },
];
