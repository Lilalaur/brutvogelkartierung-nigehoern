import * as L from "leaflet";
import "@/lib/Leaflet.infoButton";
import logoJordsand from "../../assets/Logo_Jordsand.png";
import logoNPHW from "../../assets/Logo_NPHW.png";
import "./infoButton.css";

const options = {
  linkTitle: "Datenherkunft",
  title: "<h1>Datenherkunft</h1>",
  position: "topleft",
  html: `
    <div class="info-layer">
      <p>
        Die im Rahmen dieser Applikation gezeigten Daten der Brutvogelkartierung auf Nigehörn
        wurden von der Nationalparkverwaltung Hamburgisches Wattenmeer bereitgestellt.
        Die Erfassung erfolgte durch den Verein Jordsand. Danke dafür!
      </p>
      <div class="info-layer-logos">
        <img class="logo" src="${logoNPHW}" />
        <img class="logo Jordi" src="${logoJordsand}" />
      </div>
    </div>
  `,
};

/**
 * @param {import('leaflet').Map} map
 */
function registerInfoButtonControl(map) {
  L.control.infoButton(options).addTo(map);
}

export { registerInfoButtonControl };
