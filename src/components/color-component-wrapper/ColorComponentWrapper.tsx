import { useEffect, useRef, useState } from "react";
import ColorComponentSlider, {
  type ColorComponentSliderApi,
} from "../color-components-slider/ColorComponentSlider";
import Panel, {
  type ColorComponent,
  type ColorComponentCombination,
} from "../panel/Panel";
import type { ColorMatrixPosition } from "../../data/presets-data";
import { colorComponentValues } from "../panel/Panel";
import useColorMatrixSelector from "../../hooks/useColormatrixSelector";
import type { ColorMatrixRootState } from "../../store/store";
import useColorMatrixDispatch from "../../hooks/useColormatrixDispatch";
import { setPosition, setValue } from "../../store/colormatrixSlice";

function getCcCombinationByPosition(
  position: ColorMatrixPosition,
): ColorComponentCombination | undefined {
  if (position === null) return;
  console.log("position", position);

  const columnsNumber = 5;
  const column = colorComponentValues[
    position % columnsNumber
  ] as ColorComponent;
  const row = colorComponentValues[
    Math.floor(position / columnsNumber)
  ] as ColorComponent;
  const combination = { row, column };
  return combination;
}
/**
 * Coordinate Panel and ColorComponentSlider
 * (...will) Keep in sync with redux store
 */
export default function ColorComponentWrapper() {
  /**
   * array of values being set by the user used to make eventually undo action
   */
  const initValue = useColorMatrixSelector(
    (state: ColorMatrixRootState) => state.colorMatrix.activeColorComponent,
  );
  const initPosition = useColorMatrixSelector(
    (state: ColorMatrixRootState) => state.colorMatrix.position,
  );
  const [commitedValues, setCommitedValues] = useState<number[]>([
    initValue || 0,
  ]);
  const dispatch = useColorMatrixDispatch();
  const colorComponentSlider = useRef<ColorComponentSliderApi | null>(null);
  function onSliderChange(value: number) {
    console.log("CHANGE", value);
    if (value === null) return;
    dispatch(setValue({ value }));
    addCommitedValue(value);
  }
  function addCommitedValue(value: number) {
    setCommitedValues((prev) => [...prev, value]);
  }

  function handleExit() {
    console.log("Invalida il valore e Chiudi pannello");
    if (colorComponentSlider.current) colorComponentSlider.current.exit();
    dispatch(setValue({ value: commitedValues[0] }));
    dispatch(setPosition({ position: null }));
    setCommitedValues([]);
  }
  function handleConfirm() {
    console.log("Conferma e ciao");
    if (colorComponentSlider.current) colorComponentSlider.current.confirm();
    dispatch(setPosition({ position: null }));
  }

  function handleUndo() {
    console.log("torna indietro");
    if (commitedValues.length > 1)
      setCommitedValues((prev) => {
        const newArr = [...prev];
        newArr.pop();
        return newArr;
      });
  }
  useEffect(() => {
    const lastValue = commitedValues[commitedValues.length - 1];
    if (colorComponentSlider.current)
      colorComponentSlider.current.undo(lastValue);
    dispatch(setValue({ value: lastValue }));
  }, [commitedValues]);

  return (
    <Panel
      onConfirm={handleConfirm}
      onUndo={handleUndo}
      undoable={commitedValues.length > 1}
      onExit={handleExit!}
      ccc={getCcCombinationByPosition(initPosition!)}
    >
      <ColorComponentSlider
        ref={colorComponentSlider}
        onSliderChange={onSliderChange}
      />
    </Panel>
  );
}
