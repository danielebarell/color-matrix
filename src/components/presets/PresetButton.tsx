import type { PresetId } from "../../data/presets-data";
import styles from "./preset.module.css";
import PresetIcon, { type PresetIconPosition } from "./PresetIcon";
type PresetButtonProps = {
  id: PresetId;
  label: string;
  position: PresetIconPosition;
  onSelect: (id: PresetId) => void;
};
export default function PresetButton({
  id,
  label,
  onSelect,
  position,
}: PresetButtonProps) {
  return (
    <li onClick={() => onSelect(id)} className={styles["preset-item"]}>
      <button className={styles["button"]}>
        <PresetIcon position={position} /> {label}
      </button>
    </li>
  );
}
