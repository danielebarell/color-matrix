import type { ChannelCombination } from "../../utility/channels";
import styles from "./matrix-item-panel.module.css";
type MatrixItemPanelProps = {
  value: number;
  cid: number;
  channelCombination: ChannelCombination;
};
export default function MatrixItemPanel(props: MatrixItemPanelProps) {
  const originalValue = props.value;
  return (
    <div className={styles.panel}>
      <header>
        <div>PALLE</div>
        <button>CLOSE</button>
      </header>
      <h3>Panel</h3>
      {/*<code>
        <li>cid: {props.cid}</li>
        <li>combination: {JSON.stringify(props.channelCombination)}</li>
        <li>value: {props.value}</li>
      </code>*/}
    </div>
  );
}
