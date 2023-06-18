import { loadRemoteModule } from '@angular-architects/module-federation';
import { Route } from '@angular/router';
import { Microfrontend } from '../types/microfrontend.type';

export function getRouteForMicrofrontend(mf: Microfrontend): Route {
  return {
    path: mf.route.path,
    pathMatch: mf.route?.pathMatch,
    canActivate: mf.route.canActivate,
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: mf.remote.remoteEntry,
        exposedModule: `${mf.remote.exposed}`,
      }).then((m) => m[mf.moduleName]),
  };
}
