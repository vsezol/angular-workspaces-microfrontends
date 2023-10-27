import { Component } from '@angular/core';
import { BusEvent, EventBusService } from 'event-bus';

@Component({
  selector: 'app-sidebar',
  template: '<button (click)="sendMessage()">click clack</button>',
  standalone: true,
})
export class SidebarComponent {
  constructor(private readonly eventBusService: EventBusService) {}

  sendMessage(): void {
    this.eventBusService.dispatch(new BusEvent({ forAll: true, hi: 'Hello!' }));
  }
}
