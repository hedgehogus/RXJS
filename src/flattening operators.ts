import { catchError, concatMap, EMPTY, exhaustMap, mergeMap, Observable, of, switchMap } from "rxjs";

// catch error - HIDE error
catchError(() => EMPTY);
// EMPTY - EMITS COMPLETE NOTIFICATION IMMEDIATELY AFTER SUBSCRIBING

// FLATTENING OPERATORS

// React to a next notification by creating a new inner subscription to the provided observable

const source$ = new Observable(subscriber => {
  setTimeout(() => subscriber.next('A'), 2000);
  setTimeout(() => subscriber.next('B'), 4000);
  setTimeout(() => subscriber.next('С'), 5000);
})

const getSourse2$ = (input: string) => {
  return new Observable(subscriber => {
    setTimeout(() => subscriber.next('1' + input), 0);
    setTimeout(() => subscriber.next('2' + input), 1000);
    setTimeout(() => subscriber.next('3' + input), 2000);
    setTimeout(() => subscriber.complete(), 2000);
  })
} 

// Concat map - waits for inner subscription to be completed
// switch map - cancel inner subscription by unsubscribing
// merge map - create concurrent inner subscriptions
// exhaust map - takes next sourse value only when inner subscription is completed


source$.pipe(
  exhaustMap((value: string) => {
    console.log(value);
    return getSourse2$(value)
  })
).subscribe(value => console.log(value))