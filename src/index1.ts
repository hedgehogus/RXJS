import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';

const someObservable$ = new Observable<string>(subscriber => {
  console.log('here');
  subscriber.next('1');
  setTimeout(() => subscriber.next('2'), 1000);
  setInterval(() => subscriber.next('3'), 2000);
  subscriber.complete();
});

const observer = {
  next: (value: string) => console.log(value),
  complete: () => console.log('complete')
}

someObservable$.subscribe(observer);

setTimeout(() => someObservable$.subscribe(observer),1000);
