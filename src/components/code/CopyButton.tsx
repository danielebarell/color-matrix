import { useEffect, useRef, useState } from "react";
import type { CodeType } from "./Code";
import styles from "./code.module.css";

type CopyButton = {
  onCopy: (codeType: CodeType) => void;
  codeType: CodeType;
};

const CopyButton = ({ onCopy, codeType }: CopyButton) => {
  const label = `Copy ${codeType === "markup" ? "SVG" : "CSS"}`;
  const timeoutId = useRef<number>(0);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) return;
    timeoutId.current = setTimeout(() => setIsCopied(false), 1000);

    return () => clearTimeout(timeoutId.current);
  }, [isCopied]);

  function handleClick() {
    onCopy(codeType);
    setIsCopied(true);
  }
  return (
    <button
      className={`${styles["copy-btn"]} ${isCopied ? styles["--copied"] : ""}`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default CopyButton;
