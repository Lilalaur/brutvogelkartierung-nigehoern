import { filterAvailableYears } from "../utils";

function setInitialState(data) {
  const availableYears = filterAvailableYears(data);

  return {
    years: [...availableYears],
    year: Math.min(...availableYears),
  };
}

function setData(data) {
  return {
    data,
  };
}

function setYear(year) {
  return {
    year,
  };
}

export { setYear, setData, setInitialState };
