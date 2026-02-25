import styles from "./preset.module.css";
import PresetIcon, { type PresetIconPosition } from "./PresetIcon";
type PresetButtonProps = {
  id: string;
  label: string;
  position: PresetIconPosition;
  onSelect: (id: string) => void;
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
