import { Component, Type } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { BusEvent, EventBusService } from 'event-bus';
import { SidebarComponent } from 'projects/sidebar/src/app/sidebar.component';
import { interval } from 'rxjs';
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
    class CustomBusEvent extends BusEvent {
      public readonly name: string = 'Hello it is custom event name';

      constructor(payload: string) {
        super(payload);
      }
    }

    this.eventBusService
      .listenFor(CustomBusEvent)
      .pipe(takeUntilDestroyed())
      .subscribe((event) => {
        console.log('shell', event);
      });

    interval(1000)
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.eventBusService.dispatch(
          new CustomBusEvent('Custom payload from SHELL')
        );
      });
  }
}
