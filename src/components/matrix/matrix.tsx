import type { ColorMatrixPosition } from "../../data/presets-data";
import useColorMatrixDispatch from "../../hooks/useColormatrixDispatch";
import useColorMatrixSelector from "../../hooks/useColormatrixSelector";
import { setPosition } from "../../store/colormatrixSlice";
import type { ColorMatrixRootState } from "../../store/store";
import MatrixItem from "./matrix-item/MatrixItem";
import styles from "./matrix.module.css";
import { useEffect, useState } from "react";

export default function Matrix() {
  const position = useColorMatrixSelector(
    (state: ColorMatrixRootState) => state.colorMatrix.position,
  );
  useEffect(() => {
    setSelectedPosition(position);
  }, [position]);
  const colorComponents = useColorMatrixSelector(
    (state: ColorMatrixRootState) => state.colorMatrix.matrix,
  );
  const dispatch = useColorMatrixDispatch();
  function handleItemSelected(position: ColorMatrixPosition) {
    dispatch(setPosition({ position }));
  }
  const [selectedPostion, setSelectedPosition] =
    useState<ColorMatrixPosition | null>(null);
  return (
    <section className={styles["matrix-table"]}>
      {colorComponents.map((value, index) => (
        <MatrixItem
          position={index as ColorMatrixPosition}
          value={value}
          key={index}
          onItemSelected={handleItemSelected}
          selected={selectedPostion === index}
        />
      ))}
    </section>
  );
}
