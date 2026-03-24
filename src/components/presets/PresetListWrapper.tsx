import useColorMatrixDispatch from "../../hooks/useColormatrixDispatch";
import { setPresetId } from "../../store/colormatrixSlice";
import Panel from "../panel/Panel";
import PresetList from "./PresetList";
import presets, { type PresetId } from "../../data/presets-data";
import { useState, useEffect, useRef } from "react";
import useColorMatrixSelector from "../../hooks/useColormatrixSelector";
import type { ColorMatrixRootState } from "../../store/store";
import styles from "./preset.module.css";
import type { DialogableProps } from "../actions/Actions";
import { createPortal } from "react-dom";
/**
 *
 * @returns A list of buttons (PresetList) within a Panel to set the whole matrix
 */
export default function PresetListWrapper({ dialogRef }: DialogableProps) {
  const initPresetId = useColorMatrixSelector(
    (state: ColorMatrixRootState) => state.colorMatrix.presetId,
  );
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
    if (dialogRef?.current) {
      dialogRef.current.close();
    }
  }
  function handleExit() {
    dialogRef?.current?.close();
  }
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

  useEffect(() => {
    if (!initPresetId) setCommitedPresets((prev) => [...prev, null]);
  }, [initPresetId]);

  const getPanel = (exitable: boolean = false) => {
    return (
      <Panel
        onUndo={handleUndo}
        onConfirm={handleConfirm}
        onExit={exitable ? handleExit : undefined}
        undoable={commitedPresets.length > 1}
        confirmable={isDirty.current}
        headerless={!dialogRef}
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
