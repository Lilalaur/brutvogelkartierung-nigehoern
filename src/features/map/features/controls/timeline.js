import * as L from "leaflet";
import { store, setYear } from "../../store";
import "./timeline.css";

/**
 * @param {import('leaflet').Map} map
 */
function registerTimelineControl(map) {
  const timeline = createTimelineControl();
  timeline.setPosition("bottomright");
  timeline.addTo(map);
}

function createTimelineControl() {
  const timeline = new L.Control();
  timeline.onAdd = createTimelineElement;
  return timeline;
}

function createTimelineElement() {
  const containerElement = L.DomUtil.create("div", "timeline");
  const inputElement = L.DomUtil.create("input", undefined, containerElement);

  const state = store.getState();
  const min = Math.min(...state.years);
  const max = Math.max(...state.years);
  inputElement.setAttribute("type", "range");
  inputElement.setAttribute("min", `${min}`);
  inputElement.setAttribute("max", `${max}`);
  inputElement.setAttribute("step", "1");
  inputElement.setAttribute("value", state.year);
  inputElement.setAttribute("list", "timelineYears");

  const datalistElement = L.DomUtil.create(
    "datalist",
    undefined,
    containerElement
  );
  datalistElement.setAttribute("id", "timelineYears");

  for (let year = min; year <= max; year++) {
    const optionElement = L.DomUtil.create(
      "option",
      undefined,
      datalistElement
    );
    optionElement.setAttribute("value", `${year}`);

    if (year === min || year === max || year % 5 === 0) {
      optionElement.setAttribute("label", `${year}`);
    }

    datalistElement.appendChild(optionElement);
  }

  /**
   * @param {Event & { target: HTMLInputElement }} event
   */
  function handleRangeInputChange({ target }) {
    const selectedYear = Number(target.value);
    store.dispatch(setYear(selectedYear));
  }

  L.DomEvent.on(inputElement, "input", handleRangeInputChange);
  L.DomEvent.disableClickPropagation(containerElement);

  return containerElement;
}

export { registerTimelineControl };
