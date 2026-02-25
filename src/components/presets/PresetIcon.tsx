import icoMatrix from "../../assets/icons/ico_matrix.svg";
import styles from "./preset.module.css";
export type PresetIconPosition =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19;
type PresetIconProps = {
  position: PresetIconPosition;
};
export default function PresetIcon({ position }: PresetIconProps) {
  return (
    <div className={styles.icon}>
      <span className={styles["ico-matrix"]}>
        <img src={icoMatrix} />
      </span>
      <div
        className={styles["ico-button-bg"]}
        style={{ backgroundPositionY: `${(48 + 8) * -position}px` }}
      />
    </div>
  );
}
