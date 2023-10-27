import { Component, Type } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { EventBusService } from 'event-bus';
import { SidebarComponent } from 'projects/sidebar/src/app/sidebar.component';
import { MicrofrontendService } from './services/microfrontend.service';

@Component({
  selector: 'app-root',
  template: `
    <header class="header">Shell header</header>

    <aside class="sidebar">
      <ng-container
        *ngComponentOutlet="sidebarComponent | async"
      ></ng-container>
    </aside>

    <main class="main">
      <router-outlet></router-outlet>
    </main>

    <footer class="footer">Shell footer</footer>
  `,
  styles: [
    `
      :host {
        display: grid;

        grid-template-rows: 40px auto 40px;
        grid-template-columns: 200px auto;
        grid-template-areas:
          'h h h'
          's m m'
          'f f f';

        height: 100vh;
        overflow: hidden;
      }

      .header {
        grid-area: h;

        display: flex;
        align-items: center;
        padding: 10px;

        font-style: italic;
        font-weight: bold;
        background: lightblue;
      }

      .sidebar {
        grid-area: s;
        background: lightseagreen;
        padding: 10px;
      }

      .main {
        grid-area: m;
        background: gainsboro;
        padding: 10px;
      }

      .footer {
        grid-area: f;

        display: flex;
        align-items: center;
        padding: 10px;

        font-style: italic;
        font-weight: bold;
        background: lightsteelblue;
      }
    `,
  ],
})
export class AppComponent {
  title = 'shell';

  readonly sidebarComponent: Promise<Type<SidebarComponent>> =
    this.microfrontendService.loadRemoteComponent<Type<SidebarComponent>>(
      'sidebar',
      'SidebarComponent'
    );

  constructor(
    private readonly microfrontendService: MicrofrontendService,
    private readonly eventBusService: EventBusService
  ) {
    this.eventBusService.events$
      .pipe(takeUntilDestroyed())
      .subscribe((event) => {
        console.log('shell', event);
      });
  }
}
