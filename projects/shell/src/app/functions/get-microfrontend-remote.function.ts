import { environment } from '../../environments/environment';
import { MicrofrontendRemote } from '../interfaces/microfrontend-remote.interface';

import { Remote } from '../interfaces/remote.interface';

export function getMicrofrontendRemote(
  remoteName: string,
  exposedName: string
): MicrofrontendRemote {
  const remote: Remote | undefined = environment.remotes.find(
    (r: Remote) => r.remoteName === remoteName
  );

  if (!remote) {
    throw new Error(`Remote '${remoteName}' is not registered`);
  }

  if (!remote.exposes.includes(exposedName)) {
    throw new Error(
      `Remote ${remote.remoteName} does not expose ${exposedName}`
    );
  }

  return {
    remoteEntry: remote.remoteEntry,
    remoteName: remote.remoteName,
    exposed: exposedName,
  };
}
