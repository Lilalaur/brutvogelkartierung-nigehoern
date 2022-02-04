import * as L from "leaflet";
import { store } from "../store";
import { getSpeciesColor, loadGeoJSONData } from "../utils";
import { createHTMLSpeciesMarker } from "./legend";

function registerMapWithTileLayer(element) {
  const map = L.map(element, {
    zoom: 15,
    center: [53.9491, 8.42856],
  });
  const tileLayer = createTileLayer();
  tileLayer.addTo(map);
  return map;
}

async function registerGeoJSONLayer(map) {
  const layer = await createGeoJSONLayer();
  layer.addTo(map);
  // ⚠️ Won't work on empty layer. Therefor some default options are set in `registerMapWithTileLayer()`
  map.fitBounds(layer.getBounds().pad(0.1));
  return layer;
}

const geoJSONLayerOptions = {
  filter: filterFeatureByYear,
  onEachFeature: handleEachFeature,
  pointToLayer: (geoJsonPoint, latlng) => {
    return L.marker(latlng, {
      icon: L.divIcon({
        className: `legend-icon-wrapper`,
        iconSize: [24, 24],
        html: createHTMLSpeciesMarker(geoJsonPoint.properties.ArtAbk),
      }),
    });
  },
  style: (feature) => {
    return { color: getSpeciesColor(feature.properties.ArtAbk.trim()) };
  },
};

async function createGeoJSONLayer(update = clearAndUpdateLayer) {
  const layer = L.geoJSON(undefined, geoJSONLayerOptions);

  layer.on("add", (event) => {
    update(event.target, store.getState());
  });

  layer.on("popupopen", ({ popup, target }) => {
    const latlng = popup.getLatLng();
    const bounds = L.latLng(latlng).toBounds(2);
    target._map.fitBounds(bounds);
  });

  store.subscribe(({ prop, target }) => {
    if (prop === "year") {
      update(layer, target);
    }
  });

  const data = await loadGeoJSONData();

  store.getState().data = data;

  return layer;
}

const urlTemplate = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const tileLayerOptions = {
  attribution:
    '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | © Laura Linhart',
  detectRetina: true,
  maxZoom: 18, //in die Nähe
  minZoom: 12, //in die Ferne
};

function createTileLayer() {
  return L.tileLayer(urlTemplate, tileLayerOptions);
}

function filterFeatureByYear(feature) {
  return Number(feature.properties.Jahr) === Number(store.getState().year);
}

function handleEachFeature(feature, layer) {
  const { geometry, properties } = feature;
  if (geometry.type === "Point") {
    layer.bindPopup(properties.Art);
  } else if (geometry.type === "Polygon" || geometry.type === "MultiPolygon") {
    layer.bindPopup(
      `Kolonie: ${properties.Art} <br/> Anzahl: ${properties.Anzahl} Brutpaare`
    );
  }
}

async function clearAndUpdateLayer(layer, state) {
  layer.clearLayers();
  layer.addData(state.data);
}

export { registerMapWithTileLayer, registerGeoJSONLayer };
