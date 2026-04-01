import styles from "./popover.module.css";
import type {
  AlertLevel,
  AlertMessage,
} from "../color-components-slider/ColorComponentSlider";
import { useEffect, useState } from "react";

const Popover = ({ message, level }: AlertMessage) => {
  const [isHidden, setIsHidden] = useState(true);
  useEffect(() => {
    if (message === null || message === undefined) {
      setIsHidden(true);
      return;
    }
    //if there's a message, show
    setIsHidden(false);
  }, [message, setIsHidden]);

  const closeHandler = () => {
    console.log("close");
    setIsHidden(true);
    message = null;
  };

  return (
    <div
      className={`${isHidden ? styles["no-baloon"] : styles.baloon} ${level === "warning" ? styles["baloon-warning"] : styles["baloon-error"]}`}
    >
      <header className={styles.header}>
        <h4>{level}</h4>
        <button onClick={closeHandler}>&times;</button>
      </header>
      {message}
    </div>
  );
};

export default Popover;
