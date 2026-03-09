import type { ColorMatrixPosition } from "../../data/presets-data";
import useColorMatrixDispatch from "../../hooks/useColormatrixDispatch";
import useColorMatrixSelector from "../../hooks/useColormatrixSelector";
import { setPosition } from "../../store/colormatrixSlice";
import type { ColorMatrixRootState } from "../../store/store";
import MatrixItem from "./matrix-item/MatrixItem";
import styles from "./matrix.module.css";

export default function Matrix() {
  const colorComponents = useColorMatrixSelector(
    (state: ColorMatrixRootState) => state.colorMatrix.matrix,
  );
  const dispatch = useColorMatrixDispatch();
  function handleItemSelected(position: ColorMatrixPosition) {
    console.log("selected position", position);
    dispatch(setPosition({ position }));
  }
  return (
    <section className={styles["matrix-table"]}>
      {colorComponents.map((value, index) => (
        <MatrixItem
          position={index as ColorMatrixPosition}
          value={value}
          key={index}
          onItemSelected={handleItemSelected}
        />
      ))}
    </section>
  );
}
