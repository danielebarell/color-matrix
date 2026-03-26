import { createPortal } from "react-dom";
import useColorMatrixSelector from "../../hooks/useColormatrixSelector";
import type { ColorMatrixRootState } from "../../store/store";
import Panel from "../panel/Panel";
import Code from "./Code";
import type { DialogableProps } from "../actions/Actions";

export default function CodeWrapper({ dialogRef, onExit }: DialogableProps) {
  const matrix = useColorMatrixSelector(
    (state: ColorMatrixRootState) => state.colorMatrix.matrix,
  );
  const getCode = () => <Code values={matrix} />;
  if (dialogRef) {
    return createPortal(
      <dialog ref={dialogRef}>
        <Panel onExit={onExit} headerless={false}>
          {getCode()}
        </Panel>
      </dialog>,
      document.querySelector("#panel-container")!,
    );
  }
  return <Panel headerless={true}>{getCode()}</Panel>;
}
/**[1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5] */
