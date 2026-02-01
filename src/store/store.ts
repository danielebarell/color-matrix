import { configureStore } from "@reduxjs/toolkit";
import { colorMatrixSlice } from "./colormatrixSlice";

const store = configureStore({
  reducer: {
    colorMatrix: colorMatrixSlice.reducer,
  },
});
export default store;
export type ColorMatrixRootState = ReturnType<typeof store.getState>;
export type ColorMatrixDispatch = typeof store.dispatch;
