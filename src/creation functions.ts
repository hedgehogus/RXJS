import { forkJoin, from, fromEvent, Observable, of, subscribeOn, Subscriber, timer } from "rxjs";
import { resolve } from "../webpack.config";
import { ajax, AjaxResponse } from "rxjs/ajax";


const observer = {
  next: (value: string) => console.log(value),
  complete: () => console.log('complete'),
  error: (err: Error) => console.log('error', err)
}

// emit values iterating through arguments
//of('1','2','3').subscribe(observer);

// observable from promise
const somePromise = new Promise((resolve, reject) => {
  //resolve('resolved');
  reject('Rejected');
});

const observableFromPromise$ = from(somePromise);
//observableFromPromise$.subscribe(observer);

//from(['4', '5', '6']).subscribe(observer);


const header = document.querySelector('h2');
const clickObserver = {
  next: (value: Event) => console.log(value.target),
  complete: () => console.log('complete'),
  error: (err: Error) => console.log('error', err)
}
//fromEvent(header, 'click').subscribe(clickObserver);


const timerObserver = {
  next: (value: 0) => console.log(value),
  complete: () => console.log('complete'),
  error: (err: Error) => console.log('error', err)
}

//timer(2000).subscribe(timerObserver);


// FORK JOIN - waiting for multiple http requests
// emits final value only when all observables are completed


const randomName$ = ajax('https://random-data-api.com/api/name/random_name');
const randomNation$ = ajax('https://random-data-api.com/api/nation/random_nation');
const randomFood$ = ajax('https://random-data-api.com/api/food/random_food');

/* randomName$.subscribe((ajaxResponse: AjaxResponse<{first_name: string}>) => console.log(ajaxResponse.response.first_name));
randomNation$.subscribe((ajaxResponse: AjaxResponse<{capital: string}>) => console.log(ajaxResponse.response.capital));
randomFood$.subscribe((ajaxResponse: AjaxResponse<{dish: string}>) => console.log(ajaxResponse.response.dish));
 */
forkJoin([randomName$, randomNation$, randomFood$])
.subscribe(([nameAjax, nationAjax, foodAjax]: [
  AjaxResponse<{ first_name: string }>, AjaxResponse<{ capital: string }>, AjaxResponse<{ dish: string }>
]) => {
  console.log(nameAjax.response.first_name);
  console.log(nationAjax.response.capital);
  console.log(foodAjax.response.dish);
});

// error scenario

const a$ = new Observable(subscriber => {
  setTimeout(() => {
    subscriber.next('A');
    subscriber.complete();
  }, 5000);

  return () => {
    console.log('teardown');
  }
})

const b$ = new Observable(subscriber => {
  setTimeout(() => {
    subscriber.error('Failure');
  }, 3000);

  return () => {
    console.log('teardown2');
  }
})

forkJoin([a$, b$]).subscribe({
  next: console.log,
  error: err => console.log('Error', err)
});


// combine latest
// - needs at least one value from each observable to starting emit
// - emits an array of latest values each time any of them emits something
// for inputs
