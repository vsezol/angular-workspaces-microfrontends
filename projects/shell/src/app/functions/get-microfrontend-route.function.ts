import { Route } from '@angular/router';
import { Microfrontend } from '../types/microfrontend.type';
import { loadRemoteModule } from './load-remote-module.function';

export function getRouteForMicrofrontend(mf: Microfrontend): Route {
  return {
    path: mf.route.path,
    pathMatch: mf.route?.pathMatch,
    canActivate: mf.route.canActivate,
    loadChildren: () =>
      loadRemoteModule(mf.remote).then((m) => m[mf.moduleName]),
  };
}
