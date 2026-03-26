import type { ColorMatrixPosition } from "../../data/presets-data";
import useColorMatrixDispatch from "../../hooks/useColormatrixDispatch";
import useColorMatrixSelector from "../../hooks/useColormatrixSelector";
import { useUIStore } from "../../hooks/useUIStore";
import { setPosition } from "../../store/colormatrixSlice";
import type { ColorMatrixRootState } from "../../store/store";
import MatrixItem from "./matrix-item/MatrixItem";
import styles from "./matrix.module.css";
import { useEffect, useState } from "react";

export default function Matrix() {
  const position = useColorMatrixSelector(
    (state: ColorMatrixRootState) => state.colorMatrix.position,
  );
  const isDialogOpen = useUIStore((state) => state.panels.dialog);
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

  function getSticker(
    orientation: "w" | "h",
    cc: "red" | "green" | "blue" | "alpha" | "plus",
    disabled: boolean,
  ) {
    if (cc === "plus" && orientation === "h")
      throw new Error("this color combination doesn't exist");
    let classes = "";
    const frameClassName = `frame-${orientation}`;
    const colorClassName = `--${cc}`;
    classes = `${styles[frameClassName]} ${styles[colorClassName]}`;
    if (disabled) {
      classes = `${classes} ${styles.disabled}`;
    }
    return <span className={classes} />;
  }
  return (
    <section className={`${styles["matrix-wrapper"]}`}>
      <span></span>
      {getSticker("w", "red", isDialogOpen)}
      {getSticker("w", "green", isDialogOpen)}
      {getSticker("w", "blue", isDialogOpen)}
      {getSticker("w", "alpha", isDialogOpen)}
      {getSticker("w", "plus", isDialogOpen)}
      {getSticker("h", "red", isDialogOpen)}
      {getSticker("h", "green", isDialogOpen)}
      {getSticker("h", "blue", isDialogOpen)}
      {getSticker("h", "alpha", isDialogOpen)}
      <div className={styles["matrix-table"]}>
        {colorComponents.map((value, index) => (
          <MatrixItem
            position={index as ColorMatrixPosition}
            value={value}
            key={index}
            onItemSelected={handleItemSelected}
            selected={selectedPostion === index}
            disabled={isDialogOpen}
          />
        ))}
      </div>
    </section>
  );
}
