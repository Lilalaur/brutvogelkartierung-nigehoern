import * as L from "leaflet";
import { store } from "../store";

function registerTimelineControl(map) {
  const timeline = createTimelineControl();
  timeline.setPosition("bottomleft");
  timeline.addTo(map);
}

function createTimelineControl() {
  const timeline = L.control();
  timeline.onAdd = createTimelineElement;
  return timeline;
}

function createTimelineElement() {
  const containerElement = L.DomUtil.create("div", "timeline");
  const inputElement = L.DomUtil.create("input", undefined, containerElement);

  const state = store.getState();
  inputElement.setAttribute("type", "range");
  inputElement.setAttribute("min", Math.min(...state.years));
  inputElement.setAttribute("max", Math.max(...state.years));
  inputElement.setAttribute("value", state.year);

  L.DomEvent.on(inputElement, "input", handleRangeInputChange);
  L.DomEvent.disableClickPropagation(containerElement);

  return containerElement;
}

function handleRangeInputChange({ target }) {
  store.getState().year = Number(target.value);
}

export { registerTimelineControl };
