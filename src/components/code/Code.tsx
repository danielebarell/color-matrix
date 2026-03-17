import { getCss, getSvg } from "../../data/data-code";
import type { ColorMatrix } from "../../data/presets-data";
import CopyButton from "./CopyButton";
import PrismCode from "./PrismCode";
import "./code-theme.css";

export type CodeType = "css" | "markup";

type CodeProps = {
  values: ColorMatrix;
};

export default function Code({ values }: CodeProps) {
  async function handleCopy(copyType: CodeType) {
    try {
      const code = copyType === "markup" ? getSvg(values) : getCss();
      await navigator.clipboard.writeText(code);
    } catch (error) {
      console.warn(error);
    }
  }
  return (
    <>
      <CopyButton onCopy={handleCopy} codeType="css" />
      <PrismCode code={getCss()} codeType="css" />
      <CopyButton onCopy={handleCopy} codeType="markup" />
      <PrismCode code={getSvg(values)} codeType="markup" />
    </>
  );
}
