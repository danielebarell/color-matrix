import { useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { ColorMatrixRootState } from "../store/store";

type ColorMatrixSelector = TypedUseSelectorHook<ColorMatrixRootState>;
const useColorMatrixSelector: ColorMatrixSelector = useSelector;
export default useColorMatrixSelector;
