import * as L from "leaflet";

/**
 * @param {import('leaflet').Map} map
 */
function registerTileLayer(map) {
  const tileLayer = createTileLayer();
  tileLayer.addTo(map);
}

function createTileLayer() {
  const urlTemplate = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
  const tileLayerOptions = {
    detectRetina: true,
    maxZoom: 18, // In die Nähe
    minZoom: 12, // In die Ferne
  };

  return L.tileLayer(urlTemplate, tileLayerOptions);
}

export { registerTileLayer };
