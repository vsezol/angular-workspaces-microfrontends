import { loadRemoteModule } from '@angular-architects/module-federation';
import { Injectable } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { APP_ROUTES } from '../app.routes';
import { getMicrofrontendRemote } from '../functions/get-microfrontend-remote.function';
import { getRouteForMicrofrontend } from '../functions/get-microfrontend-route.function';

import { MICROFRONTENDS } from '../microfrontends';

@Injectable({ providedIn: 'root' })
export class MicrofrontendService {
  private readonly microfrontendRoutes: Routes = MICROFRONTENDS.map((mf) =>
    getRouteForMicrofrontend(mf)
  );

  constructor(private router: Router) {}

  initialize(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.router.resetConfig([...APP_ROUTES, ...this.microfrontendRoutes]);
      return resolve();
    });
  }

  async loadRemoteComponent<T>(
    remoteName: string,
    exposedName: string
  ): Promise<T> {
    const remote = getMicrofrontendRemote(remoteName, exposedName);

    const module = await loadRemoteModule({
      type: 'module',
      remoteEntry: remote.remoteEntry,
      exposedModule: remote.exposed,
    });

    return module?.[exposedName];
  }
}
