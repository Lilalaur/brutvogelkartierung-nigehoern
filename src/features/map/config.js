import { SpeciesAcronyms } from "./types";

const randomColor = () => {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")
    .toUpperCase()}`;
};

const SPECIES = {
  [SpeciesAcronyms.Af]: {
    color: randomColor(),
  },
  [SpeciesAcronyms.Bg]: {
    color: randomColor(),
  },
  [SpeciesAcronyms.Bh]: {
    color: randomColor(),
  },
  [SpeciesAcronyms.Br]: {
    color: randomColor(),
  },
  [SpeciesAcronyms.Bs]: {
    color: randomColor(),
  },
  [SpeciesAcronyms.Dm]: {
    color: randomColor(),
  },
  [SpeciesAcronyms.Ee]: {
    color: randomColor(),
  },
  [SpeciesAcronyms.Fi]: {
    color: randomColor(),
  },
  [SpeciesAcronyms.Fl]: {
    color: randomColor(),
  },
  [SpeciesAcronyms.Fs]: {
    color: randomColor(),
  },
  [SpeciesAcronyms.Gg]: {
    color: randomColor(),
  },
  [SpeciesAcronyms.Gm]: {
    color: randomColor(),
  },
  [SpeciesAcronyms.Hm]: {
    color: randomColor(),
  },
  [SpeciesAcronyms.Kg]: {
    color: randomColor(),
  },
  [SpeciesAcronyms.Ko]: {
    color: randomColor(),
  },
  [SpeciesAcronyms.Ks]: {
    color: randomColor(),
  },
  [SpeciesAcronyms.Lm]: {
    color: randomColor(),
  },
  [SpeciesAcronyms.Lö]: {
    color: randomColor(),
  },
  [SpeciesAcronyms.Mg]: {
    color: randomColor(),
  },
  [SpeciesAcronyms.Mm]: {
    color: randomColor(),
  },
  [SpeciesAcronyms.Ng]: {
    color: randomColor(),
  },
  [SpeciesAcronyms.Ra]: {
    color: randomColor(),
  },
  [SpeciesAcronyms.Ri]: {
    color: randomColor(),
  },
  [SpeciesAcronyms.Rk]: {
    color: randomColor(),
  },
  [SpeciesAcronyms.Ro]: {
    color: randomColor(),
  },
  [SpeciesAcronyms.Rs]: {
    color: randomColor(),
  },
  [SpeciesAcronyms.Sa]: {
    color: randomColor(),
  },
  [SpeciesAcronyms.Sd]: {
    color: randomColor(),
  },
  [SpeciesAcronyms.Se]: {
    color: randomColor(),
  },
  [SpeciesAcronyms.Si]: {
    color: "#cab2d6",
  },
  [SpeciesAcronyms.Sm]: {
    color: randomColor(),
  },
  [SpeciesAcronyms.Sr]: {
    color: randomColor(),
  },
  [SpeciesAcronyms.St]: {
    color: randomColor(),
  },
  [SpeciesAcronyms.Su]: {
    color: randomColor(),
  },
  [SpeciesAcronyms.Wf]: {
    color: randomColor(),
  },
  [SpeciesAcronyms.Wp]: {
    color: randomColor(),
  },
  [SpeciesAcronyms.Ww]: {
    color: randomColor(),
  },
  [SpeciesAcronyms.Zs]: {
    color: randomColor(),
  },
  [SpeciesAcronyms.Zz]: {
    color: randomColor(),
  },
};

Object.freeze(SPECIES);

export { SPECIES };
