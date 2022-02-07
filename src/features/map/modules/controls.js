import { registerLegendControl } from "./legend";
import { registerTimelineControl } from "./timeline";
import * as L from "leaflet";
import "./controls.css";
import logoJordsand from "../../../assets/pics/Logo_Jordsand.png";
import logoNPHW from "../../../assets/pics/Logo_NPHW.png";
import "../../../lib/Leaflet.infoButton/leaflet.infoButton";

/** Register all custom Leaflet controls at once */
function registerMapControls(map) {
  registerTimelineControl(map);
  registerLegendControl(map);
  L.control.scale({ imperial: false }).addTo(map); //metrischer Maßstabsbalken
  L.control
    .infoButton({
      linkTitle: "Datenherkunft",
      title: "<h1>Datenherkunft</h1>",
      position: "topleft",
      html: `
      <div class="info-layer">
        <p>Die im Rahmen dieser Applikation gezeigten Daten der Brutvogelkartierung auf Nigehörn wurden von der Nationalparkverwaltung Hamburgisches Wattenmeer bereitgestellt. 
           Die Erfassung erfolgte durch den Verein Jordsand. Danke dafür! </p>
        <div class="info-layer-logos">
          <img class="logo" src="${logoNPHW}" />
          <img class="logo Jordi" src="${logoJordsand}" />
        </div>
      </div>
      `,
    })
    .addTo(map);
}

export { registerMapControls };
