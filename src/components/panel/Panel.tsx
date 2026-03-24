import type { PropsWithChildren } from "react";
import styles from "./panel.module.css";
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
};
/**
 * icons for panel, they are two little balls signifiyng which color component is currently manipulating
 */
const ColorComponentCombinationIcons: React.FC<{
  ccc: ColorComponentCombination;
}> = ({ ccc }) => {
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
    <div className={styles["color-components"]}>
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
  ccc = undefined,
}: PanelProps) => {
  const handleExit = () => {
    if (onExit) onExit();
  };

  return (
    <article className={styles.panel}>
      <header className={styles.header}>
        {onExit && (
          <button onClick={handleExit} className="btn-exit">
            &times;
          </button>
        )}
        {ccc && <ColorComponentCombinationIcons ccc={ccc} />}
      </header>
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
    </article>
  );
};

export default Panel;
