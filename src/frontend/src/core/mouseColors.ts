export const mouseColors: MouseColor[] = [
  { opaque: "rgb(18, 255, 83)", translucent: "rgba(18, 255, 83, 0.2)" }, // green
  { opaque: "rgb(232, 139, 0)", translucent: "rgba(232, 139, 0, 0.2)" }, // orange
  { opaque: "rgb(0, 136, 255)", translucent: "rgba(0, 136, 255, 0.2)" }, // blue
  { opaque: "rgb(255, 196, 0)", translucent: "rgba(255, 196, 0, 0.2)" }, // yellow
  { opaque: "rgb(255, 25, 0)", translucent: "rgba(255, 25, 0, 0.2)" }, // red
];

export interface MouseColor {
  opaque: string;
  translucent: string;
}
