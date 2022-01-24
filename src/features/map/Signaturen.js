import { SpeciesAcronyms } from "./types";
import CircleSVG from "bundle-text:./assets/icons/Circle.svg";
import TriangleSVG from "bundle-text:./assets/icons/Triangle.svg";
import SquareSVG from "bundle-text:./assets/icons/Square.svg";
import RhombusSVG from "bundle-text:./assets/icons/Rhombus.svg";
import PentagonSVG from "bundle-text:./assets/icons/Pentagon.svg";

/** @enum {string} */
const SpeciesIcons = {
  Circle: CircleSVG,
  Triangle: TriangleSVG,
  Square: SquareSVG,
  Rhombus: RhombusSVG,
  Pentagon: PentagonSVG,
};

const SPECIES = {
  [SpeciesAcronyms.Af]: {
    color: "#fb9a99",
    icon: SpeciesIcons.Circle,
  },
  [SpeciesAcronyms.Bg]: {
    color: "#1e6219",
    icon: SpeciesIcons.Circle,
  },
  [SpeciesAcronyms.Bh]: {
    color: "#ffff99",
    icon: SpeciesIcons.Circle,
  },
  [SpeciesAcronyms.Br]: {
    color: "#fdbf6f",
    icon: SpeciesIcons.Circle,
  },
  [SpeciesAcronyms.Bs]: {
    color: "#e539d3",
    icon: SpeciesIcons.Triangle,
  },
  [SpeciesAcronyms.Dm]: {
    color: "#ff96f4",
    icon: SpeciesIcons.Circle,
  },
  [SpeciesAcronyms.Ee]: {
    color: "#a6cee3",
    icon: SpeciesIcons.Triangle,
  },
  [SpeciesAcronyms.Fi]: {
    color: "#d8d80e",
    icon: SpeciesIcons.Circle,
  },
  [SpeciesAcronyms.Fl]: {
    color: "#fdbf6f",
    icon: SpeciesIcons.Circle,
  },
  [SpeciesAcronyms.Fs]: {
    color: "#fdbf6f",
    icon: SpeciesIcons.Triangle,
  },
  [SpeciesAcronyms.Gg]: {
    color: "#7d7d14",
    icon: SpeciesIcons.Circle,
  },
  [SpeciesAcronyms.Gm]: {
    color: "#ff96f4",
    icon: SpeciesIcons.Triangle,
  },
  [SpeciesAcronyms.Hm]: {
    color: "#FFE6CD",
    icon: SpeciesIcons.Circle,
  },
  [SpeciesAcronyms.Kg]: {
    color: "#ff96f4",
    icon: SpeciesIcons.Square,
  },
  [SpeciesAcronyms.Ko]: {
    color: "#1f78b4",
    icon: SpeciesIcons.Circle,
  },
  [SpeciesAcronyms.Ks]: {
    color: "#fdbf6f",
    icon: SpeciesIcons.Square,
  },
  [SpeciesAcronyms.Lm]: {
    color: "#824101",
    icon: SpeciesIcons.Triangle,
  },
  [SpeciesAcronyms.Lö]: {
    color: "#3f2758",
    icon: SpeciesIcons.Circle,
  },
  [SpeciesAcronyms.Mg]: {
    color: "#ff96f4",
    icon: SpeciesIcons.Rhombus,
  },
  [SpeciesAcronyms.Mm]: {
    color: "#824101",
    icon: SpeciesIcons.Square,
  },
  [SpeciesAcronyms.Ng]: {
    color: "#1e6219",
    icon: SpeciesIcons.Triangle,
  },
  [SpeciesAcronyms.Ra]: {
    color: "#841516",
    icon: SpeciesIcons.Circle,
  },
  [SpeciesAcronyms.Ri]: {
    color: "#6a3d9a",
    icon: SpeciesIcons.Circle,
  },
  [SpeciesAcronyms.Rk]: {
    color: "#2eecaf",
    icon: SpeciesIcons.Circle,
  },
  [SpeciesAcronyms.Ro]: {
    color: "#24506e",
    icon: SpeciesIcons.Circle,
  },
  [SpeciesAcronyms.Rs]: {
    color: "#cab2d6",
    icon: SpeciesIcons.Circle,
  },
  [SpeciesAcronyms.Sa]: {
    color: "#e31a1c",
    icon: SpeciesIcons.Circle,
  },
  [SpeciesAcronyms.Sd]: {
    color: "#93E288",
    icon: SpeciesIcons.Circle,
  },
  [SpeciesAcronyms.Se]: {
    color: "#e31a1c",
    icon: SpeciesIcons.Triangle,
  },
  [SpeciesAcronyms.Si]: {
    color: "#FFE6CD",
    icon: SpeciesIcons.Rhombus,
  },
  [SpeciesAcronyms.Sm]: {
    color: "#824101",
    icon: SpeciesIcons.Pentagon,
  },
  [SpeciesAcronyms.Sr]: {
    color: "#33a02c",
    icon: SpeciesIcons.Circle,
  },
  [SpeciesAcronyms.St]: {
    color: "#a6cee3",
    icon: SpeciesIcons.Circle,
  },
  [SpeciesAcronyms.Su]: {
    color: "#a9fae0",
    icon: SpeciesIcons.Circle,
  },
  [SpeciesAcronyms.Wf]: {
    color: "#941a88",
    icon: SpeciesIcons.Circle,
  },
  [SpeciesAcronyms.Wp]: {
    color: "#e539d3",
    icon: SpeciesIcons.Circle,
  },
  [SpeciesAcronyms.Ww]: {
    color: "#7d7d14",
    icon: SpeciesIcons.Triangle,
  },
  [SpeciesAcronyms.Zs]: {
    color: "#fdbf6f",
    icon: SpeciesIcons.Rhombus,
  },
  [SpeciesAcronyms.Zz]: {
    color: "#d8d80e",
    icon: SpeciesIcons.Triangle,
  },
};

export { SPECIES, SpeciesIcons };
