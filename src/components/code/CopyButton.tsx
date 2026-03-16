import type { CodeType } from "./Code";
import styles from "./code.module.css";

type CopyButton = {
  onCopy: (codeType: CodeType) => void;
  codeType: CodeType;
};

const CopyButton = ({ onCopy, codeType }: CopyButton) => {
  const label = `Copy ${codeType}`;
  return (
    <button className={styles["copy-btn"]} onClick={() => onCopy(codeType)}>
      {label}
    </button>
  );
};

export default CopyButton;
