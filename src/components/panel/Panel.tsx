import {
  useImperativeHandle,
  useState,
  type PropsWithChildren,
  type RefObject,
} from "react";
import styles from "./panel.module.css";
import { useUIStore } from "../../hooks/useUIStore";
export type ColorComponent = "R" | "G" | "B" | "A" | "1";

export type ColorComponentCombination = {
  row: Omit<ColorComponent, "1">;
  column: ColorComponent;
};
export const colorComponentValues: ColorComponentUnion[] = [
  "R",
  "G",
  "B",
  "A",
  "1",
];
export type ColorComponentUnion = ColorComponent | Omit<ColorComponent, "1">;
type PanelProps = PropsWithChildren & {
  onExit?: () => void;
  onConfirm?: () => void;
  onUndo?: () => void;
  undoable?: boolean;
  confirmable?: boolean;
  ccc?: ColorComponentCombination;
  headerless?: boolean;
  cccRef?: RefObject<ColorComponentCombinationIconsAPI>;
};
export type ColorComponentCombinationIconsAPI = {
  show: () => void;
  hide: () => void;
};
/**
 * icons for panel, they are two little balls signifiyng which color component is currently manipulating
 */
const ColorComponentCombinationIcons: React.FC<{
  ccc: ColorComponentCombination;
  ref: RefObject<ColorComponentCombinationIconsAPI | undefined>;
}> = ({ ccc, ref }) => {
  const [visible, setVisible] = useState(false);
  useImperativeHandle(ref, () => ({
    show() {
      setVisible(true);
    },
    hide() {
      setVisible(false);
    },
  }));

  function getCcStyle(cc: ColorComponentUnion) {
    const iconYPosition = colorComponentValues.indexOf(cc) + 1;
    const MARGIN = 15;
    const HEIGHT = 16;
    const iconY = iconYPosition * (MARGIN + HEIGHT) * -1;
    return {
      backgroundPositionY: `${iconY}px`,
    };
  }
  return (
    <div
      className={`${styles["color-components"]} ${visible ? "" : styles.hide}`}
    >
      <span style={getCcStyle(ccc.row)}></span>
      <span style={getCcStyle(ccc.column)}></span>
    </div>
  );
};
/**
 *
 * A flexible container panel with exit, confirm and undo actions, plus a color component combination icon. All configurable.
 */
const Panel = ({
  children,
  onExit,
  onConfirm,
  onUndo,
  undoable,
  confirmable,
  cccRef = undefined,
  headerless = false,
  ccc = undefined,
}: PanelProps) => {
  const handleExit = () => {
    if (onExit) onExit();
  };
  return (
    <div className={styles.panel}>
      {!headerless && (
        <header
          className={onExit || ccc ? styles.header : styles["header--dummy"]}
        >
          {onExit ? (
            <button onClick={handleExit} className="btn-exit">
              &times;
            </button>
          ) : (
            <span>&nbsp;</span>
          )}
          {ccc && cccRef && (
            <ColorComponentCombinationIcons ccc={ccc} ref={cccRef!} />
          )}
        </header>
      )}
      <hr className={styles.separator} />
      <div className={styles.content}>
        <div>{children}</div>
        <div className={styles.actions}>
          {onConfirm && (
            <button
              className="btn btn-primary txt-main text-main--label"
              onClick={onConfirm}
              disabled={!confirmable}
            >
              Confirm
            </button>
          )}
          {onUndo && (
            <button
              disabled={!undoable}
              className="btn btn-secondary txt-main text-main--label"
              onClick={onUndo}
            >
              Undo
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Panel;
