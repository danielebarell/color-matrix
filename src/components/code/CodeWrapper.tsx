import { createPortal } from "react-dom";
import useColorMatrixSelector from "../../hooks/useColormatrixSelector";
import type { ColorMatrixRootState } from "../../store/store";
import Panel from "../panel/Panel";
import Code from "./Code";
import { type RefObject } from "react";

type CodeWrapperProps = {
  dialogRef?: RefObject<HTMLDialogElement | null>;
};

export default function CodeWrapper({ dialogRef }: CodeWrapperProps) {
  const matrix = useColorMatrixSelector(
    (state: ColorMatrixRootState) => state.colorMatrix.matrix,
  );
  const handleExit = () => {
    if (!dialogRef?.current) return;
    dialogRef?.current.close();
  };
  const getCode = () => <Code values={matrix} />;
  if (dialogRef) {
    return createPortal(
      <dialog ref={dialogRef}>
        <Panel onExit={handleExit}>{getCode()}</Panel>
      </dialog>,
      document.querySelector("#panel-container")!,
    );
  }
  return <Panel>{getCode()}</Panel>;
}
/**[1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5] */
