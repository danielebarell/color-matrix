import {
  useEffect,
  useState,
  useRef,
  type RefObject,
  useImperativeHandle,
  type ReactNode,
  type KeyboardEvent,
} from "react";
import { Slider } from "radix-ui";
import { type ColorMatrixRootState } from "../../store/store";
import useColorMatrixSelector from "../../hooks/useColormatrixSelector";
import styles from "./color-component-slider.module.css";

type Operation = "minus" | "plus";
type AlertLevel = "warning" | "error";
type AlertMessage = {
  message: ReactNode;
  level: AlertLevel;
};
export type ColorComponentSliderApi = {
  undo: (lastValue: number) => void;
  confirm: () => void;
  exit: () => void;
  disable: (dis?: boolean) => void;
};
type ColorComponentSliderProps = {
  onSliderChange: (value: number) => void;
  ref: RefObject<ColorComponentSliderApi | null>;
};
/* ============================================================
 * Utility functions
 * ============================================================ */
const outOfBoundsAlert = (value: number): AlertMessage => ({
  level: "warning",
  message: (
    <>
      <strong>{value}</strong> is very{" "}
      {value < -1 ? " low" : value > 1 ? " high" : ""}. Recommended range is (-1
      1).
    </>
  ),
});
const wrongCharacterAlert = (inputValue: string): AlertMessage => ({
  level: "error",
  message: (
    <>
      <strong>{inputValue}</strong> is not permitted. The only enabled
      characters are: <strong>numbers</strong>, <strong>full-stop (.)</strong>,{" "}
      <strong>coma (,)</strong> and <strong>minus (-)</strong>
    </>
  ),
});
const isNaNAlert = (inputValue: string): AlertMessage => ({
  level: "error",
  message: (
    <>
      <strong>{inputValue}</strong> is not a number.
    </>
  ),
});
//Regexp per numeric stepper input: accetta numeri, virgola, meno e punto
const validationRegex = /^-?\d*(?:[.,]?\d{0,3})?$/;
/* ============================================================
 * Component
 * ============================================================ */
