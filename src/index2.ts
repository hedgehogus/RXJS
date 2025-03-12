import { Observable } from 'rxjs';

const observable$ = new Observable<string>(subscriber => {
  console.log('run');
  subscriber.next('1');
  subscriber.next('2');
  setTimeout(() => {
    console.log('emitted 3');
    subscriber.next('3');
    //subscriber.error(new Error('failure'));
  },4000);
  return () => {
    console.log('teardown');
    //clean intervals
  }
});

//console.log('before')
const subscription = observable$.subscribe((value) => console.log('subscribe', value));
setTimeout(() => subscription.unsubscribe(), 2000);
//console.log('after')

