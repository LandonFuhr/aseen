import { ShapeProperties } from "../components/ShapeEditor/Shapes/types";

export enum ArenaType {
  ThreeChamber = "ArenaType::ThreeChamber",
  PlusMaze = "ArenaType::PlusMaze",
  NORT = "ArenaType::NORT",
  Custom = "ArenaType::Custom",
}

export enum Page {
  home = "Page::Home",
  builder = "Page::Builder",
  analyzing = "Page::Analyzing",
  results = "Page::Results",
}

export enum ShapePurpose {
  area,
  interactionZone,
}

export interface ShapeWithPurpose {
  shape: ShapeProperties;
  purpose: ShapePurpose;
}
