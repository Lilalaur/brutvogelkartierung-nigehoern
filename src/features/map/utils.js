import * as L from "leaflet";
import { Species, SpeciesIcons } from "./constants";

function createHTMLSpeciesMarker(acronym) {
  const trimmedAcronym = acronym.trim();
  const element = L.DomUtil.create(
    "div",
    `marker-icon marker-icon--${trimmedAcronym}`
  );
  element.insertAdjacentHTML("afterbegin", getSpeciesIcon(trimmedAcronym));
  element.style.setProperty(
    "--color-marker-icon",
    getSpeciesColor(trimmedAcronym)
  );
  return element;
}

function filterAvailableYears(data) {
  const availableYears = new Set();
  data?.features.forEach(({ properties }) => {
    availableYears.add(Number(properties.Jahr));
  });
  return availableYears;
}

function getSpeciesColor(acronym) {
  const color = Species[acronym]?.color ?? "gray";
  return color;
}

function getSpeciesIcon(acronym) {
  const icon = Species[acronym]?.icon ?? SpeciesIcons.Circle;
  return icon;
}

export {
  filterAvailableYears,
  getSpeciesColor,
  getSpeciesIcon,
  createHTMLSpeciesMarker,
};
