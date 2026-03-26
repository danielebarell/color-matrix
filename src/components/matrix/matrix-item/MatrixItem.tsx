import type { ColorMatrixPosition } from "../../../data/presets-data";
import styles from "./matrix-Item.module.css";
type MatrixItemProps = {
  value: number;
  position: ColorMatrixPosition;
  selected: boolean;
  onItemSelected: (position: ColorMatrixPosition) => void;
  disabled?: boolean;
};
export default function MatrixItem(props: MatrixItemProps) {
  function handleClick() {
    if (props.selected || props.disabled) return;
    props.onItemSelected(props.position);
  }

  return (
    <li
      className={`${styles.cell} ${props.disabled ? styles.disabled : ""} ${props.selected ? styles["cell--selected"] : ""}`}
      onClick={handleClick}
    >
      <span className={`${styles["cell-value"]} text-code text-code--14`}>
        {props.value}
      </span>
    </li>
  );
}
