import type { ChannelCombination } from "../../utility/channels";
import styles from "./matrix-Item.module.css";
type MatrixItemProps = {
  cid: string;
  channelCombination: ChannelCombination;
  value: number;
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
