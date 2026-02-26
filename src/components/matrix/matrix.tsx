import type { ColorMatrixPosition } from "../../data/presets-data";
import useColorMatrixSelector from "../../store/useColormatrixSelector";
import type { ColorMatrixRootState } from "../../store/store";
import MatrixItem from "./matrix-item/MatrixItem";
import styles from "./matrix.module.css";

export default function Matrix() {
  const colorComponents = useColorMatrixSelector(
    (state: ColorMatrixRootState) => state.colorMatrix.matrix,
  );
  return (
    <section className={styles["matrix-table"]}>
      {colorComponents.map((value, index) => (
        <MatrixItem
          position={index as ColorMatrixPosition}
          value={value}
          key={index}
        />
      ))}
    </section>
  );
}
