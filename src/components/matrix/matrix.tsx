import type { ChannelCombination } from "../../utility/channels";
import MatrixItem from "./matrix-item/MatrixItem";
import styles from "./matrix.module.css";

export default function Matrix() {
  const combination: ChannelCombination = {
    rowChannel: "Red",
    columnChannel: "Blue",
  };
  return (
    <ul className={styles["matrix-table"]}>
      {/** Row 1, Red */}
      <MatrixItem
        cid="prova1"
        channelCombination={combination}
        value={0.0789}
      ></MatrixItem>
      <MatrixItem
        cid="prova2"
        channelCombination={combination}
        value={0.0789}
      ></MatrixItem>
      <MatrixItem
        cid="prova3"
        channelCombination={combination}
        value={0.0789}
      ></MatrixItem>
      <MatrixItem
        cid="prova4"
        channelCombination={combination}
        value={0.0789}
      ></MatrixItem>
      <MatrixItem
        cid="prova5"
        channelCombination={combination}
        value={0.0789}
      ></MatrixItem>
      {/** Row 2, Green */}
      <MatrixItem
        cid="prova6"
        channelCombination={combination}
        value={0.0789}
      ></MatrixItem>
      <MatrixItem
        cid="prova7"
        channelCombination={combination}
        value={0.0789}
      ></MatrixItem>
      <MatrixItem
        cid="prova8"
        channelCombination={combination}
        value={0.0789}
      ></MatrixItem>
      <MatrixItem
        cid="prova9"
        channelCombination={combination}
        value={0.0789}
      ></MatrixItem>
      <MatrixItem
        cid="prova10"
        channelCombination={combination}
        value={0.0789}
      ></MatrixItem>
      {/** Row 3, Blue */}
      <MatrixItem
        cid="prova1"
        channelCombination={combination}
        value={0.0789}
      ></MatrixItem>
      <MatrixItem
        cid="prova2"
        channelCombination={combination}
        value={0.0789}
      ></MatrixItem>
      <MatrixItem
        cid="prova3"
        channelCombination={combination}
        value={0.0789}
      ></MatrixItem>
      <MatrixItem
        cid="prova4"
        channelCombination={combination}
        value={0.0789}
      ></MatrixItem>
      <MatrixItem
        cid="prova5"
        channelCombination={combination}
        value={0.0789}
      ></MatrixItem>
      {/** Row 4, Alpha */}
      <MatrixItem
        cid="prova6"
        channelCombination={combination}
        value={0.0789}
      ></MatrixItem>
      <MatrixItem
        cid="prova7"
        channelCombination={combination}
        value={0.0789}
      ></MatrixItem>
      <MatrixItem
        cid="prova8"
        channelCombination={combination}
        value={0.0789}
      ></MatrixItem>
      <MatrixItem
        cid="prova9"
        channelCombination={combination}
        value={0.0789}
      ></MatrixItem>
      <MatrixItem
        cid="prova10"
        channelCombination={combination}
        value={0.0789}
      ></MatrixItem>
    </ul>
  );
}
