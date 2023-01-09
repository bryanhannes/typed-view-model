import { combineLatest, distinctUntilChanged, Observable, ObservableInputTuple, shareReplay, startWith } from 'rxjs';

type ObservableAndInitialValue<T> = {
  observable: Observable<T>;
  initialValue: T;
};

type KeyWithObservableAndInitialValue<T> = {
  [K in keyof T]: ObservableAndInitialValue<T[K]>;
};

export function vm<T>(input: KeyWithObservableAndInitialValue<T>): Observable<T> {
  const observables: ObservableInputTuple<T> = {} as ObservableInputTuple<T>;

  for (const key of Object.keys(input) as (keyof T)[]) {
    observables[key] = input[key].observable.pipe(startWith(input[key].initialValue), distinctUntilChanged());
  }

  return combineLatest(observables).pipe(shareReplay({ bufferSize: 1, refCount: true })) as Observable<T>;
}
