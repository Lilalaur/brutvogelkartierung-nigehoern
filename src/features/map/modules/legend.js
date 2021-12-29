import { store } from "../store";
import { getSpeciesColor } from "../utils";
import "./legend.css";

function registerLegend(map) {
  const control = createControl();
  control.setPosition("topright");
  control.addTo(map);
}

function createControl() {
  const control = L.control();
  const [element, renderBody] = createContainerElement();
  control.onAdd = () => element;
  renderBody(createList);
  store.subscribe(({ prop }) => {
    if (prop === "year") {
      renderBody(createList);
    }
  });
  return control;
}

function createContainerElement() {
  const containerElement = L.DomUtil.create("div", "legend leaflet-bar");
  const headingEl = L.DomUtil.create("h3", "legend__heading", containerElement);
  headingEl.textContent = "Legende: Vogelarten";
  const bodyElement = L.DomUtil.create("div", "legend__body", containerElement);
  const render = (cb) => {
    bodyElement.innerHTML = "";
    bodyElement.appendChild(cb());
  };
  L.DomEvent.disableClickPropagation(containerElement);
  return [containerElement, render];
}

function createList() {
  const state = store.getState();
  const speciesByYear = getSpeciesByYear(state.data.features, state.year);
  const sortedSpecies = sortObject(speciesByYear, 1);
  const wrapperElement = L.DomUtil.create("div", "legend__inner");

  if (Object.keys(sortedSpecies).length) {
    const list = L.DomUtil.create("ul", "legend__list", wrapperElement);
    const listItems = createListItems(sortedSpecies);
    list.appendChild(listItems);
  } else {
    wrapperElement.innerText = `⚠️ No data available for year ${state.year}.`;
  }

  return wrapperElement;
}

function createListItems(items) {
  const fragment = document.createDocumentFragment();

  Object.entries(items).forEach(([acronym, species]) => {
    const element = L.DomUtil.create(
      "li",
      `legend-item legend-item--${acronym}`,
      fragment
    );
    const iconContainer = L.DomUtil.create("div", "legend-item__icon", element);
    const iconElement = createHTMLSpeciesMarker(acronym);
    iconContainer.appendChild(iconElement);
    const nameElement = L.DomUtil.create("div", "legend-item__name", element);
    nameElement.innerText = species;
  });

  return fragment;
}

function createHTMLSpeciesMarker(acronym) {
  const element = L.DomUtil.create(
    "div",
    `legend-icon legend-icon--${acronym}`
  );
  element.style.setProperty("--color-legend-icon", getSpeciesColor(acronym));
  L.DomUtil.create("div", undefined, element);
  return element;
}

// -------- utilities

function sortObject(obj, index = 0) {
  const sortedObj = Object.fromEntries(
    Object.entries(obj).sort((a, b) => a[index].localeCompare(b[index]))
  );
  return sortedObj;
}

function filterByYear(features, year) {
  return features.filter(({ properties }) => properties.Jahr === year);
}

function getSpeciesByYear(features, year) {
  const featuresByYear = filterByYear(features, year);
  return getSpecies(featuresByYear);
}

function getSpecies(features) {
  const map = new Map();
  features.forEach(({ properties }) => {
    if (!Boolean(properties.ArtAbk.trim())) {
      return;
    }
    map.set(properties.ArtAbk.trim(), properties.Art.trim());
  });
  return Object.fromEntries(map);
}

export { registerLegend as registerLegendControl, createHTMLSpeciesMarker };
