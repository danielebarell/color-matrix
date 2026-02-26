import type { ColorMatrixPosition } from "../../../data/presets-data";
import styles from "./matrix-Item.module.css";
type MatrixItemProps = {
  value: number;
  position: ColorMatrixPosition;
};

export default function MatrixItem(props: MatrixItemProps) {
  return (
    <li className={styles.cell} onClick={(event) => console.log(event)}>
      <span className={`${styles["cell-value"]} text-code text-code--14`}>
        {props.value}
      </span>
    </li>
  );
}
