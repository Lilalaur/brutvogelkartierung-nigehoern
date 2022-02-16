import { store } from "./store";
import { registerMapControls, registerMapLayers } from "./features";
import "./map.css";

function registerMap(element) {
  const map = L.map(element, {
    zoom: 15,
    center: [53.9491, 8.42856],
    attributionControl: false,
  });
  return map;
}

function registerYearIndicator() {
  const element = document.querySelector("[data-year]");

  function update() {
    element.setAttribute("data-year", store.getState().year);
  }

  store.subscribe(({ prop }) => {
    if (prop === "year") {
      update();
    }
  });

  update();
}

async function initializeMapWithTimeline(element) {
  const map = registerMap(element);
  await registerMapLayers(map);
  registerMapControls(map);
  registerYearIndicator();
}

export { initializeMapWithTimeline };
