import useColorMatrixDispatch from "../../hooks/useColormatrixDispatch";
import { setPresetId } from "../../store/colormatrixSlice";
import Panel from "../panel/Panel";
import PresetList from "./PresetList";
import presets, { type PresetId } from "../../data/presets-data";
import { useState, useEffect, useRef } from "react";
import useColorMatrixSelector from "../../hooks/useColormatrixSelector";
import type { ColorMatrixRootState } from "../../store/store";
import styles from "./preset.module.css";
/**
 *
 * @returns A list of buttons (PresetList) within a Panel to set the whole matrix
 */
export default function PresetListWrapper() {
  const initPresetId = useColorMatrixSelector(
    (state: ColorMatrixRootState) => state.colorMatrix.presetId,
  );
  useEffect(() => {
    console.log("initPresetId", initPresetId);
    if (!initPresetId) setCommitedPresets((prev) => [...prev, null]);
  }, [initPresetId]);
  const dispatch = useColorMatrixDispatch();
  const [commitedPresets, setCommitedPresets] = useState<
    Array<PresetId | null>
  >([initPresetId]);
  const isDirty = useRef(false);
  function handleUndo() {
    console.log("undo", commitedPresets);
    setCommitedPresets((prev) => {
      const newArr = [...prev];
      newArr.pop();
      return newArr;
    });
  }

  function handleConfirm() {
    isDirty.current = false;
    setCommitedPresets((prev) => [[...prev].pop()!]);
  }
  function handleExit() {}
  function handlePresetSelect(id: PresetId) {
    isDirty.current = true;
    setCommitedPresets((prev) => [...prev, id]);
  }
  useEffect(() => {
    console.log("...effect", commitedPresets);
    const currentPresetId = commitedPresets[commitedPresets.length - 1];
    dispatch(
      setPresetId({
        presetId: currentPresetId,
      }),
    );
  }, [commitedPresets]);

  return (
    <Panel
      onUndo={handleUndo}
      onConfirm={handleConfirm}
      onExit={handleExit}
      undoable={commitedPresets.length > 1}
      confirmable={isDirty.current}
      hidden={false}
    >
      <div className={styles["list-wrapper"]}>
        <PresetList
          onSelect={handlePresetSelect}
          presets={presets}
          currentId={commitedPresets[commitedPresets.length - 1]}
        />
      </div>
    </Panel>
  );
}
