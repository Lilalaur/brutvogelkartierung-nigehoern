import * as L from "leaflet";
import { registerLegendControl } from "./legend";
import { registerTimelineControl } from "./timeline";
import { registerInfoButtonControl } from "./infoButton";
import { registerAttribution } from "./attribution";

/**
 * @param {import('leaflet').Map} map
 */
function registerMapControls(map) {
  L.control.scale({ imperial: false }).addTo(map); // metrischer Maßstabsbalken
  registerAttribution(map);
  registerTimelineControl(map);
  registerLegendControl(map);
  registerInfoButtonControl(map);
}

export { registerMapControls };
