import { Component, Type } from '@angular/core';
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

        grid-template-areas:
          'h h h'
          's m m'
          'f f f';

        padding: 10px;
        border: solid 1px black;
      }

      .header {
        grid-area: h;
        font-style: italic;
        font-weight: bold;
      }

      .sidebar {
        grid-area: s;
      }

      .main {
        grid-area: m;
      }

      .footer {
        grid-area: f;
        font-style: italic;
        font-weight: bold;
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

  constructor(private readonly microfrontendService: MicrofrontendService) {}
}
