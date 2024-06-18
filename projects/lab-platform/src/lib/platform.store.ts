import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReplaySubject } from 'rxjs';

export type PlatformEvent<T> = { type: string; payload: T };

export type PlatformData = {
  appName: string;
  shared: any;
};

@Injectable({
  providedIn: 'root',
})
export class PlatformStore {
  #initialEvent = { type: 'INIT', payload: null };
  #events = new ReplaySubject<PlatformEvent<unknown>>(10);
  // new BehaviorSubject<PlatformEvent<unknown>>(this.#initialEvent);

  events$ = this.#events.asObservable();
  events = toSignal(this.events$, { initialValue: this.#initialEvent });

  #initialData: PlatformData = { appName: 'Initial Lab Platform', shared: {} };
  #data: WritableSignal<PlatformData> = signal(this.#initialData);

  get data(): Signal<PlatformData> {
    return this.#data.asReadonly();
  }

  set data(data: PlatformData) {
    this.#data.set(data);
  }

  patchData(patch: Partial<PlatformData>) {
    const currentData = this.#data();
    const newData = { ...currentData, ...patch };
    this.#data.set(newData);
  }

  updateData(updateFn: (prev: PlatformData) => PlatformData) {
    this.#data.update((prev) => updateFn(prev));
  }

  dispatch<T>(coreEvent: PlatformEvent<T>) {
    this.#events.next(coreEvent);
  }
}
