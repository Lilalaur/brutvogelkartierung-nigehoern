import { SPECIES, SpeciesIcons } from "./Signaturen";

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

const getSpeciesIcon = (acronym) => {
  const icon = SPECIES[acronym]?.icon ?? SpeciesIcons.Circle;
  return icon;
};

export { loadGeoJSONData, getAvailableYears, getSpeciesColor, getSpeciesIcon };