export default function ColorComponentSlider({
  onSliderChange,
  ref,
}: ColorComponentSliderProps) {
  /* ============================================================
   * States and Refs
   * ============================================================ */
  const currentValue = useColorMatrixSelector(
    (state: ColorMatrixRootState) => state.colorMatrix.activeColorComponent,
  );
  /**
   * raw value from controls inside component
   */

  const [rawValue, setRawValue] = useState<number | null>(null);
  /**
   * input value management imperatively from input field
   */
  const inputField = useRef<HTMLInputElement>(null);
  /**
   * stepper button operation: minus and plus
   */
  const [operation, setOperation] = useState<Operation | null>(null);
  /**
   * alert messages: errors and warnings
   */
  const [alertMessage, setAlertMessage] = useState<AlertMessage | null>(null);
  useEffect(() => {
    //dummy effect....
  }, [alertMessage]);
  const checkOutOfBounds = () => {
    if (rawValue === null) return;
    if (Math.abs(rawValue) > 1) setAlertMessage(outOfBoundsAlert(rawValue));
    else setAlertMessage(null);
  };
  /**
   * wheather controls are disbled
   */
  const [isDisabled, setIsDisabled] = useState(true);
  const operationTimer = useRef<number | null>(null);
  const precedentValue = useRef<number | null>(null);
  const draggingRef = useRef(false);
  /* ============================================================
   * Effects
   * ============================================================ */
  useEffect(() => {
    console.log("currentValue", currentValue);
    setRawValue(currentValue);
    precedentValue.current = currentValue;
    onSliderChange(currentValue!);
  }, [currentValue]);
  /**
   * Implement continuous step change on minus and plus buttons' press
   */
  useEffect(() => {
    if (!operation) return;
    operationTimer.current = setInterval(() => {
      setRawValue((prev) => {
        if (prev == null) return null;
        if (operation === "plus") return Math.round(prev * 10000 + 1) / 10000;
        else return Math.round(prev * 10000 - 1) / 10000;
      });
    }, 50);
    return () =>
      operationTimer.current
        ? clearInterval(operationTimer.current)
        : undefined;
  }, [operation]);
  /**
   * update inputValue with rowValue
   * so input field is in sync with other controls
   */
  useEffect(() => {
    if (inputField.current) {
      inputField.current.value =
        rawValue === null || rawValue === undefined ? "" : rawValue.toFixed(4);
    }
    if (!draggingRef.current) checkOutOfBounds();
  }, [rawValue, inputField]);
  /**
   * set isDisabled state as an effect of rawValue not set
   */
  useEffect(() => {
    setIsDisabled(rawValue === null || rawValue === undefined);
  }, [setIsDisabled, rawValue]);
  /* ============================================================
   * API
   * ============================================================ */
  useImperativeHandle(ref, () => {
    return {
      undo(value: number) {
        setRawValue(value);
        precedentValue.current = value;
      },
      confirm() {
        setAlertMessage(null);
      },
      exit() {
        setAlertMessage(null);
        setRawValue(0);
      },
      disable(dis: boolean = true) {
        if (dis) {
          setRawValue(null);
          setAlertMessage(null);
        }
        setIsDisabled(dis);
      },
    };
  }, [setRawValue, setAlertMessage]);
  /* ============================================================
   * Handlers
   * ============================================================ */
  /**
   * handle thumb's slider drag and track bar point in
   * @param values: an array of numbers, we'll consider the sole first one.
   */
  function handleSliderChange(values: number[]) {
    const [value] = values;
    draggingRef.current = true;
    setRawValue(value);
  }
  /**
   * handle plus and minus buttons release
   */
  function handleOperationBlur() {
    setOperation(null);
    if (rawValue === null) return;
    if (precedentValue.current === rawValue) return;
    onSliderChange(rawValue);
    draggingRef.current = false;
    checkOutOfBounds();
    precedentValue.current = rawValue;
  }
  /**
   * handle slider's thumb release
   */
  function handleThumbBlur() {
    if (rawValue === null) return;
    if (precedentValue.current === rawValue) return;
    onSliderChange(rawValue);
    draggingRef.current = false;
    checkOutOfBounds();
    precedentValue.current = rawValue;
  }
  /**
   * handle input field blur
   * validate and possibly update component's value
   */
  function handleInputBlur() {
    if (!inputField.current) return;
    const inputValue = inputField.current.value;
    if (inputValue === "") {
      inputField.current.value = rawValue === null ? "" : rawValue.toString();
      return;
    }
    if (!validationRegex.test(inputValue)) {
      setAlertMessage(wrongCharacterAlert(inputValue));
      return;
    }
    const value = +inputValue.replace(",", ".");
    if (isNaN(value)) {
      setAlertMessage(isNaNAlert(inputValue));
      return;
    }
    onSliderChange(+inputField.current.value);
  }
  /**
   * handle operation, the plus and minus button of the stepper
   * @param o : operation type
   */
  function handleOperation(o: Operation) {
    setOperation(o);
    setAlertMessage(null);
    draggingRef.current = true;
  }
  /**
   * handle input focus, to temporarily erase field value
   */
  function handleInputFocus() {
    if (!inputField.current) return;
    inputField.current.value = "";
  }
  /**
   * Handle input field Return key and blurs from field
   * @param event keyboard event
   */
  function handleInputReturn(event: KeyboardEvent) {
    if (event.code === "Enter") {
      inputField.current?.blur();
    }
  }

  return (
    <>
      <Slider.Root
        className={styles.Root}
        value={[rawValue || 0]}
        min={-1.5}
        max={1.5}
        step={0.0001}
        onValueChange={handleSliderChange}
        disabled={isDisabled}
      >
        <Slider.Track className={styles.Track} onPointerUp={handleThumbBlur}>
          <Slider.Range className={styles.Range} />
        </Slider.Track>
        <Slider.Thumb
          className={styles.Thumb}
          aria-label="Volume"
          onPointerUp={handleThumbBlur}
        />
      </Slider.Root>
      <div className={styles.stepper}>
        <button
          className="btn btn-primary --left"
          onPointerDown={() => handleOperation("minus")}
          onPointerLeave={handleOperationBlur}
          onPointerUp={handleOperationBlur}
          onContextMenu={(e) => e.preventDefault()}
          disabled={isDisabled}
        >
          -
        </button>
        <input
          ref={inputField}
          type="text"
          inputMode="numeric"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyUp={handleInputReturn}
          disabled={isDisabled}
        />
        <button
          className="btn btn-primary --right"
          onPointerDown={() => handleOperation("plus")}
          onPointerLeave={handleOperationBlur}
          onPointerUp={handleOperationBlur}
          onContextMenu={(e) => e.preventDefault()}
          disabled={isDisabled}
        >
          +
        </button>
      </div>
      {/*<div
        className={`${styles.alert} ${alertMessage ? (alertMessage?.level === "error" ? styles["--error"] : styles["--warning"]) : ""}`}
      >
        {alertMessage?.message!}
      </div>*/}
    </>
  );
}
