import type { ColorMatrixPosition } from "../../../data/presets-data";
import styles from "./matrix-Item.module.css";
type MatrixItemProps = {
  value: number;
  position: ColorMatrixPosition;
  selected: boolean;
  onItemSelected: (position: ColorMatrixPosition) => void;
};
export default function MatrixItem(props: MatrixItemProps) {
  return (
    <li
      className={`${styles.cell} ${props.selected ? styles["cell--selected"] : ""}`}
      onClick={() => props.onItemSelected(props.position)}
    >
      <span className={`${styles["cell-value"]} text-code text-code--14`}>
        {props.value}
      </span>
    </li>
  );
}
