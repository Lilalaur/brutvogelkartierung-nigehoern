const attributions = [
  '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  "© Laura Linhart",
];

/**
 * @param {import('leaflet').Map} map
 */
function registerAttribution(map) {
  const control = L.control.attribution();
  attributions.forEach((attribution) => {
    control.addAttribution(attribution);
  });
  control.addTo(map);
}

export { registerAttribution };
