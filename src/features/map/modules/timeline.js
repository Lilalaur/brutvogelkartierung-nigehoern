import * as L from "leaflet";
import { store } from "../store";
import "./timeline.css";

function registerTimelineControl(map) {
  const timeline = createTimelineControl();
  timeline.setPosition("bottomright");
  timeline.addTo(map);
}

function createTimelineControl() {
  const timeline = L.control();
  timeline.onAdd = createTimelineElement;
  return timeline;
}

function isEven(num) {
  return num % 2 === 0;
}

function isOdd(num) {
  return num % 2 !== 0;
}

function createTimelineElement() {
  const containerElement = L.DomUtil.create("div", "timeline");
  const inputElement = L.DomUtil.create("input", undefined, containerElement);

  const state = store.getState();
  const min = Math.min(...state.years);
  const max = Math.max(...state.years);
  inputElement.setAttribute("type", "range");
  inputElement.setAttribute("min", min);
  inputElement.setAttribute("max", max);
  inputElement.setAttribute("step", "1");
  inputElement.setAttribute("value", state.year);
  inputElement.setAttribute("list", "testId");

  const datalistElement = L.DomUtil.create(
    "datalist",
    undefined,
    containerElement
  );
  // const datalistElement = document.createElement('datalist');
  datalistElement.setAttribute("id", "testId");

  for (let i = min; i <= max; i++) {
    const optionElement = L.DomUtil.create(
      "option",
      undefined,
      datalistElement
    );
    // const optionElement = document.createElement("option");
    optionElement.setAttribute("value", i);

    if (i === min || i === max || i % 5 === 0) {
      optionElement.setAttribute("label", i);
    }

    datalistElement.appendChild(optionElement);
  }

  L.DomEvent.on(inputElement, "input", handleRangeInputChange);
  L.DomEvent.disableClickPropagation(containerElement);

  return containerElement;
}

function handleRangeInputChange({ target }) {
  const state = store.getState();
  const selectedYear = Number(target.value);

  state.year = selectedYear;
}

export { registerTimelineControl };
