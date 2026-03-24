import styles from "./actions.module.css";
import { useRef, type RefObject } from "react";
import CodeWrapper from "../code/CodeWrapper";
import PresetListWrapper from "../presets/PresetListWrapper";
export type DialogableProps = {
  dialogRef?: RefObject<HTMLDialogElement | null>;
};
export default function Actions() {
  const codeDialogRef = useRef<HTMLDialogElement | null>(null);
  const presetsDialogRef = useRef<HTMLDialogElement | null>(null);
  function handleDialogShow(ref: RefObject<HTMLDialogElement | null>) {
    if (!ref.current) return;
    ref.current.showModal();
  }
  return (
    <div className={styles.actions}>
      <button
        className="btn btn-primary txt-main text-main--label"
        onClick={() => handleDialogShow(presetsDialogRef)}
      >
        Show presets
      </button>
      <button
        className="btn btn-primary txt-main text-main--label"
        onClick={() => handleDialogShow(codeDialogRef)}
      >
        Get code
      </button>
      <CodeWrapper dialogRef={codeDialogRef} />
      <PresetListWrapper dialogRef={presetsDialogRef} />
    </div>
  );
}
