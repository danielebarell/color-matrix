import { getCss, getSvg } from "../../data/data-code";
import type { ColorMatrix } from "../../data/presets-data";
import CopyButton from "./CopyButton";
import styles from "./code.module.css";

export type CodeType = "SVG" | "CSS";

type CodeProps = {
  values: ColorMatrix;
};

export default function Code({ values }: CodeProps) {
  function handleCopy(copyType: CodeType) {
    console.log("handleCopy", copyType);
  }
  return (
    <article>
      <CopyButton onCopy={handleCopy} codeType="CSS" />
      <textarea className={`${styles.textarea} text-code`}>{getCss()}</textarea>
      <CopyButton onCopy={handleCopy} codeType="SVG" />
      <textarea className={`${styles.textarea} ${styles["--tall"]} text-code`}>
        {getSvg(values)}
      </textarea>
    </article>
  );
}
