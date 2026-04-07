import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ColorComponentSlider, {
  type ColorComponentSliderApi,
} from "./ColorComponentSlider";
import Panel, {
  type ColorComponentCombinationIconsAPI,
  type ColorComponent,
  type ColorComponentCombination,
} from "../panel/Panel";
import type { ColorMatrixPosition } from "../../data/presets-data";
import { colorComponentValues } from "../panel/Panel";
import useColorMatrixSelector from "../../hooks/useColormatrixSelector";
import type { ColorMatrixRootState } from "../../store/store";
import useColorMatrixDispatch from "../../hooks/useColormatrixDispatch";
import { setPosition, setValue } from "../../store/colormatrixSlice";
import { useUIStore } from "../../hooks/useUIStore";

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
  const dialogStateOpen = useUIStore((state) => state.openPanel);
  const dialogStateClose = useUIStore((state) => state.closePanel);
  //
  const isColorComponentEnabled = useUIStore(
    (state) => state.panels.colorComponent,
  );
  const prevPositionRef = useRef<ColorMatrixPosition | null>(null);
  const cccRef = useRef<ColorComponentCombinationIconsAPI>(null!);
  useEffect(() => {
    if (prevPositionRef.current !== initPosition) {
      setCommitedValues([initValue!]);
      prevPositionRef.current = initPosition;
    }
    if (!modalRef.current || initPosition === null) return;
    modalRef.current.show();
    dialogStateOpen("dialog");
    cccRef.current.show();
  }, [initPosition, initValue, modalRef, prevPositionRef, cccRef]);
  //
  useEffect(() => {
    if (!cccRef.current) return;
    if (isColorComponentEnabled) {
      colorComponentSlider.current?.disable(false);
      cccRef.current.show();
    } else {
      colorComponentSlider.current?.disable();
      cccRef.current.hide();
    }
  }, [isColorComponentEnabled, cccRef]);
  /**
   *
   */
  const [commitedValues, setCommitedValues] = useState<number[]>([initValue!]);
  const dispatch = useColorMatrixDispatch();
  const colorComponentSlider = useRef<ColorComponentSliderApi | null>(null);
  function onSliderChange(value: number) {
    if (value === null || value === undefined) return;
    dispatch(setValue({ value }));
  }
  function reset(fn: resetFn) {
    if (colorComponentSlider.current) colorComponentSlider.current[fn]();
    dispatch(setPosition({ position: null }));
    setCommitedValues([]);
    if (!modalRef.current) return;
    modalRef.current.close();
    dialogStateClose("dialog");
  }

  function handleExit() {
    dispatch(setValue({ value: commitedValues[0] }));
    reset("exit");
  }
  function handleConfirm() {
    reset("confirm");
  }
  function getPanel(exitable: boolean) {
    return (
      <Panel
        onConfirm={exitable ? handleConfirm : undefined}
        onUndo={undefined}
        undoable={commitedValues.length > 1}
        confirmable={exitable}
        onExit={exitable ? handleExit! : undefined}
        ccc={getCcCombinationByPosition(initPosition!)}
        headerless={false}
        cccRef={cccRef}
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
