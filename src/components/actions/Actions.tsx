import styles from "./actions.module.css";
import { useRef } from "react";
import CodeWrapper from "../code/CodeWrapper";
export default function Actions() {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  return (
    <div className={styles.actions}>
      <button className="btn btn-primary txt-main text-main--label">
        Show presets
      </button>
      <button
        className="btn btn-primary txt-main text-main--label"
        onClick={() => dialogRef.current?.showModal()}
      >
        Get code
      </button>
      <CodeWrapper dialogRef={dialogRef} />
    </div>
  );
}
