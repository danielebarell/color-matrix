import { useDispatch } from "react-redux";
import type { ColorMatrixDispatch } from "../store/store";

const useColorMatrixDispatch = () => useDispatch<ColorMatrixDispatch>();
export default useColorMatrixDispatch;
