import * as L from "leaflet";
import data from "@/assets/TestData.json";
import { store } from "./store";
import birdIconImage from "@/assets/pics/bird.png";
import "./map.css";

const zoomToMarker = (event, map) => {
    map.setView(event.latlng, 16)
}; 

/**
 * @param {string | HTMLElement} element
 * @returns {L.Map}
 */
const init = (element) => {
  const map = L.map(element).setView( [ 53.947621, 8.436162], 14);
  const baseLayer = L.tileLayer(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution:
        'Map data from <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      detectRetina: true,
    }
  );
  baseLayer.addTo(map);

  return map;
};

const getColor = (d) => {
  return d > 1000
    ? "#800026"
    : d > 500
    ? "#BD0026"
    : d > 200
    ? "#E31A1C"
    : d > 100
    ? "#FC4E2A"
    : d > 50
    ? "#FD8D3C"
    : d > 20
    ? "#FEB24C"
    : d > 10
    ? "#FED976"
    : "#FFEDA0";
};

const style = (feature) => {
  return {
    fillColor: getColor(feature.properties.density),
    weight: 2,
    opacity: 1,
    color: "white",
    dashArray: "3",
    fillOpacity: 0.7,
  };
};

const onEachFeature = (feature, layer) => {
    if (feature.geometry.type === "Point") {
        layer.bindPopup(feature.properties.Art);
        // FIXME: Function for zooming in. Requries some sort of global map instance
        // layer.on({ click: event => zoomToMarker(event, map) })
    } else if (feature.geometry.type === "Polygon") {
        layer.bindPopup(`${feature.properties.Art} \n Anzahl: ${feature.properties.Anzahl} Brutpaare`);
        // FIXME: Function for zooming in. Requries some sort of global map instance
        // layer.on({ click: event => zoomToMarker(event, map) })
    }
}

const BirdIcon = L.icon({
    iconUrl: birdIconImage, // von flatincon
    iconSize: [35, 35] // size of the icon
});

/**
 * @param {L.Map} map
 * @returns {L.GeoJSON<any>}
 */
const registerDataLayer = (options) => {
  const layer = L.geoJSON(data, {
    // style,
    filter: (feature) => {
        // TODO: Filter features by year
        return feature.properties.Jahr === Number(store.year);
    },
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
		return L.marker(latlng, { icon: BirdIcon })
	},
    ...options,
  });

  store.subscribe(() => {
    layer.clearLayers().addData(data);
  });

  return layer;
};

const createTimeline = () => {
  const timeline = L.control();

  const handleRangeInput = ({ target }) => {
    store.year = target.value;
  };

  timeline.onAdd = (map) => {
    const element = L.DomUtil.create("div", "timeline");
    const input = L.DomUtil.create("input", undefined, element);

    input.setAttribute("type", "range");
    // TODO: Make `min` and `max` dynamic values from the data
    input.setAttribute("min", 1990);
    input.setAttribute("max", 2021);
    input.setAttribute("value", store.year);

    L.DomEvent.on(input, "input", handleRangeInput);
    L.DomEvent.disableClickPropagation(element);

    return element;
  };

  timeline.onRemove = () => {
    L.DomEvent.off(input, "input", handleRangeInput);
  };

  return timeline;
};

/**
 * @param {L.Map} map
 * @returns {void}
 */
const registerTimelineControls = () => {
  const timeline = createTimeline().setPosition("bottomleft");
  return timeline;
};

/**
 * Registers and initializes the leaflet map with custom functionality
 * @param {string | HTMLElement} element
 * @returns {void}
 */
export const registerMap = (element) => {
  const map = init(element);
  const layer = registerDataLayer().addTo(map);
  // map.fitBounds(layer.getBounds());
  registerTimelineControls().addTo(map);
};
