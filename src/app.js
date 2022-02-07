import { mapWithTimeline, store } from "@/features/map";

mapWithTimeline(document.getElementById("map"), {
  whenReady: handleWhenReady,
  onStateChange: handleStateChange,
});

function handleWhenReady() {
  showYear();
}

function handleStateChange(_state, prop) {
  if (prop === "year") {
    showYear();
  }
}

function showYear() {
  const el = document.querySelector("[data-year]");
  el.setAttribute("data-year", store.getState().year);
}
