import type { ColorMatrixRootState, ColorMatrixDispatch } from "../store/store";
import { useDispatch, useSelector } from "react-redux";

export const useColorMatrixDispatch = typeof useDispatch<ColorMatrixDispatch>;
export const useColorMatrixSelector = typeof useSelector<ColorMatrixRootState>;
