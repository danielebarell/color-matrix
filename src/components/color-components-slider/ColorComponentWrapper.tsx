import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ColorComponentSlider, {
  type ColorComponentSliderApi,
} from "./ColorComponentSlider";
import Panel, {
  type ColorComponent,
  type ColorComponentCombination,
} from "../panel/Panel";
import type { ColorMatrixPosition } from "../../data/presets-data";
import { colorComponentValues } from "../panel/Panel";
import useColorMatrixSelector from "../../hooks/useColormatrixSelector";
import type { ColorMatrixRootState } from "../../store/store";
import useColorMatrixDispatch from "../../hooks/useColormatrixDispatch";
import {
  setPosition,
  setValue,
  setPresetId,
} from "../../store/colormatrixSlice";

type ColorComponentWrapperProps = {
  isModal?: boolean;
};
type resetFn = "confirm" | "exit";
/**
 *
 * @param position Position in the matrix
 * @returns channel of color combination
 */
function getCcCombinationByPosition(
  position: ColorMatrixPosition,
): ColorComponentCombination | undefined {
  if (position === null) return;
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
export default function ColorComponentWrapper({
  isModal = false,
}: ColorComponentWrapperProps) {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  /**
   * array of values being set by the user used to make eventually undo action
   */
  const initValue = useColorMatrixSelector(
    (state: ColorMatrixRootState) => state.colorMatrix.activeColorComponent,
  );
  const initPosition = useColorMatrixSelector(
    (state: ColorMatrixRootState) => state.colorMatrix.position,
  );
  /**
   * if the slider hes been used so it's confirmable
   */
  const isDirty = useRef(false);
  const prevPositionRef = useRef<ColorMatrixPosition | null>(null);
  useEffect(() => {
    if (prevPositionRef.current !== initPosition) {
      setCommitedValues([initValue!]);
      prevPositionRef.current = initPosition;
    }
    if (initPosition === null) {
      isDirty.current = false;
    }
    if (!modalRef.current || initPosition === null) return;
    modalRef.current.showModal();
  }, [initPosition, initValue, isDirty, modalRef]);
  /**
   *
   */
  const [commitedValues, setCommitedValues] = useState<number[]>([initValue!]);
  const dispatch = useColorMatrixDispatch();
  const colorComponentSlider = useRef<ColorComponentSliderApi | null>(null);
  function onSliderChange(value: number) {
    if (isDirty.current) {
      dispatch(setPresetId({ presetId: null }));
    }
    if (value === null || value === undefined) return;
    isDirty.current = true;
    dispatch(setValue({ value }));
    addCommitedValue(value);
  }
  function addCommitedValue(value: number) {
    setCommitedValues((prev) => {
      const newArr = [...prev];
      if (newArr[0] === null || newArr[0] === undefined) newArr.shift();
      newArr.push(value);
      return newArr;
    });
  }
  function reset(fn: resetFn) {
    if (colorComponentSlider.current) colorComponentSlider.current[fn]();
    dispatch(setPosition({ position: null }));
    setCommitedValues([]);
    if (!modalRef.current) return;
    modalRef.current.close();
  }

  function handleExit() {
    dispatch(setValue({ value: commitedValues[0] }));
    reset("exit");
  }
  function handleConfirm() {
    reset("confirm");
  }

  function handleUndo() {
    console.log("torna indietro", commitedValues.length);
    if (commitedValues.length > 0)
      setCommitedValues((prev) => {
        const newArr = [...prev];
        newArr.pop();
        return newArr;
      });
  }
  useEffect(() => {
    //console.log("...effect", commitedValues);
    const lastValue = commitedValues[commitedValues.length - 1];
    if (colorComponentSlider.current)
      colorComponentSlider.current.undo(lastValue);
    dispatch(setValue({ value: lastValue }));
  }, [commitedValues]);

  function getPanel(exitable: boolean) {
    return (
      <Panel
        onConfirm={handleConfirm}
        onUndo={undefined}
        undoable={commitedValues.length > 1}
        confirmable={isDirty.current}
        onExit={exitable ? handleExit! : undefined}
        ccc={getCcCombinationByPosition(initPosition!)}
        headerless={false}
      >
        <ColorComponentSlider
          ref={colorComponentSlider}
          onSliderChange={onSliderChange}
        />
      </Panel>
    );
  }

  return isModal
    ? createPortal(
        <dialog ref={modalRef}>{getPanel(true)}</dialog>,
        document.querySelector("#panel-container")!,
      )
    : getPanel(false);
}
