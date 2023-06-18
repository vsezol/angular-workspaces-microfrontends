import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BusEvent, EventBusService } from 'event-bus';

@Component({
  selector: 'app-dashboard',
  template: 'DASHBOARD',
})
export class DashboardComponent {
  constructor(private readonly eventBusService: EventBusService) {
    console.log('dash board init');

    this.eventBusService.events$
      .pipe(takeUntilDestroyed())
      .subscribe((event) => {
        console.log('dashboard', event, event instanceof BusEvent);
      });
  }
}
