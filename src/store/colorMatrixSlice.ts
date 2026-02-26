import type { Row, Column } from "../utility/channels";
import type {
  ColorMatrix,
  ColorMatrixPosition,
  PresetId,
} from "../data/presets-data";
import { getPresetValueById } from "../data/presets-data";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ColorMatrixRootState } from "./store";
/** Types */
//state
export type ColorMatrixState = {
  matrix: ColorMatrix;
  presetId: PresetId;
};
//actions and payloads
export type ColorMatrixPayload = {
  position: ColorMatrixPosition;
  value: number;
};
export type PresetIdPayload = { presetId: PresetId };
//
export type ColorMatrixAction = PayloadAction<ColorMatrixPayload>;
export type PresetAction = PayloadAction<PresetIdPayload>;
/** Implementation */
//init state
const initialState: ColorMatrixState = {
  matrix: getPresetValueById("identity")!,
  presetId: "identity",
};
//create slice with name, initialState, reducers
export const colorMatrixSlice = createSlice({
  name: "color matrix",
  initialState,
  reducers: {
    //change a single value of the whole matrix
    setValue(state: ColorMatrixState, action: ColorMatrixAction) {
      const { position, value } = action.payload;
      state.matrix[position] = value;
    },
    //change id AND matrix
    setPresetId(state: ColorMatrixState, action: PresetAction) {
      const { presetId } = action.payload;
      state.presetId = presetId;
      state.matrix = getPresetValueById(presetId)!;
    },
  },
});

export const { setValue, setPresetId } = colorMatrixSlice.actions;
export const selectColorMatrix = (state: ColorMatrixRootState) =>
  state.colorMatrix;
export default colorMatrixSlice.reducer;
