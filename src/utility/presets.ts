/**Types and utilities for Presets*/
export type ColorMatrix = number[][];
export type PresetId =
  | "Identity"
  | "Luminance projection"
  | "Affine inversion"
  | "Luminance recolor"
  | "Luminance red"
  | "Luminance cyan"
  | "Red isolate"
  | "Green isolate"
  | "Blue isolate"
  | "Red/Blue swap"
  | "Green/Blue swap"
  | "Red/Green swap"
  | "Warm tone"
  | "Cool tone"
  | "Vintage"
  | "Desaturate";

export type Preset = {
  presetId: PresetId;
  colorMatrix: ColorMatrix;
};
const identity: Preset = {
  colorMatrix: [
    [1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0],
  ],
  presetId: "Identity",
};
const luminance_projection: Preset = {
  colorMatrix: [
    [0.2126, 0.7152, 0.0722, 0, 0],
    [0.2126, 0.7152, 0.0722, 0, 0],
    [0.2126, 0.7152, 0.0722, 0, 0],
    [0, 0, 0, 1, 0],
  ],
  presetId: "Luminance projection",
};
const affine_inversion: Preset = {
  colorMatrix: [
    [-1, 0, 0, 0, 0],
    [0, -1, 0, 0, 0],
    [0, 0, -1, 0, 0],
    [0, 0, 0, 1, 0],
  ],
  presetId: "Affine inversion",
};
const presets: Preset[] = [identity, luminance_projection, affine_inversion];

export function getPresetMatrixById(id: PresetId) {
  const matrix = presets.find((preset) => preset.presetId === id)?.colorMatrix;
  if (!matrix) {
    console.warn(`No matrix was found for ${id}.`);
  }
  return matrix;
}
