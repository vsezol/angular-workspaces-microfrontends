export class BusEvent<T = unknown> {
  constructor(public readonly payload: T) {}
}
