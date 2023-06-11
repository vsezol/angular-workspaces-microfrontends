import { MicrofrontendRemote } from '../interfaces/microfrontend-remote.interface';

export async function loadRemoteModule(
  remote: MicrofrontendRemote
): Promise<any> {
  await loadRemoteEntry(remote.remoteEntry);
  return await lookupExposedModule<any>(remote.remoteName, remote.exposed);
}

const moduleMap: Record<string, boolean> = {};

function loadRemoteEntry(remoteEntry: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (moduleMap[remoteEntry]) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = remoteEntry;

    script.onerror = reject;

    script.onload = () => {
      moduleMap[remoteEntry] = true;
      resolve();
    };

    document.body.append(script);
  });
}

type Scope = unknown;
type Factory = () => any;
declare const __webpack_init_sharing__: (shareScope: string) => Promise<void>;
declare const __webpack_share_scopes__: { default: Scope };
type Container = {
  init(shareScope: Scope): void;
  get(module: string): Factory;
};

async function lookupExposedModule<T>(
  remoteName: string,
  exposedModule: string
): Promise<T> {
  await __webpack_init_sharing__('default');

  const container = (window as Window & Record<string, any>)[
    remoteName
  ] as Container;

  await container.init(__webpack_share_scopes__.default);
  const factory = await container.get(exposedModule);
  const Module = factory();
  return Module as T;
}
