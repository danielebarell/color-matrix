import styles from "./actions.module.css";
import { useRef, useState, type RefObject } from "react";
import CodeWrapper from "../code/CodeWrapper";
import PresetListWrapper from "../presets/PresetListWrapper";
import { useUIStore } from "../../hooks/useUIStore";

export type DialogableProps = {
  dialogRef?: RefObject<HTMLDialogElement | null>;
  onExit?: () => void;
};
export default function Actions() {
  const isDialogOpen = useUIStore((state) => state.panels.dialog);
  const dialogStateOpen = useUIStore((state) => state.openPanel);
  const dialogStateClose = useUIStore((state) => state.closePanel);
  const codeDialogRef = useRef<HTMLDialogElement | null>(null);
  const presetsDialogRef = useRef<HTMLDialogElement | null>(null);
  function handleDialogShow(ref: RefObject<HTMLDialogElement | null>) {
    if (!ref.current) return;
    dialogStateOpen("dialog");
    ref.current.show();
  }
  function handleDialogExit(ref: RefObject<HTMLDialogElement | null>) {
    if (!ref?.current) return;
    dialogStateClose("dialog");
    ref?.current.close();
  }
  return (
    <div className={styles.actions}>
      <button
        className="btn btn-primary txt-main text-main--label"
        onClick={() => handleDialogShow(presetsDialogRef)}
        disabled={isDialogOpen}
      >
        Show presets
      </button>
      <button
        className="btn btn-primary txt-main text-main--label"
        onClick={() => handleDialogShow(codeDialogRef)}
        disabled={isDialogOpen}
      >
        Get code
      </button>
      <CodeWrapper
        dialogRef={codeDialogRef}
        onExit={() => handleDialogExit(codeDialogRef)}
      />
      <PresetListWrapper
        dialogRef={presetsDialogRef}
        onExit={() => handleDialogExit(presetsDialogRef)}
      />
    </div>
  );
}
