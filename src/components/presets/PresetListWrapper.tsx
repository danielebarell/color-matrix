import useColorMatrixDispatch from "../../hooks/useColormatrixDispatch";
import { setPresetId } from "../../store/colormatrixSlice";
import Panel from "../panel/Panel";
import PresetList from "./PresetList";
import presets, { type PresetId } from "../../data/presets-data";
import { useState, useEffect } from "react";
import useColorMatrixSelector from "../../hooks/useColormatrixSelector";
import type { ColorMatrixRootState } from "../../store/store";
import styles from "./preset.module.css";
import type { DialogableProps } from "../actions/Actions";
import { createPortal } from "react-dom";

function arrayLast<T>(a: Array<T>): T {
  return a[a.length - 1];
}

/**
 *
 * @returns A list of buttons (PresetList) within a Panel to set the whole matrix
 */
export default function PresetListWrapper({
  dialogRef,
  onExit,
}: DialogableProps) {
  const initPresetId = useColorMatrixSelector(
    (state: ColorMatrixRootState) => state.colorMatrix.presetId,
  );
  const dispatch = useColorMatrixDispatch();
  const [commitedPresets, setCommitedPresets] = useState<
    Array<PresetId | null>
  >([initPresetId]);

  function handleExit() {
    /**
     * keep first preset and exit
     */
    const firstPreset = commitedPresets[0] || null;
    setCommitedPresets([firstPreset]);
    onExit!();
  }
  function handleConfirm() {
    /**
     * keep last preset and exit
     */
    const currentPresetId = arrayLast(commitedPresets);
    setCommitedPresets([currentPresetId]);
    onExit!();
  }
  function handleUndo() {
    /**
     * remove last preset
     */
    setCommitedPresets((prev) => {
      const newPrs = [...prev];
      newPrs.pop();
      return newPrs;
    });
  }
  function handlePresetSelect(id: PresetId) {
    setCommitedPresets((prev) => [...prev, id]);
  }
  useEffect(() => {
    console.log("presets", commitedPresets);
    const currentPresetId = arrayLast(commitedPresets);
    dispatch(
      setPresetId({
        presetId: currentPresetId,
      }),
    );
  }, [commitedPresets]);

  useEffect(() => {
    if (!initPresetId) setCommitedPresets([null]);
  }, [initPresetId]);

  const getPanel = (actionable: boolean = false) => {
    return (
      <Panel
        onExit={actionable ? handleExit : undefined}
        headerless={!actionable}
        onConfirm={actionable ? handleConfirm : undefined}
        onUndo={false ? handleUndo : undefined}
        undoable={commitedPresets.length > 1}
        confirmable={
          commitedPresets.length > 0 && arrayLast(commitedPresets) != null
        }
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
  };
  if (dialogRef) {
    return createPortal(
      <dialog ref={dialogRef}>{getPanel(true)}</dialog>,
      document.querySelector("#panel-container")!,
    );
  }

  return getPanel();
}
