import { store } from "./store";
import {
  registerGeoJSONLayer,
  registerMapControls,
  registerMapWithTileLayer,
} from "./modules";
import "./map.css";

/**
 * Main function for running the whole Leaflet map.
 * Register all the required parts and some configuration.
 *
 * @example mapWithTimeline(document.getElementById('myElement'))
 */
async function mapWithTimeline(element, options = {}) {
  const map = registerMapWithTileLayer(element);
  await registerGeoJSONLayer(map);
  registerMapControls(map);

  map.whenReady((event) => {
    const { whenReady } = options;
    if (typeof whenReady === "function") {
      whenReady(event);
    }
  });

  store.subscribe(({ target, prop }) => {
    const { onStateChange } = options;
    if (typeof onStateChange === "function") {
      onStateChange(target, prop);
    }
  });

  return map;
}

export { mapWithTimeline };
