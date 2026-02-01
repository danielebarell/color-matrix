import type { Row, Column } from "../utility/channels";
import type { ColorMatrix, PresetId } from "../utility/presets";
import { getPresetMatrixById } from "../utility/presets";
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
  column: Column;
  row: Row;
  value: number;
};
export type PresetIdPayload = { presetId: PresetId };
//
type ColorMatrixAction = PayloadAction<ColorMatrixPayload>;
type PresetAction = PayloadAction<PresetIdPayload>;
/** Implementation */
//init state
const initialState: ColorMatrixState = {
  matrix: [
    [1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0],
  ],
  presetId: "Identity" as PresetId,
};
//create slice with name, initialState, reducers
export const colorMatrixSlice = createSlice({
  name: "color matrix",
  initialState,
  reducers: {
    //change a single value of the whole matrix
    setValue(state: ColorMatrixState, action: ColorMatrixAction) {
      const { row, column, value } = action.payload;
      state.matrix[row][column] = value;
    },
    //change id AND matrix
    setPresetId(state: ColorMatrixState, action: PresetAction) {
      const { presetId } = action.payload;
      state.presetId = presetId;
      state.matrix = getPresetMatrixById(presetId)!;
    },
  },
});

export const { setValue, setPresetId } = colorMatrixSlice.actions;
export const selectColorMatrix = (state: ColorMatrixRootState) =>
  state.colorMatrix;
export default colorMatrixSlice.reducer;
