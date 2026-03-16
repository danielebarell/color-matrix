import useColorMatrixSelector from "../../hooks/useColormatrixSelector";
import type { ColorMatrixRootState } from "../../store/store";
import Panel from "../panel/Panel";
import Code from "./Code";

export default function CodeWrapper() {
  const matrix = useColorMatrixSelector(
    (state: ColorMatrixRootState) => state.colorMatrix.matrix,
  );
  function handleExit() {
    console.log("CODE EXIT");
  }
  return (
    <Panel onExit={handleExit}>
      <Code values={matrix} />
    </Panel>
  );
}
/**[1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5] */
