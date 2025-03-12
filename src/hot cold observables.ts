import { Observable, Subscriber } from "rxjs";
import {ajax, AjaxResponse} from "rxjs/ajax";

// cold observable (produces data inside)-set of values, http requests, timer/interval
const ajax$ = ajax('https://random-data-api.com/api/name/random_name')

ajax$.subscribe(
  (data: AjaxResponse<{name: string}>) => console.log(data.response['name'])
);

ajax$.subscribe(
  (data: AjaxResponse<{name: string}>) => console.log(data.response['name'])
);
ajax$.subscribe(
  (data: AjaxResponse<{name: string}>) => console.log(data.response['name'])
);

// hot observable - multicasts the data from a common source (DOM events, state, subjects)

const header = document.querySelector('h2');

const click$ = new Observable<MouseEvent>(subscriber => {
  header.addEventListener('click', (event) => {
    subscriber.next(event);
  });
})

click$.subscribe(event => console.log(event.type, event.x, event.y));