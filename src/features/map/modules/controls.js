import { registerLegendControl } from "./legend";
import { registerTimelineControl } from "./timeline";
import * as L from "leaflet";

/** Register all custom Leaflet controls at once */
function registerMapControls(map) {
  registerTimelineControl(map);
  registerLegendControl(map);
  L.control.scale({ imperial: false }).addTo(map); //metrischer Maßstabsbalken
}

export { registerMapControls };
