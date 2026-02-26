export type ColorMatrixPosition =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19;
export type ColorMatrix = [
  /**R*/
  number,
  number,
  number,
  number,
  number,
  /**G*/
  number,
  number,
  number,
  number,
  number,
  /**B*/
  number,
  number,
  number,
  number,
  number,
  /**A*/
  number,
  number,
  number,
  number,
  number,
]; /** tupla per assicurare che la matrice contenga esattamente 20 numeri */
export type PresetId =
  | "identity"
  | "grayscale"
  | "negative"
  | "sepia"
  | "lumred"
  | "lumgreen"
  | "lumblue"
  | "lumcyan"
  | "lummagenta"
  | "lumorange"
  | "isolred"
  | "isolgreen"
  | "isolblue"
  | "swaprb"
  | "swapgb"
  | "swaprg"
  | "warm"
  | "cool"
  | "vintage"
  | "desaturate";
export type Preset = {
  id: PresetId;
  label: string;
  description: string;
  value: ColorMatrix;
};
//presets
const identity: Preset = {
  id: "identity",
  label: "Identity",
  description: "No change",
  value: [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
};
const grayscale: Preset = {
  id: "grayscale",
  label: "Luminance projection",
  description: "True perceptual grayscale",
  value: [
    0.2126, 0.7152, 0.0722, 0, 0, 0.2126, 0.7152, 0.0722, 0, 0, 0.2126, 0.7152,
    0.0722, 0, 0, 0, 0, 0, 1, 0,
  ],
};
const negative: Preset = {
  id: "negative",
  label: "Affine inversion",
  description: "Color negative",
  value: [-1, 0, 0, 0, 1, 0, -1, 0, 0, 1, 0, 0, -1, 0, 1, 0, 0, 0, 1, 0],
};
const sepia: Preset = {
  id: "sepia",
  label: "Luminance recolor",
  description: "Classic sepia tone",
  value: [
    0.393, 0.769, 0.189, 0, 0, 0.349, 0.686, 0.168, 0, 0, 0.272, 0.534, 0.131,
    0, 0, 0, 0, 0, 1, 0,
  ],
};
const lumred: Preset = {
  id: "lumred",
  label: "Luminance red",
  description: "Red channel luminance",
  value: [
    0.2126, 0.7152, 0.0722, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
  ],
};
const lumcyan: Preset = {
  id: "lumcyan",
  label: "Luminance cyan",
  description: "Cyan channel luminance",
  value: [
    0, 0, 0, 0, 0, 0.2126, 0.7152, 0.0722, 0, 0, 0.2126, 0.7152, 0.0722, 0, 0,
    0, 0, 0, 1, 0,
  ],
};
const lumgreen: Preset = {
  id: "lumgreen",
  label: "Luminance green",
  description: "Green channel luminance",
  value: [
    0, 0, 0, 0, 0, 0.2126, 0.7152, 0.0722, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
  ],
};
const lummagenta: Preset = {
  id: "lummagenta",
  label: "Luminance magenta",
  description: "Magenta channel luminance",
  value: [
    0.2126, 0.7152, 0.0722, 0, 0, 0, 0, 0, 0, 0, 0.2126, 0.7152, 0.0722, 0, 0,
    0, 0, 0, 1, 0,
  ],
};
const lumblue: Preset = {
  id: "lumblue",
  label: "Luminance blue",
  description: "Blue channel luminance",
  value: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2126, 0.7152, 0.0722, 0, 0, 0, 0, 0, 1, 0,
  ],
};
const lumorange: Preset = {
  id: "lumorange",
  label: "Luminance orange",
  description: "Orange channel luminance",
  value: [
    0.2126, 0.7152, 0.0722, 0, 0, 0.1063, 0.3576, 0.0361, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 1, 0,
  ],
};
const isolred: Preset = {
  id: "isolred",
  label: "Isolation red",
  description: "Keeps only red channel",
  value: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
};
const isolgreen: Preset = {
  id: "isolgreen",
  label: "Isolation green",
  description: "Keeps only green channel",
  value: [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
};
const isolblue: Preset = {
  id: "isolblue",
  label: "Isolation blue",
  description: "Keeps only blue channel",
  value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
};
const swaprb: Preset = {
  id: "swaprb",
  label: "Red blue swap",
  description: "Swaps red and blue channels",
  value: [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
};
const swaprg: Preset = {
  id: "swaprg",
  label: "Red green swap",
  description: "Swaps red and green channels",
  value: [0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
};
const swapgb: Preset = {
  id: "swapgb",
  label: "Green blue swap",
  description: "Swaps blue and green channels",
  value: [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
};
const warm: Preset = {
  id: "warm",
  label: "Warm tone",
  description: "Boost red, reduce blue",
  value: [1.1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0.9, 0, 0, 0, 0, 0, 1, 0],
};
const cool: Preset = {
  id: "cool",
  label: "Cool tone",
  description: "Boost blue, reduce red",
  value: [0.9, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1.1, 0, 0, 0, 0, 0, 1, 0],
};
const vintage: Preset = {
  id: "vintage",
  label: "Vintage fade",
  description: "Slight fade and lifted blacks",
  value: [
    0.9, 0, 0, 0, 0.05, 0, 0.9, 0, 0, 0.05, 0, 0, 0.9, 0, 0.05, 0, 0, 0, 1, 0,
  ],
};
const desaturate: Preset = {
  id: "desaturate",
  label: "Desaturate",
  description: "Strong desaturation",
  value: [
    0.5, 0.5, 0.5, 0, 0, 0.5, 0.5, 0.5, 0, 0, 0.5, 0.5, 0.5, 0, 0, 0, 0, 0, 1,
    0,
  ],
};
//
const presetRegister: Readonly<Record<string, Preset>> = {
  identity,
  grayscale,
  negative,
  sepia,
  lumred,
  lumcyan,
  lumgreen,
  lummagenta,
  lumblue,
  lumorange,
  isolred,
  isolgreen,
  isolblue,
  swaprg,
  swaprb,
  swapgb,
  warm,
  cool,
  vintage,
  desaturate,
};
//
export function getPresetValueById(id: PresetId): ColorMatrix | undefined {
  const preset = presetRegister[id];
  if (!preset) {
    console.warn("No preset for id:", id);
    return;
  }
  return preset.value;
}
//
const presets = Object.values(presetRegister);
export default presets;
