import { createHTMLSpeciesMarker, getSpeciesColor } from "../../utils";
import { store, loadGeoJSON } from "../../store";

/**
 * @param {import('leaflet').Map} map
 */
async function registerGeoJSONLayer(map) {
  const layer = await createGeoJSONLayer();
  layer.addTo(map);
  const bounds = layer.getBounds();
  if (bounds.isValid()) {
    map.fitBounds(bounds.pad(0.125));
  }
  return layer;
}

async function createGeoJSONLayer(update = clearAndUpdateLayer) {
  const geoJSONLayerOptions = {
    filter: filterFeatureByYear,
    onEachFeature: handleEachFeature,
    pointToLayer: (geoJsonPoint, latlng) => {
      return L.marker(latlng, {
        icon: L.divIcon({
          className: `marker-icon-wrapper`,
          iconSize: [24, 24],
          html: createHTMLSpeciesMarker(geoJsonPoint.properties.ArtAbk),
        }),
      });
    },
    style: (feature) => {
      return { color: getSpeciesColor(feature.properties.ArtAbk.trim()) };
    },
  };
  const layer = L.geoJSON(undefined, geoJSONLayerOptions);

  /**
   * @param {import('leaflet').PopupEvent} event
   */
  const handleOnAdd = ({ target }) => {
    update(target, store.getState());
  };

  /**
   * @param {import('leaflet').PopupEvent} event
   */
  const handleOnPopupOpen = ({ popup, target }) => {
    const latlng = popup.getLatLng();
    const bounds = L.latLng(latlng).toBounds(2);
    target._map.fitBounds(bounds);
  };

  layer.on("popupopen", handleOnPopupOpen);
  layer.on("add", handleOnAdd);

  store.subscribe(({ prop, target }) => {
    if (prop === "year") {
      update(layer, target);
    }
  });

  await loadGeoJSON();

  return layer;
}

function filterFeatureByYear(feature) {
  return Number(feature.properties.Jahr) === Number(store.getState().year);
}

/**
 * @param {import('leaflet').Layer} layer
 */
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

/**
 * @param {import('leaflet').GeoJSON} layer
 */
async function clearAndUpdateLayer(layer, state) {
  layer.clearLayers();
  layer.addData(state.data);
}

export { registerGeoJSONLayer };
