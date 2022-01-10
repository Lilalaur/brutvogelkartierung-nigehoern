import { SPECIES } from "./config";
import { SpeciesShapes } from "./types";

/** Dynamically loading/importing the GeoJSON data from its static file */
const loadGeoJSONData = async () => {
  const data = await import("@/assets/BK_NG_Gesamt.json");
  return data;
};

const getAvailableYears = (data) => {
  const availableYears = new Set();
  data?.features.forEach(({ properties }) => {
    availableYears.add(Number(properties.Jahr));
  });
  return availableYears;
};

const getSpeciesColor = (acronym) => {
  const color = SPECIES[acronym]?.color ?? "gray";
  return color;
};

const getSpeciesShape = (acronym) => {
  const color = SPECIES[acronym]?.clipPath ?? SpeciesShapes[0];
  return color;
};

export { loadGeoJSONData, getAvailableYears, getSpeciesColor, getSpeciesShape };
