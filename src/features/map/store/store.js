import { createStore } from "@/utils";
import { setData, setInitialState } from "./actions";

const store = createStore({
  data: { features: [] },
  year: 0,
  years: [],
});

async function loadGeoJSON() {
  const data = await import("@/assets/BK_NG_Gesamt.json");
  store.dispatch(setData(data));
  store.dispatch(setInitialState(data));
}

export { store, loadGeoJSON };
