import { createObservable } from "../../utils";

export const store = createObservable({
  year: '1990'
});


store.subscribe(() => {
  console.log('year changed', store.year)
  showYear();
})

showYear();

function showYear() {
  const el = document.querySelector('[data-year]');
  el.setAttribute('data-year', store.year);
}