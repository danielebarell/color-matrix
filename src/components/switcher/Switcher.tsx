import { Switch } from "radix-ui";
import styles from "./switcher.module.css";
import { useState } from "react";

type SwitcherProps = {
  defaultChecked?: boolean;
  label: string;
  toggleFilter: (checked: boolean) => void;
};

export default function Switcher({
  toggleFilter,
  label,
  defaultChecked = true,
}: SwitcherProps) {
  const [isChecked, setIsChecked] = useState(defaultChecked);
  function handleCheckedChange(checked: boolean) {
    setIsChecked(checked);
    toggleFilter(checked);
  }
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <label
        className={styles.Label}
        style={{ opacity: isChecked ? 1 : 0.3 }}
        htmlFor="filter-mode"
      >
        {label}
      </label>
      <Switch.Root
        defaultChecked={defaultChecked}
        className={styles.Root}
        id="filter-mode"
        onCheckedChange={handleCheckedChange}
      >
        <Switch.Thumb className={styles.Thumb} />
      </Switch.Root>
    </div>
  );
}
