import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EventBusService } from 'event-bus';

@Component({
  selector: 'app-dashboard',
  template: 'DASHBOARD',
})
export class DashboardComponent {
  constructor(private readonly eventBusService: EventBusService) {
    this.eventBusService.events$
      .pipe(takeUntilDestroyed())
      .subscribe((event) => {
        console.log('dashboard', event);
      });
  }
}
