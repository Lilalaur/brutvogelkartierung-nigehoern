import { registerTileLayer } from "./tileLayer";
import { registerGeoJSONLayer } from "./geoJsonLayer";

/**
 * @param {import('leaflet').Map} map
 */
async function registerMapLayers(map) {
  registerTileLayer(map);
  await registerGeoJSONLayer(map);
}

export { registerMapLayers };
