import type { ColorMatrixPosition } from "../../../data/presets-data";
import styles from "./matrix-Item.module.css";
type MatrixItemProps = {
  value: number;
  position: ColorMatrixPosition;
  onItemSelected: (position: ColorMatrixPosition) => void;
};
export default function MatrixItem(props: MatrixItemProps) {
  return (
    <li
      className={styles.cell}
      onClick={() => props.onItemSelected(props.position)}
    >
      <span className={`${styles["cell-value"]} text-code text-code--14`}>
        {props.value}
      </span>
    </li>
  );
}
