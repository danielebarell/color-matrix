import type { PresetId } from "../../data/presets-data";
import styles from "./preset.module.css";
import PresetIcon, { type PresetIconPosition } from "./PresetIcon";
type PresetButtonProps = {
  id: PresetId;
  label: string;
  iconPosition: PresetIconPosition;
  isSelected: boolean;
  onSelect: (id: PresetId) => void;
};
export default function PresetButton({
  id,
  label,
  onSelect,
  iconPosition,
  isSelected,
}: PresetButtonProps) {
  return (
    <li
      onClick={() => onSelect(id)}
      className={`${styles["preset-item"]} ${isSelected ? styles.selected : ""}`}
    >
      <button className={`${styles["button"]} text-main`}>
        <PresetIcon iconPosition={iconPosition} />{" "}
        <span className={styles.label}>{label}</span>
      </button>
    </li>
  );
}
