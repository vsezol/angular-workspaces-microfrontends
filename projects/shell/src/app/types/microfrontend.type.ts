import { CanActivateFn } from '@angular/router';
import { MicrofrontendRemote } from '../interfaces/microfrontend-remote.interface';
import { PathMatch } from './path-match.type';

export type Microfrontend = {
  name: string;
  moduleName: string;
  route: {
    path: string;
    pathMatch?: PathMatch;
    canActivate?: CanActivateFn[];
  };
  remote: MicrofrontendRemote;
};
