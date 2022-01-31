import { registerLegendControl } from "./legend";
import { registerTimelineControl } from "./timeline";
import * as L from "leaflet";
import "leaflet.infoButton";
import "./controls.css";

/** Register all custom Leaflet controls at once */
function registerMapControls(map) {
  registerTimelineControl(map);
  registerLegendControl(map);
  L.control.scale({ imperial: false }).addTo(map); //metrischer Maßstabsbalken
  L.control
    .infoButton({
      buttonTittle: "I'm a button, press me!",
      title: "<h1>Danke</h1>",
      position: "topleft",
      html: "Du bist süß.",
    })
    .addTo(map);
}

export { registerMapControls };
