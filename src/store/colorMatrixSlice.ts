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
  presetId: PresetId | null;
  position: ColorMatrixPosition | null;
  activeColorComponent: number | null;
};
//actions and payloads
export type ColorMatrixPayload = {
  value: number;
};
export type PresetIdPayload = { presetId: PresetId | null };
export type PositionPayload = { position: ColorMatrixPosition | null };
//
export type ColorMatrixAction = PayloadAction<ColorMatrixPayload>;
export type PresetAction = PayloadAction<PresetIdPayload>;
export type PositionAction = PayloadAction<PositionPayload>;
/** Implementation */
//init state
const initialState: ColorMatrixState = {
  matrix: getPresetValueById("identity")!,
  presetId: "identity",
  position: null,
  activeColorComponent: null,
};
//create slice with name, initialState, reducers
export const colorMatrixSlice = createSlice({
  name: "color matrix",
  initialState,
  reducers: {
    //change a single value of the whole matrix
    setValue(state: ColorMatrixState, action: ColorMatrixAction) {
      const { value } = action.payload;
      if (state.position === null || state.position === undefined) return;
      state.matrix.splice(state.position, 1, value);
    },
    //change id AND matrix
    setPresetId(state: ColorMatrixState, action: PresetAction) {
      const { presetId } = action.payload;
      state.presetId = presetId;
      if (!presetId) return;
      state.matrix = getPresetValueById(presetId)!;
      state.activeColorComponent = state.matrix[state.position!];
    },
    //set position to prepare to change value
    setPosition(state, action: PositionAction) {
      const { position } = action.payload;
      state.position = position;
      state.activeColorComponent = state.matrix[position!];
    },
  },
});

export const { setValue, setPresetId, setPosition } = colorMatrixSlice.actions;
export const selectColorMatrix = (state: ColorMatrixRootState) =>
  state.colorMatrix;
export default colorMatrixSlice.reducer;
