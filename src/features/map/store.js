import { createStore } from "@/utils";
import { getAvailableYears } from "./utils";

// The store contains variables (a.k.a. "state") which are used across the app
const store = createStore({
  data: { features: [] },
  year: 0,
  years: [],
});

// Initialize the state values as soon as the `data` is available.
store.subscribe(({ target, prop }) => {
  if (prop === "data" && !!target.data) {
    const state = store.getState();
    const availableYears = getAvailableYears(target.data);
    state.years = [...availableYears];
    state.year = Math.min(...availableYears);
  }
});

export { store };
