import type { ColorMatrixPosition } from "../../data/presets-data";
import useColorMatrixDispatch from "../../hooks/useColormatrixDispatch";
import useColorMatrixSelector from "../../hooks/useColormatrixSelector";
import { useUIStore } from "../../hooks/useUIStore";
import { setPosition } from "../../store/colormatrixSlice";
import type { ColorMatrixRootState } from "../../store/store";
import MatrixItem from "./matrix-item/MatrixItem";
import styles from "./matrix.module.css";
import { useEffect, useState } from "react";

const colors = ["red", "green", "blue", "alpha", "plus"] as const;
type Colors = (typeof colors)[number];
const orientation = ["w", "h"] as const;
type Orientation = (typeof orientation)[number];

export default function Matrix() {
  const [selectedPostion, setSelectedPosition] =
    useState<ColorMatrixPosition | null>(null);
  const position = useColorMatrixSelector(
    (state: ColorMatrixRootState) => state.colorMatrix.position,
  );
  const isDialogOpen = useUIStore((state) => state.panels.dialog);
  const isColorComponentEnabled = useUIStore(
    (state) => state.panels.colorComponent,
  );
  const disablePanel = useUIStore((state) => state.closePanel);
  const enablePanel = useUIStore((state) => state.openPanel);
  useEffect(() => {
    setSelectedPosition(position);
  }, [position]);
  const colorComponents = useColorMatrixSelector(
    (state: ColorMatrixRootState) => state.colorMatrix.matrix,
  );
  const dispatch = useColorMatrixDispatch();
  function handleItemSelected(pos: ColorMatrixPosition) {
    console.log("selected pos:", pos);
    //se il click avviene sulla medesima posizione dell'item selezionato....
    if (selectedPostion === pos && isColorComponentEnabled) {
      console.log("disbilita item");
      setSelectedPosition(null);
      disablePanel("colorComponent");
      return;
    }
    dispatch(setPosition({ position: pos }));
    enablePanel("colorComponent");
    setSelectedPosition(pos);
  }

  function getSticker(
    orientation: Orientation,
    cc: Colors,
    disabled: boolean,
    key: string,
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
    return <span className={classes} key={key} />;
  }
  function getStickerList(orientation: Orientation) {
    const myColors = [...colors];
    //Se ci muoviamo in altezza rimuovi il 'plus' - cioè il numero 1.
    if (orientation === "h") {
      const plusIndex = myColors.indexOf("plus");
      myColors.splice(plusIndex, 1);
    }
    return myColors.map((value, i) =>
      getSticker(orientation, value, isDialogOpen, `${orientation}-${i}`),
    );
  }
  return (
    <section className={`${styles["matrix-wrapper"]}`}>
      <span></span>
      {getStickerList("w")}
      {getStickerList("h")}
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
