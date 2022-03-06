import { registerTileLayer } from "./tileLayer";
import { registerGeoJSONLayer } from "./geoJSONLayer";

/**
 * @param {import('leaflet').Map} map
 */
async function registerMapLayers(map) {
  registerTileLayer(map);
  await registerGeoJSONLayer(map);
}

export { registerMapLayers };
