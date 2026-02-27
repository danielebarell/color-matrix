import { useRef } from "react";
import presets, {
  getPresetValueById,
  type PresetId,
} from "../../data/presets-data";
import PresetButton from "./PresetButton";
import styles from "./preset.module.css";
import { Draggable, InertiaPlugin } from "gsap/all";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { PresetIconPosition } from "./PresetIcon";
import { DRAG_RESISTENCE, EDGE_RESISTENCE } from "../../constants";
import useColorMatrixDispatch from "../../hooks/useColormatrixDispatch";
import { setPresetId } from "../../store/colormatrixSlice";
gsap.registerPlugin(Draggable, InertiaPlugin);
export default function PresetList() {
  const dispatch = useColorMatrixDispatch();

  function handlePresetSelect(id: PresetId) {
    //const value = getPresetValueById(id);
    dispatch(setPresetId({ presetId: id }));
  }

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!wrapperRef.current) return;
      const draggables = Draggable.create(wrapperRef.current, {
        type: "scrollTop",
        inertia: true,
        dragClickables: true,
        dragResistance: DRAG_RESISTENCE,
        edgeResistance: EDGE_RESISTENCE,
      });
      return () => draggables.forEach((d) => d.kill());
    },
    { scope: wrapperRef },
  );

  return (
    <div className={styles["preset-wrapper"]} ref={wrapperRef}>
      <ul className={styles["preset-list"]}>
        {presets.map((preset, index) => (
          <PresetButton
            onSelect={handlePresetSelect}
            key={preset.id}
            id={preset.id}
            label={preset.label}
            position={index as PresetIconPosition}
          />
        ))}
      </ul>
    </div>
  );
}
