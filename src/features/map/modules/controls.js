import { registerLegendControl } from "./legend";
import { registerTimelineControl } from "./timeline";

/** Register all custom Leaflet controls at once */
function registerMapControls(map) {
  registerTimelineControl(map);
  registerLegendControl(map);
}

export { registerMapControls };
