import { Injectable, Type } from '@angular/core';
import { Observable, filter, fromEvent, map, share } from 'rxjs';
import { BusEvent } from './bus-event.class';

const EVENT_TYPE: string = 'BUS_EVENT';

@Injectable({
  providedIn: 'platform',
})
export class EventBusService {
  constructor() {
    console.log(Math.random());
  }

  readonly events$: Observable<BusEvent> = fromEvent<CustomEvent>(
    window,
    EVENT_TYPE
  ).pipe(
    map(({ detail }) => detail),
    share()
  );

  dispatch<T>(busEvent: BusEvent<T>): void {
    const customEvent = new CustomEvent(EVENT_TYPE, {
      bubbles: true,
      detail: busEvent,
    });

    dispatchEvent(customEvent);
  }

  listenFor<T extends BusEvent>(instance: Type<T>): Observable<T> {
    return this.events$.pipe(
      filter((event): event is T => event instanceof instance)
    );
  }
}
